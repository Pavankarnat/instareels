"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import CtaSection from "@/components/CtaSection";
import ShowreelModal from "@/components/ShowreelModal";
import ReelFanDeck from "@/components/ReelFanDeck";
import ProcessStack3D from "@/components/ProcessStack3D";
import HeroPhoneMockup from "@/components/HeroPhoneMockup";
import { MotionReveal, StaggerContainer, StaggerItem } from "@/components/MotionWrapper";
import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Professional Quality",
    body: "Cinematic results, calibrated with film-stock color science.",
    icon: (
      <>
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <circle cx="12" cy="13" r="4" />
        <path d="M8 6l1.5-2h5L16 6" />
      </>
    ),
  },
  {
    title: "Custom Storyboards",
    body: "Trendy, minimal and crafted around your unique moments.",
    icon: (
      <>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
      </>
    ),
  },
  {
    title: "Express Delivery",
    body: "Teasers in 48 hours, full films ready before your memory fades.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
  },
  {
    title: "Made with Emotion",
    body: "Because every subtle glance and unscripted laughter matters.",
    icon: (
      <>
        <path d="M12 20s-7.5-4.7-9.3-9.4C1.7 7 3.6 4 7 4c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3 4.3 6.6C19.5 15.3 12 20 12 20z" />
      </>
    ),
  },
];

const SERVICES = [
  { seed: "ir-home-wed", title: "Weddings", tag: "Love stories, beautifully told.", badge: "4K Cinema" },
  { seed: "ir-home-pre", title: "Pre-Wedding", tag: "Moments before forever.", badge: "Golden Hour" },
  { seed: "ir-home-evt", title: "Events", tag: "Every occasion, a story.", badge: "Multi-Cam" },
  { seed: "ir-home-por", title: "Portraits", tag: "You, beautifully framed.", badge: "Fine Art" },
];

const FEATURED_WORK = [
  { seed: "ir-work-1", title: "Coastal Vows", tag: "Carmel Beach" },
  { seed: "ir-work-2", title: "Timeless Monochrome", tag: "Estate Villa" },
  { seed: "ir-work-3", title: "The Written Words", tag: "Deckled Paper & Silk" },
  { seed: "ir-work-4", title: "Golden Sunlight", tag: "Architectural Shadows" },
];

