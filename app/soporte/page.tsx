import { notFound } from "next/navigation";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { faqItems } from "@/lib/content";
import { getPageContent } from "@/lib/cms";
import { breadcrumbJsonLd, pageMetadata, siteConfig, webPageJsonLd } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata() {
  const content = await getPageContent("/soporte");
  if (!content) notFound();
  return pageMetadata(content.seo_title, content.seo_description, "/soporte");
}

export default async function SupportPage() {
  const content = await getPageContent("/soporte");
  if (!content) notFound();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd("/soporte"),
          webPageJsonLd("/soporte", content.seo_title, content.seo_description, content.updated_at),
          faqJsonLd,
        ]}
      />
      <PageHero kicker={content.hero_kicker} title={content.hero_title} tone="blue">
        <p>{content.hero_body}</p>
      </PageHero>
      <section className="support-layout shell">
        <div className="support-layout__intro">
          <h2>Preguntas frecuentes</h2>
          <p>Las respuestas reflejan el funcionamiento actual de la app.</p>
        </div>
        <FaqList />
      </section>
      <section className="support-contact shell">
        <p className="kicker">¿No aparece tu problema?</p>
        <h2>Cuéntanos qué estabas intentando hacer.</h2>
        {siteConfig.supportUrl ? (
          <a className="button button--primary" href={siteConfig.supportUrl} rel="noreferrer">
            Abrir canal de soporte
          </a>
        ) : (
          <p className="configuration-note">
            El canal de contacto aún no está configurado. Esta página se actualizará con el
            enlace oficial; no usamos direcciones provisionales inventadas.
          </p>
        )}
      </section>
    </>
  );
}
