import { notFound, redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase/server";

export async function requireModerator() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/internal-admin/login");

  // getUser valida la sesión contra Auth; no se confía en una cookie sin verificar.
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/internal-admin/login");
  const { data: role, error: roleError } = await supabase.rpc("current_platform_admin_role");
  if (roleError || (role !== "moderator" && role !== "owner")) notFound();
  return { supabase, user: data.user, role: role as "moderator" | "owner" };
}
