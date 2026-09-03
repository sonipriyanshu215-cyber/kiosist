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

// Shown to the admin when a rejected format is chosen.
export const UNSUPPORTED_IMAGE_MESSAGE =
  "Unsupported image format. Use JPG, PNG, WebP, GIF, or AVIF. (HEIC/HEIF photos from an iPhone won't display in most browsers- open the photo and export or convert it to JPG first.)";
