"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import { MotionReveal } from "@/components/MotionWrapper";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { key: "all", label: "All Work" },
  { key: "weddings", label: "Weddings" },
  { key: "preWedding", label: "Pre-Wedding" },
  { key: "events", label: "Events" },
  { key: "portraits", label: "Portraits" },
];

const ITEMS = [
  { category: "weddings", seed: "ir-pf-1", title: "Aanya & Rohan", subtitle: "Udaipur", format: "4K Master Film" },
  { category: "weddings", seed: "ir-pf-2", title: "Meera & Kabir", subtitle: "Goa", format: "Sunset Beach Reel" },
  { category: "weddings", seed: "ir-pf-3", title: "Priya & Dev", subtitle: "Jaipur", format: "Royal Palace Film" },
  { category: "preWedding", seed: "ir-pf-4", title: "Sana & Arjun", subtitle: "Manali", format: "Alpine Golden Hour" },
  { category: "preWedding", seed: "ir-pf-5", title: "Isha & Varun", subtitle: "Coorg", format: "Mist & Coffee Groves" },
  { category: "preWedding", seed: "ir-pf-6", title: "Neha & Aditya", subtitle: "Alibaug", format: "Coastal Romance" },
  { category: "events", seed: "ir-pf-7", title: "The Kapoor Sangeet", subtitle: "Delhi", format: "Grand Celebration" },
  { category: "events", seed: "ir-pf-8", title: "25th Anniversary", subtitle: "Mumbai", format: "Intimate Dinner" },
  { category: "events", seed: "ir-pf-9", title: "Diya's Baby Shower", subtitle: "Pune", format: "Family Milestone" },
  { category: "portraits", seed: "ir-pf-10", title: "Studio Session — Riya", subtitle: "Portrait", format: "35mm Chiaroscuro" },
  { category: "portraits", seed: "ir-pf-11", title: "The Mehta Family", subtitle: "Portrait", format: "Generations Film" },
  { category: "portraits", seed: "ir-pf-12", title: "Architectural Light", subtitle: "Portrait", format: "Natural Sunlight" },
];

export default function PortfolioPage() {
  const [active, setActive] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const items = useMemo(
    () => (active === "all" ? ITEMS : ITEMS.filter((i) => i.category === active)),
    [active]
  );

  return (
    <>
      <Navbar />

      {/* Full-width Hero Banner with Parallax */}
      <section className="relative w-full overflow-hidden bg-ink py-24 text-linen md:py-32 min-h-[420px] md:min-h-[500px] flex items-center">
        {/* Full-width background image with cinematic gradient */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src="/photos/work-veil.jpg"
              alt="Our Portfolio"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 via-55% to-ink/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/50" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-content px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="inline-block h-px w-8 bg-rose" />
            <span className="text-[13px] font-semibold tracking-[0.16em] text-rose uppercase">OUR PORTFOLIO</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="max-w-2xl font-serif text-[38px] font-medium leading-tight sm:text-[48px] md:text-[62px]"
          >
            A glimpse into <span className="italic text-rose">our world.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-5 text-sm text-linen/60 tracking-wider"
          >
            Home <span className="px-2">/</span> Portfolio
          </motion.p>
        </div>
      </section>

      {/* Portfolio Filter & 3D Interactive Grid */}
      <section className="bg-linen py-20 md:py-28">
        <div className="mx-auto max-w-content px-6 md:px-8">
          {/* Category Filter Buttons */}
          <div className="mb-14 flex flex-wrap items-center gap-3">
            {CATEGORIES.map((c) => {
              const isActive = active === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActive(c.key)}
                  className={`relative px-6 py-3 text-[13.5px] font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-rose-deep text-linen shadow-md scale-105"
                      : "border border-bark/20 text-bark hover:border-rose-deep hover:text-rose-deep bg-white/50"
                  }`}
                >
                  {c.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-rose-deep -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Animated 3D Gallery Grid */}
          <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  key={item.seed}
                  onClick={() => setSelectedPhoto(item)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-sm">
                    <Photo seed={item.seed} aspect="aspect-[4/5]" alt={item.title} badgeText={item.format} />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-2.5">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-bark group-hover:text-rose-deep transition-colors">
                        {item.title}
                      </h3>
                      <div className="text-xs text-sand/80">{item.format}</div>
                    </div>
                    <span className="whitespace-nowrap text-xs text-sand font-medium uppercase tracking-wider">
                      {item.subtitle}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-hidden rounded border border-white/20 bg-ink text-linen shadow-2xl"
            >
              <div className="relative aspect-[4/3] w-full bg-black">
                <Photo seed={selectedPhoto.seed} aspect="aspect-[4/3]" alt={selectedPhoto.title} enableTilt={false} />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-linen border border-white/30 backdrop-blur-md transition-all hover:bg-rose-deep"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 flex flex-wrap items-center justify-between gap-4 bg-ink">
                <div>
                  <h3 className="font-serif text-2xl font-medium">{selectedPhoto.title}</h3>
                  <p className="text-sm text-linen/70">{selectedPhoto.subtitle} · {selectedPhoto.format}</p>
                </div>
                <Link
                  href="/contact"
                  className="bg-rose-deep px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-linen transition-colors hover:bg-rose-deep-hover"
                >
                  Book Shoot
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom CTA with 3D Depth */}
      <section className="bg-merlot py-24 text-linen relative overflow-hidden">
        <MotionReveal className="mx-auto flex max-w-content flex-col flex-wrap items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-8">
          <div>
            <span className="text-[13px] font-semibold tracking-[0.16em] text-rose uppercase">LET&rsquo;S CREATE TOGETHER</span>
            <h2 className="mt-3.5 max-w-lg font-serif text-[28px] font-medium leading-tight md:text-[40px]">
              Like what you see? Let&rsquo;s plan <span className="italic text-rose">your film.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 bg-rose-deep px-8 py-4 text-sm font-semibold text-linen shadow-xl transition-all duration-300 hover:bg-rose-deep-hover hover:scale-105 hover:shadow-[0_0_30px_rgba(143,70,54,0.4)]"
          >
            <span>Get Started</span>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="transition-transform group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </MotionReveal>
      </section>

      <Footer />
    </>
  );
}
