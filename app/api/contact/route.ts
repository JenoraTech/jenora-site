import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, organization, email, phone, message } = body;

    // 1. Server-Side Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing." },
        { status: 400 }
      );
    }

    // 2. Initialize Supabase
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 3. Save to Database (Primary Action)
    const { error: dbError } = await supabase
      .from("contacts")
      .insert([
        {
          name,
          organization,
          email,
          phone,
          message,
        },
      ]);

    if (dbError) {
      console.error("❌ SUPABASE DB ERROR:", dbError.message);
      return NextResponse.json(
        { success: false, message: "Database save failed." },
        { status: 500 }
      );
    }

    console.log("✅ DATA SAVED TO SUPABASE");

    // 4. Send Emails (Secondary Action)
    try {
      const transporter = nodemailer.createTransport({
  host: "da29.host-ww.net", // 👈 Use the hostname from the error message
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
});

      // Notification to Jenora Tech Inbox
      await transporter.sendMail({
        from: `"Jenora Web Form" <${process.env.EMAIL_USER}>`,
        to: "info@jenoratech.com.ng",
        replyTo: email, // Click 'Reply' in your inbox to email the client back
        subject: `New Inquiry from ${organization || name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #333;">
            <h2 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Contact Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Organization:</strong> ${organization || "N/A"}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #0f172a;">
              <strong>Message:</strong><br />
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `,
      });

      // Confirmation to the Client
      await transporter.sendMail({
        from: `"Jenora Tech Ltd" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "We received your inquiry - Jenora Tech Ltd",
        text: `Dear ${name},\n\nThank you for reaching out to Jenora Tech Ltd. We have received your message regarding ${organization || 'your inquiry'} and our team will get back to you shortly.\n\nBest regards,\nThe Jenora Tech Team`,
      });

      console.log("✅ EMAILS SENT SUCCESSFULLY");
    } catch (mailError: any) {
      // If email fails, we still return success because the lead is in the DB
      console.error("⚠️ EMAIL ERROR:", mailError.message);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Your inquiry has been submitted successfully." 
    });

  } catch (error: any) {
    console.error("🔥 CRITICAL ROUTE ERROR:", error.message);
    return NextResponse.json(
      { success: false, message: "A server error occurred." },
      { status: 500 }
    );
  }
}