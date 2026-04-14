import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, organization, position, email, phone, employees, message } = body;

    const transporter = nodemailer.createTransport({
      host: "smtp.yourprovider.com", // replace with your mail server
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send to company inbox
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "info@jenoratech.com.ng",
      subject: "New Demo Request",
      text: `
        Name: ${name}
        Organization: ${organization}
        Position: ${position}
        Email: ${email}
        Phone: ${phone}
        Employees: ${employees}
        Message: ${message}
      `,
    });

    // Auto-reply to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "JenoraFlow Demo Request Received",
      text: `Dear ${name},\n\nThank you for requesting a demo of JenoraFlow. Our team will contact you soon to schedule your session.\n\nBest regards,\nJenora Tech Ltd`,
    });

    return NextResponse.json({ success: true, message: "Demo request submitted successfully" });
  } catch (error) {
    console.error("Error sending demo email:", error);
    return NextResponse.json({ success: false, message: "Error submitting demo request" }, { status: 500 });
  }
}