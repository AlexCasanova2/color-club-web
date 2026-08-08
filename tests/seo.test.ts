import { describe, expect, it } from "vitest";
import { buildLlmsText } from "@/app/llms.txt/route";
import robots from "@/app/robots";
import { buildSitemap } from "@/app/sitemap";
import { fallbackPageContent } from "@/lib/cms";
import { pageMetadata, publicRoutes } from "@/lib/site";

describe("SEO routes", () => {
  it("includes every indexable public route in the sitemap", () => {
    const entries = buildSitemap(Object.values(fallbackPageContent));
    const expectedRoutes = publicRoutes;
    expect(entries).toHaveLength(expectedRoutes.length);
    for (const route of expectedRoutes) {
      expect(entries.some((entry) => new URL(entry.url).pathname === route)).toBe(true);
    }
  });

  it("excludes internal administration from crawlers", () => {
    const config = robots();
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    expect(
      rules.some((rule) => {
        const disallow = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow];
        return disallow.includes("/internal-admin/");
      }),
    ).toBe(true);
  });

  it("adds social image and large-preview robots to page metadata", () => {
    const metadata = pageMetadata("Test", "Description", "/soporte");
    const twitter = metadata.twitter as { card?: string } | undefined;
    expect(metadata.alternates?.canonical).toMatch(/\/soporte$/);
    expect(metadata.openGraph?.images).toBeDefined();
    expect(JSON.stringify(metadata.openGraph?.images)).toContain("/api/og");
    expect(twitter?.card).toBe("summary_large_image");
    expect(metadata.robots).toMatchObject({
      index: true,
      follow: true,
      googleBot: { "max-image-preview": "large" },
    });
  });

  it("publishes an llms.txt summary for assistants", () => {
    const text = buildLlmsText(Object.values(fallbackPageContent));
    expect(text).toContain("# Color Club");
    expect(text).toContain("/como-funciona");
    expect(text).toContain("It does not expose player login");
  });
});
