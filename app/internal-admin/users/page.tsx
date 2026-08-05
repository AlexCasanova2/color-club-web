import { IoPeopleOutline } from "react-icons/io5";
import { AdminSectionPage } from "@/components/admin/AdminSectionPage";

export const dynamic = "force-dynamic";

export default function AdminUsersPage() {
  return (
    <AdminSectionPage
      kicker="Soporte"
      title="Usuarios"
      description="Búsqueda paginada de cuentas, estado de soporte y actividad reciente."
      icon={IoPeopleOutline}
      metrics={[
        { label: "Fuente", value: "Auth + profiles", tone: "blue" },
        { label: "Email", value: "Solo support+", tone: "yellow" },
        { label: "Mutaciones", value: "Auditadas", tone: "green" },
      ]}
      rows={[
        { label: "Buscar por UUID", value: "Exacto", status: "Pendiente RPC" },
        { label: "Buscar por username", value: "Paginado", status: "Pendiente RPC" },
        { label: "Buscar por email", value: "Restringido", status: "Requiere Auth Admin" },
      ]}
      emptyTitle="Sin resultados"
      emptyBody="Cuando exista la RPC, aquí aparecerán cuentas filtradas con límites seguros."
    />
  );
}
