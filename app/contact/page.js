"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MotionReveal } from "@/components/MotionWrapper";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

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
              src="/photos/quote-bg.jpg"
              alt="Contact Us"
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
            <span className="text-[13px] font-semibold tracking-[0.16em] text-rose uppercase">LET&rsquo;S TALK</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="max-w-2xl font-serif text-[38px] font-medium leading-tight sm:text-[48px] md:text-[62px]"
          >
            Let&rsquo;s create <span className="italic text-rose">your story.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-5 text-sm text-linen/60 tracking-wider"
          >
            Home <span className="px-2">/</span> Contact
          </motion.p>
        </div>
      </section>

      <section className="bg-linen py-28">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-14 px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:px-8">
          {/* Info column */}
          <MotionReveal>
            <span className="text-[13px] font-semibold tracking-[0.16em] text-rose-deep uppercase">GET IN TOUCH</span>
            <h2 className="mt-4 font-serif text-[28px] font-medium md:text-[36px] text-bark">
              We&rsquo;d love to hear about your day.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-bark/80">
              Send us a few details and we&rsquo;ll get back to you within 24
              hours with availability, customized package options, and a quote.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-deep/10 text-rose-deep">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 6l10 7 10-7" />
                  </svg>
                </div>
                <div>
                  <div className="text-[12.5px] uppercase tracking-wider text-sand font-semibold">Email</div>
                  <div className="mt-0.5 text-[15px] font-medium text-bark">hello@instantreels.studio</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-deep/10 text-rose-deep">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2 2C9.6 22 2 14.4 2 5a2 2 0 0 1 2-1z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[12.5px] uppercase tracking-wider text-sand font-semibold">Phone / WhatsApp</div>
                  <div className="mt-0.5 text-[15px] font-medium text-bark">+91 98765 43210</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-deep/10 text-rose-deep">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.4" />
                  </svg>
                </div>
                <div>
                  <div className="text-[12.5px] uppercase tracking-wider text-sand font-semibold">Studio</div>
                  <div className="mt-0.5 text-[15px] font-medium text-bark">4th Cross, Indiranagar, Bengaluru</div>
                </div>
              </div>
            </div>

            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg border border-bark/10 shadow-md">
              <Image
                src="/photos/work-shadows.jpg"
                alt="Studio atmosphere"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-semibold tracking-wider text-linen uppercase">
                Bengaluru Creative Suite
              </div>
            </div>
          </MotionReveal>

          {/* Form column */}
          <MotionReveal delay={0.2} className="rounded-xl border border-bark/10 bg-linen2 p-8 md:p-12 shadow-xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[380px] flex-col items-start justify-center gap-4"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-deep text-linen shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12.5l2.5 2.5L16 9" />
                  </svg>
                </div>
                <h3 className="font-serif text-[26px] font-medium text-bark">Thank you — message sent.</h3>
                <p className="max-w-sm text-[15px] leading-relaxed text-bark/80">
                  We&rsquo;ve received your details and will reply within 24
                  hours with availability, moodboard ideas, and pricing.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[13px] font-semibold text-bark">Full name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Aanya Sharma"
                      className="border border-bark/20 bg-[#fbf8f2] px-4 py-3.5 text-sm text-bark transition-all focus:border-rose-deep focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-deep/30 rounded-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[13px] font-semibold text-bark">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      className="border border-bark/20 bg-[#fbf8f2] px-4 py-3.5 text-sm text-bark transition-all focus:border-rose-deep focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-deep/30 rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-[13px] font-semibold text-bark">Phone number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="border border-bark/20 bg-[#fbf8f2] px-4 py-3.5 text-sm text-bark transition-all focus:border-rose-deep focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-deep/30 rounded-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="text-[13px] font-semibold text-bark">Event date</label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      className="border border-bark/20 bg-[#fbf8f2] px-4 py-3.5 text-sm text-bark transition-all focus:border-rose-deep focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-deep/30 rounded-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[13px] font-semibold text-bark">Tell us about your day</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Venue, guest count, aesthetic style you love..."
                    className="border border-bark/20 bg-[#fbf8f2] px-4 py-3.5 text-sm text-bark transition-all focus:border-rose-deep focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-deep/30 rounded-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative inline-flex w-full items-center justify-center gap-2.5 bg-rose-deep px-8 py-4 text-sm font-semibold text-linen shadow-xl transition-all duration-300 hover:bg-rose-deep-hover hover:shadow-[0_0_30px_rgba(143,70,54,0.4)]"
                >
                  <span>Send Enquiry</span>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="transition-transform group-hover:translate-x-1">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>
              </form>
            )}
          </MotionReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
