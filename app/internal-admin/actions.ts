"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signOutAdmin() {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) throw new Error("No se ha podido cerrar la sesión. Vuelve a intentarlo.");
  }
  redirect("/internal-admin/login");
}
