"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function HeroPhoneMockup({
  videoSrc = "/videos/reel1.mp4",
  posterSrc = "/photos/hero-bride.jpg",
  title = "Ananya's Sangeet Night",
  subtitle = "Wedding & Grand Celebration",
  creatorName = "Arriving in 12 min",
}) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Mouse tilt motion values (normalized -0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for realistic phone rotation
  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  
  // Parallax shifts for floating badges (multi-layer depth, contained within layout)
  const badgeTopX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);
  const badgeTopY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), springConfig);
  const badgeBottomX = useSpring(useTransform(mouseX, [-0.5, 0.5], [6, -6]), springConfig);
  const badgeBottomY = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);



  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  // Ensure autoplay works gracefully
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay restricted or interrupted
            setIsPlaying(false);
          });
      }
    }
  }, [videoSrc]);

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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center select-none py-6 px-4 sm:px-8 w-full max-w-[440px] mx-auto overflow-visible"
      style={{ perspective: 1200 }}
    >
      {/* Ambient background glow matching our brand rose/amber tone */}
      <div className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-rose/25 via-rose-deep/15 to-transparent blur-[80px] opacity-75 -z-10" />

      {/* 3D Phone Chassis with spring rotation */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="relative w-[275px] sm:w-[295px] md:w-[310px] aspect-[9/18.8] rounded-[48px] p-[10px] bg-gradient-to-b from-[#382d27] via-[#201815] to-[#120d0b] shadow-[0_30px_70px_-15px_rgba(28,19,16,0.55),0_10px_25px_-5px_rgba(0,0,0,0.4)] border border-[#524138]/60"
      >
        {/* Outer Phone Bezel Accent Rim */}
        <div className="absolute inset-0 rounded-[48px] border border-white/10 pointer-events-none" />

        {/* Side Antenna & Buttons Accents */}
        <div className="absolute -left-[2px] top-24 h-9 w-[3px] rounded-l-sm bg-[#5c4a40]" />
        <div className="absolute -left-[2px] top-36 h-12 w-[3px] rounded-l-sm bg-[#5c4a40]" />
        <div className="absolute -left-[2px] top-52 h-12 w-[3px] rounded-l-sm bg-[#5c4a40]" />
        <div className="absolute -right-[2px] top-32 h-16 w-[3px] rounded-r-sm bg-[#5c4a40]" />

        {/* Phone Inner Display Bezel */}
        <div className="relative h-full w-full rounded-[40px] overflow-hidden bg-black shadow-inner">
          {/* Real Video Screen / Poster Fallback */}
          <div className="relative h-full w-full bg-ink">
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              playsInline
              loop
              muted={isMuted}
              onLoadedData={() => setIsVideoLoaded(true)}
              className="h-full w-full object-cover"
            />

            {/* Poster fallback image while video loads */}
            {!isVideoLoaded && (
              <Image
                src={posterSrc}
                alt="Reel preview"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 350px"
              />
            )}

            {/* Specular Glass Sheen Overlay */}
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent mix-blend-overlay" />

            {/* Top & Bottom Vignette Gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent via-55% to-black/60 z-10" />

            {/* Top Phone Status Bar */}
            <div className="absolute top-0 left-0 right-0 z-30 pt-3 px-6 flex items-center justify-between text-[11px] font-semibold text-white tracking-tight">
              <span>9:41</span>

              {/* Dynamic Island Notch */}
              <div className="h-[23px] w-[92px] rounded-full bg-black flex items-center justify-between px-2.5 shadow-md border border-white/10">
                <div className="h-2.5 w-2.5 rounded-full bg-[#181818] border border-white/20 flex items-center justify-center">
                  <div className="h-1 w-1 rounded-full bg-[#2a3a5a]" />
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-rose animate-pulse" />
              </div>

              {/* Cellular, WiFi & Battery icons */}
              <div className="flex items-center gap-1.5 text-white/90">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" opacity="0.3" />
                  <path d="M12 6a6 6 0 0 0-6 6c0 1.41.49 2.71 1.31 3.74L12 19l4.69-3.26A5.96 5.96 0 0 0 18 12a6 6 0 0 0-6-6z" />
                </svg>
                <div className="flex items-center gap-0.5">
                  <span className="w-[3px] h-[5px] bg-white rounded-xs" />
                  <span className="w-[3px] h-[7px] bg-white rounded-xs" />
                  <span className="w-[3px] h-[9px] bg-white rounded-xs" />
                </div>
                {/* Battery outline */}
                <div className="w-5 h-2.5 rounded-[3px] border border-white/80 p-[1px] flex items-center">
                  <div className="w-3 h-full bg-white rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* Quick Play & Sound Controls Inside Screen */}
            <div className="absolute top-14 right-3.5 z-30 flex flex-col gap-2">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 hover:bg-rose-deep"
              >
                {isMuted ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>

              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 hover:bg-rose-deep"
              >
                {isPlaying ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* In-Screen Bottom Information Overlay (Matching Reference) */}
            <div className="absolute bottom-5 left-4 right-4 z-30 text-white">
              {/* Live edit badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white/90 backdrop-blur-md border border-white/15 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Live edit in progress</span>
              </div>

              {/* Event Title & Category */}
              <h4 className="font-serif text-[15px] sm:text-base font-semibold text-white drop-shadow-md leading-tight">
                {title}
              </h4>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/80 font-sans">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#d98a7a" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M7 4v16M17 4v16M2 12h20M2 8h5M2 16h5M17 8h5M17 16h5" />
                </svg>
                <span>{subtitle}</span>
              </p>

              {/* Pills: HD Reels & Fast delivery */}
              <div className="mt-2.5 flex items-center gap-2">
                <div className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm border border-white/10">
                  HD Reels
                </div>
                <div className="flex items-center gap-1 rounded-md bg-rose-deep/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm border border-rose/30">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <span>Fast</span>
                </div>
              </div>
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-white/40 z-30" />
          </div>
        </div>

        {/* ============================================================ */}
        {/* Floating 3D Badge 1: Top-Right "CREATOR MATCHED"             */}
        {/* ============================================================ */}
        <motion.div
          style={{
            x: badgeTopX,
            y: badgeTopY,
            transform: "translateZ(55px)",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="absolute -top-2 -right-2 sm:-right-4 md:-right-6 z-40 rounded-2xl bg-white/95 text-bark px-3 sm:px-3.5 py-2 sm:py-2.5 shadow-[0_16px_36px_-6px_rgba(28,19,16,0.22),0_4px_12px_rgba(0,0,0,0.06)] border border-bark/10 backdrop-blur-md whitespace-nowrap"
        >
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-bold tracking-wider text-sand uppercase">
              CREATOR MATCHED
            </span>
          </div>
          <div className="mt-0.5 text-xs sm:text-[13px] font-bold text-bark tracking-tight">
            {creatorName}
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* Floating 3D Badge 2: Bottom-Left "DELIVERY SPEED"            */}
        {/* ============================================================ */}
        <motion.div
          style={{
            x: badgeBottomX,
            y: badgeBottomY,
            transform: "translateZ(45px)",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-3 -left-2 sm:-left-4 md:-left-6 z-40 rounded-2xl bg-white/95 text-bark px-3 sm:px-3.5 py-2 sm:py-2.5 shadow-[0_16px_36px_-6px_rgba(28,19,16,0.22),0_4px_12px_rgba(0,0,0,0.06)] border border-bark/10 backdrop-blur-md whitespace-nowrap"
        >
          <div className="text-[10px] font-bold tracking-wider text-sand uppercase">
            DELIVERY SPEED
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-bark tracking-tight">
            <span className="text-bark">Shot</span>
            <span className="text-rose font-mono text-xs">→</span>
            <span className="text-bark">Edited</span>
            <span className="text-rose font-mono text-xs">→</span>
            <span className="text-rose-deep font-extrabold">Posted</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
