"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminInviteForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const clientRef = useRef<ReturnType<typeof createSupabaseBrowserClient> | null>(null);

  useEffect(() => {
    let active = true;
    async function verifyInvitation() {
      try {
        // SSR fuerza PKCE; la invitación entrega una sesión implícita que se valida explícitamente.
        const hash = new URLSearchParams(window.location.hash.slice(1));
        const access_token = hash.get("access_token");
        const refresh_token = hash.get("refresh_token");
        const client = clientRef.current ??= createSupabaseBrowserClient(false);
        window.history.replaceState(null, "", "/internal-admin/accept-invite");
        if (hash.get("type") === "invite" && access_token && refresh_token) {
          const { error: sessionError } = await client.auth.setSession({ access_token, refresh_token });
          if (sessionError) throw new Error("La invitación no es válida o ha caducado. Solicita una nueva.");
        }
        const { data, error: authError } = await client.auth.getUser();
        if (authError || !data.user) throw new Error("La invitación no es válida o ha caducado. Solicita una nueva.");
        const { data: role, error: roleError } = await client.rpc("current_platform_admin_role");
        if (roleError || (role !== "moderator" && role !== "owner")) throw new Error("Esta cuenta no tiene acceso administrativo activo.");
        if (active) setEmail(data.user.email ?? "Cuenta invitada");
      } catch (cause) {
        if (active) setError(cause instanceof Error ? cause.message : "No se ha podido comprobar la invitación.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void verifyInvitation();
    return () => { active = false; };
  }, []);

  return <form className="admin-card admin-login" onSubmit={async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    if (password.length < 8 || password !== form.get("confirmation")) {
      setError("Usa al menos 8 caracteres y repite la misma contraseña.");
      return;
    }
    setPending(true); setError("");
    try {
      const client = clientRef.current;
      if (!client) { setError("Vuelve a abrir el enlace de invitación."); return; }
      const { error: updateError } = await client.auth.updateUser({ password });
      if (updateError) { setError("No se ha podido guardar la contraseña. Comprueba los requisitos o solicita otra invitación."); return; }
      router.replace("/internal-admin"); router.refresh();
    } catch {
      setError("No se ha podido confirmar el cambio. Vuelve a iniciar sesión antes de repetirlo.");
    } finally { setPending(false); }
  }}>
    <div><p className="admin-kicker">Invitación privada</p><h1>Activa tu acceso</h1>
      <p>{loading ? "Comprobando invitación…" : email ? `Elige una contraseña para ${email}.` : "Abre el enlace de invitación que has recibido por correo."}</p></div>
    {email && <>
      <label>Nueva contraseña<input name="password" type="password" autoComplete="new-password" minLength={8} required disabled={pending} /></label>
      <label>Repite la contraseña<input name="confirmation" type="password" autoComplete="new-password" minLength={8} required disabled={pending} /></label>
      <button className="admin-button" type="submit" disabled={pending}>{pending ? "Guardando…" : "Guardar y entrar"}</button>
    </>}
    {error && <p className="admin-error" role="alert">{error}</p>}
  </form>;
}
