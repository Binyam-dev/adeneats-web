import "server-only";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

type AdminAuth =
  | { ok: true; user: User; client: SupabaseClient }
  | { ok: false; status: number; message: string };

export async function authorizeAdmin(request: Request): Promise<AdminAuth> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const allowed = new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );

  if (!url || !anonKey || !serviceKey || allowed.size === 0) {
    return { ok: false, status: 503, message: "Admin access is not configured." };
  }
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return { ok: false, status: 401, message: "Sign in is required." };

  const verifier = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await verifier.auth.getUser(token);
  if (error || !data.user?.email) {
    return { ok: false, status: 401, message: "Your session is invalid or expired." };
  }
  if (!allowed.has(data.user.email.toLowerCase())) {
    return { ok: false, status: 403, message: "This account is not an Aden administrator." };
  }

  return {
    ok: true,
    user: data.user,
    client: createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
  };
}
