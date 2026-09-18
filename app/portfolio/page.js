"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";

const CATEGORIES = [
  { key: "all", label: "All Work" },
  { key: "weddings", label: "Weddings" },
  { key: "preWedding", label: "Pre-Wedding" },
  { key: "events", label: "Events" },
  { key: "portraits", label: "Portraits" },
];

const ITEMS = [
  { category: "weddings", seed: "ir-pf-1", title: "Aanya & Rohan", subtitle: "Udaipur" },
  { category: "weddings", seed: "ir-pf-2", title: "Meera & Kabir", subtitle: "Goa" },
  { category: "weddings", seed: "ir-pf-3", title: "Priya & Dev", subtitle: "Jaipur" },
  { category: "preWedding", seed: "ir-pf-4", title: "Sana & Arjun", subtitle: "Manali" },
  { category: "preWedding", seed: "ir-pf-5", title: "Isha & Varun", subtitle: "Coorg" },
  { category: "preWedding", seed: "ir-pf-6", title: "Neha & Aditya", subtitle: "Alibaug" },
  { category: "events", seed: "ir-pf-7", title: "The Kapoor Sangeet", subtitle: "Delhi" },
  { category: "events", seed: "ir-pf-8", title: "25th Anniversary", subtitle: "Mumbai" },
  { category: "events", seed: "ir-pf-9", title: "Diya's Baby Shower", subtitle: "Pune" },
  { category: "portraits", seed: "ir-pf-10", title: "Studio Session — Riya", subtitle: "Portrait" },
  { category: "portraits", seed: "ir-pf-11", title: "The Mehta Family", subtitle: "Portrait" },
  { category: "portraits", seed: "ir-pf-12", title: "Solo Session — Kabir", subtitle: "Portrait" },
];

export default function PortfolioPage() {
  const [active, setActive] = useState("all");

  const items = useMemo(
    () => (active === "all" ? ITEMS : ITEMS.filter((i) => i.category === active)),
    [active]
  );

  return (
    <>
      <Navbar />

      {/* Full-width Hero Banner */}
      <section className="relative w-full overflow-hidden bg-ink py-20 text-linen md:py-28 min-h-[380px] md:min-h-[460px] flex items-center">
        {/* Full-width background image with cinematic gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/work-veil.jpg"
            alt="Our Portfolio"
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
            <span className="text-[13px] font-semibold tracking-[0.14em] text-rose">OUR WORK</span>
          </div>
          <h1 className="max-w-2xl font-serif text-[36px] font-medium leading-tight sm:text-[46px] md:text-[58px]">
            A glimpse into <span className="italic text-rose">our world.</span>
          </h1>
          <p className="mt-5 text-sm text-linen/60">
            Home <span className="px-2">/</span> Portfolio
          </p>
        </div>
      </section>

      <section className="bg-linen py-20 md:py-24">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <div className="mb-12 flex flex-wrap gap-3">
            {CATEGORIES.map((c) => {
              const isActive = active === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActive(c.key)}
                  className={`px-5 py-2.5 text-[13.5px] font-semibold transition-colors ${
                    isActive
                      ? "bg-rose-deep text-linen"
                      : "border border-bark/25 text-bark hover:border-rose-deep hover:text-rose-deep"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {items.map((item) => (
              <div key={item.seed}>
                <Photo seed={item.seed} aspect="aspect-[4/5]" alt={item.title} />
                <div className="mt-3.5 flex items-baseline justify-between gap-2.5">
                  <h3 className="font-serif text-base font-semibold">{item.title}</h3>
                  <span className="whitespace-nowrap text-xs text-sand">{item.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-merlot py-20 text-linen">
        <div className="mx-auto flex max-w-content flex-col flex-wrap items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-8">
          <div>
            <span className="text-[13px] font-semibold tracking-[0.14em] text-rose">LET&rsquo;S CREATE TOGETHER</span>
            <h2 className="mt-3.5 max-w-lg font-serif text-[26px] font-medium leading-tight md:text-[36px]">
              Like what you see? Let&rsquo;s plan <span className="italic text-rose">your film.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-rose-deep px-7 py-4 text-sm font-semibold text-linen transition-colors hover:bg-rose-deep-hover"
          >
            Get Started
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
