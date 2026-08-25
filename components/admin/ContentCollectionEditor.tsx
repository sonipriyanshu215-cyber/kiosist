"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Trash2, Plus, Save } from "lucide-react";
import { COLLECTION_CONFIG, getPath, setPath, type FieldDef } from "@/lib/cms/schema";

type Item = { id: string; data: unknown; sort_order: number };

function FieldInput({ field, value, onChange }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  const stringValue = value == null ? "" : String(value);

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
          <div key={field.key || "value"} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
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
