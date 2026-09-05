import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate minimum required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Storing the inquiry is the actual requirement- a DB failure fails the
    // request. Email below is a best-effort notification on top of that.
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: "Server is not configured to accept inquiries" }, { status: 500 });
    }

    const { error: insertError } = await supabase.from("inquiries").insert({
      type: "contact",
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      properties: data.properties || null,
      message: data.message,
    });
    if (insertError) {
      console.error("Failed to store contact inquiry:", insertError);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    // Send via Resend (replace with your API key in .env.local)
    const RESEND_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_EMAIL ?? "hr@kiosist.com";

    if (RESEND_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(RESEND_KEY);

        await resend.emails.send({
          from: "Kiosist Website <no-reply@kiosist.com>",
          to: TO_EMAIL,
          subject: `New inquiry from ${data.name}`,
          html: `
            <h2>New Inquiry from Kiosist Website</h2>
            <table>
              <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
              <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
              ${data.phone ? `<tr><td><strong>Phone:</strong></td><td>${data.phone}</td></tr>` : ""}
              ${data.company ? `<tr><td><strong>Company:</strong></td><td>${data.company}</td></tr>` : ""}
              ${data.properties ? `<tr><td><strong>Properties:</strong></td><td>${data.properties}</td></tr>` : ""}
              <tr><td><strong>Message:</strong></td><td>${data.message}</td></tr>
            </table>
          `,
        });
      } catch (emailError) {
        console.error("Contact email notification failed (inquiry was still stored):", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
