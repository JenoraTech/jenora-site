import React from "react";

export default async function DemoPage({ 
  params 
}: { 
  params: Promise<{ id?: string }> 
}) {
  // 1. Await params to clear the console error shown in your screenshot
  await params; 

  return (
    <main>
      {/* Hero Section - UPDATED COLORS FOR READABILITY */}
      <section 
        className="section-padding" 
        style={{ 
          background: "#0f172a", // Solid dark slate
          color: "#ffffff",      // Force white text
          paddingTop: "100px",   // Extra space for the fixed navbar
          paddingBottom: "80px"
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <h1 style={{ 
              fontSize: "clamp(2.5rem, 6vw, 4rem)", 
              marginBottom: "1.5rem",
              color: "#ffffff",  // Explicitly set headline to white
              fontWeight: "800"
            }}>
              See JenoraFlow in Action
            </h1>
            <p style={{ 
              fontSize: "1.25rem", 
              color: "#94a3b8",   // Light slate for the subtext
              lineHeight: "1.6" 
            }}>
              Discover how our automated workflow engine can eliminate bottlenecks, 
              improve transparency, and scale your organization's operations.
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
            gap: "5rem", 
            alignItems: "start" 
          }}>
            
            {/* Left Column: Expectations */}
            <div>
              <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "#1e293b" }}>What to expect</h2>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "2rem" }}>
                {[
                  { title: "Personalized Walkthrough", desc: "A 30-minute session tailored to your specific organizational challenges." },
                  { title: "Efficiency Audit", desc: "We'll identify manual processes that are currently costing you time and money." },
                  { title: "Implementation Roadmap", desc: "Get a clear step-by-step plan for deploying JenoraFlow in your team." }
                ].map((item, index) => (
                  <li key={index} style={{ display: "flex", gap: "1rem" }}>
                    <span style={{ 
                      background: "#f1f5f9", 
                      color: "#2563eb",
                      width: "32px", height: "32px", borderRadius: "50%", 
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: "700", flexShrink: 0
                    }}>
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

            {/* Right Column: Form */}
            <div className="feature-card" style={{ 
              padding: "2.5rem", 
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
            }}>
              <h3 style={{ marginBottom: "1.5rem", color: "#0f172a" }}>Request a Session</h3>
              <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Form fields stay the same as previous logic */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Name</label>
                    <input type="text" placeholder="John Doe" style={inputStyle} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Organization</label>
                    <input type="text" placeholder="Company Name" style={inputStyle} />
                  </div>
                </div>
                
                {/* Email Field */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Email</label>
                  <input type="email" placeholder="work@email.com" style={inputStyle} />
                </div>

                <button type="submit" style={{ 
                  backgroundColor: "#2563eb", 
                  color: "#fff", 
                  padding: "14px", 
                  borderRadius: "6px", 
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                  marginTop: "1rem"
                }}>
                  Schedule My Demo
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const inputStyle = {
  padding: "10px 14px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "0.95rem",
  width: "100%",
  backgroundColor: "#fff"
};