"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Type,
  Image as ImageIcon,
  LogOut,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { href: "/admin/inquiries", label: "Inquiries", Icon: Inbox },
  { href: "/admin/content", label: "Content", Icon: FileText },
  { href: "/admin/text", label: "Page Text", Icon: Type },
  { href: "/admin/media", label: "Media", Icon: ImageIcon },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 shrink-0 flex-col border-r border-kio-line bg-kio-bg-soft p-4">
        <Link href="/admin" className="mb-6 block px-2 text-lg font-bold text-kio-ink">
          Kiosist <span className="text-kio-accent">Admin</span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV_LINKS.map(({ href, label, Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-kio-accent/15 text-kio-accent"
                    : "text-kio-muted hover:bg-kio-line/40 hover:text-kio-ink"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-kio-muted transition-colors hover:bg-kio-error/10 hover:text-kio-error"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </aside>
      <main className="flex-1 overflow-x-auto p-6 md:p-10">{children}</main>
    </div>
  );
}
