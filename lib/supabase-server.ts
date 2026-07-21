import { createClient } from "@supabase/supabase-js";

/**
 * Server-side read client for Server Components — unlike getSupabase() in
 * supabase.ts (a client-only lazy singleton, only safe post-hydration),
 * this runs at request/build time on the server. Still the anon key only;
 * RLS does the filtering, so no service-role client is needed here.
 */
export function getServerSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY — copy .env.example to .env.local and fill them in.",
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
