import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { TEXT_KEYS } from "@/lib/cms/text-keys";

export async function PUT(req: Request, ctx: RouteContext<"/api/admin/text/[key]">) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { key } = await ctx.params;
  if (!TEXT_KEYS.some((t) => t.key === key)) {
    return NextResponse.json({ error: "Unknown text key" }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.value !== "string") {
    return NextResponse.json({ error: "Missing value" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });

  const { error } = await supabase
    .from("content_text")
    .upsert({ key, value: body.value, updated_at: new Date().toISOString() });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
