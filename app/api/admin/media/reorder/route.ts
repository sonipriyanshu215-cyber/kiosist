import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

// Body: { ids: string[] } in the new display order, all belonging to the
// same gallery collection (e.g. "culture").
export async function POST(req: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.ids)) {
    return NextResponse.json({ error: "Missing ids array" }, { status: 400 });
  }

  const results = await Promise.all(
    (body.ids as string[]).map((id, index) => supabase.from("media").update({ sort_order: index }).eq("id", id))
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) return NextResponse.json({ error: failed.error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
