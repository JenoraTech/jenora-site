import React from "react";
import CTA from "@/components/CTA";

const industries = [
  {
    name: "Financial Institutions",
    description: "Improving operational efficiency and workflow governance through automated approval systems and audit trails.",
    icon: "🏦",
  },
  {
    name: "Government Agencies",
    description: "Automating internal processes, digitizing manual records, and improving public sector accountability.",
    icon: "🏛️",
  },
  {
    name: "Corporate Organizations",
    description: "Streamlining complex multi-department approvals and operational workflows for large-scale enterprises.",
    icon: "🏢",
  },
  {
    name: "Non-Governmental Organizations",
    description: "Improving project tracking, grant management coordination, and field-to-office operational reporting.",
    icon: "🤝",
  },
  {
    name: "Educational Institutions",
    description: "Managing administrative workflows, student records, and academic approval processes seamlessly.",
    icon: "🎓",
  },
];

export default function IndustriesPage() {
  return (
    <main>
      {/* 1. Header Section */}
      <section className="section-padding" style={{ background: "var(--primary)", color: "white" }}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <h1 style={{ color: "white", fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
              Industries We Serve
            </h1>
            <p style={{ fontSize: "1.2rem", opacity: 0.9, marginTop: "1rem" }}>
              Our technology solutions are built to solve the unique operational 
              challenges faced by organizations across Africa's key sectors.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Industries Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="grid">
            {industries.map((industry, index) => (
              <div key={index} className="feature-card">
                <div style={{ fontSize: "2.5rem", marginBottom: "var(--space-sm)" }}>
                  {industry.icon}
                </div>
                <h3 style={{ marginBottom: "0.75rem", color: "var(--primary)" }}>
                  {industry.name}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Capability Highlight */}
      <section className="section-padding" style={{ background: "var(--accent)" }}>
        <div className="container">
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto"
          }}>
            <h2 style={{ marginBottom: "var(--space-sm)" }}>Versatile Solution Design</h2>
            <p style={{ fontSize: "1.1rem" }}>
              While every industry has its nuances, the core of success is 
              <strong> system optimization</strong>. Our approach focuses on understanding your 
              specific regulatory and operational environment to deliver tools that 
              actually get used.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <CTA 
        variant="brand"
        title="Solutions Tailored to Your Industry"
        description="Schedule a consultation with our industry experts to discuss your specific operational bottlenecks."
        buttons={[
          { text: "Request Consultation", link: "/contact", variant: "primary" },
          { text: "Browse Products", link: "/products", variant: "outline" }
        ]}
      />
    </main>
  );
}