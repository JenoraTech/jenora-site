// utils/motion.ts
import { Variants } from "framer-motion";

type TransitionType = "tween" | "spring" | "keyframes" | "inertia";

export const staggerContainer = (
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

export const fadeIn = (
  direction: "up" | "down" | "left" | "right",
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

export const slideIn = (
  direction: "up" | "down" | "left" | "right",
  type: TransitionType,
  delay: number,
  duration: number
): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
    x: direction === "left" ? "100%" : direction === "right" ? "-100%" : 0,
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

export const zoomIn = (
  delay: number,
  duration: number
): Variants => ({
  hidden: {
    scale: 0.9,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring", // Fixed to valid type
      delay,
      duration,
      ease: "easeOut",
    },
  },
});