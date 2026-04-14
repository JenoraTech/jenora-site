import CTA from "@/components/CTA";

export default function SolutionsPage() {
  const solutions = [
    {
      title: "Enterprise Workflow Automation",
      description: "We build workflow systems that automate internal processes such as approvals, requests, and operational tasks.",
      icon: "⚙️"
    },
    {
      title: "Business Systems Analysis and Design",
      description: "Our team analyzes existing operational processes and designs optimized systems that eliminate inefficiencies.",
      icon: "📊"
    },
    {
      title: "Custom Enterprise Software Development",
      description: "We develop enterprise platforms tailored to the unique operational needs of organizations.",
      icon: "💻"
    },
    {
      title: "Digital Transformation Consulting",
      description: "We guide organizations through the transition from manual processes to modern digital operations.",
      icon: "🚀"
    }
  ];

  return (
    <main>
      {/* 1. Page Header */}
      <section className="section-padding" style={{ background: "var(--primary)", color: "white" }}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <h1 style={{ color: "white", fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
              Enterprise Technology Solutions
            </h1>
            <p style={{ fontSize: "1.2rem", opacity: 0.9, marginTop: "1rem" }}>
              Jenora Tech provides enterprise technology solutions designed to help 
              organizations operate more efficiently and intelligently.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Solutions Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="grid">
            {solutions.map((solution, index) => (
              <div key={index} className="feature-card">
                <div style={{ 
                  fontSize: "2rem", 
                  marginBottom: "var(--space-sm)",
                  color: "var(--secondary)" 
                }}>
                  {solution.icon}
                </div>
                <h3>{solution.title}</h3>
                <p style={{ color: "var(--text-muted)" }}>
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Deep-Dive Section (Optional Visual interest) */}
      <section className="section-padding" style={{ background: "var(--accent)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ marginBottom: "var(--space-md)" }}>Why Choose Our Solutions?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "var(--space-md)" }}>
            <div style={{ padding: "var(--space-sm)" }}>
              <h4 style={{ color: "var(--secondary)" }}>Scalability</h4>
              <p>Systems that grow as your organization expands across Africa.</p>
            </div>
            <div style={{ padding: "var(--space-sm)" }}>
              <h4 style={{ color: "var(--secondary)" }}>Security</h4>
              <p>Enterprise-grade data protection and user access controls.</p>
            </div>
            <div style={{ padding: "var(--space-sm)" }}>
              <h4 style={{ color: "var(--secondary)" }}>Efficiency</h4>
              <p>Eliminate manual bottlenecks and human error in your workflows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <CTA 
        variant="brand"
        title="Start Your Digital Transformation"
        description="Let's build a custom solution that perfectly fits your operational requirements."
        buttons={[
          { text: "Request a Demo", link: "/demo", variant: "primary" },
          { text: "Contact an Expert", link: "/contact", variant: "outline" }
        ]}
      />
    </main>
  );
}