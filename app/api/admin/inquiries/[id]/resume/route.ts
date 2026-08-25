import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

// Resumes live in a private bucket- redirect to a short-lived signed URL
// rather than serving the file through this route directly.
export async function GET(_req: Request, ctx: RouteContext<"/api/admin/inquiries/[id]/resume">) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });

  const { data: row, error: rowError } = await supabase
    .from("inquiries")
    .select("resume_path")
    .eq("id", id)
    .maybeSingle();
  if (rowError || !row?.resume_path) {
    return NextResponse.json({ error: "No resume on file" }, { status: 404 });
  }

  const { data, error } = await supabase.storage.from("resumes").createSignedUrl(row.resume_path, 60);
  if (error || !data) return NextResponse.json({ error: "Could not sign resume URL" }, { status: 500 });

  return NextResponse.redirect(data.signedUrl);
}
