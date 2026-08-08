import { cache } from "react";
import { createSupabasePublicClient } from "./supabase/public";
import type { createSupabaseServerClient } from "./supabase/server";
import { isLegalRoute, publicRoutes, routeDescriptions, routeLabels, type PublicRoute } from "./site";

export type SitePageContent = {
  route: PublicRoute;
  seo_title: string;
  seo_description: string;
  hero_kicker: string;
  hero_title: string;
  hero_body: string;
  published: boolean;
  updated_at?: string;
};

export const fallbackPageContent: Record<PublicRoute, SitePageContent> = {
  "/": {
    route: "/",
    seo_title: "Retos de color con tus amigos",
    seo_description: "Crea un club privado, recibe un color, fotografía lo que encuentres y votad vuestros collages.",
    hero_kicker: "Retos de color con tus amigos",
    hero_title: "Sal a buscar tu color.",
    hero_body: "Crea un club, recibe un color, fotografía lo que encuentres y montad collages que nadie verá antes de tiempo.",
    published: true,
  },
  "/como-funciona": {
    route: "/como-funciona",
    seo_title: routeLabels["/como-funciona"],
    seo_description: routeDescriptions["/como-funciona"],
    hero_kicker: "Cómo funciona",
    hero_title: "Un color cambia la forma de mirar.",
    hero_body: "Color Club empieza con un grupo privado y termina con una clasificación. En medio, cada persona sale a encontrar su propia respuesta al mismo color.",
    published: true,
  },
  "/soporte": {
    route: "/soporte",
    seo_title: routeLabels["/soporte"],
    seo_description: routeDescriptions["/soporte"],
    hero_kicker: "Soporte",
    hero_title: "Una respuesta antes del siguiente reto.",
    hero_body: "Clubs, tiempos, envíos, votos y cuenta. Hemos reunido las dudas que pueden bloquear una partida para resolverlas sin rodeos.",
    published: true,
  },
  "/privacidad": {
    route: "/privacidad",
    seo_title: routeLabels["/privacidad"],
    seo_description: routeDescriptions["/privacidad"],
    hero_kicker: "Privacidad",
    hero_title: "Política de privacidad.",
    hero_body: "Cómo tratamos tus datos, quién puede ver el contenido y qué control tienes sobre tu cuenta.",
    published: true,
  },
  "/terminos": {
    route: "/terminos",
    seo_title: routeLabels["/terminos"],
    seo_description: routeDescriptions["/terminos"],
    hero_kicker: "Términos",
    hero_title: "Reglas de uso.",
    hero_body: "Las condiciones para participar en clubs privados, compartir contenido y utilizar Color Club con respeto.",
    published: true,
  },
  "/aviso-legal": {
    route: "/aviso-legal",
    seo_title: routeLabels["/aviso-legal"],
    seo_description: routeDescriptions["/aviso-legal"],
    hero_kicker: "Información legal",
    hero_title: "Quién está detrás de Color Club.",
    hero_body: "Identificación del titular, condiciones de acceso y reglas aplicables a este sitio web.",
    published: true,
  },
  "/cookies": {
    route: "/cookies",
    seo_title: routeLabels["/cookies"],
    seo_description: routeDescriptions["/cookies"],
    hero_kicker: "Cookies",
    hero_title: "Solo lo necesario para funcionar.",
    hero_body: "La web pública no utiliza analítica no esencial por defecto. Aquí explicamos el almacenamiento técnico actual.",
    published: true,
  },
  "/normas-comunidad": {
    route: "/normas-comunidad",
    seo_title: routeLabels["/normas-comunidad"],
    seo_description: routeDescriptions["/normas-comunidad"],
    hero_kicker: "Comunidad",
    hero_title: "Jugar juntos también tiene reglas.",
    hero_body: "Respeto, privacidad y seguridad para que los retos sigan siendo divertidos para todo el grupo.",
    published: true,
  },
  "/contenido-y-fotos": {
    route: "/contenido-y-fotos",
    seo_title: routeLabels["/contenido-y-fotos"],
    seo_description: routeDescriptions["/contenido-y-fotos"],
    hero_kicker: "Contenido y fotos",
    hero_title: "Tus fotos siguen siendo tuyas.",
    hero_body: "Qué permisos necesitas, cómo se muestran los collages y qué licencia requiere Color Club para operar.",
    published: true,
  },
  "/eliminar-cuenta": {
    route: "/eliminar-cuenta",
    seo_title: routeLabels["/eliminar-cuenta"],
    seo_description: routeDescriptions["/eliminar-cuenta"],
    hero_kicker: "Control de cuenta",
    hero_title: "Cómo eliminar tu cuenta.",
    hero_body: "Pasos, consecuencias y canal alternativo si ya no puedes acceder a la app.",
    published: true,
  },
};

export function isPublicRoute(value: string): value is PublicRoute {
  return publicRoutes.includes(value as PublicRoute);
}

export const getPageContent = cache(async (route: PublicRoute): Promise<SitePageContent | null> => {
  if (isLegalRoute(route)) return fallbackPageContent[route];

  const supabase = createSupabasePublicClient();
  if (!supabase) return fallbackPageContent[route];

  const { data, error } = await supabase
    .from("site_page_content")
    .select("route,seo_title,seo_description,hero_kicker,hero_title,hero_body,published,updated_at")
    .eq("route", route)
    .eq("published", true)
    .maybeSingle<SitePageContent>();

  if (error) return fallbackPageContent[route];
  return data ?? fallbackPageContent[route];
});

export async function getAllPageContent(): Promise<SitePageContent[]> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return Object.values(fallbackPageContent);

  const { data, error } = await supabase
    .from("site_page_content")
    .select("route,seo_title,seo_description,hero_kicker,hero_title,hero_body,published,updated_at")
    .order("route");

  if (error) return Object.values(fallbackPageContent);
  const pages = (data as SitePageContent[] | null) ?? [];
  const byRoute = new Map(pages.map((page) => [page.route, page]));
  for (const route of publicRoutes) {
    if (isLegalRoute(route)) byRoute.set(route, fallbackPageContent[route]);
  }
  return [...byRoute.values()];
}

export async function getAllPageContentForAdmin(
  supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>,
): Promise<SitePageContent[]> {
  const { data } = await supabase
    .from("site_page_content")
    .select("route,seo_title,seo_description,hero_kicker,hero_title,hero_body,published,updated_at")
    .order("route");

  return (data as SitePageContent[] | null) ?? Object.values(fallbackPageContent);
}
