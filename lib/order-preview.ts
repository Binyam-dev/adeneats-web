/** Only unconfigured Vercel previews may omit marketplace data.
 * Production/development retain the existing configuration failure. Never
 * substitute another environment's credentials or manufacture cook listings.
 */
export function isUnconfiguredOrderPreview(env: Record<string, string | undefined>): boolean {
  return env.VERCEL_ENV === "preview" &&
    (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
