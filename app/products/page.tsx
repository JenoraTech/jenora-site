'use client'; // Add this to mark the component as client-side

import React from "react";
import Link from "next/link";
import CTA from "@/components/CTA";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, slideIn, zoomIn } from "@/utils/motion";

// 1. Interfaces to prevent "Property does not exist" errors
interface Product {
  name: string;
  description: string;
  features: string[];
  cta?: string;      // Optional: only shows for specific products
  ctaLink?: string;  // Optional: destination for the button
}

interface ProductCategory {
  category: string;
  items: Product[];
}

// 2. Data Structure using the defined interfaces
const productCategories: ProductCategory[] = [
  {
    category: "Core Platform",
    items: [
      {
        name: "JenoraFlow",
        description:
          "Enterprise workflow automation platform that powers approvals, processes, and operations across organizations.",
        features: [
          "Workflow builder",
          "Process automation",
          "Role-based approvals",
          "Task management",
          "Operational dashboards",
          "Analytics & reporting",
        ],
        cta: "Request Demo",
        ctaLink: "/demo",
      },
    ],
  },
  {
    category: "Business Solutions",
    items: [
      {
        name: "JenoraHR",
        description:
          "Human resource management system for managing employees, payroll, and performance.",
        features: [
          "Employee records",
          "Leave & attendance",
          "Payroll integration",
          "Performance tracking",
        ],
      },
      {
        name: "Jenora SMS",
        description:
          "Complete school administration platform for managing students, results, and operations.",
        features: [
          "Student records",
          "Result management",
          "Attendance tracking",
          "Staff management",
        ],
      },
      {
        name: "Jenora PropertiesConnect",
        description:
          "Real estate and property management system for tracking properties and tenants.",
        features: [
          "Property listings",
          "Tenant management",
          "Payment tracking",
          "Maintenance requests",
        ],
      },
      {
        name: "Jenora Tailor Biz Manager",
        description:
          "Business management system specifically for tailoring and fashion enterprises.",
        features: [
          "Order tracking",
          "Customer management",
          "Measurement records",
          "Production workflow",
        ],
      },
    ],
  },
  {
    category: "Intelligence & Analytics",
    items: [
      {
        name: "Jenora Insights",
        description:
          "Business intelligence platform providing real-time analytics and decision support.",
        features: [
          "Data dashboards",
          "Performance tracking",
          "Reporting tools",
          "Business analytics",
        ],
      },
    ],
  },
];

export default function ProductsPage() {
  return (
    <main>
      {/* Header Section */}
      <motion.section 
        className="section-padding" 
        style={{ background: "var(--accent)", borderBottom: "1px solid #e2e8f0" }}
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <motion.h1 
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            Our Products
          </motion.h1>
          <motion.p 
            style={{ maxWidth: "800px", margin: "1.5rem auto 0", fontSize: "1.2rem", color: "var(--text-muted)" }}
            variants={fadeIn('up', 'tween', 0.3, 1)}
          >
            A suite of enterprise software solutions designed to help organizations
            automate operations, improve efficiency, and gain real-time visibility.
          </motion.p>
        </div>
      </motion.section>

      {/* Product Categories */}
      <motion.section 
        className="section-padding"
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="container">
          {productCategories.map((category, idx) => (
            <motion.div 
              key={idx} 
              style={{ marginBottom: "var(--space-lg)" }}
              variants={staggerContainer(0.1, 0.2)}
            >
              <motion.h2 
                style={{ 
                  fontSize: "1.75rem", 
                  borderBottom: "2px solid var(--secondary)", 
                  display: "inline-block", 
                  marginBottom: "var(--space-md)",
                  paddingBottom: "4px"
                }}
                variants={fadeIn('up', 'tween', 0.2, 1)}
              >
                {category.category}
              </motion.h2>

              <motion.div 
                className="grid"
                variants={staggerContainer(0.1, 0.2)}
              >
                {category.items.map((product, i) => (
                  <motion.div 
                    key={i} 
                    className="feature-card" 
                    style={{ height: "100%", display: "flex", flexDirection: "column" }}
                    variants={zoomIn(0.2 + i * 0.1, 1)}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                    }}
                  >
                    <h3 style={{ fontSize: "1.4rem", color: "var(--primary)" }}>{product.name}</h3>
                    <p style={{ color: "var(--text-muted)", margin: "0.75rem 0 1.5rem" }}>
                      {product.description}
                    </p>

                    <ul style={{ listStyle: "none", marginBottom: "auto" }}>
                      {product.features.map((feature, j) => (
                        <motion.li 
                          key={j} 
                          style={{ 
                            fontSize: "0.9rem", 
                            marginBottom: "0.5rem", 
                            display: "flex", 
                            alignItems: "center",
                            color: "var(--text-main)" 
                          }}
                          variants={fadeIn('up', 'tween', 0.2 + j * 0.1, 1)}
                        >
                          <span style={{ color: "var(--secondary)", marginRight: "10px", fontWeight: "bold" }}>✓</span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {/* TypeScript Guard: Only render button if product.cta exists */}
                    {product.cta && (
                      <motion.div 
                        variants={fadeIn('up', 'tween', 0.4, 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link 
                          href={product.ctaLink || "/contact"} 
                          className="btn btn-primary" 
                          style={{ marginTop: "1.5rem", alignSelf: "flex-start" }}
                        >
                          {product.cta}
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Ecosystem Section */}
      <motion.section 
        className="section-padding" 
        style={{ background: "var(--primary)", color: "white", textAlign: "center" }}
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="container">
          <motion.h2 
            style={{ color: "white" }}
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            Integrated Enterprise Ecosystem
          </motion.h2>
          <motion.p 
            style={{ maxWidth: "800px", margin: "0 auto", opacity: 0.9 }}
            variants={fadeIn('up', 'tween', 0.3, 1)}
          >
            All Jenora products are designed to work together seamlessly — from
            workflow automation to analytics — giving your organization a unified
            digital infrastructure, not isolated tools.
          </motion.p>
        </div>
      </motion.section>

      {/* CTA Footer */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={slideIn('up', 'tween', 0.2, 1)}
      >
        <CTA 
  variant="light"
  title="Need a Custom Solution?"
  description="Our team specializes in analyzing unique business requirements and designing systems that fit your specific operational needs."
  buttons={[
    { text: "Contact Us", link: "/contact", variant: "primary" },
    {
  text: "View Industries", 
  link: "/industries", 
  variant: "outline",
  style: {
    border: "2px solid var(--primary)",
    color: "var(--primary)"
  }
}
  ]}
/>
      </motion.div>
    </main>
  );
}