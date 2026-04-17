'use client';

import React from "react";
import { motion, Variants } from "framer-motion";
import ReactMarkdown from "react-markdown";
import CTA from "@/components/CTA";

// Define proper animation types
type TransitionType = "tween" | "spring" | "keyframes" | "inertia";
type Direction = "up" | "down" | "left" | "right";

// Animation utilities with proper typing
const staggerContainer = (
  staggerChildren?: number,
  delayChildren?: number
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

const fadeIn = (
  direction: Direction,
  type: TransitionType,
  delay: number,
  duration: number
): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
    x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

const zoomIn = (delay: number, duration: number): Variants => ({
  hidden: {
    scale: 0.9,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

const shareButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  fontSize: "0.85rem",
  textDecoration: "none",
  borderRadius: "6px",
  border: "1px solid #e2e8f0",
  color: "#1a202c",
  backgroundColor: "#ffffff",
  fontWeight: "600",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "100px",
  transition: "background-color 0.2s"
};

export default function ClientPageContent({
  post,
  shareData
}: {
  post: {
    id: string;
    title: string;
    content: string;
    category: string;
    created_at: string;
    read_time: string;
  };
  shareData: {
    shareUrl: string;
    shareText: string;
  }
}) {
  // 🔥 FIX: prevent runtime crash if content is null/undefined
  const safeContent = post?.content ?? "";

  // 🔥 FIX: encode URLs safely
  const encodedUrl = encodeURIComponent(shareData.shareUrl);
  const encodedText = encodeURIComponent(shareData.shareText);

  return (
    <>
      {/* Article Content with Animations */}
      <motion.section
        className="section-padding"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px 0px 0px 0px" }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="container" style={{ maxWidth: "800px" }}>
          <motion.article className="prose-content">
            <ReactMarkdown>{safeContent}</ReactMarkdown>
          </motion.article>

          {/* Share Section */}
          <motion.div
            style={{
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid #e2e8f0"
            }}
          >
            <motion.h4
              style={{
                marginBottom: "1.5rem",
                fontSize: "1.1rem",
                fontWeight: "700"
              }}
              variants={fadeIn("up", "tween", 0.2, 1)}
            >
              Share this insight
            </motion.h4>

            <motion.div
              style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
            >
              <motion.a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                style={shareButtonStyle}
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
              >
                LinkedIn
              </motion.a>

              <motion.a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                style={shareButtonStyle}
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
              >
                X (Twitter)
              </motion.a>

              <motion.a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                style={shareButtonStyle}
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
              >
                Facebook
              </motion.a>

              <motion.a
                href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                style={shareButtonStyle}
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
              >
                WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px 0px 0px 0px" }}
        variants={zoomIn(0.2, 1)}
      >
        <CTA
          variant="brand"
          title="Ready to automate your operations?"
          description="Our experts can help you implement the strategies discussed in this article."
          buttons={[
            { text: "Book a Strategy Session", link: "/contact", variant: "primary" },
            { text: "Explore JenoraFlow", link: "/products", variant: "outline" }
          ]}
        />
      </motion.div>
    </>
  );
}