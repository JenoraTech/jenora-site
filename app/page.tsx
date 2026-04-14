"use client";

import Link from "next/link";
import CTA from "../components/CTA";
import FeatureGrid from "../components/FeatureGrid";

// Core Business Services
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

// Why Choose Us Section
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

      {/* Primary Services Feature Grid */}
      <section className="section-padding bg-accent">
        <div className="container">
          <FeatureGrid
            title="Transforming How Organizations Operate"
            items={transformationFeatures}
          />
        </div>
      </section>

      {/* DETAILED PRODUCT ECOSYSTEM */}
      
      {/* 1. JenoraFlow Highlight */}
      <section className="platform section-padding bg-white">
        <div className="container grid-two-col">
          <div className="platform-text">
            <span className="badge">Featured Platform</span>
            <h2>Introducing JenoraFlow</h2>
            <p>
              A modern enterprise workflow management platform designed to help 
              organizations automate approvals, streamline processes, and gain 
              real-time visibility into operational activities.
            </p>
            <ul className="feature-list">
              <li>Workflow automation & builder</li>
              <li>Role-based approvals & tracking</li>
              <li>Operational dashboards & Analytics</li>
            </ul>
            <Link href="/demo" className="btn btn-primary">
              Request JenoraFlow Demo
            </Link>
          </div>
          <div className="platform-visual">
            <div className="visual-card">
              <div className="skeleton-ui" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. JenoraHR Highlight */}
      <section className="platform section-padding bg-accent">
        <div className="container grid-two-col" style={{ direction: 'rtl' }}>
          <div className="platform-text" style={{ direction: 'ltr' }}>
            <span className="badge">HR & Workforce</span>
            <h2>Empower People with JenoraHR</h2>
            <p>
              A comprehensive human resource management system designed for 
              managing the entire employee lifecycle, from onboarding to payroll.
            </p>
            <ul className="feature-list">
              <li>Centralized Employee Records</li>
              <li>Leave & Attendance Automation</li>
              <li>Seamless Payroll Integration</li>
              <li>Performance & Growth Tracking</li>
            </ul>
            <Link href="/products" className="btn btn-outline">
              Explore HR Solutions
            </Link>
          </div>
          <div className="platform-visual">
            <div className="visual-card">
              <div className="skeleton-ui" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Jenora SMS Highlight */}
      <section className="platform section-padding bg-white">
        <div className="container grid-two-col">
          <div className="platform-text">
            <span className="badge">Education</span>
            <h2>Jenora School Management (SMS)</h2>
            <p>
              Transform your educational institution with a unified platform 
              that manages student records, academic results, and administrative workflows.
            </p>
            <ul className="feature-list">
              <li>Student & Staff Records</li>
              <li>Automated Result Management</li>
              <li>Attendance & Activity Tracking</li>
              <li>Administrative Efficiency</li>
            </ul>
            <Link href="/products" className="btn btn-outline">
              Learn More About SMS
            </Link>
          </div>
          <div className="platform-visual">
            <div className="visual-card">
              <div className="skeleton-ui" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Intelligence & Insights Highlight */}
      <section className="platform section-padding bg-accent">
        <div className="container grid-two-col" style={{ direction: 'rtl' }}>
          <div className="platform-text" style={{ direction: 'ltr' }}>
            <span className="badge">Analytics</span>
            <h2>Data-Driven Decisions with Insights</h2>
            <p>
              Our Business Intelligence platform provides real-time analytics 
              and decision support tools to help leadership monitor performance.
            </p>
            <ul className="feature-list">
              <li>Live Operational Dashboards</li>
              <li>Performance Tracking (KPIs)</li>
              <li>Automated Reporting Tools</li>
              <li>Custom Business Analytics</li>
            </ul>
            <Link href="/products" className="btn btn-primary">
              Discover Jenora Insights
            </Link>
          </div>
          <div className="platform-visual">
            <div className="visual-card">
              <div className="skeleton-ui" />
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Summary Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>Integrated Digital Infrastructure</h2>
            <p style={{ maxWidth: '700px', margin: '1rem auto', color: 'var(--text-muted)' }}>
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