// Web-safe raster formats every browser can render in an <img>. Admin
// uploads are limited to these on both ends: HEIC/HEIF (iPhone's default),
// TIFF and BMP only display in some browsers, and SVG is a script-injection
// vector when served from the public Storage bucket- all would upload fine
// but break on the live site. Not server-only: the client file inputs and
// the /api/admin/media route both import from here.
export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
] as const;

// Value for a file input's `accept` attribute- filters the OS picker to
// the supported types (best-effort; the server still enforces).
export const IMAGE_FILE_ACCEPT = ACCEPTED_IMAGE_MIME_TYPES.join(",");

// Max upload size. Kept under Vercel's ~4.5MB serverless request-body
// limit (with headroom for multipart overhead)- a bigger file never
// reaches the route, the platform rejects it with a non-JSON 413 and the
// admin just sees "Upload failed". Checked on the client too so the admin
// gets a clear message instantly instead of a failed round trip.
export const MAX_IMAGE_UPLOAD_BYTES = 4 * 1024 * 1024;

export const OVERSIZE_IMAGE_MESSAGE =
  "Image is too large (max 4 MB). Compress it or export at a smaller size, then try again.";

// Cache-Control max-age (seconds, as a string- what supabase-js's upload
// `cacheControl` option expects) for every object written to the public
// `media` bucket. Storage paths are unique per upload
// (slots/<key>/<uuid>, uploads/<uuid>, culture-slider/<...>-<ts>) so an
// image is never overwritten in place- a replacement always lands at a
// brand-new URL. That makes the stored bytes immutable, so a long TTL is
// safe and is the highest-leverage fix for Supabase "cached egress"
// overage: Supabase's Smart CDN, browsers, and (on Vercel) the next/image
// optimiser can each hold a copy for a year instead of re-pulling the
// multi-MB original every hour. The next/image optimiser's own TTL is
// max(images.minimumCacheTTL, upstream max-age), so setting this upstream
// header alone lifts optimised Supabase images to a 1-year TTL while
// bundled /img/* assets- which ARE swapped in place, see next.config.js-
// keep the shorter default floor. See supabase-egress-remediation-plan.md.
export const STORAGE_CACHE_CONTROL = "31536000"; // 1 year

// Shown to the admin when a rejected format is chosen.
export const UNSUPPORTED_IMAGE_MESSAGE =
  "Unsupported image format. Use JPG, PNG, WebP, GIF, or AVIF. (HEIC/HEIF photos from an iPhone won't display in most browsers- open the photo and export or convert it to JPG first.)";

// Client-side pre-flight: returns a message to show the admin, or null if
// the file is fine to upload. Mirrors the checks the /api/admin/media
// route runs server-side, so a bad file never leaves the browser.
export function imageFileError(file: File): string | null {
  if (!(ACCEPTED_IMAGE_MIME_TYPES as readonly string[]).includes(file.type)) {
    return UNSUPPORTED_IMAGE_MESSAGE;
  }
  if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
    return OVERSIZE_IMAGE_MESSAGE;
  }
  return null;
}
