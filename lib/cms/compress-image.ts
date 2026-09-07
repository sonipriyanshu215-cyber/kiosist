import { ACCEPTED_IMAGE_MIME_TYPES } from "./image-formats";

// Client-side downscale + re-encode, run in the browser before every admin
// image upload. A 4-10MB phone/camera photo lands at ~100-300KB- a 20-30x
// cut- which is the single biggest lever on Supabase "cached egress"
// (supabase-egress-remediation-plan.md, Phase 2): the object the next/image
// optimiser pulls from Storage, and that any hotlink/scrape serves, is
// that much smaller. Runs before the shared imageFileError() preflight, so
// the 4MB cap is checked against the compressed result.

const MAX_DIMENSION = 1600; // px on the long edge- covers full-bleed hero use
const TARGET_MAX_MB = 1; // ceiling; the library dials quality down to hit it
const INITIAL_QUALITY = 0.8;

// Left untouched: animated GIFs (a canvas re-encode would flatten them) and
// files already small enough that re-encoding can only add artefacts.
const PASSTHROUGH_TYPES = new Set(["image/gif"]);
const SKIP_UNDER_BYTES = 400 * 1024;

// PNGs (logos, screenshots, anything with transparency) stay PNG; every
// other accepted raster type is re-encoded to WebP.
function outputType(inputType: string): "image/png" | "image/webp" {
  return inputType === "image/png" ? "image/png" : "image/webp";
}

export async function compressImageForUpload(file: File): Promise<File> {
  if (
    PASSTHROUGH_TYPES.has(file.type) ||
    file.size <= SKIP_UNDER_BYTES ||
    !(ACCEPTED_IMAGE_MIME_TYPES as readonly string[]).includes(file.type)
  ) {
    return file;
  }

  try {
    // Dynamic import- keeps browser-image-compression (and its worker) out
    // of the initial admin bundle and out of any server evaluation.
    const { default: imageCompression } = await import("browser-image-compression");
    const type = outputType(file.type);

    const compressed = await imageCompression(file, {
      maxWidthOrHeight: MAX_DIMENSION,
      maxSizeMB: TARGET_MAX_MB,
      initialQuality: INITIAL_QUALITY,
      fileType: type,
      useWebWorker: true,
    });

    // Never hand back something larger than we started with (tiny or
    // already-optimised inputs can round-trip bigger).
    if (compressed.size >= file.size) return file;

    // browser-image-compression keeps the original filename even when it
    // changes the encoding- rename so the upload route's
    // `file.name.split(".").pop()` picks the storage extension that matches
    // the actual bytes.
    const ext = type === "image/png" ? "png" : "webp";
    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    return new File([compressed], `${base}.${ext}`, {
      type,
      lastModified: Date.now(),
    });
  } catch {
    // Compression is an optimisation, not a gate. On any failure (exotic
    // codec, out-of-memory on a huge source) fall back to the original and
    // let the server's size/type checks decide.
    return file;
  }
}
