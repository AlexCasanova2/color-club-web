import type { MetadataRoute } from "next";
import { legalRoutes, siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const disallow = siteConfig.legalApproved
    ? ["/internal-admin/"]
    : ["/internal-admin/", ...legalRoutes];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: new URL("/sitemap.xml", siteConfig.siteUrl).toString(),
    host: siteConfig.siteUrl,
  };
}
