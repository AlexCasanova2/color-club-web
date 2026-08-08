import type { Metadata } from "next";

export const publicRoutes = [
  "/",
  "/como-funciona",
  "/soporte",
  "/privacidad",
  "/terminos",
  "/aviso-legal",
  "/cookies",
  "/normas-comunidad",
  "/contenido-y-fotos",
  "/eliminar-cuenta",
] as const;

export type PublicRoute = (typeof publicRoutes)[number];

export const legalRoutes: readonly PublicRoute[] = [
  "/privacidad",
  "/terminos",
  "/aviso-legal",
  "/cookies",
  "/normas-comunidad",
  "/contenido-y-fotos",
  "/eliminar-cuenta",
] as const;

export function isLegalRoute(route: PublicRoute) {
  return legalRoutes.includes(route);
}

export const routeLabels: Record<PublicRoute, string> = {
  "/": "Inicio",
  "/como-funciona": "Cómo funciona",
  "/soporte": "Soporte",
  "/privacidad": "Privacidad",
  "/terminos": "Términos",
  "/aviso-legal": "Aviso legal",
  "/cookies": "Cookies",
  "/normas-comunidad": "Normas de la comunidad",
  "/contenido-y-fotos": "Contenido y fotos",
  "/eliminar-cuenta": "Eliminar la cuenta",
};

export const routeDescriptions: Record<PublicRoute, string> = {
  "/": "Landing oficial de Color Club: retos privados de color, collages, votación y ranking entre amigos.",
  "/como-funciona": "Guía completa de Color Club: clubs privados, colores, collages, envío, votación y ranking de temporada.",
  "/soporte": "Soporte de Color Club para acceso, clubs, retos, privacidad, seguridad, denuncias y eliminación de cuenta.",
  "/privacidad": "Política de privacidad de Color Club: datos tratados, finalidades, proveedores, conservación y derechos.",
  "/terminos": "Términos de uso de Color Club para cuentas, clubs, retos, contenido, moderación y baja.",
  "/aviso-legal": "Información legal e identificación del titular de la web y la app Color Club.",
  "/cookies": "Información sobre cookies técnicas, almacenamiento de sesión y futuras tecnologías opcionales de Color Club.",
  "/normas-comunidad": "Reglas de convivencia, seguridad, contenido permitido y moderación dentro de Color Club.",
  "/contenido-y-fotos": "Derechos, permisos, visibilidad y almacenamiento de fotografías y contenido en Color Club.",
  "/eliminar-cuenta": "Pasos para eliminar una cuenta de Color Club y explicación de sus efectos sobre datos y contenido.",
};

export const seoKeywords = [
  "Color Club",
  "retos de color",
  "juego con amigos",
  "collages",
  "retos fotográficos",
  "clubs privados",
  "votación entre amigos",
  "ranking de temporada",
] as const;

export const routeKeywords: Record<PublicRoute, readonly string[]> = {
  "/": ["app de retos fotográficos", "juego de fotos con amigos", "collage de colores"],
  "/como-funciona": ["cómo jugar a Color Club", "crear retos de fotos", "votar collages"],
  "/soporte": ["ayuda Color Club", "preguntas frecuentes Color Club", "soporte retos fotográficos"],
  "/privacidad": ["privacidad Color Club", "protección de datos Color Club"],
  "/terminos": ["términos Color Club", "condiciones de uso Color Club"],
  "/aviso-legal": ["aviso legal Color Club", "titular Color Club"],
  "/cookies": ["cookies Color Club", "cookies técnicas Color Club"],
  "/normas-comunidad": ["normas Color Club", "moderación Color Club", "seguridad comunidad"],
  "/contenido-y-fotos": ["política de fotos Color Club", "derechos fotografías Color Club"],
  "/eliminar-cuenta": ["eliminar cuenta Color Club", "borrar datos Color Club"],
};

export const siteConfig = {
  name: "Color Club",
  description:
    "Retos privados de color para fotografiar, crear collages y jugar con amigos.",
  siteUrl: "https://getcolorclub.com",
  appStoreUrl: process.env.NEXT_PUBLIC_APP_STORE_URL || "",
  playStoreUrl: process.env.NEXT_PUBLIC_PLAY_STORE_URL || "",
  waitlistUrl: process.env.NEXT_PUBLIC_WAITLIST_URL || "",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  bingSiteVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function pageMetadata(
  title: string,
  description: string,
  path: PublicRoute,
  options?: { noindex?: boolean; keywords?: readonly string[] },
): Metadata {
  const canonical = absoluteUrl(path);
  const imageParams = new URLSearchParams({ title, description });
  const image = absoluteUrl(`/api/og?${imageParams.toString()}`);

  return {
    title,
    description,
    keywords: [...seoKeywords, ...routeKeywords[path], ...(options?.keywords ?? [])],
    referrer: "strict-origin-when-cross-origin",
    alternates: {
      canonical,
      languages: { "es-ES": canonical },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "es_ES",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} · ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: options?.noindex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    logo: absoluteUrl("/brand-mark.svg"),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    inLanguage: "es-ES",
    description: siteConfig.description,
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
  };
}

export function webPageJsonLd(
  path: PublicRoute,
  title: string,
  description: string,
  modifiedAt?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    about: { "@id": `${absoluteUrl("/")}#organization` },
    ...(modifiedAt ? { dateModified: modifiedAt } : {}),
  };
}

export function howToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo jugar a Color Club",
    description: "El ciclo completo de un reto de color entre amigos.",
    step: [
      ["Crea un club privado", "Invita a tus amigos hasta formar un grupo de un máximo de 12 personas."],
      ["Lanza un reto de color", "Elegid un color compartido o dejad que la app lo asigne al azar."],
      ["Completa el collage", "Fotografía objetos del color asignado y llena todos los huecos antes del límite."],
      ["Envía y vota", "Con tres o más collages válidos, cada participante elegible puede emitir un voto."],
      ["Consulta el ranking", "Los votos suman puntos en la temporada activa del club."],
    ].map(([name, text], index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name,
      text,
      url: `${absoluteUrl("/como-funciona")}#paso-${index + 1}`,
    })),
  };
}

export function breadcrumbJsonLd(path: PublicRoute) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: routeLabels["/"],
      item: absoluteUrl("/"),
    },
  ];

  if (path !== "/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: routeLabels[path],
      item: absoluteUrl(path),
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export type DownloadOption = {
  href: string;
  label: string;
  store: "app-store" | "play-store" | "waitlist";
};

export function getDownloadOptions(): DownloadOption[] {
  const options: DownloadOption[] = [];

  if (siteConfig.appStoreUrl) {
    options.push({
      href: siteConfig.appStoreUrl,
      label: "Descargar para iPhone",
      store: "app-store",
    });
  }

  if (siteConfig.playStoreUrl) {
    options.push({
      href: siteConfig.playStoreUrl,
      label: "Descargar para Android",
      store: "play-store",
    });
  }

  if (!options.length && siteConfig.waitlistUrl) {
    options.push({
      href: siteConfig.waitlistUrl,
      label: "Avisadme cuando esté lista",
      store: "waitlist",
    });
  }

  return options;
}
