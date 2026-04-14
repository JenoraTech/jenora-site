import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, organization, position, email, phone, employees, message } = body;

    // 1. Server-Side Validation
    if (!name || !email || !organization) {
      return NextResponse.json(
        { success: false, message: "Required fields (Name, Email, Organization) are missing." },
        { status: 400 }
      );
    }

    // 2. Initialize Supabase
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 3. Save to Database (Demo Requests Table)
    // Make sure you have a "demo_requests" table in Supabase with these columns
    const { error: dbError } = await supabase
      .from("demo_requests") 
      .insert([
        {
          name,
          organization,
          position,
          email,
          phone,
          employees,
          message,
        },
      ]);

    if (dbError) {
      console.error("❌ SUPABASE DB ERROR:", dbError.message);
      // We continue to email even if DB fails, or you can return error here
    } else {
      console.log("✅ DEMO DATA SAVED TO SUPABASE");
    }

    // 4. Send Emails
    try {
      const transporter = nodemailer.createTransport({
        host: "da29.host-ww.net", 
        port: 465,
        secure: true, 
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
      });

      // A. Notification to Jenora Tech Team
      await transporter.sendMail({
        from: `"Jenora Demo Portal" <${process.env.EMAIL_USER}>`,
        to: "info@jenoratech.com.ng",
        replyTo: email,
        subject: `New Demo Request: ${organization}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #333;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Demo Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Position:</strong> ${position || "Not specified"}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not specified"}</p>
            <p><strong>Employees:</strong> ${employees || "Not specified"}</p>
            <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin-top: 15px;">
              <strong>Additional Message:</strong><br />
              <p style="white-space: pre-wrap;">${message || "No message provided."}</p>
            </div>
          </div>
        `,
      });

      // B. Auto-Reply to the Client
      await transporter.sendMail({
        from: `"Jenora Tech Ltd" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "JenoraFlow Demo Request Received",
        text: `Dear ${name},\n\nThank you for requesting a demo of JenoraFlow. We have received your details for ${organization} and our team will contact you soon to schedule a personalized session.\n\nBest regards,\nThe Jenora Tech Team`,
      });

      console.log("✅ DEMO EMAILS SENT SUCCESSFULLY");
    } catch (mailError: any) {
      console.error("⚠️ MAIL ERROR:", mailError.message);
      // We don't crash the whole request if only the email fails
    }

    return NextResponse.json({ 
      success: true, 
      message: "Demo request submitted successfully!" 
    });

  } catch (error: any) {
    console.error("🔥 CRITICAL DEMO ROUTE ERROR:", error.message);
    return NextResponse.json(
      { success: false, message: "A server error occurred." },
      { status: 500 }
    );
  }
}