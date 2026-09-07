// One-off: the `culture` gallery collection's photos (MasonryGallery on
// /culture) were uploaded at 7.5-9.6MB each (9 files, ~74MB total)- full
// camera-resolution JPEGs serving both the grid thumbnails and the
// click-to-zoom lightbox. The lightbox (yet-another-react-lightbox) renders
// a plain <img> at the stored `url`, bypassing Next's image optimizer
// entirely, so shrinking the stored originals is the only way to cut what
// it actually downloads- unlike every other image on the site, which now
// gets resized/cached by Next's optimizer regardless of the original's size.
//
// Resizes each to max 2000px on the long edge (still sharp full-screen in
// the lightbox on virtually any display) at JPEG quality 80, re-uploads
// under a fresh path (cache-busting, per this repo's existing convention),
// updates the `media` row, then deletes the old oversized object.
//
// Usage: npx tsx scripts/shrink-culture-gallery.ts
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env.local") });

import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const MAX_DIMENSION = 2000;
const JPEG_QUALITY = 80;

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured (.env.local)");
  const supabase = createClient(url, key);

  const { data: rows, error } = await supabase
    .from("media")
    .select("id, storage_path, url")
    .eq("collection", "culture");
  if (error) throw error;
  if (!rows || rows.length === 0) {
    console.log("No rows in the `culture` collection- nothing to do.");
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const row of rows) {
    const { data: fileBlob, error: downloadError } = await supabase.storage
      .from("media")
      .download(row.storage_path);
    if (downloadError || !fileBlob) {
      console.error(`Skipping ${row.storage_path}: download failed -`, downloadError?.message);
      continue;
    }
    const originalBuffer = Buffer.from(await fileBlob.arrayBuffer());

    const resized = await sharp(originalBuffer)
      .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();

    const ext = row.storage_path.split(".").pop() || "jpg";
    const base = row.storage_path.replace(new RegExp(`\\.${ext}$`), "");
    const newPath = `${base}-opt-${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(newPath, resized, { contentType: "image/jpeg", cacheControl: "31536000" });
    if (uploadError) {
      console.error(`Skipping ${row.storage_path}: upload failed -`, uploadError.message);
      continue;
    }

    const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(newPath);
    const { error: updateError } = await supabase
      .from("media")
      .update({ url: publicUrlData.publicUrl, storage_path: newPath })
      .eq("id", row.id);
    if (updateError) {
      console.error(`Row update failed for ${row.storage_path}, removing the new upload to avoid an orphan:`, updateError.message);
      await supabase.storage.from("media").remove([newPath]);
      continue;
    }

    await supabase.storage.from("media").remove([row.storage_path]);

    totalBefore += originalBuffer.byteLength;
    totalAfter += resized.byteLength;
    console.log(
      `${row.storage_path} -> ${newPath}: ${(originalBuffer.byteLength / 1024 / 1024).toFixed(2)}MB -> ${(resized.byteLength / 1024 / 1024).toFixed(2)}MB`
    );
  }

  console.log(
    `\nDone. ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB (${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}% smaller).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
