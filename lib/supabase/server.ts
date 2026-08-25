import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

// Service-role client- full read/write access, bypasses RLS. Only ever
// import this from Server Components, Route Handlers, or scripts- never
// from a "use client" file. Returns null (rather than throwing) when env
// vars are unset so callers can fall back to static defaults instead of
// taking the whole site down over a missing Supabase project.
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  if (!cached) {
    cached = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}
