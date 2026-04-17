'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

interface FeatureItem {
  heading: string;
  text: string;
  icon?: string;
  alt?: string;
}

interface FeatureGridProps {
  title: string;
  items: FeatureItem[];
  id?: string;
  animationEnabled?: boolean;
}

// Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut", // TypeScript now knows this is exactly "easeOut"
    },
  },
} as const; // <--- Add this here

export default function FeatureGrid({ 
  title, 
  items, 
  id = "features",
  animationEnabled = true 
}: FeatureGridProps) {
  return (
    <motion.section 
      className="feature-grid" 
      aria-labelledby={`${id}-title`}
      initial={animationEnabled ? "hidden" : undefined}
      whileInView={animationEnabled ? "visible" : undefined}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      variants={animationEnabled ? containerVariants : undefined}
    >
      <div className="container">
        <motion.h2 
          id={`${id}-title`} 
          className="section-title"
          variants={animationEnabled ? itemVariants : undefined}
        >
          {title}
        </motion.h2>
        
        <div className="grid">
          {items.map((item) => {
            const itemKey = item.heading.toLowerCase().replace(/\s+/g, '-');
            
            return (
              <motion.article 
                key={itemKey} 
                className="feature-card"
                variants={animationEnabled ? itemVariants : undefined}
              >
                {item.icon && (
                  <div className="feature-icon-wrapper">
                    <Image
                      src={item.icon}
                      alt={item.alt || `${item.heading} icon`}
                      width={48}
                      height={48}
                      className="feature-icon"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="feature-content">
                  <h3>{item.heading}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}