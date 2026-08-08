import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { faqItems } from "@/lib/content";
import { getPageContent } from "@/lib/cms";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/site";

const supportEmail = "info@getcolorclub.com";

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
      <section className="support-channels shell" aria-labelledby="support-channels-title">
        <header>
          <p className="kicker">Contacto directo</p>
          <h2 id="support-channels-title">Elige el canal según tu consulta.</h2>
          <p>Todos los mensajes llegan a un buzón atendido por Color Club.</p>
        </header>
        <div className="support-channels__grid">
          <article>
            <h3>Acceso y soporte</h3>
            <p>Problemas con el registro, confirmación de correo, contraseña, clubs, retos o notificaciones.</p>
            <a href={`mailto:${supportEmail}?subject=Soporte%20Color%20Club`}>{supportEmail}</a>
          </article>
          <article>
            <h3>Privacidad</h3>
            <p>Ejercicio de derechos, tratamiento de datos o eliminación de cuenta si no puedes entrar en la app.</p>
            <a href={`mailto:${supportEmail}?subject=Privacidad%20Color%20Club`}>{supportEmail}</a>
          </article>
          <article>
            <h3>Seguridad y abuso</h3>
            <p>Incidentes de seguridad, denuncias de contenido, abuso o apelaciones de moderación.</p>
            <a href={`mailto:${supportEmail}?subject=Seguridad%20Color%20Club`}>{supportEmail}</a>
          </article>
        </div>
      </section>
      <section className="support-layout shell">
        <div className="support-layout__intro">
          <h2>Preguntas frecuentes</h2>
          <p>Las respuestas reflejan el funcionamiento actual de la app.</p>
        </div>
        <FaqList />
      </section>
      <section className="support-contact shell">
        <p className="kicker">Para ayudarte mejor</p>
        <h2>Cuéntanos qué ocurrió, sin compartir secretos.</h2>
        <p>
          Incluye el email de la cuenta, tu username, el modelo y versión del sistema del
          dispositivo, la versión de Color Club, una descripción de los pasos y, si es útil,
          una captura que no exponga datos de otras personas.
        </p>
        <p>
          Nunca envíes tu contraseña, códigos de acceso, tokens, documentos de identidad ni
          más información personal de la necesaria.
        </p>
        <a className="button button--primary" href={`mailto:${supportEmail}?subject=Ayuda%20con%20Color%20Club`}>
          Escribir a soporte
        </a>
        <nav className="support-contact__links" aria-label="Políticas relacionadas con soporte">
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/normas-comunidad">Normas de la comunidad</Link>
          <Link href="/eliminar-cuenta">Eliminar la cuenta</Link>
        </nav>
      </section>
    </>
  );
}
