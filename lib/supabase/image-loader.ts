import type { ImageLoaderProps } from "next/image";

// Supabase's plain public-object endpoint (/storage/v1/object/public/...)
// is served with `Cache-Control: no-cache` on this project regardless of
// the object's stored cache-control metadata- so every <img> request is a
// cache MISS at Supabase's CDN and counts as egress. That is what ran the
// "cached egress" meter to 9.59 GB (see supabase-egress-remediation-plan.md).
//
// The image-transformation endpoint (/storage/v1/render/image/public/...)
// behaves the opposite way: it is served with `Cache-Control: max-age=
// 31536000` and repeat requests return `CF-Cache-Status: HIT` (verified),
// AND it resizes at the edge so even a genuine miss transfers a
// width-appropriate image instead of the full stored file.
//
// This loader rewrites the former to the latter. SafeImage applies it only
// to Supabase Storage URLs; bundled /img/* assets keep Next's built-in
// optimiser.

const OBJECT_SEGMENT = "/storage/v1/object/public/";
const RENDER_SEGMENT = "/storage/v1/render/image/public/";

// Supabase clamps larger requests to this anyway (a width=3840 request
// comes back as `x-transformations: width:3000`); clamp here so the URL-
// and therefore the CDN cache key- is stable rather than relying on that.
const MAX_RENDER_WIDTH = 3000;

export function isSupabaseStorageUrl(src: string): boolean {
  return (
    typeof src === "string" &&
    src.includes(OBJECT_SEGMENT) &&
    /^https:\/\/[a-z0-9-]+\.supabase\.co\//i.test(src)
  );
}

export function supabaseImageLoader({ src, width, quality }: ImageLoaderProps): string {
  // Defensive: SafeImage only wires this loader up for Supabase URLs, but a
  // non-Supabase src should still round-trip untouched rather than break.
  if (!isSupabaseStorageUrl(src)) return src;

  const [rawBase, rawQuery] = src.replace(OBJECT_SEGMENT, RENDER_SEGMENT).split("?");
  const params = new URLSearchParams(rawQuery);
  params.set("width", String(Math.min(width, MAX_RENDER_WIDTH)));
  params.set("quality", String(quality ?? 75));
  // `resize=contain` = scale proportionally to fit `width`, preserving the
  // source aspect ratio (and never upscaling past the original). Without
  // it Supabase's default mode returns `width` x ORIGINAL-height- i.e. a
  // horizontally squashed image- which then gets cropped again by CSS
  // object-cover, cutting heads/subjects off. Callers do their own visual
  // cropping via next/image `fill` + object-cover / an explicit width+
  // height, so the transform must not crop or distort.
  params.set("resize", "contain");
  return `${rawBase}?${params.toString()}`;
}

// For plain <img> tags that can't take a next/image loader (the admin media
// grid). Returns a CDN-cached, resized transform URL for Supabase Storage
// images; anything else (a bundled /img/* fallback, an external URL) passes
// through untouched. The /object/public/ endpoint these would otherwise hit
// is served `no-cache` and full-size on this project.
export function supabaseThumb(src: string, width = 400): string {
  if (typeof src !== "string" || !isSupabaseStorageUrl(src)) return src;
  return supabaseImageLoader({ src, width, quality: 75 });
}
