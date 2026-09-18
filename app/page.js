import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import CtaSection from "@/components/CtaSection";

const FEATURES = [
  {
    title: "Professional Quality",
    body: "Cinematic results, every time.",
    icon: (
      <>
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <circle cx="12" cy="13" r="4" />
        <path d="M8 6l1.5-2h5L16 6" />
      </>
    ),
  },
  {
    title: "Custom Templates",
    body: "Trendy, minimal and made for you.",
    icon: (
      <>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
      </>
    ),
  },
  {
    title: "Quick Delivery",
    body: "Your reels, ready in no time.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
  },
  {
    title: "Made with Emotion",
    body: "Because your moments matter.",
    icon: (
      <>
        <path d="M12 20s-7.5-4.7-9.3-9.4C1.7 7 3.6 4 7 4c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3 4.3 6.6C19.5 15.3 12 20 12 20z" />
      </>
    ),
  },
];

const SERVICES = [
  { seed: "ir-home-wed", title: "Weddings", tag: "Love stories, beautifully told." },
  { seed: "ir-home-pre", title: "Pre-Wedding", tag: "Moments before forever." },
  { seed: "ir-home-evt", title: "Events", tag: "Every occasion, a story." },
  { seed: "ir-home-por", title: "Portraits", tag: "You, beautifully framed." },
];

