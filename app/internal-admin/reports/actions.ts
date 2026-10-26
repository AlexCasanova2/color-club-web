"use server";

import { revalidatePath } from "next/cache";
import { requireModerator } from "@/lib/admin-access";
import { reportIdPattern } from "@/lib/moderation-detail";

export type ReportActionState = { error?: string; success?: string };

export async function resolveReport(_previous: ReportActionState, form: FormData): Promise<ReportActionState> {
  const { supabase } = await requireModerator();
  const id = form.get("report_id");
  const revision = form.get("revision");
  const operation = form.get("operation");
  const rawNote = form.get("note");
  const note = typeof rawNote === "string" ? rawNote.trim() : "";
  if (typeof id !== "string" || !reportIdPattern.test(id) || typeof revision !== "string"
    || !/^\d{1,9}$/.test(revision) || note.length < 6 || note.length > 500
    || !["reviewing", "dismissed", "remove"].includes(String(operation))) {
    return { error: "Comprueba la acción y escribe un motivo de entre 6 y 500 caracteres." };
  }
  if (operation === "remove" && form.get("confirm_removal") !== "yes") {
    return { error: "Confirma expresamente la retirada irreversible del contenido denunciado." };
  }
  const args = { target_report_id: id, expected_revision: Number(revision), decision_note: note };
  try {
    const { error } = operation === "remove"
      ? await supabase.rpc("admin_remove_reported_content", args)
      : await supabase.rpc("admin_review_report", { ...args, next_status: operation });
    if (error) {
      if (error.code === "40001") return { error: "El caso o su contenido ha cambiado. Recarga y revisa la evidencia antes de actuar de nuevo." };
      if (error.code === "42501") return { error: "Tu cuenta ya no tiene permiso para moderar este caso." };
      if (error.code === "22023" || error.code === "P0002") return { error: "El caso ya no admite esta acción. Recarga para comprobar su estado." };
      return { error: "No se ha podido confirmar la operación. Recarga el caso antes de repetirla." };
    }
  } catch {
    return { error: "Se ha perdido la conexión. El resultado no está confirmado; recarga el caso antes de repetir la acción." };
  }
  revalidatePath("/internal-admin/reports");
  revalidatePath(`/internal-admin/reports/${id}`);
  return { success: operation === "remove"
    ? "Actuación registrada. Comprueba el resultado del caso; la limpieza de archivos se procesa por separado."
    : "Decisión registrada y auditada." };
}
