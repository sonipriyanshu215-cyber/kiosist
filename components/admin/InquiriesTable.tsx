"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Trash2, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type Inquiry = {
  id: string;
  type: "contact" | "career";
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  properties: string | null;
  role: string | null;
  experience: string | null;
  message: string | null;
  resume_path: string | null;
  status: "new" | "read" | "archived";
  created_at: string;
};

const STATUS_STYLES: Record<Inquiry["status"], string> = {
  new: "bg-kio-accent/15 text-kio-accent",
  read: "bg-kio-line/50 text-kio-muted",
  archived: "bg-kio-error/10 text-kio-error",
};

export function InquiriesTable() {
  const [inquiries, setInquiries] = useState<Inquiry[] | null>(null);
  const [typeFilter, setTypeFilter] = useState<"all" | Inquiry["type"]>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | Inquiry["status"]>("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/inquiries");
    if (!res.ok) {
      setError("Could not load inquiries.");
      return;
    }
    const data = await res.json();
    setInquiries(data.inquiries);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!inquiries) return [];
    return inquiries.filter(
      (i) => (typeFilter === "all" || i.type === typeFilter) && (statusFilter === "all" || i.status === statusFilter)
    );
  }, [inquiries, typeFilter, statusFilter]);

  async function updateStatus(id: string, status: Inquiry["status"]) {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setInquiries((prev) => prev?.map((i) => (i.id === id ? { ...i, status } : i)) ?? null);
    setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  }

  async function remove(id: string) {
    if (!confirm("Delete this inquiry permanently?")) return;
    await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    setInquiries((prev) => prev?.filter((i) => i.id !== id) ?? null);
    setSelected((prev) => (prev?.id === id ? null : prev));
  }

  function openDetail(inquiry: Inquiry) {
    setSelected(inquiry);
    if (inquiry.status === "new") updateStatus(inquiry.id, "read");
  }

  if (error) return <p className="text-sm text-kio-error">{error}</p>;
  if (!inquiries) return <p className="text-sm text-kio-muted">Loading…</p>;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", "contact", "career"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
              typeFilter === t ? "bg-kio-primary text-white" : "bg-kio-line/40 text-kio-muted hover:bg-kio-line/60"
            )}
          >
            {t}
          </button>
        ))}
        <span className="mx-1 w-px bg-kio-line" />
        {(["all", "new", "read", "archived"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
              statusFilter === s ? "bg-kio-primary text-white" : "bg-kio-line/40 text-kio-muted hover:bg-kio-line/60"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-kio-line">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-kio-bg-soft text-xs uppercase tracking-wide text-kio-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr
                key={i.id}
                onClick={() => openDetail(i)}
                className="cursor-pointer border-t border-kio-line hover:bg-kio-bg-soft"
              >
                <td className="px-4 py-3 font-medium text-kio-ink">{i.name}</td>
                <td className="px-4 py-3 capitalize text-kio-muted">{i.type}</td>
                <td className="px-4 py-3 text-kio-muted">{i.email}</td>
                <td className="px-4 py-3">
                  <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold capitalize", STATUS_STYLES[i.status])}>
                    {i.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-kio-muted">{new Date(i.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(i.id);
                    }}
                    className="text-kio-muted hover:text-kio-error"
                    aria-label="Delete inquiry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-kio-muted">
                  No inquiries match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-kio-line bg-kio-bg p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-kio-ink">{selected.name}</h2>
                <p className="text-sm capitalize text-kio-muted">{selected.type} inquiry</p>
              </div>
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold capitalize", STATUS_STYLES[selected.status])}>
                {selected.status}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <p className="flex items-center gap-2 text-kio-ink">
                <Mail className="h-4 w-4 text-kio-muted" /> {selected.email}
              </p>
              {selected.phone && (
                <p className="flex items-center gap-2 text-kio-ink">
                  <Phone className="h-4 w-4 text-kio-muted" /> {selected.phone}
                </p>
              )}
              {selected.company && <p className="text-kio-ink"><span className="text-kio-muted">Company:</span> {selected.company}</p>}
              {selected.properties && <p className="text-kio-ink"><span className="text-kio-muted">Properties:</span> {selected.properties}</p>}
              {selected.role && <p className="text-kio-ink"><span className="text-kio-muted">Role:</span> {selected.role}</p>}
              {selected.experience && <p className="text-kio-ink"><span className="text-kio-muted">Experience:</span> {selected.experience}</p>}
              {selected.message && (
                <p className="whitespace-pre-wrap rounded-lg bg-kio-bg-soft p-3 text-kio-ink">{selected.message}</p>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {selected.resume_path && (
                <a
                  href={`/api/admin/inquiries/${selected.id}/resume`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full bg-kio-accent/15 px-4 py-2 text-xs font-semibold text-kio-accent hover:bg-kio-accent/25"
                >
                  <Download className="h-3.5 w-3.5" /> Resume
                </a>
              )}
              {(["new", "read", "archived"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(selected.id, s)}
                  disabled={selected.status === s}
                  className="rounded-full border border-kio-line px-4 py-2 text-xs font-semibold capitalize text-kio-muted hover:border-kio-accent hover:text-kio-accent disabled:opacity-40"
                >
                  Mark {s}
                </button>
              ))}
              <button
                onClick={() => remove(selected.id)}
                className="ml-auto rounded-full px-4 py-2 text-xs font-semibold text-kio-error hover:bg-kio-error/10"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
