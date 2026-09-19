"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const PROCESS_STEPS = [
  {
    step: "STEP 01",
    title: "Book & Lock Your Date",
    desc: "Tell us what you need — event type, location, date, and preferred aesthetic mood. Our team reviews availability and confirms your booking within minutes with no back-and-forth friction.",
    image: "/photos/story-flatlay.jpg",
    tag: "Instant Confirmation",
    points: ["Quick 24hr availability check", "Custom aesthetic questionnaire", "Transparent pricing & packages"],
  },
  {
    step: "STEP 02",
    title: "Curate Timeline & Moodboard",
    desc: "We shape your bespoke shot list, audio palette, and lighting timeline together. From golden hour angles to unscripted family reactions, every crucial beat is mapped out.",
    image: "/photos/work-details.jpg",
    tag: "Creative Direction",
    points: ["Music & audio licensing palette", "Wardrobe & lighting styling guide", "Key moments priority sheet"],
  },
  {
    step: "STEP 03",
    title: "On-Ground Cinematic Shoot",
    desc: "Our certified filmmakers arrive fully equipped with 4K cinema gear. We stay unobtrusive and let the raw magic of your day lead the way, capturing authentic smiles and tears.",
    image: "/photos/hero-bride.jpg",
    tag: "Discreet Coverage",
    points: ["Multi-angle gimbal & prime lenses", "Dedicated audio recording", "Zero staged or stiff posing"],
  },
  {
    step: "STEP 04",
    title: "On-Site / Express 48hr Edit",
    desc: "Your footage is ingested, colored with film-stock LUTs, and cut to music. You get your first vertical teaser while your guests are still buzzing from the celebration.",
    image: "/photos/service-events.jpg",
    tag: "Rapid Turnaround",
    points: ["Same-week social-ready 9:16 reels", "Bespoke color grading", "Trending licensed tracks"],
  },
  {
    step: "STEP 05",
    title: "Final 4K Master Delivery",
    desc: "Your full highlight film and uncompressed digital gallery are delivered to your private cloud suite — ready to stream, download, and relive forever.",
    image: "/photos/service-weddings.jpg",
    tag: "Permanent Cloud Suite",
    points: ["4K ProRes & H.265 master files", "Social cuts + full ceremony edits", "Raw footage backup included"],
  },
];

