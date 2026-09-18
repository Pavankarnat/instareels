"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // No backend is wired up yet — replace this with a real API call
    // (e.g. fetch("/api/contact", { method: "POST", body: new FormData(e.target) }))
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />

      {/* Full-width Hero Banner */}
      <section className="relative w-full overflow-hidden bg-ink py-20 text-linen md:py-28 min-h-[380px] md:min-h-[460px] flex items-center">
        {/* Full-width background image with cinematic gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/quote-bg.jpg"
            alt="Contact Us"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 via-55% to-ink/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/50" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-content px-6 md:px-8">
          <div className="mb-6 flex items-center gap-4">
            <span className="inline-block h-px w-8 bg-linen/40" />
            <span className="text-[13px] font-semibold tracking-[0.14em] text-rose">LET&rsquo;S TALK</span>
          </div>
          <h1 className="max-w-2xl font-serif text-[36px] font-medium leading-tight sm:text-[46px] md:text-[58px]">
            Let&rsquo;s create <span className="italic text-rose">your story.</span>
          </h1>
          <p className="mt-5 text-sm text-linen/60">
            Home <span className="px-2">/</span> Contact
          </p>
        </div>
      </section>

      <section className="bg-linen py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-14 px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:px-8">
          {/* Info column */}
          <div>
            <span className="text-[13px] font-semibold tracking-[0.14em] text-rose-deep">GET IN TOUCH</span>
            <h2 className="mt-4 font-serif text-[26px] font-medium md:text-[32px]">
              We&rsquo;d love to hear about your day.
            </h2>
            <p className="mt-4 text-[14.5px] leading-relaxed text-bark/80">
              Send us a few details and we&rsquo;ll get back to you within 24
              hours with availability and a quote.
            </p>

            <div className="mt-9 flex flex-col gap-5">
              <div className="flex items-start gap-3.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8f4636" strokeWidth="1.6" className="mt-0.5 flex-shrink-0">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 6l10 7 10-7" />
                </svg>
                <div>
                  <div className="text-[13px] text-sand">Email</div>
                  <div className="mt-0.5 text-[14.5px] font-medium">hello@instantreels.studio</div>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8f4636" strokeWidth="1.6" className="mt-0.5 flex-shrink-0">
                  <path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2 2C9.6 22 2 14.4 2 5a2 2 0 0 1 2-1z" />
                </svg>
                <div>
                  <div className="text-[13px] text-sand">Phone</div>
                  <div className="mt-0.5 text-[14.5px] font-medium">+91 98765 43210</div>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8f4636" strokeWidth="1.6" className="mt-0.5 flex-shrink-0">
                  <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.4" />
                </svg>
                <div>
                  <div className="text-[13px] text-sand">Studio</div>
                  <div className="mt-0.5 text-[14.5px] font-medium">4th Cross, Indiranagar, Bengaluru</div>
                </div>
              </div>
            </div>

            <div className="relative mt-9 aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#e7ddc9] via-[#c9b190] to-[#8a6a48]">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1c1310" strokeWidth="1.6">
                  <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.4" />
                </svg>
              </div>
              <div className="absolute bottom-3.5 left-4 text-xs tracking-wider text-bark">
                STUDIO LOCATION
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="bg-linen2 p-8 md:p-11">
            {submitted ? (
              <div className="flex min-h-[360px] flex-col items-start justify-center gap-4">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8f4636" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12.5l2.5 2.5L16 9" />
                </svg>
                <h3 className="font-serif text-[22px] font-medium">Thank you — message sent.</h3>
                <p className="max-w-sm text-[14.5px] leading-relaxed text-bark/80">
                  We&rsquo;ve received your details and will reply within 24
                  hours with availability and next steps.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[13px] font-semibold">Full name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Aanya Sharma"
                      className="border border-bark/20 bg-[#fbf8f2] px-3.5 py-3 text-sm text-bark focus:outline-none focus:ring-2 focus:ring-rose-deep"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[13px] font-semibold">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      className="border border-bark/20 bg-[#fbf8f2] px-3.5 py-3 text-sm text-bark focus:outline-none focus:ring-2 focus:ring-rose-deep"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="date" className="text-[13px] font-semibold">Event date</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="border border-bark/20 bg-[#fbf8f2] px-3.5 py-3 text-sm text-bark focus:outline-none focus:ring-2 focus:ring-rose-deep"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[13px] font-semibold">Tell us about your day</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Venue, guest count, style you love..."
                    className="border border-bark/20 bg-[#fbf8f2] px-3.5 py-3 text-sm text-bark focus:outline-none focus:ring-2 focus:ring-rose-deep"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 bg-rose-deep px-7 py-4 text-sm font-semibold text-linen transition-colors hover:bg-rose-deep-hover"
                >
                  Send Enquiry
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
