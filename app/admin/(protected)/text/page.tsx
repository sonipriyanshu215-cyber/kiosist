import { TextEditor } from "@/components/admin/TextEditor";

export const metadata = { title: "Page Text" };

export default function TextPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-kio-ink">Page Text</h1>
      <p className="mt-1 text-sm text-kio-muted">
        Plain-copy strings used across the site. Stylized headlines that mix colors aren&apos;t editable here-
        edit those in code.
      </p>
      <div className="mt-6 max-w-2xl">
        <TextEditor />
      </div>
    </div>
  );
}
