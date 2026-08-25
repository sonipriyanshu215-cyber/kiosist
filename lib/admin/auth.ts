import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/admin/session";

// Defense-in-depth re-check for every admin Route Handler and the admin
// layout. proxy.ts already redirects unauthenticated page visits, but per
// Next's own guidance Proxy is an optimistic check, not a full auth
// boundary- Route Handlers are reachable directly regardless of the UI.
export async function requireAdminSession(): Promise<boolean> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}
