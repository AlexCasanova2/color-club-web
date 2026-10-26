import { describe, expect, it, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { listReports, parseReportFilters, reportListHref } from "@/lib/moderation";

describe("cola de denuncias", () => {
  it("parte de los casos abiertos y normaliza parámetros no válidos", () => {
    expect(parseReportFilters({})).toEqual({ status: "open", subject: "all", page: 1 });
    expect(parseReportFilters({ status: "__proto__", subject: ["collage"], page: "-1" })).toEqual({ status: "open", subject: "all", page: 1 });
    expect(parseReportFilters({ status: "all", subject: "profile", page: "2" })).toEqual({ status: "all", subject: "profile", page: 2 });
  });
  it("mantiene los filtros al paginar", () => {
    expect(reportListHref({ status: "reviewing", subject: "collage", page: 1 }, 2))
      .toBe("/internal-admin/reports?status=reviewing&subject=collage&page=2");
  });
  function client(result: object) {
    const query = { select: vi.fn(), eq: vi.fn(), order: vi.fn(), range: vi.fn().mockResolvedValue(result) };
    query.select.mockReturnValue(query);
    query.eq.mockReturnValue(query);
    query.order.mockReturnValue(query);
    return { query, supabase: { from: vi.fn().mockReturnValue(query) } as unknown as SupabaseClient };
  }
  it("consulta solo metadatos de la selección y orden estable", async () => {
    const { supabase, query } = client({ data: [{ id: "report" }], count: 22, error: null });
    const result = await listReports(supabase, { status: "reviewing", subject: "collage", page: 2 });
    expect(query.select).toHaveBeenCalledWith("id,subject_type,reason,status,created_at,revision", { count: "exact" });
    expect(query.eq.mock.calls).toEqual([["status", "reviewing"], ["subject_type", "collage"]]);
    expect(query.order).toHaveBeenCalledWith("id", { ascending: false });
    expect(query.range).toHaveBeenCalledWith(20, 39);
    expect(result.total).toBe(22);
  });
  it("no convierte errores de permisos o red en una cola vacía", async () => {
    const { supabase, query } = client({ error: { code: "42501" }, data: null });
    await expect(listReports(supabase, { status: "all", subject: "all", page: 1 })).rejects.toThrow("No se han podido cargar");
    expect(query.eq).not.toHaveBeenCalled();
  });
});
