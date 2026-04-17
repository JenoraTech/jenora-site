"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

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
    product: "JenoraFlow",
    message: "",
  });

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
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ 
          minHeight: "80vh", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          textAlign: "center" 
        }}
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="container"
        >
          <motion.h2 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            style={{ color: "#0f172a", fontSize: "2.5rem" }}
          >
            Check Your Inbox! 📧
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: "#64748b", fontSize: "1.2rem", marginTop: "1rem" }}
          >
            Thank you, {formData.name}. We've received your request for <strong>{formData.product}</strong> and sent a confirmation email to {formData.email}.
          </motion.p>
          <motion.button 
            onClick={() => setSubmitted(false)}
            style={{ 
              marginTop: "2rem", 
              color: "#2563eb", 
              background: "none", 
              border: "none", 
              cursor: "pointer", 
              fontWeight: "600" 
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Request another demo
          </motion.button>
        </motion.div>
      </motion.main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="section-padding" 
        style={{ 
          background: "#0f172a", 
          color: "#ffffff", 
          paddingTop: "120px", 
          paddingBottom: "80px" 
        }}
      >
        <div className="container">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ maxWidth: "800px" }}
          >
            <motion.h1 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ 
                fontSize: "clamp(2.5rem, 6vw, 4rem)", 
                marginBottom: "1.5rem", 
                fontWeight: "800" 
              }}
            >
              Experience Our Solutions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ 
                fontSize: "1.25rem", 
                color: "#94a3b8", 
                lineHeight: "1.6" 
              }}
            >
              See how our suite of enterprise tools can transform your organization's efficiency, transparency, and growth.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Grid Section */}
      <motion.section 
        className="section-padding"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="container">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
              gap: "4rem", 
              alignItems: "start" 
            }}
          >
            
            {/* Left: Expectations */}
            <motion.div variants={itemVariants}>
              <motion.h2 
                whileHover={{ scale: 1.01 }}
                style={{ 
                  fontSize: "2rem", 
                  marginBottom: "2rem", 
                  color: "#1e293b" 
                }}
              >
                What to expect
              </motion.h2>
              <motion.ul 
                variants={containerVariants}
                style={{ 
                  listStyle: "none", 
                  padding: 0, 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "2rem" 
                }}
              >
                {[
                  { title: "Personalized Walkthrough", desc: "A session tailored to your specific organizational challenges." },
                  { title: "Product Deep-Dive", desc: "Explore the features that matter most to your daily operations." },
                  { title: "Implementation Roadmap", desc: "A clear plan for deploying your chosen Jenora solution." }
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    style={{ display: "flex", gap: "1rem" }}
                  >
                    <motion.span 
                      whileHover={{ rotate: 10 }}
                      style={{ 
                        background: "#f1f5f9", 
                        color: "#2563eb", 
                        width: "32px", 
                        height: "32px", 
                        borderRadius: "50%", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        fontWeight: "700", 
                        flexShrink: 0
                      }}
                    >
                      {index + 1}
                    </motion.span>
                    <div>
                      <h4 style={{ fontSize: "1.1rem", marginBottom: "0.25rem", color: "#0f172a" }}>{item.title}</h4>
                      <p style={{ color: "#64748b", lineHeight: "1.5" }}>{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Right: The Form */}
            <motion.div 
              variants={itemVariants}
              whileHover={cardHover}
              style={{ 
                padding: "2.5rem", 
                backgroundColor: "#ffffff", 
                borderRadius: "12px",
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" 
              }}
            >
              <motion.h3 
                whileHover={{ scale: 1.01 }}
                style={{ 
                  marginBottom: "1.5rem", 
                  color: "#0f172a" 
                }}
              >
                Request a Session
              </motion.h3>
              <motion.form 
                onSubmit={handleSubmit} 
                variants={containerVariants}
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "1.25rem" 
                }}
              >
                
                <motion.div 
                  variants={itemVariants}
                  style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr", 
                    gap: "1rem" 
                  }}
                >
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Name</label>
                    <motion.input 
                      required 
                      type="text" 
                      placeholder="John Doe" 
                      style={inputStyle} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      whileFocus={{ 
                        borderColor: "#2563eb",
                        boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)"
                      }}
                    />
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Organization</label>
                    <motion.input 
                      required 
                      type="text" 
                      placeholder="Company Name" 
                      style={inputStyle} 
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      whileFocus={{ 
                        borderColor: "#2563eb",
                        boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)"
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} style={fieldGroupStyle}>
                  <label style={labelStyle}>Select Product</label>
                  <motion.select 
                    style={inputStyle} 
                    value={formData.product}
                    onChange={(e) => setFormData({...formData, product: e.target.value})}
                    whileFocus={{ 
                      borderColor: "#2563eb",
                      boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)"
                    }}
                  >
                    <option value="JenoraFlow">JenoraFlow (Workflows)</option>
                    <option value="JenoraHR">JenoraHR (Human Resources)</option>
                    <option value="Jenora SMS">Jenora SMS (School Management)</option>
                    <option value="Jenora PropertiesConnect">Jenora PropertiesConnect (Real Estate)</option>
                    <option value="Jenora Tailor Biz Manager">Jenora Tailor Biz Manager</option>
                    <option value="Jenora Insights">Jenora Insights (Analytics)</option>
                  </motion.select>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr", 
                    gap: "1rem" 
                  }}
                >
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Job Title</label>
                    <motion.input 
                      type="text" 
                      placeholder="Operations Manager" 
                      style={inputStyle} 
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      whileFocus={{ 
                        borderColor: "#2563eb",
                        boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)"
                      }}
                    />
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Phone Number</label>
                    <motion.input 
                      type="tel" 
                      placeholder="+234..." 
                      style={inputStyle} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      whileFocus={{ 
                        borderColor: "#2563eb",
                        boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)"
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} style={fieldGroupStyle}>
                  <label style={labelStyle}>Work Email</label>
                  <motion.input 
                    required 
                    type="email" 
                    placeholder="name@company.com" 
                    style={inputStyle} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    whileFocus={{ 
                      borderColor: "#2563eb",
                      boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)"
                    }}
                  />
                </motion.div>

                <motion.div variants={itemVariants} style={fieldGroupStyle}>
                  <label style={labelStyle}>How can we help?</label>
                  <motion.textarea 
                    rows={3} 
                    placeholder="Tell us about your requirements..." 
                    style={inputStyle} 
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    whileFocus={{ 
                      borderColor: "#2563eb",
                      boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)"
                    }}
                  />
                </motion.div>

                <motion.button 
                  type="submit" 
                  disabled={loading}
                  variants={itemVariants}
                  whileHover={loading ? {} : buttonHover}
                  whileTap={loading ? {} : buttonTap}
                  style={{ 
                    backgroundColor: loading ? "#94a3b8" : "#2563eb", 
                    color: "#fff", 
                    padding: "14px", 
                    borderRadius: "6px", 
                    border: "none",
                    fontWeight: "600", 
                    cursor: loading ? "not-allowed" : "pointer"
                  }}
                >
                  {loading ? "Scheduling..." : "Schedule My Demo"}
                </motion.button>
              </motion.form>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.main>
  );
}

const labelStyle: React.CSSProperties = { 
  fontSize: "0.85rem", 
  fontWeight: "600", 
  color: "#475569" 
};

const fieldGroupStyle: React.CSSProperties = { 
  display: "flex", 
  flexDirection: "column", 
  gap: "0.4rem" 
};

const inputStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "0.95rem",
  width: "100%",
  backgroundColor: "#fff",
  transition: "all 0.2s ease"
};