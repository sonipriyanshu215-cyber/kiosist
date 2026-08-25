import Link from "next/link";
import { COLLECTION_CONFIG } from "@/lib/cms/schema";

export const metadata = { title: "Content" };

export default function ContentIndexPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-kio-ink">Content</h1>
      <p className="mt-1 text-sm text-kio-muted">Structured collections shown across the site.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(COLLECTION_CONFIG).map(([key, config]) => (
          <Link
            key={key}
            href={`/admin/content/${key}`}
            className="rounded-2xl border border-kio-line bg-kio-bg-soft p-5 transition-colors hover:border-kio-accent/40"
          >
            <h2 className="font-bold text-kio-ink">{config.label}</h2>
            <p className="mt-1.5 text-sm text-kio-muted">{config.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
