import { notFound } from "next/navigation";
import {
  IoChatbubbleEllipsesOutline,
  IoEyeOffOutline,
  IoNotificationsOutline,
  IoPeopleOutline,
  IoPodiumOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { AnimatedWorkflow } from "@/components/AnimatedWorkflow";
import { AdminInviteRedirect } from "@/components/admin/AdminInviteRedirect";
import { DownloadCta, LearnMoreLink } from "@/components/DownloadCta";
import { JsonLd } from "@/components/JsonLd";
import { HeroCollage } from "@/components/ProductVisuals";
import { RevealSection } from "@/components/RevealSection";
import { getPageContent } from "@/lib/cms";
import { breadcrumbJsonLd, getDownloadOptions, pageMetadata, siteConfig, webPageJsonLd } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata() {
  const content = await getPageContent("/");
  if (!content) notFound();
  return pageMetadata(content.seo_title, content.seo_description, "/");
}

export default async function HomePage() {
  const content = await getPageContent("/");
  if (!content) notFound();
  const downloadOptions = getDownloadOptions().filter((option) => option.store !== "waitlist");
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Color Club",
    applicationCategory: "GameApplication",
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    featureList: [
      "Clubs privados",
      "Retos de color compartidos o individuales",
      "Collages configurables",
      "Votación entre participantes",
      "Ranking por temporadas",
    ],
    ...(downloadOptions.length ? { installUrl: downloadOptions.map((option) => option.href) } : {}),
  };

  return (
    <>
      <AdminInviteRedirect />
      <JsonLd
        data={[
          breadcrumbJsonLd("/"),
          webPageJsonLd("/", content.seo_title, content.seo_description, content.updated_at),
          softwareJsonLd,
        ]}
      />
      <section className="home-hero shell">
        <div className="home-hero__copy reveal" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="kicker">{content.hero_kicker}</p>
          <h1>{content.hero_title}</h1>
          <p className="home-hero__lede">
            {content.hero_body}
          </p>
          <div className="home-hero__actions">
            <DownloadCta />
            <LearnMoreLink />
          </div>
        </div>
        <div className="reveal" style={{ "--i": 1 } as React.CSSProperties}>
          <HeroCollage />
        </div>
      </section>

      <AnimatedWorkflow />

      <RevealSection className="modes-band" direction="right">
        <div className="shell modes-band__grid">
          <header>
            <p className="kicker">Cada reto cambia</p>
            <h2>El mismo juego, muchas formas de salir a mirar.</h2>
          </header>
          <div className="mode-orbit" aria-label="Opciones de los retos">
            <article className="mode-orbit__main">
              <span>Color</span>
              <strong>Compartido o individual</strong>
              <p>Elegido por el grupo o asignado al azar.</p>
            </article>
            <div className="mode-orbit__note mode-orbit__note--time">
              <IoTimeOutline aria-hidden="true" />
              <span>30 min → 1 semana</span>
            </div>
            <div className="mode-orbit__note mode-orbit__note--photos">
              <span>2 · 4 · 6 · 8 · 10 · 12 fotos</span>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="social shell" labelledBy="social-title" direction="up">
        <header className="section-heading section-heading--wide">
          <p>Jugar juntos, sin jugar igual</p>
          <h2 id="social-title">Privado para el grupo. Imprevisible para todos.</h2>
        </header>
        <div className="social__mosaic">
          <article className="social-card social-card--members">
            <IoPeopleOutline aria-hidden="true" />
            <h3>Hasta 12 personas</h3>
            <p>Los clubs son privados y cada invitación se comparte fuera de la web.</p>
          </article>
          <article className="social-card social-card--hidden">
            <IoEyeOffOutline aria-hidden="true" />
            <h3>Sin copiar ideas</h3>
            <p>Los collages ajenos aparecen cuando empieza la votación.</p>
          </article>
          <article className="social-card social-card--ranking">
            <IoPodiumOutline aria-hidden="true" />
            <h3>Temporadas con ranking</h3>
            <p>Cada voto suma un punto a la clasificación del club.</p>
          </article>
          <div className="social-notes">
            <span><IoChatbubbleEllipsesOutline aria-hidden="true" /> Chat privado configurable</span>
            <span><IoNotificationsOutline aria-hidden="true" /> Avisos dentro de la app</span>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="final-cta shell" labelledBy="download-title" direction="scale">
        <div>
          <p className="kicker">Tu calle ya está llena de colores</p>
          <h2 id="download-title">Solo falta salir a encontrarlos.</h2>
        </div>
        <DownloadCta />
      </RevealSection>
    </>
  );
}