const FEATURED_WORK = ["ir-work-1", "ir-work-2", "ir-work-3", "ir-work-4"];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Full-width Hero Banner */}
      <section className="relative w-full overflow-hidden bg-ink text-linen min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between">
        {/* Full-width background image with cinematic gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/hero-bride.jpg"
            alt="Bride in golden light"
            fill
            priority
            className="object-cover object-[70%_25%] md:object-[75%_center] lg:object-right"
            sizes="100vw"
          />
          {/* Subtle multi-layer cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 via-50% to-transparent lg:via-ink/75 lg:via-40% lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-content px-6 pt-20 pb-12 md:px-8 lg:pt-28 my-auto">
          <div className="max-w-xl">
            <div className="mb-7 flex items-center gap-4">
              <span className="inline-block h-px w-8 bg-linen/40" />
              <span className="text-[13px] font-semibold tracking-[0.14em] text-rose">
                FRAMES TODAY, STORIES FOREVER
              </span>
            </div>
            <h1 className="font-serif text-[38px] font-medium leading-[1.1] tracking-tight sm:text-[48px] md:text-[62px]">
              Turn your moments into{" "}
              <span className="italic text-rose">beautiful reels.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-linen/75">
              Cinematic reels for your special days, crafted with emotion and
              elegance — so every moment stays as alive as the day it happened.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-rose-deep px-7 py-4 text-sm font-semibold text-linen shadow-xl transition-all hover:bg-rose-deep-hover hover:scale-[1.02]"
              >
                Get Started
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <Link href="/portfolio" className="group flex items-center gap-3 text-sm font-medium transition-colors hover:text-rose">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-linen/40 bg-ink/40 backdrop-blur-sm transition-transform group-hover:scale-110">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M2 1l9 5-9 5z" />
                  </svg>
                </span>
                Watch Showreel
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Banner Bar */}
        <div className="relative z-10 mx-auto flex w-full max-w-content justify-between items-center px-6 pb-8 md:px-8">
          <div className="flex gap-4 text-xs tracking-wider text-linen/60">
            <span className="font-semibold text-rose border-b border-rose pb-0.5">01</span>
            <span className="opacity-60">02</span>
            <span className="opacity-60">03</span>
          </div>
          <div className="flex gap-7 text-xs tracking-wider text-linen/45">
            <span>CAPTURE</span>
            <span>CREATE</span>
            <span>INSPIRE</span>
          </div>
        </div>

        {/* Vertical decorative label */}
        <div
          className="pointer-events-none absolute right-8 top-1/3 hidden font-serif text-xl italic tracking-wider text-linen/70 lg:block"
          style={{ writingMode: "vertical-rl" }}
        >
          More than Memories
        </div>
      </section>

      {/* Feature strip */}
      <section className="bg-linen py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-6 sm:grid-cols-2 md:grid-cols-4 md:px-8">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8f4636" strokeWidth="1.5">
                {f.icon}
              </svg>
              <h3 className="mt-5 font-serif text-lg font-semibold">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-sand">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="bg-linen pb-24">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-8">
          <div className="flex gap-5">
            <span
              className="hidden pb-2 text-[11px] tracking-wider text-sand/80 sm:block"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              CAPTURING PEOPLE · PLACES · EMOTIONS
            </span>
            <Photo seed="ir-story" aspect="aspect-square" alt="Camera and printed photos flatlay" className="flex-1" />
          </div>
          <div>
            <span className="text-[13px] font-semibold tracking-[0.14em] text-rose-deep">OUR STORY</span>
            <h2 className="mt-4 font-serif text-[30px] font-medium leading-tight md:text-[42px]">
              It&rsquo;s more than <span className="italic text-rose-deep">just reels.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-bark/80">
              At Instantreels, we believe every moment deserves to be
              remembered beautifully. From weddings to everyday life, we
              create cinematic reels that tell your story with authenticity
              and style — good stories really do last longer.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 border border-bark/25 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-rose-deep hover:text-rose-deep"
            >
              About Us
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-merlot py-24 text-linen">
        <div className="mx-auto mb-14 flex max-w-content flex-col justify-between gap-6 px-6 md:flex-row md:items-end md:px-8">
          <div>
            <span className="text-[13px] font-semibold tracking-[0.14em] text-rose">OUR SERVICES</span>
            <h2 className="mt-4 font-serif text-[28px] font-medium md:text-[40px]">
              Moments for every <span className="italic text-rose">milestone.</span>
            </h2>
          </div>
          <div className="flex max-w-sm items-end gap-6">
            <p className="text-sm leading-relaxed text-linen/60">
              From intimate celebrations to grand events, we create reels that
              feel real, cinematic and timeless.
            </p>
            <div className="flex flex-shrink-0 gap-3">
              <Link href="/services" aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border border-linen/35 transition-colors hover:border-rose">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M13 8H3M7 4L3 8l4 4" /></svg>
              </Link>
              <Link href="/services" aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-linen/35 transition-colors hover:border-rose">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto grid max-w-content grid-cols-2 gap-7 px-6 md:grid-cols-4 md:px-8">
          {SERVICES.map((s) => (
            <Link key={s.title} href="/services" className="group block">
              <Photo seed={s.seed} aspect="aspect-[3/4]" alt={s.title} />
              <h3 className="mt-4 font-serif text-lg font-semibold transition-colors group-hover:text-rose">
                {s.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] text-linen/55">{s.tag}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section className="bg-linen py-24">
        <div className="mx-auto mb-12 flex max-w-content flex-col justify-between gap-6 px-6 md:flex-row md:items-end md:px-8">
          <div>
            <span className="text-[13px] font-semibold tracking-[0.14em] text-rose-deep">FEATURED WORK</span>
            <h2 className="mt-4 font-serif text-[28px] font-medium md:text-[40px]">
              A glimpse into <span className="italic text-rose-deep">our world.</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="mb-3 text-sm leading-relaxed text-sand">
              Real moments, real people, real stories — a small window into
              the films we&rsquo;ve made.
            </p>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-rose-deep">
              View All Works
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </Link>
          </div>
        </div>
        <div className="mx-auto flex max-w-content gap-6 px-6 md:px-8">
          <div className="grid flex-1 grid-cols-2 gap-5 md:grid-cols-4">
            {FEATURED_WORK.map((seed) => (
              <Photo key={seed} seed={seed} aspect="aspect-[3/4]" alt="Featured work" />
            ))}
          </div>
          <div className="hidden flex-col gap-2 pt-1 text-xs tracking-wider text-sand sm:flex">
            <span>01</span>
            <span>02</span>
            <span>03</span>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative py-28">
        <Photo seed="ir-quote" aspect="aspect-auto" alt="" className="absolute inset-0" sizes="100vw" />
        <div className="relative z-10 mx-auto max-w-content px-6 text-center md:px-8">
          <p className="mx-auto max-w-2xl font-serif text-2xl italic leading-relaxed text-linen md:text-[32px]">
            &ldquo;You don&rsquo;t take a photograph, you make it.&rdquo;
          </p>
          <div className="mt-6 text-[13px] tracking-wider text-linen/55">— ANSEL ADAMS</div>
        </div>
        <div className="absolute bottom-7 left-8 z-10 flex flex-col gap-1 text-[11px] tracking-wider text-linen/45">
          <span>GOOD STORIES</span>
          <span>NEVER FADE</span>
        </div>
      </section>

      <CtaSection />

      <Footer />
    </>
  );
}
