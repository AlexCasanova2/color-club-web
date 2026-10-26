"use client";

import { useState } from "react";
import type { EvidenceImage } from "@/lib/moderation-detail";

export function ReportEvidenceImage({ image }: { image: EvidenceImage }) {
  const [failed, setFailed] = useState(false);
  if (!image.url || failed) return <p className="report-image-missing">{image.label}: no disponible o acceso caducado. Recarga el caso para comprobarlo.</p>;
  // Sin optimizador ni caché compartida: la URL de evidencia caduca en 60 segundos.
  return <img src={image.url} alt={image.label} referrerPolicy="no-referrer" onError={() => setFailed(true)} />;
}
