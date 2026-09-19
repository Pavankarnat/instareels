"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const REELS = [
  {
    id: 1,
    title: "Aanya & Rohan",
    subtitle: "Udaipur Royal Wedding",
    views: "1.2M",
    image: "/photos/hero-bride.jpg",
    tag: "Royal Palace",
  },
  {
    id: 2,
    title: "Meera & Kabir",
    subtitle: "Goa Sunset Vows",
    views: "890K",
    image: "/photos/service-weddings.jpg",
    tag: "Beach Ceremony",
  },
  {
    id: 3,
    title: "Sana & Arjun",
    subtitle: "Manali Alpine Meadow",
    views: "640K",
    image: "/photos/service-prewed.jpg",
    tag: "Pre-Wedding",
  },
  {
    id: 4,
    title: "The Kapoor Reception",
    subtitle: "Candlelit Banquet Evening",
    views: "2.1M",
    image: "/photos/service-events.jpg",
    tag: "Grand Sangeet",
  },
  {
    id: 5,
    title: "Coastal Breeze",
    subtitle: "Carmel Beach Cathedral Veil",
    views: "1.5M",
    image: "/photos/work-veil.jpg",
    tag: "Cinematic Reel",
  },
  {
    id: 6,
    title: "Timeless Embrace",
    subtitle: "Monochrome Editorial",
    views: "980K",
    image: "/photos/work-bw-couple.jpg",
    tag: "Black & White",
  },
  {
    id: 7,
    title: "Curated Vows",
    subtitle: "Handmade Paper & Roses",
    views: "450K",
    image: "/photos/work-details.jpg",
    tag: "Details Film",
  },
];

// ReelOnGo exact 3D fan curvature parameters
const DESKTOP_CONFIG = [
  { rot: -22, scale: 0.76, x: -300, y: 52, zIndex: 1, opacity: 0.75 },
  { rot: -15, scale: 0.84, x: -210, y: 28, zIndex: 2, opacity: 0.9 },
  { rot: -7, scale: 0.93, x: -105, y: 8, zIndex: 5, opacity: 1 },
  { rot: 0, scale: 1.05, x: 0, y: -6, zIndex: 20, opacity: 1 },
  { rot: 7, scale: 0.93, x: 105, y: 8, zIndex: 5, opacity: 1 },
  { rot: 15, scale: 0.84, x: 210, y: 28, zIndex: 2, opacity: 0.9 },
  { rot: 22, scale: 0.76, x: 300, y: 52, zIndex: 1, opacity: 0.75 },
];

export default function ReelFanDeck({ onSelectReel }) {
  const [activeIndex, setActiveIndex] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function next() {
    setActiveIndex((prev) => (prev + 1) % REELS.length);
  }

  function prev() {
    setActiveIndex((prev) => (prev - 1 + REELS.length) % REELS.length);
  }

  return (
    <div className="relative flex flex-col items-center w-full py-6 select-none overflow-hidden">
      {/* 3D Fan Stage */}
      <div className="relative flex items-center justify-center w-full max-w-6xl h-[460px] sm:h-[540px] md:h-[620px]">
        {REELS.map((reel, index) => {
          // Relative slot offset from the active center card (-3 to +3)
          let offset = index - activeIndex;
          if (offset < -3) offset += REELS.length;
          if (offset > 3) offset -= REELS.length;

          const isVisible = Math.abs(offset) <= 3;
          if (!isVisible) return null;

          const slotIndex = offset + 3; // 0 to 6
          const config = DESKTOP_CONFIG[slotIndex];

          // Mobile scaling adjustment
          const mobileX = offset * 95;
          const mobileRot = offset * 6;
          const mobileScale = offset === 0 ? 1 : 0.85;

          const transformX = isMobile ? mobileX : config.x;
          const transformRot = isMobile ? mobileRot : config.rot;
          const transformY = isMobile ? Math.abs(offset) * 14 : config.y;
          const transformScale = isMobile ? mobileScale : config.scale;

          const isCenter = offset === 0;

          return (
            <motion.div
              key={reel.id}
              layout
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                x: transformX,
                y: transformY,
                rotate: transformRot,
                scale: transformScale,
                zIndex: config.zIndex,
                opacity: isMobile && Math.abs(offset) > 1 ? 0.2 : config.opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
              }}
              onClick={() => {
                if (isCenter && onSelectReel) {
                  onSelectReel(reel);
                } else {
                  setActiveIndex(index);
                }
              }}
              className={`absolute cursor-pointer rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
                isCenter ? "ring-2 ring-rose/70 shadow-[0_30px_70px_rgba(0,0,0,0.4)]" : "hover:brightness-105"
              }`}
              style={{
                width: isMobile ? 220 : 280,
                height: isMobile ? 380 : 490,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Phone / Reel Container */}
              <div className="relative h-full w-full bg-black overflow-hidden group">
                <Image
                  src={reel.image}
                  alt={reel.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark gradient for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold text-linen/90 backdrop-blur-md border border-white/10">
                    {reel.tag}
                  </span>
                  <div className="flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[11px] text-linen/90 backdrop-blur-md border border-white/10">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>{reel.views}</span>
                  </div>
                </div>

                {/* Center Play Icon for Active Card */}
                {isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-deep/90 text-linen shadow-2xl border border-linen/40 backdrop-blur-sm"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                )}

                {/* Bottom Reel Info */}
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <h3 className="font-serif text-lg font-semibold text-linen leading-snug">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-linen/70 mt-0.5">{reel.subtitle}</p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-rose font-medium">
                    <span>Watch Full 4K Reel</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4 mt-6 z-30">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous reel"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-bark/20 bg-linen/90 text-bark backdrop-blur-md shadow-md transition-all hover:bg-rose-deep hover:text-linen hover:border-rose-deep hover:scale-110 active:scale-95"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Step dots */}
        <div className="flex items-center gap-2">
          {REELS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to reel ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-7 bg-rose-deep" : "w-2.5 bg-bark/20 hover:bg-bark/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next reel"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-bark/20 bg-linen/90 text-bark backdrop-blur-md shadow-md transition-all hover:bg-rose-deep hover:text-linen hover:border-rose-deep hover:scale-110 active:scale-95"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
