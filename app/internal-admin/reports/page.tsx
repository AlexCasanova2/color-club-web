import { IoFlagOutline } from "react-icons/io5";
import { AdminSectionPage } from "@/components/admin/AdminSectionPage";

export const dynamic = "force-dynamic";

export default function AdminReportsPage() {
  return (
    <AdminSectionPage
      kicker="Moderación"
      title="Reportes"
      description="Cola de revisión para contenido reportado, estados y resoluciones auditadas."
      icon={IoFlagOutline}
      metrics={[
        { label: "Open", value: "—", tone: "yellow" },
        { label: "Reviewing", value: "—", tone: "blue" },
        { label: "Resolved", value: "—", tone: "green" },
      ]}
      rows={[
        { label: "open → reviewing", value: "Asignación", status: "Pendiente modelo" },
        { label: "reviewing → resolved", value: "Motivo", status: "Auditado" },
        { label: "reviewing → dismissed", value: "Motivo", status: "Auditado" },
      ]}
      emptyTitle="No hay cola conectada"
      emptyBody="Falta definir reportables, evidencia, retención y efectos de moderación."
    />
  );
}
