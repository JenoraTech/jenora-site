"use client";
import { useState } from "react";

// Professional Tip: Define a type for your form status
type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const result = await res.json();
      setStatus("success");
      setMessage(result.message || "Thank you! Our team will contact you shortly.");
      (e.target as HTMLFormElement).reset(); // Clear form on success
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again or email us directly.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" placeholder="John Doe" required />
      </div>

      <div className="form-group">
        <label htmlFor="organization">Organization Name</label>
        <input type="text" id="organization" name="organization" placeholder="Jenora Tech Ltd" required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="email@company.com" required />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="+234..." required />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea 
          id="message" 
          name="message" 
          rows={5} 
          placeholder="How can we help optimize your systems?"
          required 
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary" 
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Submit Inquiry"}
      </button>

      {message && (
        <div className={`form-feedback ${status}`}>
          {message}
        </div>
      )}
    </form>
  );
}