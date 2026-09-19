"use client";

import { motion } from "framer-motion";

export function MotionReveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 40,
  rotateX = 8,
  scale = 0.96,
  className = "",
  threshold = 0.15,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y,
        rotateX,
        scale,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom cinematic cubic-bezier
      }}
      style={{ perspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  staggerDelay = 0.12,
  className = "",
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  duration = 0.7,
  y = 35,
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y, scale: 0.95, rotateX: 10 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: {
            duration,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      style={{ perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CardTilt3D({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -6,
        boxShadow: "0 25px 50px -12px rgba(28, 19, 16, 0.25)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
