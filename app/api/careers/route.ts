import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const role = formData.get("role") as string;
    const experience = formData.get("experience") as string;
    const message = formData.get("message") as string | null;
    const resume = formData.get("resume") as File | null;

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const RESEND_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.HR_EMAIL ?? "hr@kiosist.com";

    if (RESEND_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_KEY);

      const attachments: { filename: string; content: Buffer }[] = [];

      if (resume) {
        const buffer = Buffer.from(await resume.arrayBuffer());
        if (buffer.length <= 5 * 1024 * 1024) {
          attachments.push({ filename: resume.name, content: buffer });
        }
      }

      await resend.emails.send({
        from: "Kiosist Careers <no-reply@kiosist.com>",
        to: TO_EMAIL,
        subject: `New Career Application — ${name} (${role})`,
        html: `
          <h2>New Career Application</h2>
          <table>
            <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
            <tr><td><strong>Role:</strong></td><td>${role}</td></tr>
            <tr><td><strong>Experience:</strong></td><td>${experience}</td></tr>
            ${message ? `<tr><td><strong>Message:</strong></td><td>${message}</td></tr>` : ""}
          </table>
        `,
        attachments,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Career form error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
