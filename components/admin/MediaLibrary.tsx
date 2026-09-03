"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, Copy, Check, ChevronUp, ChevronDown } from "lucide-react";
import { IMAGE_SLOTS } from "@/lib/cms/slots";
import { GALLERY_CATEGORIES } from "@/lib/cms/gallery-categories";
import { IMAGE_FILE_ACCEPT } from "@/lib/cms/image-formats";

type MediaRow = {
  id: string;
  slot_key: string | null;
  collection: string | null;
  url: string;
  alt_text: string | null;
  sort_order: number;
};

async function upload(file: File, opts: { slotKey?: string; collection?: string; altText?: string }) {
  const formData = new FormData();
  formData.append("file", file);
  if (opts.slotKey) formData.append("slotKey", opts.slotKey);
  if (opts.collection) formData.append("collection", opts.collection);
  if (opts.altText) formData.append("altText", opts.altText);
  const res = await fetch("/api/admin/media", { method: "POST", body: formData });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Upload failed");
  return (await res.json()).media as MediaRow;
}

function SlotRow({ slot, current, onChange }: { slot: (typeof IMAGE_SLOTS)[number]; current?: MediaRow; onChange: (row: MediaRow) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const row = await upload(file, { slotKey: slot.key });
      onChange(row);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-kio-line bg-kio-bg-soft p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={current?.url ?? slot.fallback}
        alt=""
        className="h-16 w-16 shrink-0 rounded-xl border border-kio-line object-cover"
      />
      <div className="flex-1">
        <p className="font-medium text-kio-ink">{slot.label}</p>
        <p className="mt-0.5 truncate text-xs text-kio-muted">{current ? "Custom upload" : `Default (${slot.fallback})`}</p>
      </div>
      <input ref={inputRef} type="file" accept={IMAGE_FILE_ACCEPT} className="hidden" onChange={onFile} />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="flex items-center gap-1.5 rounded-full bg-kio-accent/15 px-4 py-2 text-xs font-semibold text-kio-accent hover:bg-kio-accent/25 disabled:opacity-60"
      >
        <Upload className="h-3.5 w-3.5" /> {busy ? "Uploading…" : "Replace"}
      </button>
    </div>
  );
}

