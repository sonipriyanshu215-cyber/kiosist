import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

// Cognito Forms "Post JSON Data to a Website" (Form Settings -> Submit
// Entry Endpoint) hits this on every new career-application submission.
// Paste this route's URL with ?token=<COGNITO_WEBHOOK_SECRET> there- see
// .env.local.example. Cognito Forms itself emails NOTIFY_EMAILS (set that
// up in its dashboard, this route does not send email)- this route's only
// job is mirroring the submission into this app's own Admin -> Inquiries.
//
// Cognito's JSON webhook has no fixed documented schema beyond "all entry
// field data is included"- field names come from however the form's
// fields are labeled/keyed on cognitoforms.com, which isn't visible from
// here. Rather than guess exact key names and silently drop data that
// doesn't match, this makes a best-effort guess at name/email/phone for
// the Admin table's columns, and always keeps the FULL raw payload
// (pretty-printed) in `message`- so nothing submitted is ever lost even if
// the guess is wrong. After wiring this up, submit a real test entry and
// check what actually came through; tighten pickField's key lists below if
// the guessed name/email/phone come out wrong.
export async function POST(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (!token || token !== process.env.COGNITO_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });

  const name =
    pickField(payload, ["name", "fullname"]) ??
    composeName(payload) ??
    "Cognito applicant (name not detected- see full entry below)";
  const email = pickField(payload, ["email", "emailaddress"]) ?? "unknown@cognitoforms";
  const phone = pickField(payload, ["phone", "phonenumber", "mobile"]);

  const { error } = await supabase.from("inquiries").insert({
    type: "career",
    name,
    email,
    phone: phone ?? null,
    message: `Submitted via Cognito Forms (form 60, key TycOYcXxuEmytNohz9WhuQ). Full entry:\n\n${JSON.stringify(payload, null, 2)}`,
  });

  if (error) {
    console.error("Failed to store Cognito Forms submission:", error);
    // Non-2xx so Cognito's own retry mechanism (up to 15x over 72h) kicks in.
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

function normalizeKey(s: string): string {
  return s.toLowerCase().replace(/[\s_.-]/g, "");
}

// Case/spacing/punctuation-insensitive lookup across the payload's top-level
// keys, with a one-level dive into an object value (Cognito's built-in
// "Name" field is a composite that plausibly serializes as
// { First, Last }/{ FirstName, LastName } rather than a single string).
function pickField(payload: Record<string, unknown>, keys: string[]): string | null {
  const wanted = new Set(keys.map(normalizeKey));
  for (const [k, v] of Object.entries(payload)) {
    if (!wanted.has(normalizeKey(k))) continue;
    if (typeof v === "string" && v.trim()) return v.trim();
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const nested = Object.values(v as Record<string, unknown>).filter(
        (x): x is string => typeof x === "string" && x.trim().length > 0
      );
      if (nested.length) return nested.join(" ");
    }
  }
  return null;
}

function composeName(payload: Record<string, unknown>): string | null {
  const first = pickField(payload, ["first", "firstname", "namefirst"]);
  const last = pickField(payload, ["last", "lastname", "namelast"]);
  if (first || last) return [first, last].filter(Boolean).join(" ");
  return null;
}
