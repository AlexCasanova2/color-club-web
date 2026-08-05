"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="admin-card admin-login"
      onSubmit={(event) => {
        event.preventDefault();
        setError("");
        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") || "");
        const password = String(formData.get("password") || "");

        startTransition(async () => {
          const supabase = createSupabaseBrowserClient();
          const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
          if (signInError) {
            setError("No se ha podido iniciar sesión con esas credenciales.");
            return;
          }
          router.replace("/internal-admin/site-content");
          router.refresh();
        });
      }}
    >
      <div>
        <p className="admin-kicker">Internal admin</p>
        <h1>Acceso del equipo</h1>
        <p>Solo usuarios dados de alta como administradores de plataforma.</p>
      </div>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Contraseña
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {error ? <p className="admin-error">{error}</p> : null}
      <button className="admin-button" disabled={isPending} type="submit">
        {isPending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
