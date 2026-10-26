import Link from "next/link";
import { signOutAdmin } from "@/app/internal-admin/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  IoDocumentTextOutline,
  IoFlagOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonAddOutline,
  IoShieldCheckmarkOutline,
  IoSparklesOutline,
} from "react-icons/io5";

const adminLinks = [
  { href: "/internal-admin/site-content", label: "Páginas y SEO", icon: IoDocumentTextOutline },
  { href: "/internal-admin/users", label: "Usuarios", icon: IoPeopleOutline },
  { href: "/internal-admin/reports", label: "Denuncias", icon: IoFlagOutline },
  { href: "/internal-admin/clubs", label: "Clubs", icon: IoHomeOutline },
  { href: "/internal-admin/challenges", label: "Retos", icon: IoSparklesOutline },
  { href: "/internal-admin/admins", label: "Admins", icon: IoPersonAddOutline },
  { href: "/internal-admin/audit-log", label: "Auditoría", icon: IoShieldCheckmarkOutline },
] as const;

export async function AdminSidebar() {
  const supabase = await createSupabaseServerClient();
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const { data: role, error } = data.user && supabase
    ? await supabase.rpc("current_platform_admin_role")
    : { data: null, error: null };
  const links = error ? [] : adminLinks.filter((link) =>
    role === "owner" || (role === "moderator" && link.href === "/internal-admin/reports"));
  return (
    <aside className="admin-sidebar" aria-label="Navegación interna">
      <div className="admin-sidebar__brand">
        <span aria-hidden="true">CC</span>
        <div>
          <strong>Color Club</strong>
          <small>Internal admin</small>
        </div>
      </div>
      <nav>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link href={link.href} key={link.href}>
              <Icon aria-hidden="true" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      {data.user && <form className="admin-sidebar__logout" action={signOutAdmin}>
        <button type="submit"><IoLogOutOutline aria-hidden="true" /><span>Salir</span></button>
      </form>}
    </aside>
  );
}
