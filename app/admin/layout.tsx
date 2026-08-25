import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Kiosist Admin" },
  robots: { index: false, follow: false },
};

// Deliberately bare- no marketing Nav/Footer/particle background/intro
// (those live in app/(site)/layout.tsx). The session-gated shell for
// authenticated pages lives one level down, in (protected)/layout.tsx, so
// /admin/login can render without a sidebar or an auth check.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-kio-bg text-kio-ink">{children}</div>;
}
