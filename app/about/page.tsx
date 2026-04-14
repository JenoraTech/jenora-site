import CTA from "@/components/CTA"; // Adjust path as needed

export default function AboutPage() {
  return (
    <main>
      {/* 1. Header Section */}
      <section className="section-padding" style={{ background: "var(--accent)", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container">
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1rem" }}>
            About Jenora Tech Ltd
          </h1>
          <p style={{ maxWidth: "700px", fontSize: "1.1rem", color: "var(--text-muted)" }}>
            Jenora Tech Ltd was founded with a vision to help African organizations 
            transform how they operate through intelligent enterprise systems.
          </p>
        </div>
      </section>

      {/* 2. Vision & Mission Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-md)" }}>
            <div className="feature-card">
              <h2 style={{ fontSize: "1.5rem" }}>Vision</h2>
              <p>To become Africa’s leading enterprise software and business systems design company within the next decade.</p>
            </div>
            <div className="feature-card">
              <h2 style={{ fontSize: "1.5rem" }}>Mission</h2>
              <p>To empower organizations with intelligent technology systems that optimize operations, automate processes, and enable sustainable growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Section */}
      <section className="section-padding" style={{ background: "var(--white)" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "var(--space-md)" }}>Our Core Values</h2>
          <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-sm)" }}>
            {[
              "Innovation",
              "Integrity",
              "Excellence",
              "Reliability",
              "Continuous Improvement",
            ].map((value) => (
              <div 
                key={value} 
                className="feature-card" 
                style={{ textAlign: "center", padding: "var(--space-sm)", borderLeft: "4px solid var(--secondary)" }}
              >
                <strong style={{ color: "var(--primary)" }}>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <CTA 
        variant="brand"
        title="Work With Us"
        description="Experience the difference of an optimized business system designed specifically for the African market."
        buttons={[
          { text: "Contact Our Team", link: "/contact", variant: "primary" },
          { text: "View Our Solutions", link: "/solutions", variant: "outline" }
        ]}
      />
    </main>
  );
}