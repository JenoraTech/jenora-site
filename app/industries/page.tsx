'use client'; // Add this directive for Framer Motion

import React from "react";
import CTA from "@/components/CTA";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, slideIn, zoomIn } from "@/utils/motion";

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
      <motion.section 
        className="section-padding" 
        style={{ background: "var(--primary)", color: "white" }}
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="container">
          <motion.div 
            style={{ maxWidth: "800px" }}
            variants={staggerContainer(0.1, 0.2)}
          >
            <motion.h1 
              style={{ color: "white", fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
              variants={fadeIn('up', 'tween', 0.2, 1)}
            >
              Industries We Serve
            </motion.h1>
            <motion.p 
              style={{ fontSize: "1.2rem", opacity: 0.9, marginTop: "1rem" }}
              variants={fadeIn('up', 'tween', 0.3, 1)}
            >
              Our technology solutions are built to solve the unique operational 
              challenges faced by organizations across Africa's key sectors.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* 2. Industries Grid */}
      <motion.section 
        className="section-padding"
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="container">
          <motion.div 
            className="grid"
            variants={staggerContainer(0.1, 0.2)}
          >
            {industries.map((industry, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                variants={zoomIn(0.2 + index * 0.1, 1)}
                whileHover={{
                  y: -10,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  backgroundColor: "var(--white)"
                }}
              >
                <motion.div 
                  style={{ fontSize: "2.5rem", marginBottom: "var(--space-sm)" }}
                  whileHover={{ scale: 1.1 }}
                >
                  {industry.icon}
                </motion.div>
                <motion.h3 
                  style={{ marginBottom: "0.75rem", color: "var(--primary)" }}
                  variants={fadeIn('up', 'tween', 0.2, 1)}
                >
                  {industry.name}
                </motion.h3>
                <motion.p 
                  style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}
                  variants={fadeIn('up', 'tween', 0.3, 1)}
                >
                  {industry.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 3. Capability Highlight */}
      <motion.section 
        className="section-padding" 
        style={{ background: "var(--accent)" }}
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="container">
          <motion.div 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto"
            }}
            variants={staggerContainer(0.1, 0.2)}
          >
            <motion.h2 
              style={{ marginBottom: "var(--space-sm)" }}
              variants={fadeIn('up', 'tween', 0.2, 1)}
            >
              Versatile Solution Design
            </motion.h2>
            <motion.p 
              style={{ fontSize: "1.1rem" }}
              variants={fadeIn('up', 'tween', 0.3, 1)}
            >
              While every industry has its nuances, the core of success is 
              <strong> system optimization</strong>. Our approach focuses on understanding your 
              specific regulatory and operational environment to deliver tools that 
              actually get used.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* 4. Final CTA */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={slideIn('up', 'tween', 0.2, 1)}
      >
        <CTA 
          variant="brand"
          title="Solutions Tailored to Your Industry"
          description="Schedule a consultation with our industry experts to discuss your specific operational bottlenecks."
          buttons={[
            { text: "Request Consultation", link: "/contact", variant: "primary" },
            { text: "Browse Products", link: "/products", variant: "outline" }
          ]}
        />
      </motion.div>
    </main>
  );
}