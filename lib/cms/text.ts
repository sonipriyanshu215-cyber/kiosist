import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";

// Editable freeform strings (hero headlines/subheadings, nav CTA label,
// footer copyright, etc.), keyed by a dotted slug like "home.hero.title".
// `fallback` is the copy already hardcoded in the component today, so a
// missing/unseeded key never breaks the page.
export async function getText(key: string, fallback: string): Promise<string> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return fallback;

  const { data, error } = await supabase.from("content_text").select("value").eq("key", key).maybeSingle();
  if (error || !data) return fallback;
  return data.value;
}

// Batch variant for a page that needs several keys- one round trip instead
// of N. Returns a lookup map; missing keys are simply absent (caller applies
// its own per-key fallback via `map[key] ?? fallback`).
export async function getTexts(keys: string[]): Promise<Record<string, string>> {
  const supabase = getSupabaseAdmin();
  if (!supabase || keys.length === 0) return {};

  const { data, error } = await supabase.from("content_text").select("key, value").in("key", keys);
  if (error || !data) return {};
  return Object.fromEntries(data.map((row) => [row.key, row.value]));
}
