// One-off backfill for the Supabase "cached egress" remediation
// (supabase-egress-remediation-plan.md, Phases 1 + 2).
//
// Phase 1 and Phase 2's client-side changes only affect NEW uploads.
// Everything already sitting in the public `media` bucket keeps its old
// `cache-control: max-age=3600` header and its original (often 7-10MB)
// bytes. This script walks every row in the `media` table and, for each
// stored object:
//
//   1. re-encodes it with sharp- resize to <=1600px on the long edge,
//      re-compress at quality 80, keeping the original format- and
//   2. re-uploads it to the SAME storage path (so `media.url` stays valid,
//      no DB writes) with `cache-control: max-age=31536000`.
//
// If the re-encode doesn't come out smaller (already-optimised or tiny
// images), the original bytes are re-uploaded instead- purely to refresh
// the cache-control header. Animated GIFs are header-only (a sharp
// re-encode would flatten them).
//
// Safe to re-run. Usage: npm run backfill:storage

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env.local") });

import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import { STORAGE_CACHE_CONTROL } from "../lib/cms/image-formats";

const BUCKET = "media";
const MAX_DIMENSION = 1600;
const QUALITY = 80;

type Fmt = "jpeg" | "png" | "webp" | "avif" | "gif" | "other";

function formatFromPath(path: string): { fmt: Fmt; contentType: string } {
  const ext = (path.split(".").pop() || "").toLowerCase();
  if (ext === "jpg" || ext === "jpeg") return { fmt: "jpeg", contentType: "image/jpeg" };
  if (ext === "png") return { fmt: "png", contentType: "image/png" };
  if (ext === "webp") return { fmt: "webp", contentType: "image/webp" };
  if (ext === "avif") return { fmt: "avif", contentType: "image/avif" };
  if (ext === "gif") return { fmt: "gif", contentType: "image/gif" };
  return { fmt: "other", contentType: "application/octet-stream" };
}

async function recompress(input: Buffer, fmt: Fmt): Promise<Buffer | null> {
  if (fmt === "gif" || fmt === "other") return null;
  try {
    let pipeline = sharp(input, { failOn: "none" })
      .rotate() // bake in EXIF orientation before we drop the metadata
      .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: "inside", withoutEnlargement: true });

    if (fmt === "jpeg") pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    else if (fmt === "png") pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9, palette: true });
    else if (fmt === "webp") pipeline = pipeline.webp({ quality: QUALITY });
    else if (fmt === "avif") pipeline = pipeline.avif({ quality: QUALITY });

    return await pipeline.toBuffer();
  } catch (err) {
    console.warn(`  ! sharp failed, will re-upload original: ${(err as Error).message}`);
    return null;
  }
}

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local.");
    process.exit(1);
  }
  const supabase = createClient(url, key);

  // Optional numeric arg caps how many rows are processed- `npm run
  // backfill:storage -- 1` to smoke-test one object before the full run.
  const limitArg = Number(process.argv[2]);
  const limit = Number.isInteger(limitArg) && limitArg > 0 ? limitArg : null;

  let listQuery = supabase
    .from("media")
    .select("id, storage_path, collection, slot_key")
    .order("created_at", { ascending: true });
  if (limit) listQuery = listQuery.limit(limit);
  const { data: rows, error } = await listQuery;
  if (error) {
    console.error("Could not read the media table:", error.message);
    process.exit(1);
  }
  if (!rows || rows.length === 0) {
    console.log("No media rows- nothing to backfill.");
    return;
  }

  let recompressed = 0;
  let headerOnly = 0;
  let skipped = 0;
  let bytesBefore = 0;
  let bytesAfter = 0;

  for (const row of rows) {
    const path: string | null = row.storage_path;
    const label = row.slot_key || row.collection || row.id;
    if (!path) {
      console.log(`- ${label}: no storage_path, skipping`);
      skipped++;
      continue;
    }

    const { data: blob, error: dlErr } = await supabase.storage.from(BUCKET).download(path);
    if (dlErr || !blob) {
      console.log(`- ${path}: download failed (${dlErr?.message ?? "no data"}), skipping`);
      skipped++;
      continue;
    }

    const original = Buffer.from(await blob.arrayBuffer());
    const { fmt, contentType } = formatFromPath(path);
    bytesBefore += original.length;

    const processed = await recompress(original, fmt);
    const useProcessed = processed !== null && processed.length < original.length;
    const payload = useProcessed ? processed! : original;

    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, payload, { upsert: true, contentType, cacheControl: STORAGE_CACHE_CONTROL });
    if (upErr) {
      console.log(`- ${path}: re-upload failed (${upErr.message})`);
      skipped++;
      continue;
    }

    bytesAfter += payload.length;
    if (useProcessed) {
      recompressed++;
      const pct = Math.round((1 - payload.length / original.length) * 100);
      console.log(`✓ ${path}: ${(original.length / 1024).toFixed(0)}KB -> ${(payload.length / 1024).toFixed(0)}KB (-${pct}%), cache-control refreshed`);
    } else {
      headerOnly++;
      console.log(`· ${path}: ${(original.length / 1024).toFixed(0)}KB unchanged, cache-control refreshed`);
    }
  }

  console.log("\n---");
  console.log(`Rows:          ${rows.length}`);
  console.log(`Re-compressed: ${recompressed}`);
  console.log(`Header-only:   ${headerOnly}`);
  console.log(`Skipped:       ${skipped}`);
  console.log(`Storage used:  ${(bytesBefore / 1048576).toFixed(1)}MB -> ${(bytesAfter / 1048576).toFixed(1)}MB`);
  console.log("\nNote: this covers objects referenced by a `media` row. Orphaned");
  console.log("objects (uploaded then their row deleted) are not touched- check");
  console.log("the bucket in the dashboard if egress stays high.");
}

main();
