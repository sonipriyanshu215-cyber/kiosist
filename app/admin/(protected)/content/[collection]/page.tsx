import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { COLLECTION_CONFIG } from "@/lib/cms/schema";
import { ContentCollectionEditor } from "@/components/admin/ContentCollectionEditor";

export default async function ContentCollectionPage({
  params,
}: PageProps<"/admin/content/[collection]">) {
  const { collection } = await params;
  const config = COLLECTION_CONFIG[collection];
  if (!config) notFound();

  return (
    <div>
      <Link href="/admin/content" className="mb-4 flex items-center gap-1.5 text-sm text-kio-muted hover:text-kio-ink">
        <ArrowLeft className="h-3.5 w-3.5" /> All content
      </Link>
      <h1 className="text-2xl font-bold text-kio-ink">{config.label}</h1>
      <p className="mt-1 text-sm text-kio-muted">{config.description}</p>
      <div className="mt-6">
        <ContentCollectionEditor collection={collection} />
      </div>
    </div>
  );
}
