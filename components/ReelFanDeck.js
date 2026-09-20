"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const REELS = [
  {
    id: 1,
    title: "Aanya & Rohan",
    subtitle: "Udaipur Royal Wedding",
    views: "1.2M",
    image: "/photos/hero-bride.jpg",
    video: "/videos/reel1.mp4",
    tag: "Royal Palace",
    badge: "4K HDR",
  },
  {
    id: 2,
    title: "Meera & Kabir",
    subtitle: "Goa Sunset Vows",
    views: "890K",
    image: "/photos/service-weddings.jpg",
    video: "/videos/reel2.mp4",
    tag: "Beach Ceremony",
    badge: "Golden Hour",
  },
  {
    id: 3,
    title: "Sana & Arjun",
    subtitle: "Manali Alpine Meadow",
    views: "640K",
    image: "/photos/service-prewed.jpg",
    video: "/videos/reel3.mp4",
    tag: "Pre-Wedding",
    badge: "Cinema Scope",
  },
  {
    id: 4,
    title: "The Kapoor Reception",
    subtitle: "Candlelit Banquet Evening",
    views: "2.1M",
    image: "/photos/service-events.jpg",
    video: "/videos/reel4.mp4",
    tag: "Grand Sangeet",
    badge: "Live Audio",
  },
  {
    id: 5,
    title: "Coastal Breeze",
    subtitle: "Carmel Beach Cathedral Veil",
    views: "1.5M",
    image: "/photos/work-veil.jpg",
    video: "/videos/reel5.mp4",
    tag: "Cinematic Reel",
    badge: "Anamorphic",
  },
  {
    id: 6,
    title: "Timeless Embrace",
    subtitle: "Monochrome Editorial",
    views: "980K",
    image: "/photos/work-bw-couple.jpg",
    video: "/videos/reel6.mp4",
    tag: "Black & White",
    badge: "Monochrome",
  },
  {
    id: 7,
    title: "Curated Vows",
    subtitle: "Handmade Paper & Roses",
    views: "450K",
    image: "/photos/work-details.jpg",
    video: "/videos/reel7.mp4",
    tag: "Details Film",
    badge: "Macro 4K",
  },
];

// Base fan curvature parameters (relative offset from center card: -3 to +3)
const DESKTOP_CONFIG = [
  { rot: -24, scale: 0.76, x: -330, y: 55, zIndex: 2, opacity: 0.75 },
  { rot: -16, scale: 0.85, x: -225, y: 28, zIndex: 4, opacity: 0.9 },
  { rot: -8, scale: 0.94, x: -112, y: 8, zIndex: 6, opacity: 1 },
  { rot: 0, scale: 1.06, x: 0, y: -8, zIndex: 25, opacity: 1 },
  { rot: 8, scale: 0.94, x: 112, y: 8, zIndex: 6, opacity: 1 },
  { rot: 16, scale: 0.85, x: 225, y: 28, zIndex: 4, opacity: 0.9 },
  { rot: 24, scale: 0.76, x: 330, y: 55, zIndex: 2, opacity: 0.75 },
];

