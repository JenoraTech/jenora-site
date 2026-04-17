"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut", // TypeScript now knows this is exactly "easeOut"
    },
  },
} as const; // <--- Add this here

  const cardHover = {
  scale: 1.02,
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  transition: {
    type: "spring", // TypeScript now knows this is EXACTLY "spring"
    stiffness: 300,
  },
} as const;
  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  };

  const buttonTap = {
    scale: 0.98
  };

  return (
    <main>
      {/* Hero Section */}
      <motion.section 
        className="section-padding" 
        style={{ background: "var(--accent, #f8fafc)", borderBottom: "1px solid #e2e8f0" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.h1 
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", marginBottom: "1rem" }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Contact Jenora Tech
          </motion.h1>
          <motion.p 
            style={{ maxWidth: "700px", fontSize: "1.2rem", color: "var(--text-muted, #64748b)" }}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Speak with our team to explore how our enterprise systems and workflow automation 
            can help optimize your organization's operations.
          </motion.p>
        </div>
      </motion.section>

      <motion.section 
        className="section-padding"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="container">
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "4rem",
            alignItems: "start" 
          }}>
            
            {/* Form Column */}
            <motion.div 
              className="feature-card" 
              style={{ padding: "2.5rem", borderRadius: "12px", background: "#fff" }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={cardHover}
            >
              {submitted ? (
                <motion.div 
                  style={{ textAlign: "center", padding: "2rem" }}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div 
                    style={{ fontSize: "3rem", marginBottom: "1rem" }}
                    variants={itemVariants}
                  >
                    ✅
                  </motion.div>
                  <motion.h2 
                    style={{ marginBottom: "1rem" }}
                    variants={itemVariants}
                  >
                    Inquiry Sent!
                  </motion.h2>
                  <motion.p 
                    style={{ color: "var(--text-muted)" }}
                    variants={itemVariants}
                  >
                    Thank you for reaching out. Our team will review your message and get back to you shortly.
                  </motion.p>
                  <motion.button 
                    onClick={() => setSubmitted(false)} 
                    className="btn btn-outline" 
                    style={{ 
                      marginTop: "1.5rem", 
                      color: "var(--primary)", 
                      borderColor: "var(--primary)",
                      padding: "14px",
                      fontSize: "1rem",
                      background: "transparent",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                    variants={itemVariants}
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h2 
                    style={{ marginBottom: "2rem", fontSize: "1.75rem" }}
                    variants={itemVariants}
                  >
                    Send us a message
                  </motion.h2>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    
                    {error && (
                      <motion.p 
                        style={{ color: "#dc2626", fontSize: "0.9rem", fontWeight: "600" }}
                        variants={itemVariants}
                      >
                        {error}
                      </motion.p>
                    )}

                    <motion.div 
                      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
                      variants={itemVariants}
                    >
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
                    </motion.div>

                    <motion.div 
                      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
                      variants={itemVariants}
                    >
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
                    </motion.div>

                    <motion.div 
                      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
                      variants={itemVariants}
                    >
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
                    </motion.div>

                    <motion.div 
                      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
                      variants={itemVariants}
                    >
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
                    </motion.div>

                    <motion.div 
                      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
                      variants={itemVariants}
                    >
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
                    </motion.div>

                    <motion.button 
                      type="submit" 
                      disabled={loading}
                      className="btn btn-primary"
                      style={{ 
                        padding: "14px", 
                        fontSize: "1rem", 
                        marginTop: "1rem",
                        background: "var(--primary)",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                      variants={itemVariants}
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                    >
                      {loading ? "Sending..." : "Send Inquiry"}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </motion.div>

            {/* Info Column */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                style={{ marginBottom: "3rem" }}
                variants={itemVariants}
              >
                <h3 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>Our Office</h3>
                <p style={{ lineHeight: "1.6", color: "var(--text-main)", marginBottom: "0.5rem" }}>
                  Sanusi Sanusi House, off Sabon TiTi,<br /> 
                  Behind Kontangora Plaza, Bosso,<br /> 
                  Minna, Niger State.
                </p>
              </motion.div>

              <motion.div 
                style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <h4 style={infoLabelStyle}>Email Us</h4>
                  <motion.a 
  href="mailto:info@jenoratech.com.ng" 
  style={infoLinkStyle}
  whileHover={{ scale: 1.05 }}
>
  info@jenoratech.com.ng
</motion.a>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h4 style={infoLabelStyle}>Call Us</h4>
                  <a href="tel:+2348037706206" style={infoLinkStyle}>
                    +234 803 770 6206
                  </a>
                </motion.div>

                <motion.div variants={itemVariants}>
  <motion.div variants={itemVariants}>
  <h4 style={{
    ...infoLabelStyle,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    color: "#1a1a1a"
  }}>
    WhatsApp
  </h4>
  <motion.a
    href="https://wa.me/2348037706206"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      ...infoLinkStyle,
      color: "#25D366",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
      fontSize: "1.1rem",
      padding: "8px 12px",
      borderRadius: "8px",
      background: "rgba(37, 211, 102, 0.1)",
      transition: "all 0.3s ease"
    }}
    whileHover={{ 
      scale: 1.05,
      background: "rgba(37, 211, 102, 0.15)"
    }}
    whileTap={{ scale: 0.98 }}
  >
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-10.446-7.8c-2.914 0-5.28 2.365-5.28 5.28 0 1.166.38 2.245 1.025 3.12L3 20l3.766-1.104a5.23 5.23 0 0 0 2.76.775c2.914 0 5.28-2.365 5.28-5.28 0-2.915-2.366-5.28-5.28-5.28z" 
        fill="#25D366"
      />
    </svg>
    Chat with an Expert
  </motion.a>
</motion.div>
</motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

// Reusable Styles
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
  color: "#1a1a1a", // Changed to a darker color for better readability
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  marginBottom: "0.5rem",
  fontFamily: "'Inter', sans-serif", // Added Inter font
  fontWeight: 600 // Increased weight for better hierarchy
};

const infoLinkStyle = {
  fontSize: "1.1rem", // Slightly smaller font size
  color: "var(--primary)",
  textDecoration: "none",
  fontWeight: 500, // Adjusted weight for better contrast
  fontFamily: "'Inter', sans-serif", // Added Inter font
};