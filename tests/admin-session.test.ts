// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({ create: vi.fn(), configured: vi.fn(), getUser: vi.fn(), signOut: vi.fn() }));
vi.mock("@supabase/ssr", () => ({ createServerClient: mocks.create }));
vi.mock("@/lib/supabase/config", () => ({
  hasSupabaseConfig: mocks.configured,
  getSupabaseConfig: () => ({ url: "http://localhost:55321", anonKey: "local-public-key" }),
}));
vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: async () => ({ auth: { signOut: mocks.signOut } }),
}));
vi.mock("next/navigation", () => ({ redirect: (path: string) => { throw new Error(`redirect:${path}`); } }));
import { proxy } from "@/proxy";
import { signOutAdmin } from "@/app/internal-admin/actions";

describe("sesión administrativa", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.configured.mockReturnValue(true);
    mocks.create.mockReturnValue({ auth: { getUser: mocks.getUser } });
    mocks.signOut.mockResolvedValue({ error: null });
  });
  it("propaga cookies renovadas y cabeceras anticaché", async () => {
    mocks.getUser.mockImplementation(async () => {
      const options = mocks.create.mock.calls[0][2];
      options.cookies.setAll([{ name: "session", value: "renewed", options: { httpOnly: true } }], { Pragma: "no-cache" });
      return { data: { user: {} }, error: null };
    });
    const request = new NextRequest("http://localhost/internal-admin/reports");
    const response = await proxy(request);
    expect(request.cookies.get("session")?.value).toBe("renewed");
    expect(response.cookies.get("session")?.value).toBe("renewed");
    expect(response.headers.get("Cache-Control")).toContain("no-store");
    expect(response.headers.get("Pragma")).toBe("no-cache");
    expect(response.headers.get("X-Robots-Tag")).toContain("noindex");
  });
  it("no consulta Auth si falta configuración", async () => {
    mocks.configured.mockReturnValue(false);
    await proxy(new NextRequest("http://localhost/internal-admin/login"));
    expect(mocks.create).not.toHaveBeenCalled();
  });
  it("cierra solo la sesión del navegador antes de redirigir", async () => {
    await expect(signOutAdmin()).rejects.toThrow("redirect:/internal-admin/login");
    expect(mocks.signOut).toHaveBeenCalledWith({ scope: "local" });
  });
  it("no afirma un cierre de sesión si Auth falla", async () => {
    mocks.signOut.mockResolvedValue({ error: new Error("unavailable") });
    await expect(signOutAdmin()).rejects.toThrow("No se ha podido cerrar la sesión");
  });
});
