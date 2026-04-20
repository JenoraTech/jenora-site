'use client';

import Link from "next/link";
import motion from "./client-motion";
import type { Variants } from "framer-motion";

interface CTAButton {
  text: string;
  link: string;
  variant?: "primary" | "outline"; 
  style?: React.CSSProperties;
}

interface CTAProps {
  title: string;
  description: string;
  buttons: CTAButton[];
  variant?: "light" | "dark" | "brand"; 
}

export default function CTA({ title, description, buttons, variant = "brand" }: CTAProps) {
  const sectionClass = variant === "dark" || variant === "brand" ? "cta-brand" : "cta-light";

  // ✅ Detect background type
  const isDark = variant === "dark" || variant === "brand";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonMotionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };

  const rippleVariants = {
    initial: { scale: 0 },
    hover: { scale: 1 }
  };

  // ✅ Smart button styling
  const getButtonStyle = (btn: CTAButton): React.CSSProperties => {
    if (btn.style) return btn.style; // allow override

    if (btn.variant === "outline") {
      return {
        border: `2px solid ${isDark ? "white" : "var(--primary)"}`,
        color: isDark ? "white" : "var(--primary)",
        background: "transparent"
      };
    }

    // primary button fallback (optional tweak)
    return {};
  };

  return (
    <motion.section 
      className={`cta-section ${sectionClass}`} 
      aria-labelledby="cta-title"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container">
        <motion.div className="cta-content" variants={containerVariants}>
          <motion.h2 
            id="cta-title" 
            className="section-title"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
          
          <motion.p 
            className="cta-description"
            variants={itemVariants}
          >
            {description}
          </motion.p>
          
          <motion.div className="cta-buttons">
            {buttons.map((btn, index) => (
              <motion.div
                key={`${btn.link}-${index}`}
                variants={itemVariants}
                {...buttonMotionProps}
              >
                <Link
                  href={btn.link}
                  className={`btn ${
                    btn.variant === "outline" ? "btn-outline" : "btn-primary"
                  }`}
                  style={getButtonStyle(btn)} // ✅ AUTO styling here
                >
                  {btn.text}
                  <motion.span
                    className="btn-ripple"
                    initial="initial"
                    whileHover="hover"
                    variants={rippleVariants}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}