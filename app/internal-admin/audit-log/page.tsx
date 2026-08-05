import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { AdminSectionPage } from "@/components/admin/AdminSectionPage";

export const dynamic = "force-dynamic";

export default function AdminAuditLogPage() {
  return (
    <AdminSectionPage
      kicker="Owner"
      title="Auditoría"
      description="Registro append-only de mutaciones internas con actor, rol, recurso, motivo y fecha."
      icon={IoShieldCheckmarkOutline}
      metrics={[
        { label: "Modo", value: "Append-only", tone: "green" },
        { label: "Lectura", value: "Owner", tone: "yellow" },
        { label: "Purgado", value: "No app", tone: "blue" },
      ]}
      rows={[
        { label: "site_page_content.upsert", value: "CMS", status: "Activo" },
        { label: "admin role changes", value: "Roles", status: "Pendiente" },
        { label: "moderation actions", value: "Reportes", status: "Pendiente" },
      ]}
      emptyTitle="Sin eventos visibles"
      emptyBody="Cuando existan mutaciones auditadas, aquí se consultarán con paginación por fecha e ID."
    />
  );
}
