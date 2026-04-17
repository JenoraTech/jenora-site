'use client';

import CTA from "@/components/CTA";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, slideIn } from "@/utils/motion";

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

  const benefits = [
    {
      title: "Scalability",
      description: "Systems that grow as your organization expands across Africa."
    },
    {
      title: "Security",
      description: "Enterprise-grade data protection and user access controls."
    },
    {
      title: "Efficiency",
      description: "Eliminate manual bottlenecks and human error in your workflows."
    }
  ];

  return (
    <main>
      {/* 1. Page Header */}
      <motion.section 
        className="section-padding" 
        style={{ background: "var(--primary)", color: "white" }}
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }} // Adjust margin for smooth triggering
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="container">
          <motion.div 
            style={{ maxWidth: "800px" }}
            variants={staggerContainer()}
          >
            <motion.h1 
              style={{ color: "white", fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
              variants={fadeIn('up', 'tween', 0.2, 1)}
            >
              Enterprise Technology Solutions
            </motion.h1>
            <motion.p 
              style={{ fontSize: "1.2rem", opacity: 0.9, marginTop: "1rem" }}
              variants={fadeIn('up', 'tween', 0.4, 1)}
            >
              Jenora Tech provides enterprise technology solutions designed to help 
              organizations operate more efficiently and intelligently.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* 2. Solutions Grid */}
      <motion.section 
        className="section-padding"
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }} // Adjust margin for smooth triggering
        variants={staggerContainer()}
      >
        <div className="container">
          <motion.div 
            className="grid"
            variants={staggerContainer(0.1, 0.2)}
          >
            {solutions.map((solution, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                variants={fadeIn('up', 'tween', 0.2 + index * 0.1, 0.8)}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 3. Deep-Dive Section */}
      <motion.section 
        className="section-padding" 
        style={{ background: "var(--accent)" }}
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }} // Adjust margin for smooth triggering
        variants={staggerContainer()}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <motion.h2 
            style={{ marginBottom: "var(--space-md)" }}
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            Why Choose Our Solutions?
          </motion.h2>
          <motion.div 
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
              gap: "var(--space-md)" 
            }}
            variants={staggerContainer(0.1, 0.2)}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                style={{ padding: "var(--space-sm)" }}
                variants={fadeIn('up', 'tween', 0.3 + index * 0.1, 0.8)}
                whileHover={{ scale: 1.03 }}
              >
                <h4 style={{ color: "var(--secondary)" }}>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 4. CTA Section */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }} // Adjust margin for smooth triggering
        variants={slideIn('up', 'tween', 0.2, 1)}
      >
        <CTA 
          variant="brand"
          title="Start Your Digital Transformation"
          description="Let's build a custom solution that perfectly fits your operational requirements."
          buttons={[
            { text: "Request a Demo", link: "/demo", variant: "primary" },
            { text: "Contact an Expert", link: "/contact", variant: "outline" }
          ]}
        />
      </motion.div>
    </main>
  );
}