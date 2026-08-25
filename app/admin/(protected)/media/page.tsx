import { MediaLibrary } from "@/components/admin/MediaLibrary";

export const metadata = { title: "Media" };

export default function MediaPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-kio-ink">Media</h1>
      <p className="mt-1 text-sm text-kio-muted">Upload and manage images used across the site.</p>
      <div className="mt-6">
        <MediaLibrary />
      </div>
    </div>
  );
}
