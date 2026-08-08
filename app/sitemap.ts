import type { MetadataRoute } from "next";
import { getAllPageContent, type SitePageContent } from "@/lib/cms";
import { absoluteUrl, type PublicRoute } from "@/lib/site";

const routeSeo: Record<
  PublicRoute,
  { changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }
> = {
  "/": { changeFrequency: "weekly", priority: 1 },
  "/como-funciona": { changeFrequency: "monthly", priority: 0.9 },
  "/soporte": { changeFrequency: "weekly", priority: 0.8 },
  "/privacidad": { changeFrequency: "yearly", priority: 0.3 },
  "/terminos": { changeFrequency: "yearly", priority: 0.3 },
  "/aviso-legal": { changeFrequency: "yearly", priority: 0.3 },
  "/cookies": { changeFrequency: "yearly", priority: 0.3 },
  "/normas-comunidad": { changeFrequency: "yearly", priority: 0.4 },
  "/contenido-y-fotos": { changeFrequency: "yearly", priority: 0.4 },
  "/eliminar-cuenta": { changeFrequency: "yearly", priority: 0.5 },
};

export function buildSitemap(
  pages: Pick<SitePageContent, "route" | "updated_at">[],
  now = new Date(),
): MetadataRoute.Sitemap {
  return pages.map((page) => ({
      url: absoluteUrl(page.route),
      lastModified: page.updated_at ? new Date(page.updated_at) : now,
      ...routeSeo[page.route],
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildSitemap(await getAllPageContent());
}
