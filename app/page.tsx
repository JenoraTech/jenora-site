'use client';

import CTA from "../components/CTA";
import FeatureGrid from "../components/FeatureGrid";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, slideIn, zoomIn } from "../utils/motion";

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
    text: "We develop tailored enterprise platforms designed around your organization's operational needs.",
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
      {/* Hero Section with enhanced animation */}
      <motion.section 
        className="hero"
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <motion.div 
          className="hero-overlay"
          variants={fadeIn('up', 'tween', 0.1, 0.5)}
        />
        <div className="container hero-content">
          <motion.h1 
            variants={fadeIn('up', 'tween', 0.2, 1)}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Enterprise Software & Business Systems Optimization for African Organizations
          </motion.h1>
          <motion.p 
            variants={fadeIn('up', 'tween', 0.3, 1)}
            whileHover={{ x: 5 }}
          >
            Jenora Tech Ltd helps organizations design intelligent operational
            systems, automate internal processes, and achieve operational
            efficiency through modern enterprise software solutions.
          </motion.p>
          <motion.div 
            className="hero-buttons"
            variants={fadeIn('up', 'tween', 0.4, 1)}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="btn btn-primary">
                Request Consultation
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/solutions" className="btn btn-outline">
                Explore Our Solutions
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Feature Grid 1 - Primary Services */}
      <motion.section 
        className="section-padding bg-accent"
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer()}
      >
        <div className="container">
          <motion.div variants={zoomIn(0.2, 1)}>
            <FeatureGrid
              title="Transforming How Organizations Operate"
              items={transformationFeatures}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Platform Section - Featured Product */}
      <motion.section 
        className="platform section-padding"
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer()}
      >
        <div className="container grid-two-col">
          <motion.div 
            className="platform-text"
            variants={slideIn('left', 'tween', 0.2, 1)}
            whileHover={{ x: 5 }}
          >
            <motion.span 
              className="badge"
              variants={fadeIn('down', 'tween', 0.1, 1)}
            >
              Featured Product
            </motion.span>
            <motion.h2 variants={fadeIn('up', 'tween', 0.2, 1)}>
              Introducing JenoraFlow
            </motion.h2>
            <motion.p variants={fadeIn('up', 'tween', 0.3, 1)}>
              JenoraFlow is a modern enterprise workflow management platform
              designed to help organizations automate approvals, streamline
              processes, and gain real-time visibility into operational activities.
            </motion.p>
            <motion.ul 
              className="feature-list"
              variants={staggerContainer(0.1, 0.1)}
            >
              <motion.li 
                variants={fadeIn('up', 'tween', 0.2, 1)}
                whileHover={{ x: 10 }}
              >
                Workflow automation
              </motion.li>
              <motion.li 
                variants={fadeIn('up', 'tween', 0.3, 1)}
                whileHover={{ x: 10 }}
              >
                Process tracking
              </motion.li>
              <motion.li 
                variants={fadeIn('up', 'tween', 0.4, 1)}
                whileHover={{ x: 10 }}
              >
                Role-based approvals
              </motion.li>
              <motion.li 
                variants={fadeIn('up', 'tween', 0.5, 1)}
                whileHover={{ x: 10 }}
              >
                Task management
              </motion.li>
              <motion.li 
                variants={fadeIn('up', 'tween', 0.6, 1)}
                whileHover={{ x: 10 }}
              >
                Operational dashboards
              </motion.li>
              <motion.li 
                variants={fadeIn('up', 'tween', 0.7, 1)}
                whileHover={{ x: 10 }}
              >
                Analytics and reporting
              </motion.li>
            </motion.ul>
            <motion.div 
              variants={fadeIn('up', 'tween', 0.8, 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/demo" className="btn btn-primary">
                Request Product Demo
              </Link>
            </motion.div>
          </motion.div>
          <motion.div 
            className="platform-visual"
            variants={slideIn('right', 'tween', 0.2, 1)}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="visual-card"
              variants={zoomIn(0.4, 1)}
            >
              <div className="skeleton-ui" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Feature Grid 2 - Value Proposition */}
      <motion.section 
        className="section-padding bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer()}
      >
        <div className="container">
          <motion.div variants={zoomIn(0.2, 1)}>
            <FeatureGrid
              title="Why Organizations Choose Jenora Tech"
              items={whyChooseUs}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Industries Section */}
      <motion.section 
        className="industries section-padding bg-primary text-white"
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer()}
      >
        <div className="container">
          <motion.h2 
            className="text-white" 
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            Industries We Serve
          </motion.h2>
          <motion.div 
            className="industry-grid"
            variants={staggerContainer(0.1, 0.1)}
          >
            {industries.map((industry, index) => (
              <motion.div 
                key={industry} 
                className="industry-item"
                variants={fadeIn('up', 'tween', 0.2 + index * 0.1, 1)}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(255,255,255,0.2)'
                }}
              >
                {industry}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px 0px 0px 0px" }}
        variants={slideIn('up', 'tween', 0.2, 1)}
      >
        <CTA
          title="Ready to Optimize Your Organizational Systems?"
          description="Speak with our team to discover how Jenora Tech can help your organization automate workflows and achieve operational efficiency."
          buttons={[
            { text: "Request Consultation", link: "/contact" },
            { text: "Schedule Product Demo", link: "/demo" },
          ]}
        />
      </motion.div>
    </>
  );
}