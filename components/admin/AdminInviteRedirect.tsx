"use client";

import { useEffect } from "react";

export function AdminInviteRedirect() {
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    // Supabase vuelve al site_url ya autorizado. El fragmento no viaja al servidor.
    if (hash.get("type") === "invite") {
      window.location.replace(`/internal-admin/accept-invite${window.location.hash}`);
    }
  }, []);
  return null;
}
