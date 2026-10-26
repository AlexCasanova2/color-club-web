"use client";

import { useActionState, useState } from "react";
import { resolveReport } from "@/app/internal-admin/reports/actions";
import type { ReportSubject } from "@/lib/moderation";

const removalEffects: Record<ReportSubject, string> = {
  collage: "Se retirarán las fotos y los votos asociados y se descalificará al participante. Los archivos se encolarán para su borrado físico.",
  club_message: "Se eliminará el mensaje denunciado del chat.",
  profile: "Se sustituirán el nombre y el usuario públicos y se limpiarán la biografía, el estado y el avatar. No se eliminará ni suspenderá la cuenta.",
};

export function ReportResolutionForm({ id, revision, subject }: { id: string; revision: number; subject: ReportSubject }) {
  const [operation, setOperation] = useState("reviewing");
  const [state, action, pending] = useActionState(resolveReport, {});
  return (
    <section className="admin-card report-resolution">
      <h2>Resolver el caso</h2>
      <p>Actúa sobre la evidencia revisada. La decisión y su motivo quedarán auditados.</p>
      <form action={action}>
        <input type="hidden" name="report_id" value={id} />
        <input type="hidden" name="revision" value={revision} />
        <fieldset disabled={pending}>
          <label>Acción<select aria-label="Acción" name="operation" value={operation} onChange={(event) => setOperation(event.target.value)}>
            <option value="reviewing">Marcar en revisión</option>
            <option value="dismissed">Descartar la denuncia</option>
            <option value="remove">Retirar el contenido denunciado</option>
          </select></label>
          <label>Motivo de la decisión<textarea name="note" required minLength={6} maxLength={500} rows={4} aria-describedby="decision-note-help" /></label>
          <p id="decision-note-help">Entre 6 y 500 caracteres. No incluyas contraseñas ni información innecesaria.</p>
          {operation === "remove" && <div className="report-removal-warning">
            <h3>Retirada irreversible</h3><p>{removalEffects[subject]}</p>
            <p>No se puede restaurar desde este panel. Si el contenido cambió después de la denuncia, se rechazará la retirada.</p>
            <label className="report-confirm"><input type="checkbox" name="confirm_removal" value="yes" required />He revisado la evidencia y confirmo esta retirada irreversible.</label>
          </div>}
          <button className={operation === "remove" ? "report-submit report-submit--danger" : "report-submit"} type="submit">
            {pending ? "Registrando decisión…" : operation === "remove" ? "Confirmar retirada" : "Guardar decisión"}
          </button>
        </fieldset>
        {state.error && <p role="alert">{state.error}</p>}
        {state.success && <p role="status">{state.success}</p>}
      </form>
    </section>
  );
}
