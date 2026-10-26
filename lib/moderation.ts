import type { SupabaseClient } from "@supabase/supabase-js";

export const reportStatuses = {
  open: "Abierta", reviewing: "En revisión", actioned: "Con actuación", dismissed: "Descartada",
} as const;
export const reportSubjects = { collage: "Collage", club_message: "Mensaje", profile: "Perfil" } as const;
export const reportReasons: Record<string, string> = {
  harassment: "Acoso", hate: "Odio", sexual_content: "Contenido sexual", violence: "Violencia",
  privacy: "Privacidad", spam: "Spam", other: "Otro motivo",
};
export type ReportStatus = keyof typeof reportStatuses;
export type ReportSubject = keyof typeof reportSubjects;
export type ReportSummary = {
  id: string;
  subject_type: ReportSubject;
  reason: string;
  status: ReportStatus;
  created_at: string;
  revision: number;
};
export type ReportFilters = { status: ReportStatus | "all"; subject: ReportSubject | "all"; page: number };
export const reportPageSize = 20;

export function parseReportFilters(params: Record<string, string | string[] | undefined>): ReportFilters {
  const status = params.status;
  const subject = params.subject;
  const page = typeof params.page === "string" && /^[1-9]\d{0,4}$/.test(params.page) ? Number(params.page) : 1;
  return {
    status: typeof status === "string" && Object.hasOwn(reportStatuses, status) ? status as ReportStatus : status === "all" ? "all" : "open",
    subject: typeof subject === "string" && Object.hasOwn(reportSubjects, subject) ? subject as ReportSubject : "all",
    page,
  };
}

export function reportListHref(filters: ReportFilters, page: number) {
  return `/internal-admin/reports?${new URLSearchParams({ status: filters.status, subject: filters.subject, page: String(page) })}`;
}

export async function listReports(supabase: SupabaseClient, filters: ReportFilters) {
  let query = supabase.from("user_reports")
    .select("id,subject_type,reason,status,created_at,revision", { count: "exact" });
  if (filters.status !== "all") query = query.eq("status", filters.status);
  if (filters.subject !== "all") query = query.eq("subject_type", filters.subject);
  const offset = (filters.page - 1) * reportPageSize;
  const { data, error, count } = await query.order("created_at", { ascending: false })
    .order("id", { ascending: false }).range(offset, offset + reportPageSize - 1);
  if (error) throw new Error("No se han podido cargar las denuncias. Vuelve a intentarlo.");
  return { reports: (data ?? []) as ReportSummary[], total: count ?? 0 };
}

export function formatReportDate(value: string) {
  return new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Madrid" }).format(new Date(value));
}
