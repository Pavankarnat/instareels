import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="bg-linen py-24">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-8">
        <div>
          <span className="text-[13px] font-semibold tracking-[0.14em] text-rose-deep">
            LET&rsquo;S CREATE TOGETHER
          </span>
          <h2 className="mt-4 max-w-lg font-serif text-[28px] font-medium leading-tight md:text-[42px]">
            Ready to turn your moments into{" "}
            <span className="italic text-rose-deep">beautiful reels?</span>
          </h2>
        </div>
        <div className="flex-shrink-0 md:text-right">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-rose-deep px-7 py-4 text-sm font-semibold text-linen transition-colors hover:bg-rose-deep-hover"
          >
            Get Started
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <div className="mt-3 text-sm text-sand">
            or{" "}
            <Link href="/contact" className="font-semibold text-rose-deep">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
