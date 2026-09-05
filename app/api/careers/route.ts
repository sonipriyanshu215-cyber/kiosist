import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/server";

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

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: "Server is not configured to accept applications" }, { status: 500 });
    }

    // Storing the application is the actual requirement- upload the resume
    // (if any) before the insert so resume_path is set atomically with it.
    let resumePath: string | null = null;
    let resumeBuffer: Buffer | null = null;
    if (resume && resume.size > 0) {
      if (resume.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Resume exceeds 5MB limit" }, { status: 400 });
      }
      resumeBuffer = Buffer.from(await resume.arrayBuffer());
      const ext = resume.name.split(".").pop() || "pdf";
      resumePath = `${randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(resumePath, resumeBuffer, { contentType: resume.type || "application/pdf" });
      if (uploadError) {
        console.error("Resume upload failed:", uploadError);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
      }
    }

    const { error: insertError } = await supabase.from("inquiries").insert({
      type: "career",
      name,
      email,
      phone: phone || null,
      role: role || null,
      experience: experience || null,
      message: message || null,
      resume_path: resumePath,
    });
    if (insertError) {
      console.error("Failed to store career application:", insertError);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    const RESEND_KEY = process.env.RESEND_API_KEY;
    // Career applications notify every recipient below in a single send. Env
    // vars override the defaults; the Set collapses any that resolve to the
    // same address so Resend doesn't get a duplicate recipient.
    const recipients = [
      ...new Set([
        process.env.HR_EMAIL ?? "hr@kiosist.com",
        process.env.HIRING_EMAIL ?? "henaldalal@kiosist.com",
        process.env.HIRING_EMAIL_2 ?? "adaniraj2011@gmail.com",
        process.env.HIRING_EMAIL_3 ?? "outlook_3FEE387C8A6711F8@outlook.com",
      ]),
    ];

    if (RESEND_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(RESEND_KEY);

        const attachments: { filename: string; content: Buffer }[] = [];
        if (resume && resumeBuffer) {
          attachments.push({ filename: resume.name, content: resumeBuffer });
        }

        await resend.emails.send({
          from: "Kiosist Careers <no-reply@kiosist.com>",
          to: recipients,
          subject: `New Career Application- ${name} (${role})`,
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
      } catch (emailError) {
        console.error("Career email notification failed (application was still stored):", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Career form error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
