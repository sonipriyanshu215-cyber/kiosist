import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/auth";
import { AdminShell } from "@/components/admin/AdminShell";

// Real auth boundary for every authenticated admin page- proxy.ts already
// redirects unauthenticated visits optimistically, but this re-verifies
// server-side so the check doesn't depend on proxy config staying correct.
export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await requireAdminSession();
  if (!authed) redirect("/admin/login");

  return <AdminShell>{children}</AdminShell>;
}
