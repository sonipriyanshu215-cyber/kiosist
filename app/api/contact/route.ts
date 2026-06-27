import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate minimum required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send via Resend (replace with your API key in .env.local)
    const RESEND_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_EMAIL ?? "hr@kiosist.com";

    if (RESEND_KEY) {
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
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
