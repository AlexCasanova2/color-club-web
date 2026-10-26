import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

export function createSupabaseBrowserClient(detectSessionInUrl = true) {
  const { url, anonKey } = getSupabaseConfig();
  return createBrowserClient(url, anonKey, detectSessionInUrl ? {} : {
    isSingleton: false,
    auth: { detectSessionInUrl: false },
  });
}
