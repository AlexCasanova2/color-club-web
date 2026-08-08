import { notFound } from "next/navigation";
import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { getPageContent } from "@/lib/cms";
import { legalDocuments } from "@/lib/legal";
import { pageMetadata } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata() {
  const content = await getPageContent("/terminos");
  if (!content) notFound();
  return pageMetadata(content.seo_title, content.seo_description, "/terminos");
}

export default async function TermsPage() {
  const content = await getPageContent("/terminos");
  if (!content) notFound();
  return <LegalDocumentPage content={content} document={legalDocuments["/terminos"]} tone="orange" />;
}
