import { notFound } from "next/navigation";
import { DownloadCta } from "@/components/DownloadCta";
import { HowItWorksTour } from "@/components/HowItWorksTour";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RevealSection } from "@/components/RevealSection";
import { getPageContent } from "@/lib/cms";
import { breadcrumbJsonLd, howToJsonLd, pageMetadata, webPageJsonLd } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata() {
  const content = await getPageContent("/como-funciona");
  if (!content) notFound();
  return pageMetadata(content.seo_title, content.seo_description, "/como-funciona");
}

export default async function HowItWorksPage() {
  const content = await getPageContent("/como-funciona");
  if (!content) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd("/como-funciona"),
          webPageJsonLd(
            "/como-funciona",
            content.seo_title,
            content.seo_description,
            content.updated_at,
          ),
          howToJsonLd(),
        ]}
      />
      <PageHero kicker={content.hero_kicker} title={content.hero_title} tone="yellow">
        <p>{content.hero_body}</p>
      </PageHero>
      <HowItWorksTour />
      <RevealSection className="inline-cta shell" direction="scale">
        <h2>¿Listos para el primer color?</h2>
        <DownloadCta />
      </RevealSection>
    </>
  );
}
