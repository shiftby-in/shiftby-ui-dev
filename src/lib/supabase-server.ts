import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Lazily create a Supabase admin client using a service role key.
 * Returns null if required env vars are not set to avoid crashing at import time.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY ?? "";

  if (!supabaseUrl || !serviceRoleKey) {
    // Do not throw at import-time in Next.js; let callers handle null gracefully.
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Back-compat named export used across API routes and utilities.
// Provides a real client when env is configured, else a throwing proxy with a clear error.
const _admin = getSupabaseAdmin();
export const supabaseAdmin = (_admin ?? (new Proxy({}, {
  get() {
    throw new Error(
      'Supabase admin client not initialized. Set NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY).'
    );
  },
}) as unknown)) as SupabaseClient;
