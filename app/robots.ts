import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/internal-admin/"],
    },
    sitemap: new URL("/sitemap.xml", siteConfig.siteUrl).toString(),
    host: siteConfig.siteUrl,
  };
}
