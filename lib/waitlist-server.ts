import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { WaitlistInsert } from "./waitlist-service";


export function getWaitlistInsert(): WaitlistInsert | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return async (payload) =>
    supabase.from("launch_waitlist").insert({
      email: payload.email,
      normalized_email: payload.email,
      city: payload.city,
      role: payload.role,
      name: payload.name,
      cuisine_specialty: payload.cuisineSpecialty,
    });
}
