import Link from "next/link";
import { notFound } from "next/navigation";
import { requireModerator } from "@/lib/admin-access";
import { formatReportDate, reportReasons, reportStatuses, reportSubjects } from "@/lib/moderation";
import { getReport, getReportImages, isReportOpen, snapshotText } from "@/lib/moderation-detail";
import { ReportEvidenceImage } from "@/components/admin/ReportEvidenceImage";

export const dynamic = "force-dynamic";

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { supabase } = await requireModerator();
  const { id } = await params;
  let report;
  try {
    report = await getReport(supabase, id);
  } catch {
    return <section className="admin-page"><h1>Denuncia no disponible</h1><p role="alert">No se ha podido cargar el caso. No se ha realizado ningún cambio.</p><Link href="/internal-admin/reports">Volver a las denuncias</Link></section>;
  }
  if (!report) notFound();
  const images = await getReportImages(supabase, report);
  const snapshot = report.content_snapshot ?? {};
  return (
    <section className="admin-page report-detail">
      <Link href="/internal-admin/reports">← Todas las denuncias</Link>
      <header className="admin-page__header">
        <div><p className="admin-kicker">Caso {report.id.slice(0, 8)}</p><h1>{reportSubjects[report.subject_type]} denunciado</h1></div>
        <span className={`report-status report-status--${report.status}`}>{reportStatuses[report.status]}</span>
      </header>
      <div className="report-detail-grid">
        <section className="admin-card report-evidence">
          <h2>Evidencia de la denuncia</h2>
          <p>Guardada al denunciar. El contenido actual puede haber cambiado.</p>
          {report.subject_type === "club_message" && <blockquote>{snapshotText(snapshot, "body")}</blockquote>}
          {report.subject_type === "profile" && <>
            <dl>{[["Nombre", "display_name"], ["Usuario", "username"], ["Biografía", "bio"], ["Estado", "status_text"]].map(([label, key]) =>
              <div key={key}><dt>{label}</dt><dd>{snapshotText(snapshot, key)}</dd></div>)}</dl>
            {images.length > 0 && <div className="report-photo-grid">{images.map((image) => <ReportEvidenceImage key={image.label} image={image} />)}</div>}
            <p>El avatar solo se carga desde el almacenamiento de Color Club; su archivo puede haber cambiado desde la denuncia.</p>
          </>}
          {report.subject_type === "collage" && (isReportOpen(report)
            ? <>{images.length ? <div className="report-photo-grid">{images.map((image, index) => <ReportEvidenceImage key={`${report.revision}-${index}`} image={image} />)}</div>
              : <p>No hay fotografías disponibles en esta evidencia.</p>}<p>URLs privadas válidas durante 60 segundos. Si caducan, recarga este caso.</p></>
            : <p>Acceso excepcional a fotografías cerrado. No se generan nuevas URLs.</p>)}
        </section>
        <aside className="admin-card report-context">
          <h2>Contexto del caso</h2>
          <dl>
            <div><dt>Motivo</dt><dd>{reportReasons[report.reason] ?? "Otro motivo"}</dd></div>
            <div><dt>Detalle aportado</dt><dd>{report.details || "Sin detalle adicional"}</dd></div>
            <div><dt>Creada (Europe/Madrid)</dt><dd>{formatReportDate(report.created_at)}</dd></div>
            <div><dt>Denunciante</dt><dd>{report.reporter_id ?? "Cuenta eliminada"}</dd></div>
            <div><dt>Usuario denunciado</dt><dd>{report.reported_user_id ?? "Cuenta eliminada"}</dd></div>
            <div><dt>Revisión</dt><dd>{report.revision}</dd></div>
            {report.resolution_note && <div><dt>Último motivo registrado</dt><dd>{report.resolution_note}</dd></div>}
            {report.reviewed_by && <div><dt>Última actuación</dt><dd>{report.reviewed_by}{report.reviewed_at && ` · ${formatReportDate(report.reviewed_at)} (Europe/Madrid)`}</dd></div>}
          </dl>
          {report.status === "actioned" && <p>{report.content_removed_at ? "Contenido retirado de la aplicación. La limpieza de archivos se procesa por separado." : "Caso atendido; el contenido ya no estaba disponible al actuar."}</p>}
        </aside>
      </div>
    </section>
  );
}
