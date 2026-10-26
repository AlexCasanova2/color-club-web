import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <section className="admin-centered">
        <div className="admin-card">
          <p className="admin-kicker">Configuración pendiente</p>
          <h1>Supabase no está configurado.</h1>
          <p>Define `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` para activar el admin.</p>
        </div>
      </section>
    );
  }

  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/internal-admin");

  return (
    <section className="admin-centered">
      <AdminLoginForm />
    </section>
  );
}
