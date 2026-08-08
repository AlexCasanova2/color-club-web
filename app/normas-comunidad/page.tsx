import { notFound } from "next/navigation";
import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { getPageContent } from "@/lib/cms";
import { legalDocuments } from "@/lib/legal";
import { pageMetadata } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata() {
  const content = await getPageContent("/normas-comunidad");
  if (!content) notFound();
  return pageMetadata(content.seo_title, content.seo_description, "/normas-comunidad");
}

export default async function CommunityRulesPage() {
  const content = await getPageContent("/normas-comunidad");
  if (!content) notFound();
  return <LegalDocumentPage content={content} document={legalDocuments["/normas-comunidad"]} tone="green" />;
}
