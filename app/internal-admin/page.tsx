import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function InternalAdminPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/internal-admin/login");
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/internal-admin/login");
  const { data: role } = await supabase.rpc("current_platform_admin_role");
  if (role === "owner") redirect("/internal-admin/site-content");
  if (role === "moderator") redirect("/internal-admin/reports");
  return (
    <section className="admin-centered">
      <div className="admin-card">
        <p className="admin-kicker">Sin permiso de moderación</p>
        <h1>Tu cuenta no tiene acceso a las denuncias.</h1>
        <p>Solicita un rol de plataforma autorizado o cierra esta sesión.</p>
      </div>
    </section>
  );
}
