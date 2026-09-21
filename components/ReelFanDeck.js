"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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

// 5-Card 3D Arched Carousel configurations with clean separation and distinct depth
const CONFIG_5 = {
  "-2": { rotZ: -14, rotY: 20,  scale: 0.80, x: -390, y: 32, zIndex: 10, opacity: 0.75, z: -50 },
  "-1": { rotZ: -7,  rotY: 10,  scale: 0.92, x: -205, y: 12, zIndex: 25, opacity: 0.95, z: -10 },
  "0":  { rotZ: 0,   rotY: 0,   scale: 1.06, x: 0,    y: -8,  zIndex: 40, opacity: 1,    z: 30 },
  "1":  { rotZ: 7,   rotY: -10, scale: 0.92, x: 205,  y: 12, zIndex: 25, opacity: 0.95, z: -10 },
  "2":  { rotZ: 14,  rotY: -20, scale: 0.80, x: 390,  y: 32, zIndex: 10, opacity: 0.75, z: -50 },
};

// Isolated Video Progress Bar to avoid re-rendering cards during video playback
function VideoProgressBar({ videoRef }) {
  const barRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTime = () => {
      if (video.duration && barRef.current) {
        const pct = (video.currentTime / video.duration) * 100;
        barRef.current.style.width = `${pct}%`;
      }
    };

    video.addEventListener("timeupdate", handleTime);
    return () => video.removeEventListener("timeupdate", handleTime);
  }, [videoRef]);

  return (
    <div className="pointer-events-none absolute bottom-[104px] left-5 right-5 z-20">
      <div className="h-1 w-full rounded-full bg-white/25 overflow-hidden backdrop-blur-sm">
        <div
          ref={barRef}
          className="h-full bg-rose rounded-full transition-[width] duration-150 ease-linear shadow-[0_0_8px_rgba(217,138,122,0.8)]"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}

