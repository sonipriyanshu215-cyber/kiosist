import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { COLLECTION_CONFIG } from "@/lib/cms/schema";

export async function PATCH(req: Request, ctx: RouteContext<"/api/admin/content/[collection]/[id]">) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { collection, id } = await ctx.params;
  if (!COLLECTION_CONFIG[collection]) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body.data === "undefined") {
    return NextResponse.json({ error: "Missing item data" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("content_items")
    .update({ data: body.data, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("collection", collection)
    .select("id, data, sort_order")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/admin/content/[collection]/[id]">) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { collection, id } = await ctx.params;

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });

  const { error } = await supabase.from("content_items").delete().eq("id", id).eq("collection", collection);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
