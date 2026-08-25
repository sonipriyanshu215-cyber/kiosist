import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export type MediaItem = {
  id: string;
  slotKey: string | null;
  collection: string | null;
  url: string;
  altText: string | null;
  sortOrder: number;
};

// A single swap-in-place image (logo, hero/mascot, a team headshot, ...).
// Returns the DB-registered URL if an admin has replaced it, otherwise the
// static /img/... path already shipped in the component.
export async function getImageUrl(slotKey: string, fallbackSrc: string): Promise<string> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return fallbackSrc;

  const { data, error } = await supabase.from("media").select("url").eq("slot_key", slotKey).maybeSingle();
  if (error || !data) return fallbackSrc;
  return data.url;
}

// A free add/remove/reorder gallery (culture photos, partner logos). Falls
// back to a caller-supplied static list shaped the same way, so an empty/
// unseeded collection still renders something.
export async function getMediaCollection(collection: string, fallback: MediaItem[] = []): Promise<MediaItem[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("media")
    .select("id, slot_key, collection, url, alt_text, sort_order")
    .eq("collection", collection)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallback;
  return data.map((row) => ({
    id: row.id,
    slotKey: row.slot_key,
    collection: row.collection,
    url: row.url,
    altText: row.alt_text,
    sortOrder: row.sort_order,
  }));
}

// Culture page's "Kiosist Gallery"- same data as getMediaCollection, shaped
// to what MasonryGallery already expects ({ src, alt }[]).
export async function getCultureGallery(
  fallback: { src: string; alt: string }[]
): Promise<{ src: string; alt: string }[]> {
  const items = await getMediaCollection("culture", []);
  if (items.length === 0) return fallback;
  return items.map((item) => ({ src: item.url, alt: item.altText ?? "" }));
}
