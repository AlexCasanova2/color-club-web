import { JsonLd } from "./JsonLd";
import { PageHero } from "./PageHero";
import type { SitePageContent } from "@/lib/cms";
import { legalReferences, type LegalDocument } from "@/lib/legal";
import { breadcrumbJsonLd, siteConfig, webPageJsonLd } from "@/lib/site";

export function LegalDocumentPage({
  content,
  document,
  tone,
}: {
  content: SitePageContent;
  document: LegalDocument;
  tone: "lavender" | "yellow" | "green" | "blue" | "orange";
}) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(document.route),
          webPageJsonLd(
            document.route,
            content.seo_title,
            content.seo_description,
            content.updated_at,
          ),
        ]}
      />
      <PageHero kicker={content.hero_kicker} title={content.hero_title} tone={tone}>
        <p>{content.hero_body}</p>
      </PageHero>

      <div className="legal-layout shell">
        <aside className="legal-index">
          <div className="legal-status">
            <strong>{siteConfig.legalApproved ? "Documento aprobado" : "Borrador pendiente"}</strong>
            <span>España y Unión Europea</span>
            <span>Edad mínima prevista: 16 años</span>
            <span>
              Entrada en vigor: {siteConfig.legalEffectiveDate || "[FECHA PENDIENTE]"}
            </span>
          </div>
          <nav aria-label={`Índice de ${document.label}`}>
            {document.sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>{section.title}</a>
            ))}
          </nav>
        </aside>

        <article className="legal-document">
          {!siteConfig.legalApproved ? (
            <div className="legal-draft-warning">
              <strong>No publicar como texto legal definitivo.</strong>
              <p>
                Este borrador contiene placeholders entre corchetes y decisiones pendientes.
                Debe revisarlo una persona profesional antes de cambiar el estado a aprobado.
              </p>
            </div>
          ) : null}

          <p className="legal-document__summary">{document.summary}</p>

          {document.sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? (
                <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              ) : null}
            </section>
          ))}

          <section id="referencias" className="legal-references">
            <h2>Normativa y recursos de referencia</h2>
            <p>Estas fuentes orientan el borrador; no sustituyen la revisión jurídica del caso concreto.</p>
            <ul>
              {legalReferences.map((reference) => (
                <li key={reference.href}>
                  <a href={reference.href} rel="noreferrer" target="_blank">{reference.label}</a>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </>
  );
}