export default function ReelFanDeck({ onSelectReel }) {
  const [activeIndex, setActiveIndex] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Framer Motion continuous mouse tracking values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Luxury spring physics damping for smooth cursor follow
  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Derived transforms from mouse coordinates
  const stageRotateY = useTransform(smoothMouseX, [-1, 1], [-14, 14]);
  const stageRotateX = useTransform(smoothMouseY, [-1, 1], [10, -10]);
  const stageX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const stageY = useTransform(smoothMouseY, [-1, 1], [-12, 12]);

  // Specular light position
  const lightX = useTransform(smoothMouseX, [-1, 1], ["20%", "80%"]);
  const lightY = useTransform(smoothMouseY, [-1, 1], ["20%", "80%"]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update mouse position normalized between -1 and 1
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(Math.max(-1, Math.min(1, x)));
    mouseY.set(Math.max(-1, Math.min(1, y)));
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredIndex(null);
  }, [mouseX, mouseY]);

  // Auto-advance only once the current video finishes playing
  const handleVideoEnded = useCallback(() => {
    setActiveIndex((prevIdx) => (prevIdx + 1) % REELS.length);
  }, []);

  function next() {
    setActiveIndex((prevIdx) => (prevIdx + 1) % REELS.length);
  }

  function prev() {
    setActiveIndex((prevIdx) => (prevIdx - 1 + REELS.length) % REELS.length);
  }

  // Handle active video playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay with sound might be blocked, ensure muted
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play();
            }
          });
      }
    }
  }, [activeIndex]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setVideoProgress(progress);
  };

  const activeReel = REELS[activeIndex];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center w-full py-6 select-none overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* Dynamic Ambient Backlight Glow behind Active Center Card */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-rose/25 blur-[100px] opacity-70 transition-all duration-700 -z-10" />

      {/* 3D Fan Stage with Cursor Parallax Rotation */}
      <motion.div
        style={{
          rotateY: stageRotateY,
          rotateX: stageRotateX,
          x: stageX,
          y: stageY,
          transformStyle: "preserve-3d",
        }}
        className="relative flex items-center justify-center w-full max-w-6xl h-[480px] sm:h-[560px] md:h-[640px]"
      >
        {REELS.map((reel, index) => {
          let offset = index - activeIndex;
          if (offset < -3) offset += REELS.length;
          if (offset > 3) offset -= REELS.length;

          const isVisible = Math.abs(offset) <= 3;
          if (!isVisible) return null;

          const slotIndex = offset + 3; // 0 to 6
          const config = DESKTOP_CONFIG[slotIndex];

          const isCenter = offset === 0;
          const isHovered = hoveredIndex === index;

          // Responsive calculation
          const mobileX = offset * 95;
          const mobileRot = offset * 7;
          const mobileScale = offset === 0 ? 1.02 : 0.85;

          const baseX = isMobile ? mobileX : config.x;
          const baseRot = isMobile ? mobileRot : config.rot;
          const baseY = isMobile ? Math.abs(offset) * 14 : config.y;
          const baseScale = isMobile ? mobileScale : config.scale;

          // Dynamic offset adjustments when cursor hovers
          const hoverLift = isHovered && !isCenter ? -15 : 0;
          const hoverScaleMultiplier = isHovered ? 1.05 : 1;

          return (
            <motion.div
              key={reel.id}
              layout
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                x: baseX,
                y: baseY + hoverLift,
                rotateZ: baseRot,
                scale: baseScale * hoverScaleMultiplier,
                zIndex: isCenter ? 30 : isHovered ? 20 : config.zIndex,
                opacity: isMobile && Math.abs(offset) > 1 ? 0.25 : config.opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
                mass: 0.8,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(e) => {
                e.stopPropagation();
                if (isCenter && onSelectReel) {
                  onSelectReel(reel);
                } else {
                  setActiveIndex(index);
                }
              }}
              className={`absolute cursor-pointer rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-500 ${
                isCenter
                  ? "ring-2 ring-rose/80 shadow-[0_35px_80px_rgba(36,26,21,0.45)]"
                  : "hover:ring-1 hover:ring-rose/40 hover:brightness-110 shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
              }`}
              style={{
                width: isMobile ? 220 : 285,
                height: isMobile ? 385 : 495,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Phone / Reel Container */}
              <div className="relative h-full w-full bg-ink overflow-hidden group">
                {/* Active Card Plays Real Video */}
                {isCenter ? (
                  <div className="relative h-full w-full">
                    <video
                      ref={videoRef}
                      src={reel.video}
                      poster={reel.image}
                      playsInline
                      muted={isMuted}
                      onTimeUpdate={handleTimeUpdate}
                      onEnded={handleVideoEnded}
                      className="h-full w-full object-cover"
                    />

                    {/* Cursor Interactive Specular Glare */}
                    <motion.div
                      style={{
                        background: `radial-gradient(circle at ${lightX} ${lightY}, rgba(255,255,255,0.18) 0%, transparent 65%)`,
                      }}
                      className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay"
                    />
                  </div>
                ) : (
                  /* Side Cards show Poster Image with Zoom on Hover */
                  <div className="relative h-full w-full">
                    <Image
                      src={reel.image}
                      alt={reel.title}
                      fill
                      sizes="300px"
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    {/* Dark gradient for non-active depth */}
                    <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/20" />
                  </div>
                )}

                {/* Dark Vignette Overlay for Text Legibility */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35" />

                {/* Top Badge Strip */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-linen backdrop-blur-md border border-white/15">
                      {reel.tag}
                    </span>
                    {isCenter && (
                      <span className="flex items-center gap-1 rounded-full bg-rose-deep/80 px-2 py-1 text-[10px] font-bold text-linen backdrop-blur-md border border-rose/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                        LIVE REEL
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-linen backdrop-blur-md border border-white/15">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>{reel.views}</span>
                  </div>
                </div>

                {/* Video Play/Pause & Sound Controls on Active Card */}
                {isCenter && (
                  <div className="absolute top-16 right-4 z-30 flex flex-col gap-2">
                    {/* Audio Mute/Unmute Button with Animated Wave Bars */}
                    <button
                      type="button"
                      onClick={toggleMute}
                      title={isMuted ? "Unmute Sound" : "Mute Sound"}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 border border-white/20 text-linen backdrop-blur-md transition-all hover:scale-110 hover:bg-rose-deep active:scale-95"
                    >
                      {isMuted ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <line x1="23" y1="9" x2="17" y2="15" />
                          <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                      ) : (
                        <div className="flex items-center gap-0.5 h-3">
                          <span className="w-0.5 h-full bg-rose animate-[pulse_0.6s_ease-in-out_infinite]" />
                          <span className="w-0.5 h-2 bg-rose animate-[pulse_0.4s_ease-in-out_infinite_0.1s]" />
                          <span className="w-0.5 h-full bg-rose animate-[pulse_0.5s_ease-in-out_infinite_0.2s]" />
                        </div>
                      )}
                    </button>

                    {/* Quick Play/Pause Button */}
                    <button
                      type="button"
                      onClick={togglePlay}
                      title={isPlaying ? "Pause Video" : "Play Video"}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 border border-white/20 text-linen backdrop-blur-md transition-all hover:scale-110 hover:bg-rose-deep active:scale-95"
                    >
                      {isPlaying ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                )}

                {/* Big Center Play Icon (Shown when paused or for opening modal) */}
                {isCenter && !isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center z-25 cursor-pointer bg-black/30 backdrop-blur-[1px]"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-deep/95 text-linen shadow-2xl border border-linen/40 backdrop-blur-md"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                )}

                {/* Real-Time Video Progress Bar for Active Card */}
                {isCenter && (
                  <div className="absolute bottom-[104px] left-5 right-5 z-20">
                    <div className="h-1 w-full rounded-full bg-white/20 overflow-hidden backdrop-blur-sm">
                      <div
                        className="h-full bg-rose transition-all duration-150 ease-linear rounded-full shadow-[0_0_8px_rgba(217,138,122,0.8)]"
                        style={{ width: `${videoProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Bottom Reel Info & Click Action */}
                <div className="absolute bottom-5 left-5 right-5 z-20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-widest text-rose font-bold">
                      {reel.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-linen leading-snug drop-shadow-md">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-linen/75 mt-0.5">{reel.subtitle}</p>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectReel) onSelectReel(reel);
                    }}
                    className="mt-3 flex items-center justify-between text-xs text-rose font-semibold group/btn hover:text-white transition-colors pt-2 border-t border-white/15"
                  >
                    <span className="flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Watch Full 4K Cinema
                    </span>
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1 font-mono">
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>


      {/* Navigation Controls */}
      <div className="flex items-center gap-4 mt-4 z-30">
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

        {/* Step dots with smooth expansion */}
        <div className="flex items-center gap-2">
          {REELS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to reel ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-rose-deep shadow-[0_0_10px_rgba(143,70,54,0.4)]"
                  : "w-2.5 bg-bark/20 hover:bg-bark/40"
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
