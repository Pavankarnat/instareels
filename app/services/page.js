"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import CtaSection from "@/components/CtaSection";
import { MotionReveal, StaggerContainer, StaggerItem } from "@/components/MotionWrapper";
import ProcessStack3D from "@/components/ProcessStack3D";
import { motion } from "framer-motion";

const SERVICES = [
  {
    index: "01",
    title: "Weddings",
    seed: "ir-svc-wedding",
    badge: "Full Day Cinema",
    body: "Full-day coverage that follows the day as it unfolds — getting ready, vows, the first dance — cut into a film built to be watched again on every anniversary.",
    points: [
      "Full-day cinematic multi-camera coverage",
      "Highlight reel + 4K full-length master film",
      "Licensed soundtrack & bespoke color grading",
    ],
  },
  {
    index: "02",
    title: "Pre-Wedding",
    seed: "ir-svc-prewedding",
    badge: "Golden Hour Romance",
    body: "A relaxed shoot built around you as a couple — a place you love, golden light, and a short film that captures the ease between you before the big day.",
    points: [
      "Location scouting & wardrobe moodboard styling",
      "3–5 minute cinematic emotional short film",
      "High-resolution edited digital stills included",
    ],
  },
  {
    index: "03",
    title: "Events",
    seed: "ir-svc-events",
    badge: "Milestones & Sangeet",
    body: "Engagements, receptions, milestone birthdays and family gatherings — documented quietly, so the film feels like the room, not a performance for the camera.",
    points: [
      "Flexible hourly or full-event packages",
      "Same-week 48hr social teaser edit",
      "Multi-camera setup & ambient audio recording",
    ],
  },
  {
    index: "04",
    title: "Portraits",
    seed: "ir-svc-portraits",
    badge: "Editorial Chiaroscuro",
    body: "Solo or family portrait sessions, shot with the same warmth as our wedding work — for the moments that don't need an occasion to matter.",
    points: [
      "Studio lighting or on-location sessions",
      "Retouched editorial digital gallery",
      "Optional short-form 9:16 vertical reel",
    ],
  },
];

const PROCESS = [
  { n: "01", title: "Enquire", body: "Tell us your date and vision — we reply within 24 hours with details." },
  { n: "02", title: "Plan & Style", body: "We shape the shot list, timeline and moodboard together." },
  { n: "03", title: "Shoot the Day", body: "We stay unobtrusive, capturing genuine candid emotion." },
  { n: "04", title: "Deliver Your Film", body: "Your graded 4K edit arrives within 2–4 weeks, ready to share." },
];

export default function ServicesPage() {
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
              src="/photos/service-events.jpg"
              alt="Our Services"
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
            <span className="text-[13px] font-semibold tracking-[0.16em] text-rose uppercase">OUR SERVICES</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="max-w-2xl font-serif text-[38px] font-medium leading-tight sm:text-[48px] md:text-[62px]"
          >
            Moments for every <span className="italic text-rose">milestone.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-5 text-sm text-linen/60 tracking-wider"
          >
            Home <span className="px-2">/</span> Services
          </motion.p>
        </div>
      </section>

      <section className="bg-linen pb-8 pt-24">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-8">
          <MotionReveal>
            <p className="text-lg leading-relaxed text-bark/85 font-serif italic">
              &ldquo;Every love story, every celebration, every quiet portrait sits
              somewhere between the everyday and the unrepeatable. We build our
              services around that — four ways of working, one way of seeing:
              closely, patiently, and with real emotion.&rdquo;
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Services List with 3D Photo Tilt and Stagger */}
      <section className="bg-linen py-16">
        <div className="mx-auto flex max-w-content flex-col gap-28 px-6 md:px-8">
          {SERVICES.map((s, i) => (
            <MotionReveal
              key={s.title}
              delay={0.1}
              className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <Photo seed={s.seed} aspect="aspect-[4/3.2]" alt={s.title} badgeText={s.badge} enableTilt={true} />
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <div className="mb-3.5 text-[13px] tracking-widest text-sand font-semibold uppercase">
                  {s.index} / FOUR SERVICES
                </div>
                <h2 className="font-serif text-[30px] font-medium md:text-[40px] text-bark">{s.title}</h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-bark/80">{s.body}</p>
                <div className="mt-6 flex flex-col gap-3">
                  {s.points.map((p) => (
                    <div key={p} className="flex items-start gap-3 text-sm text-bark/85">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rose-deep/10 text-rose-deep">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 8.5l3 3 7-7" />
                        </svg>
                      </span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2.5 border border-bark/30 px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:border-rose-deep hover:bg-rose-deep hover:text-linen hover:shadow-lg"
                >
                  <span>Get a Quote</span>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                </Link>
              </div>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* Process Section with 3D Card Stack (ReelOnGo signature 3D animation) */}
      <section className="bg-linen2 py-28 relative overflow-hidden border-t border-bark/10">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <MotionReveal className="mx-auto mb-10 max-w-xl text-center">
            <span className="text-[13px] font-semibold tracking-[0.16em] text-rose-deep uppercase">HOW IT WORKS</span>
            <h2 className="mt-4 font-serif text-[30px] font-medium md:text-[44px]">
              From first message to <span className="italic text-rose-deep">finished film.</span>
            </h2>
            <p className="mt-3 text-sm text-sand">
              Experience our 5-phase production pipeline with interactive 3D stacked cards.
            </p>
          </MotionReveal>

          <ProcessStack3D />
        </div>
      </section>

      <CtaSection />

      <Footer />
    </>
  );
}
