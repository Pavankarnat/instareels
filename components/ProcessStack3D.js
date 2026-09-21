"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const PROCESS_STEPS = [
  {
    step: "STEP 01",
    stepNum: 1,
    title: "Book & Lock Your Date",
    desc: "Tell us what you need — event type, date, and preferred aesthetic mood. Our team reviews availability and confirms your booking within minutes with no back-and-forth friction.",
    image: "/photos/story-flatlay.jpg",
    tag: "Instant Confirmation",
    points: ["Quick availability check", "Custom aesthetic questionnaire", "Transparent pricing & packages"],
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

export default function ProcessStack3D() {
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef(null);
  const isTransitioning = useRef(false);

  const total = PROCESS_STEPS.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === total - 1;

  const goToNext = useCallback(() => {
    if (currentStep < total - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, total]);

  const goToPrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  // Scroll wheel trap: while user is inside the process section,
  // scrolling down advances steps 01 -> 02 -> 03 -> 04 -> 05.
  // ONLY when all cards are completed (Step 05) does scroll continue to the next screen!
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelAccumulator = 0;
    const threshold = 60;

    const handleWheel = (e) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top <= 80 && rect.bottom >= window.innerHeight * 0.7;

      if (!inView) return;

      // If on last step and scrolling down, allow normal page scroll
      if (isLast && e.deltaY > 0) return;
      // If on first step and scrolling up, allow normal page scroll
      if (isFirst && e.deltaY < 0) return;

      e.preventDefault();

      if (isTransitioning.current) return;

      wheelAccumulator += e.deltaY;

      if (wheelAccumulator > threshold) {
        wheelAccumulator = 0;
        isTransitioning.current = true;
        goToNext();
        setTimeout(() => {
          isTransitioning.current = false;
        }, 450);
      } else if (wheelAccumulator < -threshold) {
        wheelAccumulator = 0;
        isTransitioning.current = true;
        goToPrev();
        setTimeout(() => {
          isTransitioning.current = false;
        }, 450);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentStep, isFirst, isLast, goToNext, goToPrev]);

  const activeStepData = PROCESS_STEPS[currentStep];

  return (
    <section
      ref={containerRef}
      id="process-section"
      className="relative w-full py-20 lg:py-28 bg-[#faf6f0] border-y border-bark/10 select-none overflow-hidden"
    >
      <div className="mx-auto max-w-content px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <span className="text-[12px] font-bold tracking-[0.2em] text-rose-deep uppercase">
            HOW INSTANTREELS WORKS · INTERACTIVE PROCESS
          </span>
          <h2 className="mt-3 font-serif text-[32px] sm:text-[42px] md:text-[50px] font-medium text-bark leading-tight">
            From Booking to <span className="italic text-rose-deep">Finished Film.</span>
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-sand">
            Step through our 5-phase creation journey — completed before advancing to the next section.
          </p>
        </div>

        {/* Step Navigation Pills */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-white/90 border border-bark/10 backdrop-blur-md shadow-sm overflow-x-auto max-w-full">
            {PROCESS_STEPS.map((s, idx) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`relative px-3.5 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                  currentStep === idx
                    ? "bg-rose-deep text-linen shadow-md scale-105"
                    : currentStep > idx
                    ? "text-rose-deep/90 hover:bg-bark/5"
                    : "text-sand hover:text-bark hover:bg-bark/5"
                }`}
              >
                {s.step}
                {currentStep > idx && <span className="ml-1 text-[10px]">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Card Stage with Solid Backgrounds (Never overlapping or transparent) */}
        <div className="relative mx-auto w-full max-w-4xl h-[540px] sm:h-[480px] md:h-[440px]">
          {/* Peeking Background Card Tabs for Real 3D Physical Depth */}
          <div className="pointer-events-none absolute left-1/2 -top-4 w-[92%] -translate-x-1/2 h-full rounded-[36px] bg-[#f0e8dc] border border-bark/10 shadow-sm -z-10" />
          <div className="pointer-events-none absolute left-1/2 -top-8 w-[84%] -translate-x-1/2 h-full rounded-[36px] bg-[#e7ddcf] border border-bark/10 shadow-sm -z-20" />

          {/* Active Card with Smooth Peeling Entrance/Exit */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStepData.step}
              initial={{ opacity: 0, x: 40, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.97 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full rounded-[32px] md:rounded-[38px] bg-white border border-bark/10 p-6 sm:p-8 md:p-9 shadow-[0_30px_70px_-15px_rgba(36,26,21,0.18)]"
            >
              <div className="grid h-full w-full grid-cols-1 md:grid-cols-[1fr_1.15fr] items-center gap-6 md:gap-10">
                {/* Left Photo Showcase */}
                <div className="relative h-48 sm:h-56 md:h-full w-full overflow-hidden rounded-[22px] bg-[#f0e8dc] group shadow-inner">
                  <Image
                    src={activeStepData.image}
                    alt={activeStepData.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-black/65 px-3.5 py-1.5 text-xs font-semibold text-linen backdrop-blur-md border border-white/20 shadow-md">
                    {activeStepData.tag}
                  </span>
                </div>

                {/* Right Step Narrative */}
                <div className="flex h-full flex-col justify-between py-1 text-left">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-rose/15 px-3.5 py-1 text-xs font-bold text-rose-deep tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-deep animate-pulse" />
                      {activeStepData.step} OF 05
                    </div>
                    <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-bark leading-snug">
                      {activeStepData.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-sand font-normal">
                      {activeStepData.desc}
                    </p>
                  </div>

                  {/* Feature Checkpoints */}
                  <div className="mt-5 flex flex-col gap-2 pt-4 border-t border-bark/10">
                    {activeStepData.points.map((pt) => (
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
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step Navigation Controls & Completion Action */}
        <div className="mt-8 flex items-center justify-between max-w-4xl mx-auto px-2">
          {/* Previous button */}
          <button
            type="button"
            onClick={goToPrev}
            disabled={isFirst}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              isFirst
                ? "opacity-30 cursor-not-allowed text-sand"
                : "bg-white text-bark border border-bark/15 hover:border-rose hover:text-rose-deep shadow-sm active:scale-95"
            }`}
          >
            <span>←</span>
            <span>Previous Step</span>
          </button>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {PROCESS_STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentStep(i)}
                aria-label={`Go to step ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? "w-8 bg-rose-deep shadow-[0_0_8px_rgba(143,70,54,0.4)]"
                    : i < currentStep
                    ? "w-3 bg-rose"
                    : "w-2 bg-bark/20 hover:bg-bark/40"
                }`}
              />
            ))}
          </div>

          {/* Next button or Final Screen advance */}
          {isLast ? (
            <a
              href="#reel-showcase"
              className="inline-flex items-center gap-2 rounded-full bg-rose-deep px-6 py-2.5 text-xs font-bold text-linen shadow-md hover:bg-rose-deep-hover transition-all active:scale-95 animate-pulse"
            >
              <span>Explore Reels</span>
              <span>↓</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={goToNext}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-xs font-bold text-linen shadow-md hover:bg-rose-deep transition-all active:scale-95"
            >
              <span>Next Step</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
