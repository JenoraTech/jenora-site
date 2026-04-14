import CTA from "../components/CTA";
import FeatureGrid from "../components/FeatureGrid";
import Link from "next/link";

// Professional Tip: Move data out of the component to keep the render function clean
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

      {/* Platform Section - Featured Product */}
      <section className="platform section-padding">
        <div className="container grid-two-col">
          <div className="platform-text">
            <span className="badge">Featured Product</span>
            <h2>Introducing JenoraFlow</h2>
            <p>
              JenoraFlow is a modern enterprise workflow management platform
              designed to help organizations automate approvals, streamline
              processes, and gain real-time visibility into operational activities.
            </p>
            <ul className="feature-list">
              <li>Workflow automation</li>
              <li>Process tracking</li>
              <li>Role-based approvals</li>
              <li>Task management</li>
              <li>Operational dashboards</li>
              <li>Analytics and reporting</li>
            </ul>
            <Link href="/demo" className="btn btn-primary">
              Request Product Demo
            </Link>
          </div>
          <div className="platform-visual">
            {/* Professional placeholder for product screenshot/illustration */}
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