// Pushes the existing content/*.ts defaults into Supabase so the admin
// panel's Content CRUD starts out populated with what's already live on the
// site, instead of an empty list. Idempotent- re-running clears and
// re-inserts each collection rather than duplicating rows.
//
// Usage: npm run seed  (requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in
// .env.local)

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env.local") });

import { createClient } from "@supabase/supabase-js";
import { clients } from "../content/clients";
import { faqs } from "../content/faqs";
import { milestones, journeyYears } from "../content/milestones";
import { perks } from "../content/perks";
import { roleOptions } from "../content/roles";
import { values } from "../content/values";
import { team } from "../content/team";

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local before seeding.");
    process.exit(1);
  }
  const supabase = createClient(url, key);

  const collections: Record<string, unknown[]> = {
    values,
    faqs,
    milestones,
    journey_years: journeyYears,
    perks,
    clients,
    team,
    roles: roleOptions,
  };

  for (const [collection, items] of Object.entries(collections)) {
    const { error: deleteError } = await supabase.from("content_items").delete().eq("collection", collection);
    if (deleteError) {
      console.error(`Failed to clear "${collection}":`, deleteError.message);
      continue;
    }

    const rows = items.map((data, i) => ({ collection, data, sort_order: i }));
    const { error: insertError } = await supabase.from("content_items").insert(rows);
    if (insertError) {
      console.error(`Failed to seed "${collection}":`, insertError.message);
    } else {
      console.log(`Seeded ${rows.length} item(s) into "${collection}".`);
    }
  }

  console.log("Done. Text and images are unaffected- they already fall back to their shipped defaults until edited in /admin.");
}

main();
