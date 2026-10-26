import Link from "next/link";
import { requireModerator } from "@/lib/admin-access";
import {
  formatReportDate, listReports, parseReportFilters, reportListHref, reportPageSize,
  reportReasons, reportStatuses, reportSubjects,
} from "@/lib/moderation";

export const dynamic = "force-dynamic";

export default async function AdminReportsPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { supabase } = await requireModerator();
  const filters = parseReportFilters(await searchParams);
  let result;
  try {
    result = await listReports(supabase, filters);
  } catch {
    return <section className="admin-page"><h1>Denuncias</h1><p role="alert">No se han podido cargar los casos. No se ha realizado ningún cambio.</p><Link href={reportListHref(filters, filters.page)}>Volver a intentar</Link></section>;
  }
  const { reports, total } = result;
  const pages = Math.max(1, Math.ceil(total / reportPageSize));
  return (
    <section className="admin-page reports-page">
      <header className="admin-page__header">
        <div><p className="admin-kicker">Moderación privada</p><h1>Denuncias</h1></div>
        <p>Revisa el contenido señalado y registra cada decisión.</p>
      </header>
      <form className="admin-card reports-filters" method="get">
        <label>Estado<select name="status" defaultValue={filters.status}>
          <option value="all">Todos los estados</option>
          {Object.entries(reportStatuses).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
        </select></label>
        <label>Contenido<select name="subject" defaultValue={filters.subject}>
          <option value="all">Todos los tipos</option>
          {Object.entries(reportSubjects).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
        </select></label>
        <button type="submit">Filtrar casos</button>
      </form>
      <div className="reports-heading"><h2>{total} {total === 1 ? "caso" : "casos"}</h2><p>Fechas: Europe/Madrid</p></div>
      {reports.length ? <div className="reports-list">
        {reports.map((report) => <article className="admin-card report-row" key={report.id}>
          <div><span className={`report-status report-status--${report.status}`}>{reportStatuses[report.status]}</span>
            <h3><Link href={`/internal-admin/reports/${report.id}`}>{reportSubjects[report.subject_type]} · {reportReasons[report.reason] ?? "Otro motivo"}</Link></h3>
            <p><time dateTime={report.created_at}>{formatReportDate(report.created_at)}</time> · Caso {report.id.slice(0, 8)}</p>
          </div><Link className="report-open" href={`/internal-admin/reports/${report.id}`} aria-label={`Revisar caso ${report.id.slice(0, 8)}`}>Revisar →</Link>
        </article>)}
      </div> : <div className="admin-card"><h2>No hay casos en esta página</h2><p>Cambia los filtros o vuelve a la primera página.</p><Link href={reportListHref(filters, 1)}>Primera página</Link></div>}
      <nav className="reports-pagination" aria-label="Páginas de denuncias">
        {filters.page > 1 && <Link href={reportListHref(filters, filters.page - 1)}>← Anterior</Link>}
        <span>Página {filters.page} de {pages}</span>
        {filters.page < pages && <Link href={reportListHref(filters, filters.page + 1)}>Siguiente →</Link>}
      </nav>
    </section>
  );
}
