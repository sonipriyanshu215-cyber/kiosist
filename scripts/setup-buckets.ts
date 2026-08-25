// One-off: creates the two Storage buckets this app expects. Safe to
// re-run- skips a bucket that already exists.
//
// Usage: npx tsx scripts/setup-buckets.ts

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env.local") });

import { createClient } from "@supabase/supabase-js";

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local.");
    process.exit(1);
  }
  const supabase = createClient(url, key);

  const buckets: { name: string; public: boolean }[] = [
    { name: "media", public: true },
    { name: "resumes", public: false },
  ];

  const { data: existing, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    console.error("Failed to list buckets:", listError.message);
    process.exit(1);
  }
  const existingNames = new Set((existing ?? []).map((b) => b.name));

  for (const bucket of buckets) {
    if (existingNames.has(bucket.name)) {
      console.log(`Bucket "${bucket.name}" already exists- skipping.`);
      continue;
    }
    const { error } = await supabase.storage.createBucket(bucket.name, { public: bucket.public });
    if (error) {
      console.error(`Failed to create bucket "${bucket.name}":`, error.message);
    } else {
      console.log(`Created bucket "${bucket.name}" (public: ${bucket.public}).`);
    }
  }
}

main();
