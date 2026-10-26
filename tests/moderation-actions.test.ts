import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ guard: vi.fn(), rpc: vi.fn(), revalidate: vi.fn() }));
vi.mock("@/lib/admin-access", () => ({ requireModerator: mocks.guard }));
vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidate }));
import { resolveReport } from "@/app/internal-admin/reports/actions";

const id = "00000000-0000-4000-8000-000000000001";
function form(operation = "reviewing") {
  const data = new FormData();
  Object.entries({ report_id: id, revision: "2", operation, note: "  Incumple las normas  " }).forEach(([key, value]) => data.set(key, value));
  return data;
}
describe("acciones de moderación", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.guard.mockResolvedValue({ supabase: { rpc: mocks.rpc } });
    mocks.rpc.mockResolvedValue({ error: null });
  });
  it("comprueba permisos también en invocaciones directas", async () => {
    mocks.guard.mockRejectedValue(new Error("not-found"));
    await expect(resolveReport({}, form())).rejects.toThrow("not-found");
    expect(mocks.rpc).not.toHaveBeenCalled();
  });
  it.each(["reviewing", "dismissed"])("envía una resolución %s auditada con revisión esperada", async (operation) => {
    expect((await resolveReport({}, form(operation))).success).toBeTruthy();
    expect(mocks.rpc).toHaveBeenCalledWith("admin_review_report", { target_report_id: id, expected_revision: 2, decision_note: "Incumple las normas", next_status: operation });
    expect(mocks.revalidate).toHaveBeenCalledWith(`/internal-admin/reports/${id}`);
  });
  it("exige confirmación de retirada también en servidor", async () => {
    const data = form("remove");
    expect((await resolveReport({}, data)).error).toContain("Confirma");
    expect(mocks.rpc).not.toHaveBeenCalled();
    data.set("confirm_removal", "yes");
    expect((await resolveReport({}, data)).success).toContain("limpieza");
    expect(mocks.rpc).toHaveBeenCalledWith("admin_remove_reported_content", { target_report_id: id, expected_revision: 2, decision_note: "Incumple las normas" });
  });
  it.each([["note", "x"], ["report_id", "bad"], ["revision", "-1"], ["operation", "actioned"]])("rechaza %s no válido", async (key, value) => {
    const data = form(); data.set(key, value);
    expect((await resolveReport({}, data)).error).toBeTruthy();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });
  it("explica conflictos sin reintentar ni revelar detalles internos", async () => {
    mocks.rpc.mockResolvedValue({ error: { code: "40001", message: "secret" } });
    expect((await resolveReport({}, form())).error).toContain("ha cambiado");
    expect(mocks.rpc).toHaveBeenCalledTimes(1);
    expect(mocks.revalidate).not.toHaveBeenCalled();
  });
  it("no afirma éxito cuando el resultado de red es incierto", async () => {
    mocks.rpc.mockRejectedValue(new Error("network timeout"));
    const result = await resolveReport({}, form());
    expect(result.success).toBeUndefined();
    expect(result.error).toContain("no está confirmado");
    expect(mocks.rpc).toHaveBeenCalledTimes(1);
  });
});
