import type { IconType } from "react-icons";
import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoConstructOutline,
  IoFilterOutline,
  IoLockClosedOutline,
  IoSearchOutline,
} from "react-icons/io5";

type Metric = {
  label: string;
  value: string;
  tone?: "green" | "yellow" | "blue" | "lavender";
};

type Row = {
  label: string;
  value: string;
  status: string;
};

export function AdminSectionPage({
  kicker,
  title,
  description,
  icon: Icon,
  metrics,
  rows,
  emptyTitle,
  emptyBody,
}: {
  kicker: string;
  title: string;
  description: string;
  icon: IconType;
  metrics: Metric[];
  rows: Row[];
  emptyTitle: string;
  emptyBody: string;
}) {
  return (
    <section className="admin-page admin-section-page">
      <header className="admin-page__header admin-section-hero">
        <div>
          <p className="admin-kicker">{kicker}</p>
          <h1>{title}</h1>
        </div>
        <div className="admin-section-hero__note">
          <Icon aria-hidden="true" />
          <p>{description}</p>
        </div>
      </header>

      <div className="admin-metric-strip" aria-label="Resumen operativo">
        {metrics.map((metric) => (
          <article className={`admin-metric admin-metric--${metric.tone ?? "blue"}`} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </div>

      <div className="admin-workbench">
        <section className="admin-card admin-query-panel">
          <div>
            <p className="admin-kicker">Filtros</p>
            <h2>Buscar con límites</h2>
          </div>
          <label>
            Consulta
            <div className="admin-input-with-icon">
              <IoSearchOutline aria-hidden="true" />
              <input disabled placeholder="Requiere RPC protegida" />
            </div>
          </label>
          <button className="admin-button admin-button--secondary" disabled type="button">
            <IoFilterOutline aria-hidden="true" /> Aplicar filtros
          </button>
          <p className="admin-panel-note">
            No se descargan listados completos. Esta pantalla espera paginación y autorización
            servidor a servidor antes de mostrar resultados reales.
          </p>
        </section>

        <section className="admin-card admin-table-panel">
          <div className="admin-table-panel__head">
            <div>
              <p className="admin-kicker">Vista previa</p>
              <h2>Estado de implementación</h2>
            </div>
            <span className="admin-badge"><IoLockClosedOutline aria-hidden="true" /> Protegido</span>
          </div>
          {rows.length ? (
            <div className="admin-table" role="table" aria-label={`Tabla de ${title}`}>
              {rows.map((row) => (
                <div className="admin-table__row" role="row" key={row.label}>
                  <span role="cell">{row.label}</span>
                  <strong role="cell">{row.value}</strong>
                  <em role="cell">{row.status}</em>
                </div>
              ))}
            </div>
          ) : (
            <div className="admin-empty-state">
              <IoConstructOutline aria-hidden="true" />
              <h3>{emptyTitle}</h3>
              <p>{emptyBody}</p>
            </div>
          )}
        </section>

        <aside className="admin-card admin-safety-panel">
          <p className="admin-kicker">Antes de conectar</p>
          <ul>
            <li><IoCheckmarkCircleOutline aria-hidden="true" /> RPC con rol efectivo.</li>
            <li><IoCheckmarkCircleOutline aria-hidden="true" /> Paginación y límites.</li>
            <li><IoAlertCircleOutline aria-hidden="true" /> Motivo obligatorio en mutaciones.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
