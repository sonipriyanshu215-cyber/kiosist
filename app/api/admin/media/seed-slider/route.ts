import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { requireAdminSession } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { revalidateSite } from "@/lib/cms/revalidate";
import { cultureSlider } from "@/content/cultureSlider";

// One-click "import the bundled default slides into the editable
// culture-slider collection", called from the Culture-page-slider section of
// the admin Media page while that collection is still empty. Reads each
// bundled /public image and pushes it straight to Supabase Storage (server
// side, so the ~4MB admin-upload cap doesn't apply), then registers a row.
export async function POST() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });

  const { data: existing } = await supabase
    .from("media")
    .select("id")
    .eq("collection", "culture-slider")
    .limit(1);
  if (existing && existing.length > 0) {
    return NextResponse.json({ error: "The slider already has slides- add more with “Add slide”." }, { status: 400 });
  }

  const created = [];
  for (let i = 0; i < cultureSlider.length; i++) {
    const { src, alt } = cultureSlider[i];
    let buffer: Buffer;
    try {
      buffer = await readFile(path.join(process.cwd(), "public", src.replace(/^\//, "")));
    } catch {
      // Bundled file missing- skip it rather than failing the whole import.
      continue;
    }

    const ext = (src.split(".").pop() || "jpg").toLowerCase();
    const contentType = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
    const storagePath = `culture-slider/default-${i + 1}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(storagePath, buffer, { contentType, cacheControl: "3600" });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(storagePath);

    const { data: row, error: insertError } = await supabase
      .from("media")
      .insert({
        collection: "culture-slider",
        url: publicUrlData.publicUrl,
        storage_path: storagePath,
        alt_text: alt,
        sort_order: i,
      })
      .select("*")
      .single();
    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });
    created.push(row);
  }

  revalidateSite();
  return NextResponse.json({ media: created });
}
