"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import CtaSection from "@/components/CtaSection";
import { MotionReveal, StaggerContainer, StaggerItem } from "@/components/MotionWrapper";
import { motion } from "framer-motion";

const VALUES = [
  {
    title: "Authenticity",
    body: "We film what's really happening, not an over-rehearsed or stiff version of it.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "Craft & Detail",
    body: "Every frame, deliberate cut, and color choice is calibrated on purpose.",
    icon: (
      <>
        <path d="M4 20l4-1 10-10-3-3L5 16z" />
        <path d="M14 6l3 3" />
      </>
    ),
  },
  {
    title: "Emotion First",
    body: "If a moment doesn't move us in the editing suite, it doesn't make the cut.",
    icon: (
      <>
        <path d="M12 20s-7.5-4.7-9.3-9.4C1.7 7 3.6 4 7 4c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3 4.3 6.6C19.5 15.3 12 20 12 20z" />
      </>
    ),
  },
  {
    title: "Always on Time",
    body: "Your film delivered exactly when we promise it will be — no chasing required.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
  },
];

export default function AboutPage() {
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
              src="/photos/about-moment.jpg"
              alt="Our Story"
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
            <span className="text-[13px] font-semibold tracking-[0.16em] text-rose uppercase">OUR STORY</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="max-w-2xl font-serif text-[38px] font-medium leading-tight sm:text-[48px] md:text-[62px]"
          >
            It&rsquo;s more than <span className="italic text-rose">just reels.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-5 text-sm text-linen/60 tracking-wider"
          >
            Home <span className="px-2">/</span> About
          </motion.p>
        </div>
      </section>

      {/* Story Narrative with 3D Photo */}
      <section className="bg-linen py-28">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-14 px-6 md:grid-cols-2 md:gap-20 md:px-8">
          <MotionReveal>
            <span className="text-[13px] font-semibold tracking-[0.16em] text-rose-deep uppercase">WHERE IT STARTED</span>
            <h2 className="mt-4 font-serif text-[30px] font-medium leading-tight md:text-[44px]">
              Good stories <span className="italic text-rose-deep">last longer.</span>
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-bark/80">
              Instantreels began with a simple frustration: wedding films that
              looked beautiful but felt like nobody&rsquo;s wedding in
              particular. We wanted the opposite — films that are unmistakably
              yours, built from the small, unplanned moments that a stiff shot
              list always misses.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-bark/80">
              Years and hundreds of ceremonies later, that&rsquo;s still the
              whole job: pay close attention, stay out of the way, and hand
              back a film that feels exactly like being there.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <Photo seed="ir-about-story" aspect="aspect-[4/3.4]" alt="Couple sharing a quiet moment" enableTilt={true} badgeText="Candid Garden Reception" />
          </MotionReveal>
        </div>
      </section>

      {/* Values Section with 3D Elevation */}
      <section className="bg-merlot py-28 text-linen relative overflow-hidden">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <MotionReveal className="mb-16 max-w-lg">
            <span className="text-[13px] font-semibold tracking-[0.16em] text-rose uppercase">WHAT WE STAND FOR</span>
            <h2 className="mt-4 font-serif text-[30px] font-medium md:text-[44px]">
              The values behind <span className="italic text-rose">every film.</span>
            </h2>
          </MotionReveal>

          <StaggerContainer className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div className="h-full rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-rose/40 hover:bg-white/10 hover:shadow-2xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose/10 text-rose">
                    {v.icon}
                  </div>
                  <h3 className="mt-5 text-[18px] font-semibold text-linen">{v.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-linen/70">{v.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Behind the Lens Founder with 3D Card */}
      <section className="bg-linen py-28">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-14 px-6 md:grid-cols-2 md:gap-20 md:px-8">
          <MotionReveal className="md:order-1">
            <Photo seed="ir-founder" aspect="aspect-[4/4.6]" alt="Founder portrait" enableTilt={true} badgeText="Filmmaker & Colorist" />
          </MotionReveal>

          <MotionReveal delay={0.2} className="md:order-2">
            <span className="text-[13px] font-semibold tracking-[0.16em] text-rose-deep uppercase">BEHIND THE LENS</span>
            <p className="mt-5 font-serif text-2xl italic leading-relaxed text-bark md:text-3xl">
              &ldquo;I still get the same feeling on shoot day thirteen
              hundred that I got on shoot day one — that&rsquo;s how I know
              we&rsquo;re doing this right.&rdquo;
            </p>
            <div className="mt-7">
              <div className="text-[17px] font-semibold text-bark">Aarav Malhotra</div>
              <div className="mt-1 text-sm text-sand">Founder & Lead Director of Photography</div>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2.5 border border-bark/30 px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:border-rose-deep hover:bg-rose-deep hover:text-linen hover:shadow-lg"
            >
              <span>Say Hello</span>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </Link>
          </MotionReveal>
        </div>
      </section>

      <CtaSection />

      <Footer />
    </>
  );
}
