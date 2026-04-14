"use client";

import React, { useState } from "react";

export default function ContactPage() {
  // 1. State for form data
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    message: "",
  });

  // 2. State for UI feedback
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // 3. Handle Form Submission via API Route
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // We call our internal API route which handles Nodemailer
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: "", organization: "", email: "", phone: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again or contact us via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="section-padding" style={{ background: "var(--accent, #f8fafc)", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container">
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", marginBottom: "1rem" }}>Contact Jenora Tech</h1>
          <p style={{ maxWidth: "700px", fontSize: "1.2rem", color: "var(--text-muted, #64748b)" }}>
            Speak with our team to explore how our enterprise systems and workflow automation 
            can help optimize your organization’s operations.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "4rem",
            alignItems: "start" 
          }}>
            
            {/* Form Column */}
            <div className="feature-card" style={{ padding: "2.5rem" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                  <h2 style={{ marginBottom: "1rem" }}>Inquiry Sent!</h2>
                  <p style={{ color: "var(--text-muted)" }}>Thank you for reaching out. Our team will review your message and get back to you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className="btn btn-outline" 
                    style={{ marginTop: "1.5rem", color: "var(--primary)", borderColor: "var(--primary)" }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 style={{ marginBottom: "2rem", fontSize: "1.75rem" }}>Send us a message</h2>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    
                    {error && <p style={{ color: "#dc2626", fontSize: "0.9rem", fontWeight: "600" }}>{error}</p>}

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        style={inputStyle} 
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>Organization Name</label>
                      <input 
                        type="text" 
                        name="organization" 
                        required 
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="e.g. Jenora Tech Ltd"
                        style={inputStyle} 
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        style={inputStyle} 
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234..."
                        style={inputStyle} 
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>Message</label>
                      <textarea 
                        name="message" 
                        rows={5} 
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        style={{ ...inputStyle, resize: "none" }}
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn btn-primary"
                      style={{ padding: "14px", fontSize: "1rem", marginTop: "1rem" }}
                    >
                      {loading ? "Sending..." : "Send Inquiry"}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Info Column */}
            <div>
              <div style={{ marginBottom: "3rem" }}>
                <h3 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>Our Office</h3>
                <p style={{ lineHeight: "1.6", color: "var(--text-main)", marginBottom: "0.5rem" }}>
                  Sanusi Sanusi House, off Sabon TiTi,<br /> 
                  Behind Kontangora Plaza, Bosso,<br /> 
                  Minna, Niger State.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div>
                  <h4 style={infoLabelStyle}>Email Us</h4>
                  <a href="mailto:info@jenoratech.com.ng" style={infoLinkStyle}>
                    info@jenoratech.com.ng
                  </a>
                </div>

                <div>
                  <h4 style={infoLabelStyle}>Call Us</h4>
                  <a href="tel:+2348037706206" style={infoLinkStyle}>
                    +234 803 770 6206
                  </a>
                </div>

                <div>
                  <h4 style={infoLabelStyle}>WhatsApp</h4>
                  <a 
                    href="https://wa.me/2348037706206" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ fontSize: "1.2rem", color: "#25D366", textDecoration: "none", fontWeight: "600" }}
                  >
                    Chat with an Expert →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Reusable Styles
const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "1rem",
  width: "100%"
};

const infoLabelStyle = {
  fontSize: "0.9rem",
  color: "var(--secondary)",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  marginBottom: "0.5rem"
};

const infoLinkStyle = {
  fontSize: "1.2rem",
  color: "var(--primary)",
  textDecoration: "none",
  fontWeight: "600"
};