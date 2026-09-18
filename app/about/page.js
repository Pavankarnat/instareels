import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import CtaSection from "@/components/CtaSection";

export const metadata = {
  title: "About — Instantreels",
  description: "Our story, our values, and the person behind the lens.",
};

const VALUES = [
  {
    title: "Authenticity",
    body: "We film what's really happening, not a staged version of it.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "Craft & Detail",
    body: "Every frame, cut and colour choice is made on purpose.",
    icon: (
      <>
        <path d="M4 20l4-1 10-10-3-3L5 16z" />
        <path d="M14 6l3 3" />
      </>
    ),
  },
  {
    title: "Emotion First",
    body: "If a moment doesn't move us, it doesn't make the cut.",
    icon: (
      <>
        <path d="M12 20s-7.5-4.7-9.3-9.4C1.7 7 3.6 4 7 4c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3 4.3 6.6C19.5 15.3 12 20 12 20z" />
      </>
    ),
  },
  {
    title: "Always on Time",
    body: "Your film delivered when we say it will be — no chasing.",
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

      {/* Full-width Hero Banner */}
      <section className="relative w-full overflow-hidden bg-ink py-20 text-linen md:py-28 min-h-[380px] md:min-h-[460px] flex items-center">
        {/* Full-width background image with cinematic gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/about-moment.jpg"
            alt="Our Story"
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
            <span className="text-[13px] font-semibold tracking-[0.14em] text-rose">OUR STORY</span>
          </div>
          <h1 className="max-w-2xl font-serif text-[36px] font-medium leading-tight sm:text-[46px] md:text-[58px]">
            It&rsquo;s more than <span className="italic text-rose">just reels.</span>
          </h1>
          <p className="mt-5 text-sm text-linen/60">
            Home <span className="px-2">/</span> About
          </p>
        </div>
      </section>

      <section className="bg-linen py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-8">
          <div>
            <span className="text-[13px] font-semibold tracking-[0.14em] text-rose-deep">WHERE IT STARTED</span>
            <h2 className="mt-4 font-serif text-[28px] font-medium leading-tight md:text-[38px]">
              Good stories <span className="italic text-rose-deep">last longer.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-bark/80">
              Instantreels began with a simple frustration: wedding films that
              looked beautiful but felt like nobody&rsquo;s wedding in
              particular. We wanted the opposite — films that are unmistakably
              yours, built from the small, unplanned moments that a stiff shot
              list always misses.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-bark/80">
              Years and hundreds of ceremonies later, that&rsquo;s still the
              whole job: pay close attention, stay out of the way, and hand
              back a film that feels exactly like being there.
            </p>
          </div>
          <Photo seed="ir-about-story" aspect="aspect-[4/3.4]" alt="Couple sharing a quiet moment" />
        </div>
      </section>

      <section className="bg-merlot py-24 text-linen">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <div className="mb-14 max-w-lg">
            <span className="text-[13px] font-semibold tracking-[0.14em] text-rose">WHAT WE STAND FOR</span>
            <h2 className="mt-4 font-serif text-[28px] font-medium md:text-[38px]">
              The values behind <span className="italic text-rose">every film.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d98a7a" strokeWidth="1.5">
                  {v.icon}
                </svg>
                <h3 className="mt-4 text-[17px] font-semibold">{v.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-linen/60">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-linen py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-8">
          <Photo seed="ir-founder" aspect="aspect-[4/4.6]" alt="Founder portrait" className="md:order-1" />
          <div className="md:order-2">
            <span className="text-[13px] font-semibold tracking-[0.14em] text-rose-deep">BEHIND THE LENS</span>
            <p className="mt-5 font-serif text-xl italic leading-relaxed text-bark md:text-2xl">
              &ldquo;I still get the same feeling on shoot day thirteen
              hundred that I got on shoot day one — that&rsquo;s how I know
              we&rsquo;re doing this right.&rdquo;
            </p>
            <div className="mt-6">
              <div className="text-[15px] font-semibold">Aarav Malhotra</div>
              <div className="mt-0.5 text-[13px] text-sand">Founder & Lead Filmmaker</div>
            </div>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 border border-bark/25 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-rose-deep hover:text-rose-deep"
            >
              Say Hello
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />

      <Footer />
    </>
  );
}
