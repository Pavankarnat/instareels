"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const SEED_MAP = {
  "ir-hero": "/photos/hero-bride.jpg",
  "ir-story": "/photos/story-flatlay.jpg",
  "ir-home-wed": "/photos/service-weddings.jpg",
  "ir-home-pre": "/photos/service-prewed.jpg",
  "ir-home-evt": "/photos/service-events.jpg",
  "ir-home-por": "/photos/service-portraits.jpg",
  "ir-work-1": "/photos/work-veil.jpg",
  "ir-work-2": "/photos/work-bw-couple.jpg",
  "ir-work-3": "/photos/work-details.jpg",
  "ir-work-4": "/photos/work-shadows.jpg",
  "ir-quote": "/photos/quote-bg.jpg",
  "ir-svc-wedding": "/photos/service-weddings.jpg",
  "ir-svc-prewedding": "/photos/service-prewed.jpg",
  "ir-svc-events": "/photos/service-events.jpg",
  "ir-svc-portraits": "/photos/service-portraits.jpg",
  "ir-about-story": "/photos/about-moment.jpg",
  "ir-founder": "/photos/service-portraits.jpg",
  "ir-pf-1": "/photos/hero-bride.jpg",
  "ir-pf-2": "/photos/service-weddings.jpg",
  "ir-pf-3": "/photos/work-bw-couple.jpg",
  "ir-pf-4": "/photos/service-prewed.jpg",
  "ir-pf-5": "/photos/work-veil.jpg",
  "ir-pf-6": "/photos/about-moment.jpg",
  "ir-pf-7": "/photos/service-events.jpg",
  "ir-pf-8": "/photos/quote-bg.jpg",
  "ir-pf-9": "/photos/work-details.jpg",
  "ir-pf-10": "/photos/service-portraits.jpg",
  "ir-pf-11": "/photos/story-flatlay.jpg",
  "ir-pf-12": "/photos/work-shadows.jpg",
};

export default function Photo({
  src,
  seed,
  aspect = "aspect-[4/5]",
  alt = "",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  enableTilt = true,
  badgeText = null,
}) {
  const imageSrc =
    src ||
    (seed && SEED_MAP[seed]) ||
    (seed && seed.startsWith("/") ? seed : "/photos/hero-bride.jpg");

  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position normalized (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth realistic 3D tilt
  const springConfig = { stiffness: 260, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const brightness = useSpring(useTransform(mouseY, [-0.5, 0.5], [1.08, 0.96]), springConfig);

  // Dynamic light glare position
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e) {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35, scale: 0.96, rotateX: 6 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={`group relative select-none ${aspect} ${className}`}
    >
      <motion.div
        style={{
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full overflow-hidden rounded-[2px] shadow-md transition-shadow duration-500 group-hover:shadow-2xl"
      >
        {/* Next.js Image with subtle scale */}
        <motion.div
          style={{ filter: isHovered ? `brightness(${brightness})` : "brightness(1)" }}
          className="relative h-full w-full overflow-hidden"
        >
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes={sizes}
            priority={priority}
          />
        </motion.div>

        {/* Cinematic dark gradient vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/15 transition-opacity duration-500 group-hover:opacity-75" />

        {/* Dynamic 3D Specular Light Glare reflection */}
        {enableTilt && (
          <motion.div
            className="pointer-events-none absolute -inset-[100%] z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-35"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`,
            }}
          />
        )}

        {/* Elegant 3D Film Border Accent on Hover */}
        <div className="pointer-events-none absolute inset-0 border border-white/0 transition-colors duration-500 group-hover:border-white/20" />

        {/* Optional 3D elevated badge / viewfinder icon */}
        {badgeText && (
          <div
            style={{ transform: "translateZ(30px)" }}
            className="pointer-events-none absolute bottom-4 left-4 z-20 rounded bg-ink/70 px-2.5 py-1 text-[11px] font-medium tracking-wider text-linen/90 backdrop-blur-md border border-linen/20"
          >
            {badgeText}
          </div>
        )}

        {/* Viewfinder corner marks on hover */}
        <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-white/0 transition-all duration-300 group-hover:border-white/50" />
        <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-white/0 transition-all duration-300 group-hover:border-white/50" />
        <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-white/0 transition-all duration-300 group-hover:border-white/50" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-white/0 transition-all duration-300 group-hover:border-white/50" />
      </motion.div>
    </motion.div>
  );
}
