"use client";

import Link from "next/link";
import { MotionReveal } from "@/components/MotionWrapper";

export default function CtaSection() {
  return (
    <section className="bg-linen py-28 relative overflow-hidden">
      <MotionReveal className="mx-auto flex max-w-content flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-8">
        <div>
          <span className="text-[13px] font-semibold tracking-[0.16em] text-rose-deep uppercase">
            LET&rsquo;S CREATE TOGETHER
          </span>
          <h2 className="mt-4 max-w-lg font-serif text-[30px] font-medium leading-tight md:text-[44px]">
            Ready to turn your moments into{" "}
            <span className="italic text-rose-deep">beautiful reels?</span>
          </h2>
        </div>
        <div className="flex-shrink-0 md:text-right">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 bg-rose-deep px-8 py-4 text-sm font-semibold text-linen shadow-xl transition-all duration-300 hover:bg-rose-deep-hover hover:scale-105 hover:shadow-[0_0_30px_rgba(143,70,54,0.4)]"
          >
            <span>Get Started</span>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="transition-transform group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <div className="mt-3.5 text-sm text-sand">
            or{" "}
            <Link href="/contact" className="font-semibold text-rose-deep hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
