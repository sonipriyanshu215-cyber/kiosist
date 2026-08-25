// Any src that isn't a local /public path is coming from Supabase Storage
// (an admin upload). Next's built-in image optimizer proxies remote images
// through its own server-side fetch to resize/re-encode them- on networks
// where that outbound fetch is slow or blocked, it times out and the image
// never renders. Supabase Storage already serves reasonably-sized web
// images, so there's nothing to gain from re-optimizing them- skip Next's
// optimizer for anything remote and let the browser fetch it directly.
export function isRemoteImageSrc(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}
