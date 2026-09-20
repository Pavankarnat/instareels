"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShowreelModal({ isOpen, onClose, reel }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const videoSrc = reel?.video || "/videos/reel1.mp4";
  const posterSrc = reel?.image || "/photos/service-weddings.jpg";
  const title = reel?.title || "Instantreels 4K Cinema Showcase";
  const subtitle = reel?.subtitle || "Selected Master Highlights";
  const tag = reel?.tag || "Royal Wedding Cinema";

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      setCurrentTime(0);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // If unmuted autoplay is blocked by browser policy, fallback to muted
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play();
          }
        });
      }
    }
  }, [isOpen, reel]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !duration) return;
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false));
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window with 3D Pop */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.9, y: 25, rotateX: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 26, stiffness: 280 }}
          className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-ink shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-ink2/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-deep"></span>
              </span>
              <div>
                <span className="text-xs font-semibold tracking-widest text-linen uppercase">
                  {tag} · 4K MASTER FILM
                </span>
                <span className="hidden sm:inline text-xs text-sand ml-2">
                  • {title}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-linen/70 transition-all hover:scale-110 hover:border-rose hover:text-linen hover:bg-rose/20"
            >
              ✕
            </button>
          </div>

          {/* Cinematic Screen with Real Video Player */}
          <div className="relative aspect-[9/16] sm:aspect-[16/9] max-h-[68vh] w-full overflow-hidden bg-black flex items-center justify-center group">
            {/* Ambient video glow in background */}
            <div className="absolute inset-0 bg-rose-deep/15 blur-2xl -z-10" />

            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              playsInline
              loop
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="h-full w-full object-contain cursor-pointer"
            />

            {/* Centered Large Play Overlay when paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-linen/50 bg-rose-deep/95 text-linen shadow-2xl backdrop-blur-md"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
                <span className="mt-4 font-serif text-lg tracking-wide text-linen">
                  Click to Resume &ldquo;{title}&rdquo;
                </span>
              </div>
            )}

            {/* Bottom Gradient for Player Bar */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Custom Cinema Player Control Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col gap-2 z-20">
              {/* Timeline Scrubber */}
              <div className="relative flex items-center group/scrub">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressPercent || 0}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-rose hover:h-2.5 transition-all"
                />
              </div>

              {/* Bottom Controls Row */}
              <div className="flex items-center justify-between text-xs text-linen/90 pt-1">
                <div className="flex items-center gap-4">
                  {/* Play / Pause Toggle */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-rose-deep text-linen transition-colors"
                  >
                    {isPlaying ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Audio Mute & Volume Slider */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="text-linen/80 hover:text-rose transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <line x1="23" y1="9" x2="17" y2="15" />
                          <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-14 sm:w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-rose"
                    />
                  </div>

                  {/* Time stamps */}
                  <span className="font-mono text-[11px] text-linen/70">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-[11px] text-rose font-medium tracking-wide">
                    ARRI Alexa Mini LF • 4K ProRes
                  </span>

                  {/* Fullscreen Button */}
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    title="Toggle Fullscreen"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-rose-deep text-linen transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 bg-ink2 text-xs text-linen/70 border-t border-white/10">
            <div>
              <span className="font-semibold text-linen">{title}</span> — {subtitle}
            </div>
            <div className="flex gap-4 text-linen/50">
              <span>Color Graded by Instantreels Studio</span>
              <span>•</span>
              <span className="text-rose font-semibold">9:16 Social Ready</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