export default function ProcessStack3D() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Wheel listener inside the card stack for interactive peeling (just like ReelOnGo)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleWheel(e) {
      if (Math.abs(e.deltaY) < 25) return;
      if (isScrollingRef.current) return;

      if (e.deltaY > 0 && activeStep < PROCESS_STEPS.length - 1) {
        e.preventDefault();
        isScrollingRef.current = true;
        setActiveStep((prev) => Math.min(prev + 1, PROCESS_STEPS.length - 1));
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 600);
      } else if (e.deltaY < 0 && activeStep > 0) {
        e.preventDefault();
        isScrollingRef.current = true;
        setActiveStep((prev) => Math.max(prev - 1, 0));
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 600);
      }
    }

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [activeStep]);

  return (
    <div className="relative w-full py-8 select-none">
      {/* Step Navigation Pills */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-linen2/80 border border-bark/10 backdrop-blur-md shadow-sm overflow-x-auto max-w-full">
          {PROCESS_STEPS.map((step, idx) => (
            <button
              key={step.step}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeStep === idx
                  ? "bg-rose-deep text-linen shadow-md"
                  : "text-bark/70 hover:text-bark hover:bg-bark/5"
              }`}
            >
              {step.step}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Stack Container (Desktop & Tablet) */}
      <div ref={containerRef} className="relative mx-auto max-w-5xl h-[520px] sm:h-[480px]">
        {/* Background Silhouette Stack Layers (ReelOnGo 3D card backings) */}
        <div className="pointer-events-none absolute left-1/2 -top-8 w-full max-w-4xl -translate-x-1/2 -z-20 hidden md:block">
          {[0, 1, 2].map((layer) => (
            <div
              key={layer}
              className="absolute inset-x-0 rounded-[36px] bg-white/70 border border-bark/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              style={{
                height: 440,
                top: -((layer + 1) * 14),
                transform: `scale(${1 - (layer + 1) * 0.025})`,
                opacity: 0.7 - layer * 0.25,
                zIndex: -(layer * 2),
              }}
            />
          ))}
        </div>

        {/* Dynamic 3D Card Stack */}
        <div className="relative h-full w-full">
          {PROCESS_STEPS.map((s, idx) => {
            const isCurrent = idx === activeStep;
            const isPast = idx < activeStep;
            const isFuture = idx > activeStep;
            const diff = activeStep - idx;

            // ReelOnGo exact 3D card stack formula
            const transformStyle = isCurrent
              ? "translateY(0px) scale(1) rotate(0deg)"
              : isPast
              ? `translateY(${-20 * diff}px) scale(${1 - 0.025 * diff}) rotate(${-0.3 * diff}deg)`
              : "translateY(160px) scale(0.95)";

            const opacity = isFuture ? 0 : 1;
            const zIndex = isCurrent ? 30 : isPast ? 20 - diff : 10;
            const blur = isPast ? `blur(${0.4 * diff}px)` : "none";

            return (
              <div
                key={s.step}
                onClick={() => isPast && setActiveStep(idx)}
                className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                  isCurrent ? "cursor-default" : isPast ? "cursor-pointer hover:brightness-105" : "pointer-events-none"
                }`}
                style={{
                  transform: transformStyle,
                  opacity,
                  zIndex,
                  filter: blur,
                  visibility: isFuture ? "hidden" : "visible",
                }}
              >
                <div className="h-full w-full rounded-[32px] md:rounded-[40px] bg-white border border-bark/10 p-4 sm:p-6 md:p-8 shadow-[0_30px_80px_-25px_rgba(36,26,21,0.18)]">
                  <div className="grid h-full w-full grid-cols-1 md:grid-cols-[1.05fr_1.15fr] items-center gap-6 md:gap-10">
                    {/* Left Photo Showcase */}
                    <div className="relative h-56 sm:h-72 md:h-full w-full overflow-hidden rounded-[24px] bg-linen/50 group">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-linen backdrop-blur-md border border-white/20">
                        {s.tag}
                      </span>
                    </div>

                    {/* Right Narrative & Bullet Points */}
                    <div className="flex h-full flex-col justify-between py-2 md:py-4">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-rose/15 px-3.5 py-1 text-xs font-bold text-rose-deep tracking-wider">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-deep animate-pulse" />
                          {s.step} OF 05
                        </div>
                        <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-medium text-bark leading-snug">
                          {s.title}
                        </h3>
                        <p className="mt-3 text-sm sm:text-base leading-relaxed text-bark/75 font-normal">
                          {s.desc}
                        </p>
                      </div>

                      {/* Bullet Features */}
                      <div className="mt-6 flex flex-col gap-2.5 pt-4 border-t border-bark/10">
                        {s.points.map((pt) => (
                          <div key={pt} className="flex items-center gap-2.5 text-xs sm:text-sm text-bark/85">
                            <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-rose-deep text-linen">
                              ✓
                            </span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Progress Controls */}
      <div className="mt-14 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
          disabled={activeStep === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-bark/20 bg-white text-bark transition-all hover:bg-rose-deep hover:text-linen hover:border-rose-deep disabled:opacity-30 disabled:pointer-events-none"
        >
          ←
        </button>

        <div className="flex gap-2">
          {PROCESS_STEPS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveStep(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeStep ? "w-8 bg-rose-deep" : "w-2 bg-bark/20"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setActiveStep((prev) => Math.min(prev + 1, PROCESS_STEPS.length - 1))}
          disabled={activeStep === PROCESS_STEPS.length - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-bark/20 bg-white text-bark transition-all hover:bg-rose-deep hover:text-linen hover:border-rose-deep disabled:opacity-30 disabled:pointer-events-none"
        >
          →
        </button>
      </div>
    </div>
  );
}