export default function HomePage() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [selectedReel, setSelectedReel] = useState(null);

  return (
    <>
      <Navbar />

      {/* Hero Section with 3D Phone Mockup (Matching reference design & our UI) */}
      <section className="relative w-full overflow-hidden bg-[#faf6f0] text-bark py-14 sm:py-20 lg:py-24 border-b border-bark/10">
        {/* Subtle background ambient warmth */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(217,138,122,0.2),rgba(255,255,255,0))]" />

        <div className="relative z-10 mx-auto max-w-content px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline, Description, CTAs, Social Proof */}
            <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl">
              {/* Badge Tag (No location, pure brand clarity) */}
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-rose-deep animate-pulse" />
                <span className="text-[12px] font-bold tracking-[0.18em] text-rose-deep uppercase">
                  ON-DEMAND CINEMATIC CONTENT CREW
                </span>
              </div>

              {/* Big Bold Headline */}
              <h1 className="font-serif text-[42px] sm:text-[56px] lg:text-[68px] font-semibold leading-[1.04] tracking-tight text-bark">
                Your event.
                <span className="block mt-1 bg-gradient-to-r from-rose-deep via-rose to-[#d97736] bg-clip-text text-transparent italic">
                  In a flash. ⚡
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-sand max-w-xl">
                Book a dedicated creator for your wedding, birthday, café, brand launch
                or any moment worth remembering. Shot beautifully on 4K cinema gear. Edited fast. Ready to post.
              </p>

              {/* CTA Buttons */}
              <div className="mt-9 flex flex-wrap items-center gap-4 sm:gap-6">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-linen shadow-xl transition-all duration-300 hover:bg-rose-deep hover:shadow-[0_10px_25px_rgba(143,70,54,0.35)] hover:scale-105 active:scale-95"
                >
                  <span>Book Insta Reel</span>
                  <span className="font-mono text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>

                <a
                  href="#reel-showcase"
                  className="inline-flex items-center gap-2 rounded-full border border-bark/20 bg-white/80 px-7 py-4 text-sm font-semibold text-bark backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-rose hover:bg-white hover:text-rose-deep active:scale-95"
                >
                  <span>See our work</span>
                  <span className="text-xs">↓</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowreelOpen(true)}
                  className="inline-flex items-center gap-2.5 text-sm font-medium text-bark/80 hover:text-rose-deep transition-colors cursor-pointer py-2 px-1"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-linen2/80 text-rose-deep border border-bark/10 transition-transform hover:scale-110">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" className="ml-0.5">
                      <path d="M2 1l9 5-9 5z" />
                    </svg>
                  </span>
                  <span className="text-xs tracking-wider uppercase font-semibold">Watch Showreel</span>
                </button>
              </div>

              {/* Social Proof Avatar Stack (No location string) */}
              <div className="mt-10 pt-8 border-t border-bark/10 flex items-center gap-4">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <div className="relative h-10 w-10 rounded-full ring-2 ring-[#faf6f0] overflow-hidden">
                    <Image src="/photos/hero-bride.jpg" alt="Host avatar" fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="relative h-10 w-10 rounded-full ring-2 ring-[#faf6f0] overflow-hidden">
                    <Image src="/photos/service-weddings.jpg" alt="Host avatar" fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="relative h-10 w-10 rounded-full ring-2 ring-[#faf6f0] overflow-hidden">
                    <Image src="/photos/service-portraits.jpg" alt="Host avatar" fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="relative h-10 w-10 rounded-full ring-2 ring-[#faf6f0] overflow-hidden">
                    <Image src="/photos/about-moment.jpg" alt="Host avatar" fill className="object-cover" sizes="40px" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    {"★★★★★"}
                    <span className="text-bark font-bold text-xs ml-1">4.9/5</span>
                  </div>
                  <p className="text-xs sm:text-[13px] font-medium text-sand mt-0.5">
                    <span className="font-bold text-bark">5,000+</span> happy hosts & couples booked this year
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Mandatory 3D Phone Mockup */}
            <div className="lg:col-span-5 flex items-center justify-center pt-4 lg:pt-0">
              <HeroPhoneMockup
                videoSrc="/videos/reel1.mp4"
                posterSrc="/photos/hero-bride.jpg"
                title="Ananya's Sangeet Night"
                subtitle="Wedding & Grand Celebration"
                creatorName="Arriving in 12 min"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip with 3D Glass Cards */}
      <section className="bg-linen py-24 relative z-10">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <StaggerContainer className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {FEATURES.map((f) => (
              <StaggerItem key={f.title}>
                <div className="group h-full rounded-lg border border-bark/10 bg-[#f8f3ec] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-rose/40 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(36,26,21,0.12)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linen2/70 text-rose-deep transition-all duration-300 group-hover:bg-rose-deep group-hover:text-linen group-hover:scale-110">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      {f.icon}
                    </svg>
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-bark group-hover:text-rose-deep transition-colors">
                    {f.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-sand">
                    {f.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 3D Fan Deck Section (Signature 3D animation) */}
      <section id="reel-showcase" className="bg-[#fbf7f0] py-28 relative overflow-hidden border-y border-bark/10">
        <div className="mx-auto max-w-content px-6 md:px-8 text-center mb-10">
          <MotionReveal>
            <span className="text-[13px] font-semibold tracking-[0.18em] text-rose-deep uppercase">
              WORK THAT PERFORMS · 3D REEL SHOWCASE
            </span>
            <h2 className="mt-4 font-serif text-[32px] font-medium text-bark md:text-[50px] leading-tight">
              Real Moments. <span className="italic text-rose-deep">Real Reels.</span>
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-sand">
              Interact with our latest 4K cinema reels in full 3D perspective — swipe, navigate or click any reel to bring it to center stage.
            </p>
          </MotionReveal>
        </div>

        <ReelFanDeck
          onSelectReel={(reel) => {
            setSelectedReel(reel);
            setShowreelOpen(true);
          }}
        />
      </section>

      {/* Story Section with Interactive 3D Flatlay */}
      <section className="bg-linen py-28">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-14 px-6 md:grid-cols-2 md:gap-20 md:px-8">
          <MotionReveal delay={0.1} className="flex gap-5 items-center">
            <span
              className="hidden pb-2 text-[11px] tracking-widest text-sand/80 sm:block"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              CAPTURING PEOPLE · PLACES · EMOTIONS
            </span>
            <div className="flex-1">
              <Photo
                seed="ir-story"
                aspect="aspect-square"
                alt="Camera and printed photos flatlay"
                enableTilt={true}
                badgeText="35mm Film Still"
              />
            </div>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <span className="text-[13px] font-semibold tracking-[0.16em] text-rose-deep uppercase">OUR STORY</span>
            <h2 className="mt-4 font-serif text-[32px] font-medium leading-tight md:text-[46px]">
              It&rsquo;s more than <span className="italic text-rose-deep">just reels.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-bark/80">
              At Instantreels, we believe every moment deserves to be
              remembered beautifully. From weddings to everyday life, we
              create cinematic reels that tell your story with authenticity
              and style — good stories really do last longer.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 border border-bark/30 px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:border-rose-deep hover:bg-rose-deep hover:text-linen hover:shadow-lg"
              >
                <span>About Us</span>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="transition-transform group-hover:translate-x-1">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <div className="text-xs text-sand tracking-wide">
                Est. 2021 · Over 300+ Films Produced
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* 3D Stacking Cards Process Section (ReelOnGo signature scroll peeling stack) */}
      <section className="bg-linen2 relative border-t border-bark/10">
        <ProcessStack3D />
      </section>

      {/* Services Preview with 3D Depth */}
      <section className="bg-merlot py-28 text-linen relative overflow-hidden">
        <div className="mx-auto mb-16 flex max-w-content flex-col justify-between gap-6 px-6 md:flex-row md:items-end md:px-8">
          <MotionReveal>
            <span className="text-[13px] font-semibold tracking-[0.16em] text-rose uppercase">OUR SERVICES</span>
            <h2 className="mt-4 font-serif text-[30px] font-medium md:text-[46px]">
              Moments for every <span className="italic text-rose">milestone.</span>
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.2} className="flex max-w-sm items-end gap-6">
            <p className="text-sm leading-relaxed text-linen/70">
              From intimate celebrations to grand events, we create reels that
              feel real, cinematic and timeless.
            </p>
            <div className="flex flex-shrink-0 gap-3">
              <Link href="/services" aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border border-linen/35 transition-all duration-300 hover:border-rose hover:bg-rose/20 hover:scale-105">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M13 8H3M7 4L3 8l4 4" /></svg>
              </Link>
              <Link href="/services" aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-linen/35 transition-all duration-300 hover:border-rose hover:bg-rose/20 hover:scale-105">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </Link>
            </div>
          </MotionReveal>
        </div>

        <div className="mx-auto max-w-content px-6 md:px-8">
          <StaggerContainer className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-4">
            {SERVICES.map((s) => (
              <StaggerItem key={s.title}>
                <Link href="/services" className="group block h-full">
                  <div className="relative overflow-hidden rounded-sm">
                    <Photo seed={s.seed} aspect="aspect-[3/4]" alt={s.title} badgeText={s.badge} />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <h3 className="font-serif text-lg font-semibold transition-colors duration-300 group-hover:text-rose">
                      {s.title}
                    </h3>
                    <span className="text-xs text-rose/70 transition-transform duration-300 group-hover:translate-x-1">
                      Explore →
                    </span>
                  </div>
                  <p className="mt-1 text-[13.5px] text-linen/60">{s.tag}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Work Gallery with 3D interactive preview */}
      <section className="bg-linen py-28">
        <div className="mx-auto mb-16 flex max-w-content flex-col justify-between gap-6 px-6 md:flex-row md:items-end md:px-8">
          <MotionReveal>
            <span className="text-[13px] font-semibold tracking-[0.16em] text-rose-deep uppercase">FEATURED WORK</span>
            <h2 className="mt-4 font-serif text-[30px] font-medium md:text-[46px]">
              A glimpse into <span className="italic text-rose-deep">our world.</span>
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.2} className="max-w-sm">
            <p className="mb-3 text-sm leading-relaxed text-sand">
              Real moments, real people, real stories — a small window into
              the films we&rsquo;ve crafted across the country.
            </p>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-rose-deep hover:underline">
              <span>View All 12 Works</span>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </Link>
          </MotionReveal>
        </div>

        <div className="mx-auto flex max-w-content gap-6 px-6 md:px-8">
          <StaggerContainer className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {FEATURED_WORK.map((item) => (
              <StaggerItem key={item.seed}>
                <div className="group relative block overflow-hidden">
                  <Photo seed={item.seed} aspect="aspect-[3/4]" alt={item.title} />
                  <div className="mt-3.5">
                    <div className="font-serif text-base font-semibold text-bark group-hover:text-rose-deep transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-sand">{item.tag}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="hidden flex-col gap-3 pt-2 text-xs tracking-widest text-sand sm:flex select-none">
            <span className="font-semibold text-rose-deep">01</span>
            <span>02</span>
            <span>03</span>
            <span>04</span>
          </div>
        </div>
      </section>

      {/* Quote Section with Atmospheric Parallax */}
      <section className="relative py-36 overflow-hidden">
        <Photo seed="ir-quote" aspect="aspect-auto" alt="" className="absolute inset-0" sizes="100vw" enableTilt={false} />
        <div className="absolute inset-0 bg-ink/65 backdrop-blur-[2px]" />

        <MotionReveal className="relative z-10 mx-auto max-w-content px-6 text-center md:px-8">
          <span className="text-4xl text-rose font-serif italic">&ldquo;</span>
          <p className="mx-auto max-w-3xl font-serif text-2xl italic leading-relaxed text-linen md:text-[36px]">
            You don&rsquo;t take a photograph, you make it.
          </p>
          <div className="mt-8 text-[13px] tracking-[0.2em] text-linen/70 uppercase">— Ansel Adams</div>
        </MotionReveal>

        <div className="absolute bottom-8 left-8 z-10 flex flex-col gap-1 text-[11px] tracking-widest text-linen/50 uppercase">
          <span>Good Stories</span>
          <span className="text-rose">Never Fade</span>
        </div>
      </section>

      <CtaSection />

      <Footer />

      {/* Interactive Showreel Modal */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        reel={selectedReel}
      />
    </>
  );
}
