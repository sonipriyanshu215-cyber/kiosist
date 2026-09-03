import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { COLLECTION_CONFIG } from "@/lib/cms/schema";

export async function GET(_req: Request, ctx: RouteContext<"/api/admin/content/[collection]">) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { collection } = await ctx.params;
  if (!COLLECTION_CONFIG[collection]) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });

  const { data, error } = await supabase
    .from("content_items")
    .select("id, data, sort_order")
    .eq("collection", collection)
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data });
}

export async function POST(req: Request, ctx: RouteContext<"/api/admin/content/[collection]">) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { collection } = await ctx.params;
  if (!COLLECTION_CONFIG[collection]) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body.data === "undefined") {
    return NextResponse.json({ error: "Missing item data" }, { status: 400 });
  }

  const { count } = await supabase
    .from("content_items")
    .select("id", { count: "exact", head: true })
    .eq("collection", collection);

  const { data, error } = await supabase
    .from("content_items")
    .insert({ collection, data: body.data, sort_order: count ?? 0 })
    .select("id, data, sort_order")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/", "layout");

  return NextResponse.json({ item: data });
}
