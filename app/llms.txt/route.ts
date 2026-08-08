import { getAllPageContent } from "@/lib/cms";
import { routeDescriptions, siteConfig } from "@/lib/site";

export const revalidate = 300;

export function buildLlmsText(pages: Awaited<ReturnType<typeof getAllPageContent>>) {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    siteConfig.description,
    "",
    "## Public pages",
    ...pages.map((page) => {
      const url = new URL(page.route, siteConfig.siteUrl).toString();
      return `- ${url}: ${routeDescriptions[page.route]}`;
    }),
    "",
    "## Boundaries",
    "- The public website is promotional and informational.",
    "- It does not expose player login, clubs, challenges, voting, uploads, chat or private activity.",
    "- Download links are shown only when configured with real URLs.",
  ];

  return `${lines.join("\n")}\n`;
}

export async function GET() {
  return new Response(buildLlmsText(await getAllPageContent()), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
