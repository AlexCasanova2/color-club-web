import { notFound } from "next/navigation";
import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { getPageContent } from "@/lib/cms";
import { legalDocuments } from "@/lib/legal";
import { pageMetadata, siteConfig } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata() {
  const content = await getPageContent("/cookies");
  if (!content) notFound();
  return pageMetadata(content.seo_title, content.seo_description, "/cookies", {
    noindex: !siteConfig.legalApproved,
  });
}

export default async function CookiesPage() {
  const content = await getPageContent("/cookies");
  if (!content) notFound();
  return <LegalDocumentPage content={content} document={legalDocuments["/cookies"]} tone="blue" />;
}
