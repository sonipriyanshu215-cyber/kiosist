"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

type TextItem = { key: string; label: string; value: string };

function TextRow({ item, onSaved }: { item: TextItem; onSaved: (item: TextItem) => void }) {
  const [value, setValue] = useState(item.value);
  const [saving, setSaving] = useState(false);
  const dirty = value !== item.value;

  async function save() {
    setSaving(true);
    const res = await fetch(`/api/admin/text/${encodeURIComponent(item.key)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });
    setSaving(false);
    if (res.ok) onSaved({ ...item, value });
  }

  return (
    <div className="rounded-2xl border border-kio-line bg-kio-bg-soft p-4">
      <label className="mb-1 block text-xs font-medium text-kio-muted">{item.label}</label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={2}
        className="w-full rounded-xl border border-kio-line bg-kio-bg px-3 py-2 text-sm focus:border-kio-primary focus:outline-none"
      />
      {dirty && (
        <button
          onClick={save}
          disabled={saving}
          className="mt-2 flex items-center gap-1.5 rounded-full bg-kio-primary px-4 py-2 text-xs font-semibold text-white hover:bg-kio-primary/85 disabled:opacity-60"
        >
          <Save className="h-3.5 w-3.5" /> {saving ? "Saving…" : "Save"}
        </button>
      )}
    </div>
  );
}

export function TextEditor() {
  const [items, setItems] = useState<TextItem[] | null>(null);

  useEffect(() => {
    fetch("/api/admin/text")
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []));
  }, []);

  if (!items) return <p className="text-sm text-kio-muted">Loading…</p>;

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <TextRow
          key={item.key}
          item={item}
          onSaved={(updated) => setItems((prev) => prev!.map((i) => (i.key === updated.key ? updated : i)))}
        />
      ))}
    </div>
  );
}
