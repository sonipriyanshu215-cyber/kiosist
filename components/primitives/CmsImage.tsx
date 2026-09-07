"use client";

import Image, { type ImageProps } from "next/image";
import { isSupabaseStorageUrl, supabaseImageLoader } from "@/lib/supabase/image-loader";

// Drop-in for `next/image` at any render site that can be handed an
// admin-uploaded (Supabase Storage) URL as well as a bundled /img/* path.
// For a Supabase URL it wires up the custom loader so the request goes to
// Supabase's transform endpoint (CDN-cached, resized) instead of the
// un-cached /object/public/ path- the fix for the "cached egress" overage
// (see supabase-egress-remediation-plan.md). For every other src it is
// exactly `next/image` with the built-in optimiser.
//
// Imported aliased- `import { CmsImage as Image }`- so existing <Image />
// JSX needs no change.
export function CmsImage(props: ImageProps) {
  const useLoader = typeof props.src === "string" && isSupabaseStorageUrl(props.src);
  return <Image {...props} loader={useLoader ? supabaseImageLoader : undefined} />;
}
