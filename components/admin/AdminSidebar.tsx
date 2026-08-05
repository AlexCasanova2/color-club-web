import Link from "next/link";
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
  { href: "/internal-admin/reports", label: "Reportes", icon: IoFlagOutline },
  { href: "/internal-admin/clubs", label: "Clubs", icon: IoHomeOutline },
  { href: "/internal-admin/challenges", label: "Retos", icon: IoSparklesOutline },
  { href: "/internal-admin/admins", label: "Admins", icon: IoPersonAddOutline },
  { href: "/internal-admin/audit-log", label: "Auditoría", icon: IoShieldCheckmarkOutline },
] as const;

export function AdminSidebar() {
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
        {adminLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link href={link.href} key={link.href}>
              <Icon aria-hidden="true" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <Link className="admin-sidebar__logout" href="/internal-admin/login">
        <IoLogOutOutline aria-hidden="true" />
        <span>Salir</span>
      </Link>
    </aside>
  );
}
