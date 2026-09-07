import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env.local") });

import { createClient } from "@supabase/supabase-js";

// One-off audit: lists every file in the `media` Storage bucket with its
// size, so we know exactly what's driving Supabase's cached-egress quota
// before deciding what to compress. Run with: npx tsx scripts/audit-media-sizes.ts
async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured (.env.local)");
  const supabase = createClient(url, key);

  async function listRecursive(prefix: string): Promise<{ path: string; size: number }[]> {
    const { data, error } = await supabase.storage.from("media").list(prefix, { limit: 1000 });
    if (error) throw error;
    const out: { path: string; size: number }[] = [];
    for (const entry of data ?? []) {
      const fullPath = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.id === null) {
        // Folder (no id) - recurse.
        out.push(...(await listRecursive(fullPath)));
      } else {
        out.push({ path: fullPath, size: entry.metadata?.size ?? 0 });
      }
    }
    return out;
  }

  const files = await listRecursive("");
  files.sort((a, b) => b.size - a.size);

  let total = 0;
  for (const f of files) {
    total += f.size;
    console.log(`${(f.size / 1024 / 1024).toFixed(2)} MB  ${f.path}`);
  }
  console.log(`\nTotal: ${(total / 1024 / 1024).toFixed(2)} MB across ${files.length} files`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