function UploadCard({ row, onDeleted }: { row: MediaRow; onDeleted: (id: string) => void }) {
  const [copied, setCopied] = useState(false);

  async function copyUrl() {
    await navigator.clipboard.writeText(row.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function remove() {
    if (!confirm("Delete this image? Any content field referencing its URL will break.")) return;
    await fetch(`/api/admin/media/${row.id}`, { method: "DELETE" });
    onDeleted(row.id);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-kio-line bg-kio-bg-soft">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={row.url} alt="" className="aspect-square w-full object-cover" />
      <div className="flex items-center gap-1 p-2">
        <button
          onClick={copyUrl}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium text-kio-muted hover:bg-kio-line/40"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy URL"}
        </button>
        <button onClick={remove} className="rounded-lg p-1.5 text-kio-muted hover:text-kio-error">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function GalleryCard({
  row,
  isFirst,
  isLast,
  onDeleted,
  onMove,
}: {
  row: MediaRow;
  isFirst: boolean;
  isLast: boolean;
  onDeleted: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
}) {
  async function remove() {
    if (!confirm("Remove this photo from the Kiosist Gallery?")) return;
    await fetch(`/api/admin/media/${row.id}`, { method: "DELETE" });
    onDeleted(row.id);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-kio-line bg-kio-bg-soft">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={row.url} alt={row.alt_text ?? ""} className="aspect-[4/3] w-full object-cover" />
      <div className="p-2">
        <p className="truncate text-xs font-medium text-kio-ink">{row.alt_text ?? "Uncategorized"}</p>
        <div className="mt-1 flex items-center gap-1">
          <button onClick={() => onMove(row.id, "up")} disabled={isFirst} className="rounded p-1 text-kio-muted hover:text-kio-ink disabled:opacity-30">
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => onMove(row.id, "down")} disabled={isLast} className="rounded p-1 text-kio-muted hover:text-kio-ink disabled:opacity-30">
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button onClick={remove} className="ml-auto rounded p-1 text-kio-muted hover:text-kio-error">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function GallerySection({ media, onChange }: { media: MediaRow[]; onChange: (media: MediaRow[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<string>(GALLERY_CATEGORIES[0]);
  const [busy, setBusy] = useState(false);

  const rows = media.filter((m) => m.collection === "culture").sort((a, b) => a.sort_order - b.sort_order);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const row = await upload(file, { collection: "culture", altText: category });
      onChange([...media, row]);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  function onDeleted(id: string) {
    onChange(media.filter((m) => m.id !== id));
  }

  async function onMove(id: string, direction: "up" | "down") {
    const index = rows.findIndex((r) => r.id === id);
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= rows.length) return;

    const reordered = [...rows];
    [reordered[index], reordered[swapWith]] = [reordered[swapWith], reordered[index]];
    const withNewOrder = reordered.map((r, i) => ({ ...r, sort_order: i }));

    onChange([...media.filter((m) => m.collection !== "culture"), ...withNewOrder]);
    await fetch("/api/admin/media/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: withNewOrder.map((r) => r.id) }),
    });
  }

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-kio-muted">Kiosist Gallery (Culture page)</h2>
        <div className="flex items-center gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-kio-line bg-kio-bg px-3 py-1.5 text-xs font-medium text-kio-ink"
          >
            {GALLERY_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input ref={inputRef} type="file" accept={IMAGE_FILE_ACCEPT} className="hidden" onChange={onFile} />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="flex items-center gap-1.5 rounded-full bg-kio-primary px-4 py-2 text-xs font-semibold text-white hover:bg-kio-primary/85 disabled:opacity-60"
          >
            <Upload className="h-3.5 w-3.5" /> {busy ? "Uploading…" : "Add photo"}
          </button>
        </div>
      </div>
      <p className="mb-3 text-xs text-kio-muted">
        Pick a category, then choose a photo- it's added to the Culture page gallery immediately, filterable under that tab.
      </p>
      {rows.length === 0 ? (
        <p className="text-sm text-kio-muted">No gallery photos yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {rows.map((row, i) => (
            <GalleryCard
              key={row.id}
              row={row}
              isFirst={i === 0}
              isLast={i === rows.length - 1}
              onDeleted={onDeleted}
              onMove={onMove}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export function MediaLibrary() {
  const [media, setMedia] = useState<MediaRow[] | null>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/media");
    const data = await res.json();
    setMedia(data.media ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function onGeneralUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const row = await upload(file, {});
      setMedia((prev) => [row, ...(prev ?? [])]);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  if (!media) return <p className="text-sm text-kio-muted">Loading…</p>;

  const slotRows = new Map(media.filter((m) => m.slot_key).map((m) => [m.slot_key as string, m]));
  const generalUploads = media.filter((m) => !m.slot_key && !m.collection);

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-kio-muted">Site image slots</h2>
        <div className="space-y-3">
          {IMAGE_SLOTS.map((slot) => (
            <SlotRow
              key={slot.key}
              slot={slot}
              current={slotRows.get(slot.key)}
              onChange={(row) => setMedia((prev) => [row, ...(prev?.filter((m) => m.slot_key !== slot.key) ?? [])])}
            />
          ))}
        </div>
      </section>

      <GallerySection media={media} onChange={setMedia} />

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-kio-muted">General uploads</h2>
          <div>
            <input ref={uploadInputRef} type="file" accept={IMAGE_FILE_ACCEPT} className="hidden" onChange={onGeneralUpload} />
            <button
              onClick={() => uploadInputRef.current?.click()}
              disabled={busy}
              className="flex items-center gap-1.5 rounded-full bg-kio-primary px-4 py-2 text-xs font-semibold text-white hover:bg-kio-primary/85 disabled:opacity-60"
            >
              <Upload className="h-3.5 w-3.5" /> {busy ? "Uploading…" : "Upload image"}
            </button>
          </div>
        </div>
        <p className="mb-3 text-xs text-kio-muted">
          Upload here, then copy the URL into an image field on a Content collection item (Team photo, Client logo, etc.).
        </p>
        {generalUploads.length === 0 ? (
          <p className="text-sm text-kio-muted">No uploads yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {generalUploads.map((row) => (
              <UploadCard key={row.id} row={row} onDeleted={(id) => setMedia((prev) => prev!.filter((m) => m.id !== id))} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
