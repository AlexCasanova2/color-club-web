import { IoPersonAddOutline } from "react-icons/io5";
import { AdminSectionPage } from "@/components/admin/AdminSectionPage";

export const dynamic = "force-dynamic";

export default function AdminAdminsPage() {
  return (
    <AdminSectionPage
      kicker="Owner"
      title="Admins"
      description="Gestión de roles de plataforma separada de administradores de club."
      icon={IoPersonAddOutline}
      metrics={[
        { label: "Roles", value: "3", tone: "lavender" },
        { label: "Último owner", value: "Protegido", tone: "green" },
        { label: "Cambios", value: "Auditados", tone: "yellow" },
      ]}
      rows={[
        { label: "support", value: "Lectura", status: "Definido" },
        { label: "moderator", value: "Moderación", status: "Definido" },
        { label: "owner", value: "Completo", status: "Crítico" },
      ]}
      emptyTitle="Gestión pendiente"
      emptyBody="Antes de activar esta pantalla hay que implementar protección concurrente del último owner."
    />
  );
}
