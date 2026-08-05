import { describe, expect, it } from "vitest";
import { faqItems, gameSteps } from "@/lib/content";
import { fallbackPageContent } from "@/lib/cms";
import { legalDocuments, legalPlaceholders } from "@/lib/legal";
import { legalRoutes } from "@/lib/site";

describe("verified public content", () => {
  it("qualifies when voting occurs", () => {
    expect(gameSteps[3].text).toContain("tres o más collages válidos");
    expect(faqItems.find((item) => item.question.includes("votación"))?.answer).toContain(
      "Con uno o dos collages válidos",
    );
  });

  it("explains that late club members join the next challenge", () => {
    expect(faqItems.find((item) => item.question.includes("no participo"))?.answer).toContain(
      "siguiente",
    );
  });

  it("provides every required legal draft and CMS fallback", () => {
    for (const route of legalRoutes) {
      expect(fallbackPageContent[route]).toBeDefined();
      expect(legalDocuments[route as keyof typeof legalDocuments]).toBeDefined();
    }
  });

  it("keeps legal identity placeholders explicit until approval", () => {
    expect(legalPlaceholders.owner).toContain("[");
    expect(legalPlaceholders.taxId).toContain("[");
    expect(legalDocuments["/terminos"].sections.some((section) =>
      section.paragraphs?.some((paragraph) => paragraph.includes("16 años")),
    )).toBe(true);
  });
});
