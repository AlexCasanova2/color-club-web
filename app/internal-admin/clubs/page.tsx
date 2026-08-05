import { IoHomeOutline } from "react-icons/io5";
import { AdminSectionPage } from "@/components/admin/AdminSectionPage";

export const dynamic = "force-dynamic";

export default function AdminClubsPage() {
  return (
    <AdminSectionPage
      kicker="Operaciones"
      title="Clubs"
      description="Consulta de clubs privados, propietarios, miembros y configuración sin exponer IDs públicamente."
      icon={IoHomeOutline}
      metrics={[
        { label: "Límite", value: "12 miembros", tone: "lavender" },
        { label: "Acceso", value: "Support+", tone: "blue" },
        { label: "Acciones", value: "Lectura", tone: "green" },
      ]}
      rows={[
        { label: "Listado", value: "Nombre + estado", status: "Pendiente RPC" },
        { label: "Detalle", value: "Miembros", status: "Paginado" },
        { label: "Actividad", value: "Retos recientes", status: "Agregado" },
      ]}
      emptyTitle="No hay clubs cargados"
      emptyBody="La pantalla está preparada para datos paginados cuando exista el endpoint protegido."
    />
  );
}