export default function ReelFanDeck({ onSelectReel }) {
  const [activeIndex, setActiveIndex] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

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

  // Mobile horizontal touch swipe gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    // Dominant horizontal swipe with 35px threshold
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        next();
      } else {
        prev();
      }
    }
  };

  // Active video play controller
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
          }
        });
    }
  }, [activeIndex, isMuted]);

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

  return (
    <div
      className="relative flex flex-col items-center w-full py-6 select-none overflow-hidden max-w-full"
      style={{ perspective: 1200 }}
    >
      {/* Ambient Backlight Glow behind Active Center Card */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full bg-rose/20 blur-[90px] opacity-70 transition-all duration-700 -z-10" />

      {/* 5-Card 3D Fan Stage with smooth multi-axis sliding & touch swipe */}
      <div
        style={{ transformStyle: "preserve-3d" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative flex items-center justify-center w-full max-w-6xl h-[440px] sm:h-[540px] md:h-[640px] touch-pan-y"
      >
        {REELS.map((reel, index) => {
          // Continuous circular offset: -3 to +3
          let offset = index - activeIndex;
          if (offset > REELS.length / 2) offset -= REELS.length;
          if (offset < -REELS.length / 2) offset += REELS.length;

          // Only 5 cards visible (-2 to +2)
          const isVisible = Math.abs(offset) <= 2;
          const isCenter = offset === 0;
          const config = CONFIG_5[String(offset)] || {
            rotZ: 0,
            rotY: 0,
            scale: 0.6,
            x: offset > 0 ? 520 : -520,
            y: 50,
            zIndex: 1,
            opacity: 0,
            z: -80,
          };

          // Mobile responsive layout (clean spacing, zero overflow)
          const mobileX = offset === 0 ? 0 : offset > 0 ? (offset === 1 ? 96 : 175) : (offset === -1 ? -96 : -175);
          const mobileRotZ = offset * 6;
          const mobileRotY = offset * -10;
          const mobileScale = isCenter ? 1.02 : Math.abs(offset) === 1 ? 0.85 : 0.72;
          const mobileOpacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.88 : 0.35;

          const baseX = isMobile ? mobileX : config.x;
          const baseRotZ = isMobile ? mobileRotZ : config.rotZ;
          const baseRotY = isMobile ? mobileRotY : config.rotY;
          const baseY = isMobile ? Math.abs(offset) * 10 : config.y;
          const baseScale = isMobile ? mobileScale : config.scale;
          const baseZ = isMobile ? (isCenter ? 25 : -15) : config.z;

          return (
            <motion.div
              key={reel.id}
              initial={false}
              animate={{
                x: isVisible ? baseX : offset > 0 ? 520 : -520,
                y: isVisible ? baseY : 50,
                z: isVisible ? baseZ : -80,
                rotateZ: isVisible ? baseRotZ : 0,
                rotateY: isVisible ? baseRotY : 0,
                scale: isVisible ? baseScale : 0.6,
                zIndex: isCenter ? 40 : config.zIndex,
                opacity: isVisible
                  ? isMobile
                    ? mobileOpacity
                    : config.opacity
                  : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
                mass: 0.8,
              }}
              onClick={(e) => {
                if (!isCenter) {
                  e.stopPropagation();
                  setActiveIndex(index);
                }
              }}
              // PURE CSS HOVER: zero React re-renders on cursor hover, preventing any video buffering!
              className={`group absolute rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-300 ${
                !isCenter ? "cursor-pointer hover:ring-2 hover:ring-rose/70" : ""
              } ${
                isCenter
                  ? "ring-2 ring-rose/90 shadow-[0_30px_80px_rgba(36,26,21,0.45)]"
                  : "shadow-[0_15px_35px_rgba(0,0,0,0.25)]"
              }`}
              style={{
                width: isMobile ? 210 : 285,
                height: isMobile ? 365 : 495,
                transformStyle: "preserve-3d",
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              {/* Card Surface */}
              <div className="relative h-full w-full bg-ink overflow-hidden">
                {isCenter ? (
                  <div className="relative h-full w-full">
                    <video
                      ref={videoRef}
                      key={reel.video}
                      src={reel.video}
                      poster={reel.image}
                      autoPlay
                      playsInline
                      loop
                      muted={isMuted}
                      preload="auto"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      className="h-full w-full object-cover"
                    />

                    {/* Specular Sheen */}
                    <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent mix-blend-overlay" />

                    {/* Isolated Video Progress Bar */}
                    <VideoProgressBar videoRef={videoRef} />
                  </div>
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      src={reel.image}
                      alt={reel.title}
                      fill
                      sizes="300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/15" />
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
                      <span className="flex items-center gap-1 rounded-full bg-rose-deep/90 px-2 py-1 text-[10px] font-bold text-linen backdrop-blur-md border border-rose/30">
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

                {/* Big Center Play Icon (Shown when paused) */}
                {isCenter && !isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center z-25 cursor-pointer bg-black/30 backdrop-blur-[1px]"
                  >
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-deep/95 text-linen shadow-2xl border border-linen/40 backdrop-blur-md"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                )}

                {/* Full-card click overlay for side cards to guarantee immediate, reliable response */}
                {!isCenter && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(index);
                    }}
                    aria-label={`Select ${reel.title}`}
                    className="absolute inset-0 z-35 w-full h-full bg-transparent border-0 cursor-pointer p-0 m-0"
                  />
                )}

                {/* Hover Click Hint on Side Cards via Pure CSS */}
                {!isCenter && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex items-center justify-center z-25 pointer-events-none">
                    <span className="rounded-full bg-black/80 px-4 py-2 text-xs font-semibold text-linen backdrop-blur-md border border-white/20 shadow-xl">
                      Click to view reel
                    </span>
                  </div>
                )}

                {/* Bottom Reel Info & Click Action */}
                <div className="absolute bottom-5 left-5 right-5 z-20 pointer-events-none">
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
                      if (isCenter && onSelectReel) {
                        e.stopPropagation();
                        onSelectReel(reel);
                      }
                    }}
                    className={`mt-3 flex items-center justify-between text-xs text-rose font-semibold group/btn hover:text-white transition-colors pt-2 border-t border-white/15 ${
                      isCenter ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
                    }`}
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
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4 mt-4 z-30">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous reel"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-bark/20 bg-white/90 text-bark backdrop-blur-md shadow-md transition-all hover:bg-rose-deep hover:text-linen hover:border-rose-deep hover:scale-110 active:scale-95"
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
          className="flex h-12 w-12 items-center justify-center rounded-full border border-bark/20 bg-white/90 text-bark backdrop-blur-md shadow-md transition-all hover:bg-rose-deep hover:text-linen hover:border-rose-deep hover:scale-110 active:scale-95"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
