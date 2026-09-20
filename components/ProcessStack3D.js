"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const PROCESS_STEPS = [
  {
    step: "STEP 01",
    stepNum: 1,
    title: "Book & Lock Your Date",
    desc: "Tell us what you need — event type, location, date, and preferred aesthetic mood. Our team reviews availability and confirms your booking within minutes with no back-and-forth friction.",
    image: "/photos/story-flatlay.jpg",
    tag: "Instant Confirmation",
    points: ["Quick 24hr availability check", "Custom aesthetic questionnaire", "Transparent pricing & packages"],
  },
  {
    step: "STEP 02",
    stepNum: 2,
    title: "Curate Timeline & Moodboard",
    desc: "We shape your bespoke shot list, audio palette, and lighting timeline together. From golden hour angles to unscripted family reactions, every crucial beat is mapped out.",
    image: "/photos/work-details.jpg",
    tag: "Creative Direction",
    points: ["Music & audio licensing palette", "Wardrobe & lighting styling guide", "Key moments priority sheet"],
  },
  {
    step: "STEP 03",
    stepNum: 3,
    title: "On-Ground Cinematic Shoot",
    desc: "Our certified filmmakers arrive fully equipped with 4K cinema gear. We stay unobtrusive and let the raw magic of your day lead the way, capturing authentic smiles and tears.",
    image: "/photos/hero-bride.jpg",
    tag: "Discreet Coverage",
    points: ["Multi-angle gimbal & prime lenses", "Dedicated audio recording", "Zero staged or stiff posing"],
  },
  {
    step: "STEP 04",
    stepNum: 4,
    title: "On-Site / Express 48hr Edit",
    desc: "Your footage is ingested, colored with film-stock LUTs, and cut to music. You get your first vertical teaser while your guests are still buzzing from the celebration.",
    image: "/photos/service-events.jpg",
    tag: "Rapid Turnaround",
    points: ["Same-week social-ready 9:16 reels", "Bespoke color grading", "Trending licensed tracks"],
  },
  {
    step: "STEP 05",
    stepNum: 5,
    title: "Final 4K Master Delivery",
    desc: "Your full highlight film and uncompressed digital gallery are delivered to your private cloud suite — ready to stream, download, and relive forever.",
    image: "/photos/service-weddings.jpg",
    tag: "Permanent Cloud Suite",
    points: ["4K ProRes & H.265 master files", "Social cuts + full ceremony edits", "Raw footage backup included"],
  },
];

