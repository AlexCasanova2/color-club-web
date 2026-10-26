import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ createClient: vi.fn(), getUser: vi.fn(), rpc: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: mocks.createClient }));
vi.mock("next/navigation", () => ({
  redirect: (path: string) => { throw new Error(`redirect:${path}`); },
  notFound: () => { throw new Error("not-found"); },
}));
import { requireModerator } from "@/lib/admin-access";

describe("acceso a moderación", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.createClient.mockResolvedValue({ auth: { getUser: mocks.getUser }, rpc: mocks.rpc });
    mocks.getUser.mockResolvedValue({ data: { user: { id: "verified-user" } }, error: null });
    mocks.rpc.mockResolvedValue({ data: "moderator", error: null });
  });
  it("redirige si falta configuración o sesión válida", async () => {
    mocks.createClient.mockResolvedValueOnce(null);
    await expect(requireModerator()).rejects.toThrow("redirect:/internal-admin/login");
    mocks.getUser.mockResolvedValue({ data: { user: null }, error: new Error("invalid token") });
    await expect(requireModerator()).rejects.toThrow("redirect:/internal-admin/login");
    expect(mocks.rpc).not.toHaveBeenCalled();
  });
  it.each(["moderator", "owner"])("admite un %s comprobado en la base de datos", async (role) => {
    mocks.rpc.mockResolvedValue({ data: role, error: null });
    expect((await requireModerator()).role).toBe(role);
    expect(mocks.rpc).toHaveBeenCalledWith("current_platform_admin_role");
  });
  it.each(["support", null, "inactive", "inventado"])("deniega un rol no permitido: %s", async (role) => {
    mocks.rpc.mockResolvedValue({ data: role, error: null });
    await expect(requireModerator()).rejects.toThrow("not-found");
  });
  it("no acepta metadatos del usuario como privilegios ni ignora errores del servidor", async () => {
    mocks.getUser.mockResolvedValue({ data: { user: { id: "user", user_metadata: { role: "owner" } } }, error: null });
    mocks.rpc.mockResolvedValue({ data: "owner", error: new Error("database unavailable") });
    await expect(requireModerator()).rejects.toThrow("not-found");
  });
});
