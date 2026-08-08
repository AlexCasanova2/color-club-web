import { notFound } from "next/navigation";
import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { getPageContent } from "@/lib/cms";
import { legalDocuments } from "@/lib/legal";
import { pageMetadata } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata() {
  const content = await getPageContent("/contenido-y-fotos");
  if (!content) notFound();
  return pageMetadata(content.seo_title, content.seo_description, "/contenido-y-fotos");
}

export default async function ContentPolicyPage() {
  const content = await getPageContent("/contenido-y-fotos");
  if (!content) notFound();
  return <LegalDocumentPage content={content} document={legalDocuments["/contenido-y-fotos"]} tone="lavender" />;
}
