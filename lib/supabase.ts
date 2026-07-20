import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Lazy singleton: reading env vars happens on first call, not at module
// evaluation. Import-time evaluation runs during static prerendering (no
// .env.local guaranteed there); this function only ever runs client-side,
// inside a form submit handler, after the page has hydrated.
export function getSupabase(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY — copy .env.example to .env.local and fill them in.",
    );
  }

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}
