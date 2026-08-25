import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { Inbox, FileText, Image as ImageIcon, AlertTriangle } from "lucide-react";

async function getCounts() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const [{ count: total }, { count: newCount }, { count: mediaCount }] = await Promise.all([
    supabase.from("inquiries").select("id", { count: "exact", head: true }),
    supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("media").select("id", { count: "exact", head: true }),
  ]);

  return { total: total ?? 0, newCount: newCount ?? 0, mediaCount: mediaCount ?? 0 };
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div>
      <h1 className="text-2xl font-bold text-kio-ink">Dashboard</h1>

      {!counts && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-kio-error/30 bg-kio-error/10 p-4 text-sm text-kio-error">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Supabase isn&apos;t configured yet.</p>
            <p className="mt-1 text-kio-error/80">
              Set <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> in <code>.env.local</code>,
              run <code>supabase/schema.sql</code>, then restart the dev server.
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/admin/inquiries"
          className="rounded-2xl border border-kio-line bg-kio-bg-soft p-5 transition-colors hover:border-kio-accent/40"
        >
          <Inbox className="h-5 w-5 text-kio-accent" />
          <p className="mt-3 text-2xl font-bold text-kio-ink">{counts?.newCount ?? "-"}</p>
          <p className="text-sm text-kio-muted">New inquiries ({counts?.total ?? "-"} total)</p>
        </Link>
        <Link
          href="/admin/content"
          className="rounded-2xl border border-kio-line bg-kio-bg-soft p-5 transition-colors hover:border-kio-accent/40"
        >
          <FileText className="h-5 w-5 text-kio-accent" />
          <p className="mt-3 text-2xl font-bold text-kio-ink">8</p>
          <p className="text-sm text-kio-muted">Content collections</p>
        </Link>
        <Link
          href="/admin/media"
          className="rounded-2xl border border-kio-line bg-kio-bg-soft p-5 transition-colors hover:border-kio-accent/40"
        >
          <ImageIcon className="h-5 w-5 text-kio-accent" />
          <p className="mt-3 text-2xl font-bold text-kio-ink">{counts?.mediaCount ?? "-"}</p>
          <p className="text-sm text-kio-muted">Uploaded images</p>
        </Link>
      </div>
    </div>
  );
}
