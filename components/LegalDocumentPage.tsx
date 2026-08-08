import { JsonLd } from "./JsonLd";
import { PageHero } from "./PageHero";
import type { SitePageContent } from "@/lib/cms";
import { legalDetails, legalReferences, type LegalDocument } from "@/lib/legal";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/site";

function renderLegalText(text: string) {
  return text.split(/(info@getcolorclub\.com|aepd\.es|getcolorclub\.com)/g).map((part, index) => {
    if (part === legalDetails.email) {
      return <a href={`mailto:${part}`} key={`${part}-${index}`}>{part}</a>;
    }
    if (part === "aepd.es" || part === "getcolorclub.com") {
      return <a href={`https://${part}`} key={`${part}-${index}`}>{part}</a>;
    }
    return part;
  });
}

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
            <strong>Información del documento</strong>
            <span>España y Unión Europea</span>
            <span>Entrada en vigor: {legalDetails.effectiveDate}</span>
            <span>Última actualización: {legalDetails.effectiveDate}</span>
          </div>
          <nav aria-label={`Índice de ${document.label}`}>
            {document.sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>{section.title}</a>
            ))}
          </nav>
        </aside>

        <article className="legal-document">
          <p className="legal-document__summary">{document.summary}</p>

          {document.sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{renderLegalText(paragraph)}</p>)}
              {section.bullets ? (
                <ul>{section.bullets.map((bullet) => <li key={bullet}>{renderLegalText(bullet)}</li>)}</ul>
              ) : null}
            </section>
          ))}

          <section id="referencias" className="legal-references">
            <h2>Normativa y recursos de referencia</h2>
            <p>Fuentes oficiales relacionadas con la protección de datos y los servicios digitales.</p>
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
