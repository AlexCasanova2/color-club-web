import { IoSparklesOutline } from "react-icons/io5";
import { AdminSectionPage } from "@/components/admin/AdminSectionPage";

export const dynamic = "force-dynamic";

export default function AdminChallengesPage() {
  return (
    <AdminSectionPage
      kicker="Moderación"
      title="Retos"
      description="Seguimiento de retos activos, votación, cierres y contenido que requiera revisión."
      icon={IoSparklesOutline}
      metrics={[
        { label: "Activos", value: "—", tone: "blue" },
        { label: "En votación", value: "—", tone: "yellow" },
        { label: "Cerrados", value: "—", tone: "green" },
      ]}
      rows={[
        { label: "Fase active", value: "Captura", status: "Lectura" },
        { label: "Fase voting", value: "Votos", status: "Moderador+" },
        { label: "Fase closed", value: "Resultado", status: "Lectura" },
      ]}
      emptyTitle="Sin retos conectados"
      emptyBody="Faltan RPCs específicas para listar sin descargar actividad completa."
    />
  );
}
