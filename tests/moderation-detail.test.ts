import { describe, expect, it, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getReport, getReportImages, snapshotText, type ReportDetail } from "@/lib/moderation-detail";

const report: ReportDetail = {
  id: "00000000-0000-4000-8000-000000000001", reason: "privacy", created_at: "2026-10-26T10:00:00Z", revision: 0,
  reporter_id: null, reported_user_id: null, details: null, resolution_note: null,
  reviewed_by: null, reviewed_at: null, content_removed_at: null,
  status: "open", subject_type: "collage", subject_id: "participant", content_snapshot: { photos: ["participant/1.jpg"] },
};
describe("evidencia de moderación", () => {
  it("rechaza identificadores no UUID antes de consultar", async () => {
    const supabase = { from: vi.fn() };
    expect(await getReport(supabase as unknown as SupabaseClient, "bad")).toBeNull();
    expect(supabase.from).not.toHaveBeenCalled();
  });
  function storage() {
    const sign = vi.fn().mockResolvedValue({ data: { signedUrl: "http://localhost/signed" }, error: null });
    const from = vi.fn().mockReturnValue({ createSignedUrl: sign });
    return { sign, from, supabase: { storage: { from } } as unknown as SupabaseClient };
  }
  it("firma únicamente fotos del participante con vencimiento corto", async () => {
    const { supabase, sign, from } = storage();
    expect(await getReportImages(supabase, report)).toEqual([{ url: "http://localhost/signed", label: "Fotografía denunciada 1" }]);
    expect(from).toHaveBeenCalledWith("collages");
    expect(sign).toHaveBeenCalledWith("participant/1.jpg", 60);
  });
  it.each(["dismissed", "actioned"])("no firma evidencia de un caso %s", async (status) => {
    const { supabase, sign } = storage();
    expect(await getReportImages(supabase, { ...report, status } as ReportDetail)).toEqual([]);
    expect(sign).not.toHaveBeenCalled();
  });
  it("bloquea rutas ajenas o externas y trata fallos como evidencia no disponible", async () => {
    const { supabase, sign } = storage();
    sign.mockResolvedValue({ data: null, error: { message: "not found" } });
    const result = await getReportImages(supabase, { ...report, content_snapshot: { photos: ["other/1.jpg", "https://evil.test/x", "participant/../1", "participant/1.jpg"] } });
    expect(result.every((image) => image.url === null)).toBe(true);
    expect(sign).toHaveBeenCalledTimes(1);
  });
  it("no interpreta objetos de snapshot como texto", () => {
    expect(snapshotText({ body: { html: "untrusted" } }, "body")).toBe("No disponible");
    expect(snapshotText({ body: "<script>texto</script>" }, "body")).toBe("<script>texto</script>");
  });
  it("no carga un avatar desde un host ajeno", async () => {
    const { supabase } = storage();
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "http://localhost:55321");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "public");
    const result = await getReportImages(supabase, { ...report, subject_type: "profile", reported_user_id: "user", content_snapshot: { avatar_url: "https://evil.test/avatar.jpg" } });
    expect(result).toEqual([{ label: "Avatar denunciado", url: null }]);
    vi.unstubAllEnvs();
  });
});
