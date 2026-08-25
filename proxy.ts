import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/admin/session";

// Optimistic check only- redirects obviously-unauthenticated visits to
// /admin pages before they render. Every admin Route Handler and the admin
// layout re-verify the session server-side too (see lib/admin/auth.ts),
// since Proxy alone isn't a full auth boundary.
export async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const authed = await verifySession(token);

  if (!authed) {
    if (request.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)", "/api/admin/((?!login).*)"],
};
