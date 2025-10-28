import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY ?? "";

if (!supabaseUrl) {
  throw new Error("Supabase URL is missing. Set NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL.");
}

if (!serviceRoleKey) {
  throw new Error(
    "Supabase service role key is missing. Set SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_KEY."
  );
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
