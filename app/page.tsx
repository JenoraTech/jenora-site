import CTA from "../components/CTA";
import FeatureGrid from "../components/FeatureGrid";
import Link from "next/link";

const transformationFeatures = [
  {
    heading: "Enterprise Workflow Automation",
    text: "We design systems that automate approvals, internal requests, and operational workflows.",
  },
  {
    heading: "Business Systems Analysis",
    text: "We evaluate existing business processes and redesign them for maximum efficiency.",
  },
  {
    heading: "Custom Enterprise Software",
    text: "We develop tailored enterprise platforms designed around your organization’s operational needs.",
  },
  {
    heading: "Digital Transformation Consulting",
    text: "We guide organizations through the transition from manual operations to intelligent digital systems.",
  },
];

const ecosystemProducts = [
  {
    heading: "JenoraFlow",
    text: "Our flagship workflow builder and automation engine for role-based approvals.",
  },
  {
    heading: "JenoraHR",
    text: "Comprehensive management for employee records, payroll, and performance.",
  },
  {
    heading: "Jenora SMS",
    text: "A complete administration platform for educational institutional operations.",
  },
  {
    heading: "Jenora PropertiesConnect",
    text: "Advanced real estate management for tracking properties, tenants, and payments.",
  },
  {
    heading: "Jenora Tailor Biz",
    text: "Specialized production workflow and order tracking for fashion enterprises.",
  },
  {
    heading: "Jenora Insights",
    text: "Real-time business intelligence dashboards and performance analytics.",
  },
];

const whyChooseUs = [
  {
    heading: "Operational Intelligence",
    text: "We help organizations understand and optimize how they operate.",
  },
  {
    heading: "Enterprise-Grade Systems",
    text: "Our solutions are designed to handle complex organizational workflows.",
  },
  {
    heading: "Local Expertise",
    text: "We understand the operational realities of African organizations.",
  },
  {
    heading: "Long-Term Partnership",
    text: "We build technology systems designed to grow with our clients.",
  },
];

const industries = [
  "Financial Institutions",
  "Government Agencies",
  "Corporate Organizations",
  "NGOs and Development Organizations",
  "Educational Institutions",
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <h1>
            Enterprise Software & Business Systems Optimization for African Organizations
          </h1>
          <p>
            Jenora Tech Ltd helps organizations design intelligent operational
            systems, automate internal processes, and achieve operational
            efficiency through modern enterprise software solutions.
          </p>
          <div className="hero-buttons">
            <Link href="/contact" className="btn btn-primary">
              Request Consultation
            </Link>
            <Link href="/solutions" className="btn btn-outline">
              Explore Our Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid 1 - Primary Services */}
      <section className="section-padding bg-accent">
        <div className="container">
          <FeatureGrid
            title="Transforming How Organizations Operate"
            items={transformationFeatures}
          />
        </div>
      </section>

      {/* Ecosystem Section - Capturing All Products */}
      <section className="section-padding bg-white">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge">Our Ecosystem</span>
            <h2 style={{ marginTop: '1rem' }}>The Jenora Product Suite</h2>
            <p style={{ maxWidth: '700px', margin: '1rem auto', color: 'var(--text-muted)' }}>
              From core workflow automation to specialized industry tools, our products 
              integrate seamlessly to provide a unified digital infrastructure.
            </p>
          </div>
          
          <FeatureGrid
            items={ecosystemProducts}
          />
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/products" className="btn btn-primary">
              View Detailed Product Specs
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Platform Highlight - JenoraFlow Focus */}
      <section className="platform section-padding bg-accent">
        <div className="container grid-two-col">
          <div className="platform-text">
            <span className="badge">Featured Platform</span>
            <h2>Powered by JenoraFlow</h2>
            <p>
              JenoraFlow is the engine behind our ecosystem. It is a modern 
              enterprise workflow management platform designed to automate approvals 
              and gain real-time visibility into operational activities.
            </p>
            <ul className="feature-list">
              <li>Workflow automation & builder</li>
              <li>Process tracking & Role-based approvals</li>
              <li>Operational dashboards & Analytics</li>
            </ul>
            <Link href="/demo" className="btn btn-outline" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
              Request Product Demo
            </Link>
          </div>
          <div className="platform-visual">
            <div className="visual-card">
              <div className="skeleton-ui" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid 2 - Value Proposition */}
      <section className="section-padding bg-white">
        <div className="container">
          <FeatureGrid
            title="Why Organizations Choose Jenora Tech"
            items={whyChooseUs}
          />
        </div>
      </section>

      {/* Industries Section */}
      <section className="industries section-padding bg-primary text-white">
        <div className="container">
          <h2 className="text-white">Industries We Serve</h2>
          <div className="industry-grid">
            {industries.map((industry) => (
              <div key={industry} className="industry-item">
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CTA
        title="Ready to Optimize Your Organizational Systems?"
        description="Speak with our team to discover how Jenora Tech can help your organization automate workflows and achieve operational efficiency."
        buttons={[
          { text: "Request Consultation", link: "/contact" },
          { text: "Schedule Product Demo", link: "/demo" },
        ]}
      />
    </>
  );
}