"use client";

import Link from "next/link";
import CTA from "../components/CTA";
import FeatureGrid from "../components/FeatureGrid";

// Data objects moved outside to optimize re-renders
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
  // Shared styles for section consistency
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '4rem',
    justifyContent: 'space-between'
  };

  const textColumnStyle: React.CSSProperties = {
    flex: '1 1 450px',
    maxWidth: '600px'
  };

  const visualColumnStyle: React.CSSProperties = {
    flex: '1 1 400px',
    display: 'flex',
    justifyContent: 'center'
  };

  return (
    <main>
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

      {/* Services Feature Grid */}
      <section className="section-padding bg-accent">
        <div className="container">
          <FeatureGrid
            title="Transforming How Organizations Operate"
            items={transformationFeatures}
          />
        </div>
      </section>

      {/* 1. JenoraFlow Highlight */}
      <section className="platform section-padding bg-white">
        <div className="container" style={containerStyle}>
          <div className="platform-text" style={textColumnStyle}>
            <span className="badge">Core Platform</span>
            <h2>Introducing JenoraFlow</h2>
            <p>
              A modern enterprise workflow management platform designed to help 
              organizations automate approvals, streamline processes, and gain 
              real-time visibility into operational activities.
            </p>
            <ul className="feature-list" style={{ marginBottom: '2rem' }}>
              <li>Workflow automation & builder</li>
              <li>Role-based approvals & tracking</li>
              <li>Operational dashboards & Analytics</li>
              <li>Task management & reporting</li>
            </ul>
            <Link href="/demo" className="btn btn-primary">
              Request JenoraFlow Demo
            </Link>
          </div>
          <div className="platform-visual" style={visualColumnStyle}>
            <div className="visual-card" style={{ width: '100%', minHeight: '380px' }}>
              <div className="skeleton-ui" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. JenoraHR Highlight (Swapped Layout) */}
      <section className="platform section-padding bg-accent">
        <div className="container" style={containerStyle}>
          <div className="platform-visual" style={{ ...visualColumnStyle, order: 2 }}>
            <div className="visual-card" style={{ width: '100%', minHeight: '380px' }}>
              <div className="skeleton-ui" />
            </div>
          </div>
          <div className="platform-text" style={{ ...textColumnStyle, order: 1 }}>
            <span className="badge">HR & Workforce</span>
            <h2>Empower People with JenoraHR</h2>
            <p>
              A comprehensive human resource management system designed for 
              managing the entire employee lifecycle, from onboarding to payroll.
            </p>
            <ul className="feature-list" style={{ marginBottom: '2rem' }}>
              <li>Centralized Employee Records</li>
              <li>Leave & Attendance Automation</li>
              <li>Seamless Payroll Integration</li>
              <li>Performance & Growth Tracking</li>
            </ul>
            <Link href="/products" className="btn btn-outline">
              Explore HR Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Jenora SMS Highlight */}
      <section className="platform section-padding bg-white">
        <div className="container" style={containerStyle}>
          <div className="platform-text" style={textColumnStyle}>
            <span className="badge">Education</span>
            <h2>Jenora School Management (SMS)</h2>
            <p>
              Transform your educational institution with a unified platform 
              that manages student records, academic results, and administrative workflows.
            </p>
            <ul className="feature-list" style={{ marginBottom: '2rem' }}>
              <li>Student & Staff Records Management</li>
              <li>Automated Result Processing</li>
              <li>Attendance & Activity Tracking</li>
              <li>Administrative & Operational Efficiency</li>
            </ul>
            <Link href="/products" className="btn btn-outline">
              Learn More About SMS
            </Link>
          </div>
          <div className="platform-visual" style={visualColumnStyle}>
            <div className="visual-card" style={{ width: '100%', minHeight: '380px' }}>
              <div className="skeleton-ui" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Intelligence & Insights Highlight (Swapped Layout) */}
      <section className="platform section-padding bg-accent">
        <div className="container" style={containerStyle}>
          <div className="platform-visual" style={{ ...visualColumnStyle, order: 2 }}>
            <div className="visual-card" style={{ width: '100%', minHeight: '380px' }}>
              <div className="skeleton-ui" />
            </div>
          </div>
          <div className="platform-text" style={{ ...textColumnStyle, order: 1 }}>
            <span className="badge">Analytics</span>
            <h2>Data-Driven Decisions with Insights</h2>
            <p>
              Our Business Intelligence platform provides real-time analytics 
              and decision support tools to help leadership monitor performance.
            </p>
            <ul className="feature-list" style={{ marginBottom: '2rem' }}>
              <li>Live Operational Dashboards</li>
              <li>Performance Tracking (KPIs)</li>
              <li>Automated Reporting Tools</li>
              <li>Custom Business Analytics</li>
            </ul>
            <Link href="/products" className="btn btn-primary">
              Discover Jenora Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Ecosystem Summary Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Integrated Digital Infrastructure</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              All Jenora products are designed to work together seamlessly, 
              giving your organization a unified digital ecosystem.
            </p>
          </div>
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
    </main>
  );
}