// Individual scroll-animated card that slides to the side
function ProcessCard({ step, index, totalSteps, scrollProgress, activeIndex }) {
  // Exit scroll range for each card (indices 0 to 3 slide away; last card index 4 stays)
  const isLast = index === totalSteps - 1;
  const startExit = (index + 0.65) / totalSteps;
  const endExit = (index + 1) / totalSteps;

  // Slide to the side (X), tilt (rotateZ), and fade opacity as user scrolls down
  const x = useTransform(
    scrollProgress,
    [startExit - 0.05, endExit],
    isLast ? ["0%", "0%"] : ["0%", "-115%"]
  );

  const rotateZ = useTransform(
    scrollProgress,
    [startExit - 0.05, endExit],
    isLast ? [0, 0] : [0, -7]
  );

  const opacity = useTransform(
    scrollProgress,
    [startExit, endExit],
    isLast ? [1, 1] : [1, 0]
  );

  // Cards behind start slightly smaller and scale up as top cards peel away
  const scale = useTransform(
    scrollProgress,
    [Math.max(0, (index - 1) / totalSteps), index / totalSteps],
    [0.96, 1]
  );

  const isCurrent = activeIndex === index;
  const isPast = activeIndex > index;
  const zIndex = (totalSteps - index) * 10;

  return (
    <motion.div
      style={{
        x,
        rotateZ,
        opacity,
        scale,
        zIndex,
        transformOrigin: "bottom left",
      }}
      className="absolute inset-0 transition-shadow duration-500"
    >
      <div className="h-full w-full rounded-[30px] md:rounded-[38px] bg-white border border-bark/10 p-5 sm:p-7 md:p-9 shadow-[0_25px_70px_-15px_rgba(36,26,21,0.18)] flex flex-col justify-between">
        <div className="grid h-full w-full grid-cols-1 md:grid-cols-[1.05fr_1.15fr] items-center gap-6 md:gap-10">
          {/* Left Photo Showcase */}
          <div className="relative h-52 sm:h-64 md:h-full w-full overflow-hidden rounded-[22px] bg-[#f0e8dc] group shadow-inner">
            <Image
              src={step.image}
              alt={step.title}
              fill
              unoptimized
              priority={index < 2}
              className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
            />
            {/* Subtle cinematic gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-semibold text-linen backdrop-blur-md border border-white/20 shadow-md">
              {step.tag}
            </span>
          </div>

          {/* Right Narrative & Interactive Bullet Points */}
          <div className="flex h-full flex-col justify-between py-1 md:py-3 text-left">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-rose/15 px-3.5 py-1 text-xs font-bold text-rose-deep tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-deep animate-pulse" />
                {step.step} OF 05
              </div>
              <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-medium text-bark leading-snug">
                {step.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-bark/80 font-normal">
                {step.desc}
              </p>
            </div>

            {/* Bullet Features */}
            <div className="mt-5 flex flex-col gap-2.5 pt-4 border-t border-bark/10">
              {step.points.map((pt) => (
                <div key={pt} className="flex items-center gap-2.5 text-xs sm:text-sm text-bark/90">
                  <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-rose-deep text-linen text-[10px]">
                    ✓
                  </span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProcessStack3D() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll tracking across the tall pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate active step based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const rawStep = Math.floor(latest * PROCESS_STEPS.length);
    const clamped = Math.max(0, Math.min(PROCESS_STEPS.length - 1, rawStep));
    setActiveIndex(clamped);
  });

  // Smooth click navigation to specific step
  const scrollToStep = (stepIdx) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = scrollTop + rect.top;
    const stepHeight = containerRef.current.offsetHeight / PROCESS_STEPS.length;
    window.scrollTo({
      top: containerTop + stepIdx * stepHeight + 20,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360vh] -mt-10"
    >
      {/* Sticky Viewport-Pinned Stage */}
      <div className="sticky top-12 md:top-16 min-h-[92vh] flex flex-col justify-center items-center py-6 select-none overflow-hidden">
        {/* Section Header */}
        <div className="text-center mb-6 max-w-2xl px-4">
          <span className="text-[12px] font-semibold tracking-[0.2em] text-rose-deep uppercase">
            HOW INSTANTREELS WORKS · SCROLL STACK
          </span>
          <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] md:text-[46px] font-medium text-bark leading-tight">
            From Booking to <span className="italic text-rose-deep">Finished Film.</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-sand">
            Scroll down to watch our process cards peel to the side — stays pinned until all steps finish.
          </p>
        </div>

        {/* Step Navigation Pills */}
        <div className="flex justify-center mb-7">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white/90 border border-bark/10 backdrop-blur-md shadow-sm overflow-x-auto max-w-full">
            {PROCESS_STEPS.map((s, idx) => (
              <button
                key={s.step}
                type="button"
                onClick={() => scrollToStep(idx)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  activeIndex === idx
                    ? "bg-rose-deep text-linen shadow-md scale-105"
                    : "text-bark/70 hover:text-bark hover:bg-bark/5"
                }`}
              >
                {s.step}
                {activeIndex === idx && (
                  <motion.span
                    layoutId="processStepPillHighlight"
                    className="absolute inset-0 rounded-full bg-rose-deep -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Stack Container */}
        <div className="relative mx-auto w-full max-w-5xl h-[530px] sm:h-[480px] md:h-[460px] px-4">
          {/* Background Layered Silhouettes (ReelOnGo signature peeking top cards) */}
          <div className="pointer-events-none absolute left-1/2 -top-7 w-full max-w-4xl -translate-x-1/2 -z-20 hidden md:block">
            {[0, 1, 2].map((layer) => (
              <div
                key={layer}
                className="absolute inset-x-0 rounded-[36px] bg-white/80 border border-bark/10 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
                style={{
                  height: 440,
                  top: -((layer + 1) * 14),
                  transform: `scale(${1 - (layer + 1) * 0.025})`,
                  opacity: 0.75 - layer * 0.22,
                  zIndex: -(layer * 2),
                }}
              />
            ))}
          </div>

          {/* Cards Stack with Scroll-Driven Side Peeling */}
          <div className="relative h-full w-full">
            {PROCESS_STEPS.map((s, idx) => (
              <ProcessCard
                key={s.step}
                step={s}
                index={idx}
                totalSteps={PROCESS_STEPS.length}
                scrollProgress={scrollYProgress}
                activeIndex={activeIndex}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Navigation Dots */}
        <div className="mt-8 flex flex-col items-center gap-2">
          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-1">
            {PROCESS_STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToStep(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-rose-deep shadow-[0_0_8px_rgba(143,70,54,0.4)]"
                    : "w-2 bg-bark/20 hover:bg-bark/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
