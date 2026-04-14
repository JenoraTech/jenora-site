"use client";

import React, { useState } from "react";

export default function DemoPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    position: "",
    email: "",
    phone: "",
    employees: "1-10",
    product: "JenoraFlow", // Default selection
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" } as React.CSSProperties}>
        <div className="container">
          <h2 style={{ color: "#0f172a", fontSize: "2.5rem" }}>Check Your Inbox! 📧</h2>
          <p style={{ color: "#64748b", fontSize: "1.2rem", marginTop: "1rem" }}>
            Thank you, {formData.name}. We've received your request for <strong>{formData.product}</strong> and sent a confirmation email to {formData.email}.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            style={{ marginTop: "2rem", color: "#2563eb", background: "none", border: "none", cursor: "pointer", fontWeight: "600" }}
          >
            ← Request another demo
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section 
        className="section-padding" 
        style={{ 
          background: "#0f172a", 
          color: "#ffffff", 
          paddingTop: "120px", 
          paddingBottom: "80px" 
        } as React.CSSProperties}
      >
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", marginBottom: "1.5rem", fontWeight: "800" }}>
              Experience Our Solutions
            </h1>
            <p style={{ fontSize: "1.25rem", color: "#94a3b8", lineHeight: "1.6" }}>
              See how our suite of enterprise tools can transform your organization's efficiency, transparency, and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
            gap: "4rem", 
            alignItems: "start" 
          } as React.CSSProperties}>
            
            {/* Left: Expectations */}
            <div>
              <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "#1e293b" }}>What to expect</h2>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "2rem" } as React.CSSProperties}>
                {[
                  { title: "Personalized Walkthrough", desc: "A session tailored to your specific organizational challenges." },
                  { title: "Product Deep-Dive", desc: "Explore the features that matter most to your daily operations." },
                  { title: "Implementation Roadmap", desc: "A clear plan for deploying your chosen Jenora solution." }
                ].map((item, index) => (
                  <li key={index} style={{ display: "flex", gap: "1rem" } as React.CSSProperties}>
                    <span style={{ 
                      background: "#f1f5f9", color: "#2563eb", width: "32px", height: "32px", 
                      borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: "700", flexShrink: 0
                    } as React.CSSProperties}>
                      {index + 1}
                    </span>
                    <div>
                      <h4 style={{ fontSize: "1.1rem", marginBottom: "0.25rem", color: "#0f172a" }}>{item.title}</h4>
                      <p style={{ color: "#64748b", lineHeight: "1.5" }}>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: The Form */}
            <div style={{ 
              padding: "2.5rem", backgroundColor: "#ffffff", borderRadius: "12px",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" 
            }}>
              <h3 style={{ marginBottom: "1.5rem", color: "#0f172a" }}>Request a Session</h3>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" } as React.CSSProperties}>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" } as React.CSSProperties}>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="John Doe" 
                      style={inputStyle} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Organization</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Company Name" 
                      style={inputStyle} 
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    />
                  </div>
                </div>

                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Select Product</label>
                  <select 
                    style={inputStyle} 
                    value={formData.product}
                    onChange={(e) => setFormData({...formData, product: e.target.value})}
                  >
                    <option value="JenoraFlow">JenoraFlow (Workflows)</option>
                    <option value="JenoraHR">JenoraHR (Human Resources)</option>
                    <option value="Jenora SMS">Jenora SMS (School Management)</option>
                    <option value="Jenora PropertiesConnect">Jenora PropertiesConnect (Real Estate)</option>
                    <option value="Jenora Tailor Biz Manager">Jenora Tailor Biz Manager</option>
                    <option value="Jenora Insights">Jenora Insights (Analytics)</option>
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" } as React.CSSProperties}>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Job Title</label>
                    <input 
                      type="text" 
                      placeholder="Operations Manager" 
                      style={inputStyle} 
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                    />
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+234..." 
                      style={inputStyle} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Work Email</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="name@company.com" 
                    style={inputStyle} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>How can we help?</label>
                  <textarea 
                    rows={3} 
                    placeholder="Tell us about your requirements..." 
                    style={inputStyle} 
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ 
                    backgroundColor: loading ? "#94a3b8" : "#2563eb", 
                    color: "#fff", padding: "14px", borderRadius: "6px", border: "none",
                    fontWeight: "600", cursor: loading ? "not-allowed" : "pointer"
                  } as React.CSSProperties}
                >
                  {loading ? "Scheduling..." : "Schedule My Demo"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

const labelStyle: React.CSSProperties = { fontSize: "0.85rem", fontWeight: "600", color: "#475569" };
const fieldGroupStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "0.4rem" };
const inputStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "0.95rem",
  width: "100%",
  backgroundColor: "#fff"
};