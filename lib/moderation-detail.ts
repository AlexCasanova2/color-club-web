import type { SupabaseClient } from "@supabase/supabase-js";
import type { ReportSummary } from "./moderation";
import { getSupabaseConfig } from "./supabase/config";

export type ReportDetail = ReportSummary & {
  reporter_id: string | null;
  reported_user_id: string | null;
  subject_id: string | null;
  details: string | null;
  resolution_note: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  content_removed_at: string | null;
  content_snapshot: Record<string, unknown>;
};
export const reportIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isReportOpen = (report: Pick<ReportSummary, "status">) => report.status === "open" || report.status === "reviewing";

export async function getReport(supabase: SupabaseClient, id: string): Promise<ReportDetail | null> {
  if (!reportIdPattern.test(id)) return null;
  const { data, error } = await supabase.from("user_reports").select(
    "id,subject_type,reason,status,created_at,revision,reporter_id,reported_user_id,subject_id,details,resolution_note,reviewed_by,reviewed_at,content_removed_at,content_snapshot",
  ).eq("id", id).maybeSingle();
  if (error) throw new Error("No se ha podido cargar la denuncia.");
  return data as ReportDetail | null;
}

export type EvidenceImage = { url: string | null; label: string };

export async function getReportImages(supabase: SupabaseClient, report: ReportDetail): Promise<EvidenceImage[]> {
  // Los casos cerrados no solicitan nuevas URLs, aunque la sesión sea owner.
  if (!isReportOpen(report)) return [];
  const snapshot = report.content_snapshot ?? {};
  if (report.subject_type === "profile" && typeof snapshot.avatar_url === "string") {
    const label = "Avatar denunciado";
    try {
      const { url } = getSupabaseConfig();
      const prefix = `${url.replace(/\/$/, "")}/storage/v1/object/public/avatars/${report.reported_user_id}/`;
      const avatar = new URL(snapshot.avatar_url);
      if (!avatar.href.startsWith(prefix) || !["https:", "http:"].includes(avatar.protocol)) return [{ url: null, label }];
      avatar.search = "";
      return [{ url: avatar.href, label }];
    } catch {
      return [{ url: null, label }];
    }
  }
  if (report.subject_type !== "collage" || !Array.isArray(snapshot.photos)) return [];
  return Promise.all(snapshot.photos.slice(0, 12).map(async (path, index) => {
    const label = `Fotografía denunciada ${index + 1}`;
    if (typeof path !== "string" || !report.subject_id || !path.startsWith(`${report.subject_id}/`)
      || path.includes("..") || path.includes(":") || path.length > 1024) return { url: null, label };
    try {
      const { data, error } = await supabase.storage.from("collages").createSignedUrl(path, 60);
      return { url: error ? null : data?.signedUrl ?? null, label };
    } catch {
      return { url: null, label };
    }
  }));
}

export function snapshotText(snapshot: Record<string, unknown>, key: string) {
  const value = snapshot?.[key];
  return typeof value === "string" && value.trim() ? value : "No disponible";
}
