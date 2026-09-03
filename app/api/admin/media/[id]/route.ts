import { NextResponse } from "next/server";
import { revalidateSite } from "@/lib/cms/revalidate";
import { requireAdminSession } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function DELETE(_req: Request, ctx: RouteContext<"/api/admin/media/[id]">) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });

  const { data: row } = await supabase.from("media").select("storage_path").eq("id", id).maybeSingle();
  if (row) await supabase.storage.from("media").remove([row.storage_path]);

  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Deleting a slot reverts it to the bundled default; deleting a gallery
  // photo drops it from the Culture page. Both must show everywhere now.
  revalidateSite();

  return NextResponse.json({ success: true });
}
