'use client'; // Add this at the top

import CTA from "@/components/CTA";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, slideIn, zoomIn } from "@/utils/motion";

export default function AboutPage() {
  return (
    <main>
      {/* 1. Header Section */}
      <motion.section 
        className="section-padding" 
        style={{ background: "var(--accent)", borderBottom: "1px solid #e2e8f0" }}
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="container">
          <motion.h1 
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1rem" }}
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            About Jenora Tech Ltd
          </motion.h1>
          <motion.p 
            style={{ maxWidth: "700px", fontSize: "1.1rem", color: "var(--text-muted)" }}
            variants={fadeIn('up', 'tween', 0.3, 1)}
          >
            Jenora Tech Ltd was founded with a vision to help African organizations 
            transform how they operate through intelligent enterprise systems.
          </motion.p>
        </div>
      </motion.section>

      {/* 2. Vision & Mission Section */}
      <motion.section 
        className="section-padding"
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="container">
          <motion.div 
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-md)" }}
            variants={staggerContainer(0.1, 0.2)}
          >
            <motion.div 
              className="feature-card"
              variants={zoomIn(0.2, 1)}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <h2 style={{ fontSize: "1.5rem" }}>Vision</h2>
              <p>To become Africa's leading enterprise software and business systems design company within the next decade.</p>
            </motion.div>
            <motion.div 
              className="feature-card"
              variants={zoomIn(0.3, 1)}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <h2 style={{ fontSize: "1.5rem" }}>Mission</h2>
              <p>To empower organizations with intelligent technology systems that optimize operations, automate processes, and enable sustainable growth.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 3. Core Values Section */}
      <motion.section 
        className="section-padding" 
        style={{ background: "var(--white)" }}
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="container">
          <motion.h2 
            style={{ textAlign: "center", marginBottom: "var(--space-md)" }}
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            Our Core Values
          </motion.h2>
          <motion.div 
            className="grid" 
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-sm)" }}
            variants={staggerContainer(0.1, 0.2)}
          >
            {[
              "Innovation",
              "Integrity",
              "Excellence",
              "Reliability",
              "Continuous Improvement",
            ].map((value, index) => (
              <motion.div 
                key={value} 
                className="feature-card" 
                style={{ textAlign: "center", padding: "var(--space-sm)", borderLeft: "4px solid var(--secondary)" }}
                variants={fadeIn('up', 'tween', 0.2 + index * 0.1, 1)}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(0,0,0,0.02)"
                }}
              >
                <strong style={{ color: "var(--primary)" }}>{value}</strong>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 4. CTA Section */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={slideIn('up', 'tween', 0.2, 1)}
      >
        <CTA 
          variant="brand"
          title="Work With Us"
          description="Experience the difference of an optimized business system designed specifically for the African market."
          buttons={[
            { text: "Contact Our Team", link: "/contact", variant: "primary" },
            { text: "View Our Solutions", link: "/solutions", variant: "outline" }
          ]}
        />
      </motion.div>
    </main>
  );
}