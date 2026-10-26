import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ getUser: vi.fn(), rpc: vi.fn(), updateUser: vi.fn(), replace: vi.fn(), refresh: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ replace: mocks.replace, refresh: mocks.refresh }) }));
vi.mock("@/lib/supabase/browser", () => ({ createSupabaseBrowserClient: () => ({ auth: { getUser: mocks.getUser, updateUser: mocks.updateUser }, rpc: mocks.rpc }) }));
import { AdminInviteForm } from "@/components/admin/AdminInviteForm";

describe("activación mediante invitación", () => {
  afterEach(cleanup);
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.getUser.mockResolvedValue({ data: { user: { email: "invite@example.test" } }, error: null });
    mocks.rpc.mockResolvedValue({ data: "moderator", error: null });
    mocks.updateUser.mockResolvedValue({ error: null });
  });
  it("rechaza un enlace sin sesión verificada", async () => {
    mocks.getUser.mockResolvedValue({ data: { user: null }, error: new Error("invalid") });
    render(<AdminInviteForm />);
    expect(await screen.findByRole("alert")).toHaveTextContent("no es válida");
    expect(screen.queryByLabelText("Nueva contraseña")).not.toBeInTheDocument();
  });
  it("rechaza cuentas sin rol permitido", async () => {
    mocks.rpc.mockResolvedValue({ data: "support", error: null });
    render(<AdminInviteForm />);
    expect(await screen.findByRole("alert")).toHaveTextContent("no tiene acceso");
  });
  it("exige coincidencia y actualiza la contraseña sin registrarla en URL", async () => {
    render(<AdminInviteForm />);
    fireEvent.change(await screen.findByLabelText("Nueva contraseña"), { target: { value: "test-password" } });
    fireEvent.change(screen.getByLabelText("Repite la contraseña"), { target: { value: "different-password" } });
    fireEvent.submit(screen.getByRole("button", { name: "Guardar y entrar" }).closest("form")!);
    expect(await screen.findByRole("alert")).toHaveTextContent("misma contraseña");
    expect(mocks.updateUser).not.toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText("Repite la contraseña"), { target: { value: "test-password" } });
    await act(async () => { fireEvent.submit(screen.getByRole("button", { name: "Guardar y entrar" }).closest("form")!); });
    await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/internal-admin"));
    expect(mocks.updateUser).toHaveBeenCalledWith({ password: "test-password" });
  });
});
