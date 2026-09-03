import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB

export async function GET(req: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });

  let query = supabase.from("media").select("*").order("created_at", { ascending: false });
  const collection = new URL(req.url).searchParams.get("collection");
  if (collection) query = query.eq("collection", collection);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ media: data });
}

// Uploads a file to the public `media` Storage bucket and inserts a row.
// Body (multipart/form-data): file (required), slotKey (optional, unique-
// swaps any existing row for that slot), collection (optional, gallery
// grouping), altText (optional).
export async function POST(req: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const slotKey = (formData.get("slotKey") as string | null) || null;
  const collection = (formData.get("collection") as string | null) || null;
  const altText = (formData.get("altText") as string | null) || null;

  if (!file) return NextResponse.json({ error: "Missing file" }, { status: 400 });
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are allowed" }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "File exceeds 8MB limit" }, { status: 400 });
  }

  // Replacing a slot- delete the old file first so it doesn't linger in Storage.
  if (slotKey) {
    const { data: existing } = await supabase.from("media").select("id, storage_path").eq("slot_key", slotKey).maybeSingle();
    if (existing) {
      await supabase.storage.from("media").remove([existing.storage_path]);
      await supabase.from("media").delete().eq("id", existing.id);
    }
  }

  // Every upload- slots included- gets a unique path, so replacing a slot
  // image always produces a brand-new public URL. Reusing a fixed path
  // (e.g. slots/logo.png) meant the URL never changed, so browsers and any
  // CDN in front kept serving the *previous* file's bytes for as long as
  // their cache lived- the classic "new image only shows on the PC that
  // uploaded it" bug. A fresh URL every time sidesteps every cache layer.
  const ext = file.name.split(".").pop() || "bin";
  const prefix = slotKey ? `slots/${slotKey}` : "uploads";
  const storagePath = `${prefix}/${randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(storagePath, file, { contentType: file.type, cacheControl: "3600" });
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

  const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(storagePath);

  const { count } = collection
    ? await supabase.from("media").select("id", { count: "exact", head: true }).eq("collection", collection)
    : { count: 0 };

  const { data, error } = await supabase
    .from("media")
    .insert({
      slot_key: slotKey,
      collection,
      url: publicUrlData.publicUrl,
      storage_path: storagePath,
      alt_text: altText,
      sort_order: count ?? 0,
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Push the change to every device on the next request instead of waiting
  // out each page's 60s ISR window (which some hosts don't honour at all).
  // The logo slot lives in the shared site layout, so revalidate broadly.
  revalidatePath("/", "layout");

  return NextResponse.json({ media: data });
}
