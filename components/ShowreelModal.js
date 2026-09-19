"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ShowreelModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window with 3D Pop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl overflow-hidden rounded-lg border border-white/15 bg-ink shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-ink2/60">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-deep"></span>
              </span>
              <span className="text-xs font-semibold tracking-widest text-linen uppercase">
                Instantreels Showreel 2026 · 4K Cinema
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-linen/70 transition-colors hover:border-rose hover:text-linen"
            >
              ✕
            </button>
          </div>

          {/* Cinematic Screen */}
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <Image
              src="/photos/service-weddings.jpg"
              alt="Instantreels Showreel"
              fill
              className="object-cover"
            />
            {/* Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Centered Play Animation */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-20 w-20 items-center justify-center rounded-full border border-linen/50 bg-rose-deep/90 text-linen shadow-2xl backdrop-blur-sm cursor-pointer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
              <span className="mt-4 font-serif text-lg tracking-wide text-linen/90">
                Playing: &ldquo;Moments Before Forever&rdquo;
              </span>
              <span className="text-xs text-linen/60">
                Shot on ARRI Alexa Mini LF · 35mm Vintage Anamorphic
              </span>
            </div>

            {/* Bottom Progress Bar */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center gap-4 text-xs text-linen/70">
              <span>01:24</span>
              <div className="relative h-1 flex-1 overflow-hidden rounded bg-white/20">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-rose"
                />
              </div>
              <span>03:45</span>
            </div>
          </div>

          {/* Footer note */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-ink/90 text-xs text-linen/60">
            <div>Directed & Graded by Instantreels Studio</div>
            <div className="flex gap-4">
              <span>Udaipur</span>
              <span>•</span>
              <span>Goa</span>
              <span>•</span>
              <span>Jaipur</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
