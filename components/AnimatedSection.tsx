"use client"; // Mark this as a client component
import { motion } from "framer-motion";

export const AnimatedSection = ({
  children,
  variants,
  className,
}: {
  children: React.ReactNode;
  variants?: any;
  className?: string;
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};