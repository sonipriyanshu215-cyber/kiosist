// Uploads the existing /public/img/culture photos into Supabase Storage and
// registers them in the `media` table (collection: "culture"), so the
// Culture page's "Kiosist Gallery" and /admin/media both show real data
// immediately instead of starting empty.
//
// Usage: npm run seed:gallery

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env.local") });

import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import { cultureGallery } from "../content/cultureGallery";

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local before seeding.");
    process.exit(1);
  }
  const supabase = createClient(url, key);

  // Clear any previous seed of this collection (and its files) so re-runs
  // don't duplicate rows/orphan storage objects.
  const { data: existingRows } = await supabase.from("media").select("id, storage_path").eq("collection", "culture");
  if (existingRows && existingRows.length > 0) {
    await supabase.storage.from("media").remove(existingRows.map((r) => r.storage_path));
    await supabase.from("media").delete().eq("collection", "culture");
    console.log(`Cleared ${existingRows.length} previously-seeded culture photo(s).`);
  }

  let seeded = 0;
  for (let i = 0; i < cultureGallery.length; i++) {
    const { src, alt } = cultureGallery[i];
    const localPath = resolve(__dirname, "../public", src.replace(/^\//, ""));
    let fileBuffer: Buffer;
    try {
      fileBuffer = readFileSync(localPath);
    } catch {
      console.error(`Skipping "${src}"- file not found at ${localPath}.`);
      continue;
    }

    const ext = src.split(".").pop() || "jpg";
    const contentType = ext === "png" ? "image/png" : "image/jpeg";
    const storagePath = `culture/${src.split("/").pop()}`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(storagePath, fileBuffer, { contentType, upsert: true });
    if (uploadError) {
      console.error(`Failed to upload "${src}":`, uploadError.message);
      continue;
    }

    const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(storagePath);

    const { error: insertError } = await supabase.from("media").insert({
      collection: "culture",
      url: publicUrlData.publicUrl,
      storage_path: storagePath,
      alt_text: alt,
      sort_order: i,
    });
    if (insertError) {
      console.error(`Failed to register "${src}" in the media table:`, insertError.message);
      continue;
    }

    seeded++;
    console.log(`Uploaded ${src} -> ${storagePath}`);
  }

  console.log(`Done. Seeded ${seeded}/${cultureGallery.length} gallery photo(s).`);
}

main();
