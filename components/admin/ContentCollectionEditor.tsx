"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown, Trash2, Plus, Save, Upload } from "lucide-react";
import { COLLECTION_CONFIG, getPath, setPath, type FieldDef } from "@/lib/cms/schema";
import { IMAGE_FILE_ACCEPT, imageFileError } from "@/lib/cms/image-formats";

type Item = { id: string; data: unknown; sort_order: number };

// Uploads to the shared media bucket (no slot/collection- a loose upload)
// and hands back the public URL to store in the item's image field.
async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/admin/media", { method: "POST", body: formData });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Upload failed (HTTP ${res.status})`);
  }
  return (await res.json()).media.url as string;
}

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    // HEIC / oversized files can slip past the `accept` filter- catch them
    // here so the admin gets a clear message without a failed round trip.
    const preflight = imageFileError(file);
    if (preflight) {
      alert(preflight);
      return;
    }
    setBusy(true);
    try {
      onChange(await uploadImage(file));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="h-16 w-16 shrink-0 rounded-full border border-kio-line bg-kio-bg object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-dashed border-kio-line bg-kio-bg text-kio-muted">
          <Upload className="h-5 w-5" />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <input ref={inputRef} type="file" accept={IMAGE_FILE_ACCEPT} className="hidden" onChange={onFile} />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="flex items-center gap-1.5 rounded-full bg-kio-accent/15 px-4 py-2 text-xs font-semibold text-kio-accent hover:bg-kio-accent/25 disabled:opacity-60"
        >
          <Upload className="h-3.5 w-3.5" /> {busy ? "Uploading…" : value ? "Replace photo" : "Upload photo"}
        </button>
        {value && !busy && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-full px-3 py-2 text-xs font-semibold text-kio-muted hover:text-kio-error"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

function FieldInput({ field, value, onChange }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  const stringValue = value == null ? "" : String(value);

  if (field.type === "image") {
    return <ImageField value={stringValue} onChange={onChange} />;
  }
  if (field.type === "textarea") {
    return (
      <textarea
        value={stringValue}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-xl border border-kio-line bg-kio-bg px-3 py-2 text-sm focus:border-kio-primary focus:outline-none"
      />
    );
  }
  if (field.type === "select") {
    return (
      <select
        value={stringValue}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      >
        {field.options?.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    );
  }
  if (field.type === "number") {
    return (
      <input
        type="number"
        step="any"
        value={stringValue}
        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        className="input-field"
      />
    );
  }
  return (
    <input
      type="text"
      value={stringValue}
      onChange={(e) => onChange(e.target.value)}
      className="input-field"
    />
  );
}

function ItemCard({
  item,
  collection,
  isFirst,
  isLast,
  onSaved,
  onDeleted,
  onMove,
}: {
  item: Item;
  collection: string;
  isFirst: boolean;
  isLast: boolean;
  onSaved: (item: Item) => void;
  onDeleted: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
}) {
  const config = COLLECTION_CONFIG[collection];
  const [draft, setDraft] = useState<unknown>(item.data);
  const [saving, setSaving] = useState(false);
  const dirty = JSON.stringify(draft) !== JSON.stringify(item.data);

  const title = config.titleField ? String(getPath(draft, config.titleField) ?? "Untitled") : String(draft || "New item");

  async function save() {
    setSaving(true);
    const res = await fetch(`/api/admin/content/${collection}/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: draft }),
    });
    setSaving(false);
    if (res.ok) {
      const { item: updated } = await res.json();
      onSaved(updated);
    }
  }

  async function remove() {
    if (!confirm(`Delete "${title}"?`)) return;
    await fetch(`/api/admin/content/${collection}/${item.id}`, { method: "DELETE" });
    onDeleted(item.id);
  }

  return (
    <div className="rounded-2xl border border-kio-line bg-kio-bg-soft p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="truncate font-semibold text-kio-ink">{title}</p>
        <div className="flex shrink-0 items-center gap-1">
          <button onClick={() => onMove(item.id, "up")} disabled={isFirst} className="rounded p-1 text-kio-muted hover:text-kio-ink disabled:opacity-30">
            <ChevronUp className="h-4 w-4" />
          </button>
          <button onClick={() => onMove(item.id, "down")} disabled={isLast} className="rounded p-1 text-kio-muted hover:text-kio-ink disabled:opacity-30">
            <ChevronDown className="h-4 w-4" />
          </button>
          <button onClick={remove} className="rounded p-1 text-kio-muted hover:text-kio-error">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {config.fields.map((field) => (
          <div key={field.key || "value"} className={field.type === "textarea" || field.type === "image" ? "sm:col-span-2" : ""}>
            {field.label && <label className="mb-1 block text-xs font-medium text-kio-muted">{field.label}</label>}
            <FieldInput
              field={field}
              value={getPath(draft, field.key)}
              onChange={(v) => setDraft((prev: unknown) => setPath(prev, field.key, v))}
            />
          </div>
        ))}
      </div>

      {dirty && (
        <button
          onClick={save}
          disabled={saving}
          className="mt-3 flex items-center gap-1.5 rounded-full bg-kio-primary px-4 py-2 text-xs font-semibold text-white hover:bg-kio-primary/85 disabled:opacity-60"
        >
          <Save className="h-3.5 w-3.5" /> {saving ? "Saving…" : "Save changes"}
        </button>
      )}
    </div>
  );
}

export function ContentCollectionEditor({ collection }: { collection: string }) {
  const config = COLLECTION_CONFIG[collection];
  const [items, setItems] = useState<Item[] | null>(null);

  async function load() {
    const res = await fetch(`/api/admin/content/${collection}`);
    const data = await res.json();
    setItems(data.items ?? []);
  }

  useEffect(() => {
    load();
  }, [collection]);

  async function addItem() {
    const res = await fetch(`/api/admin/content/${collection}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: config.emptyItem }),
    });
    if (res.ok) {
      const { item } = await res.json();
      setItems((prev) => [...(prev ?? []), item]);
    }
  }

  async function move(id: string, direction: "up" | "down") {
    if (!items) return;
    const index = items.findIndex((i) => i.id === id);
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= items.length) return;

    const reordered = [...items];
    [reordered[index], reordered[swapWith]] = [reordered[swapWith], reordered[index]];
    setItems(reordered);

    await fetch(`/api/admin/content/${collection}/reorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: reordered.map((i) => i.id) }),
    });
  }

  if (!items) return <p className="text-sm text-kio-muted">Loading…</p>;

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={addItem}
          className="flex items-center gap-1.5 rounded-full bg-kio-accent/15 px-4 py-2 text-xs font-semibold text-kio-accent hover:bg-kio-accent/25"
        >
          <Plus className="h-3.5 w-3.5" /> Add {config.label.replace(/s$/, "")}
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <ItemCard
            key={item.id}
            item={item}
            collection={collection}
            isFirst={i === 0}
            isLast={i === items.length - 1}
            onSaved={(updated) => setItems((prev) => prev!.map((it) => (it.id === updated.id ? updated : it)))}
            onDeleted={(id) => setItems((prev) => prev!.filter((it) => it.id !== id))}
            onMove={move}
          />
        ))}
        {items.length === 0 && <p className="text-sm text-kio-muted">No items yet.</p>}
      </div>
    </div>
  );
}
