import { redirect } from "next/navigation";
import { AdminContentEditor } from "@/components/admin/AdminContentEditor";
import { getAllPageContentForAdmin } from "@/lib/cms";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function SiteContentAdminPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <section className="admin-centered">
        <div className="admin-card">
          <p className="admin-kicker">Configuración pendiente</p>
          <h1>Admin desactivado</h1>
          <p>Configura Supabase para gestionar páginas y SEO desde el panel.</p>
        </div>
      </section>
    );
  }

  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/internal-admin/login");

  const { data: role } = await supabase.rpc("current_platform_admin_role");
  if (role !== "owner") {
    return (
      <section className="admin-centered">
        <div className="admin-card">
          <p className="admin-kicker">Sin permiso</p>
          <h1>Necesitas rol owner.</h1>
          <p>Tu sesión existe, pero no tiene permiso para editar contenido público ni SEO.</p>
        </div>
      </section>
    );
  }

  const pages = await getAllPageContentForAdmin(supabase);

  return (
    <section className="admin-page admin-content-page">
      <header className="admin-page__header admin-content-header">
        <div>
          <p className="admin-kicker">Site content</p>
          <h1>Páginas y SEO</h1>
        </div>
        <div className="admin-content-header__meta">
          <span>{pages.length} rutas configuradas</span>
          <p>Edita cabeceras y metadata pública. Cada guardado exige motivo y queda auditado.</p>
        </div>
      </header>
      <AdminContentEditor pages={pages} />
    </section>
  );
}
