import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { TEXT_KEYS } from "@/lib/cms/text-keys";

// Lists every known editable text key alongside its current DB value (or
// its shipped default if never overridden), so the admin page always shows
// the full set even before anything has been edited.
export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const overrides = new Map<string, string>();
  if (supabase) {
    const { data } = await supabase.from("content_text").select("key, value");
    data?.forEach((row) => overrides.set(row.key, row.value));
  }

  const items = TEXT_KEYS.map((t) => ({
    key: t.key,
    label: t.label,
    value: overrides.get(t.key) ?? t.fallback,
  }));

  return NextResponse.json({ items });
}
