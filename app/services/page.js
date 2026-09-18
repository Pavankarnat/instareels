import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import CtaSection from "@/components/CtaSection";

export const metadata = {
  title: "Services — Instantreels",
  description: "Weddings, pre-wedding shoots, events and portraits.",
};

const SERVICES = [
  {
    index: "01",
    title: "Weddings",
    seed: "ir-svc-wedding",
    body: "Full-day coverage that follows the day as it unfolds — getting ready, vows, the first dance — cut into a film built to be watched again on every anniversary.",
    points: [
      "Full-day cinematic coverage",
      "Highlight reel + full-length film",
      "Licensed music & colour grading",
    ],
  },
  {
    index: "02",
    title: "Pre-Wedding",
    seed: "ir-svc-prewedding",
    body: "A relaxed shoot built around you as a couple — a place you love, golden light, and a short film that captures the ease between you before the big day.",
    points: [
      "Location scouting & styling notes",
      "3–5 minute cinematic short film",
      "Edited photo stills included",
    ],
  },
  {
    index: "03",
    title: "Events",
    seed: "ir-svc-events",
    body: "Engagements, receptions, milestone birthdays and family gatherings — documented quietly, so the film feels like the room, not a performance for the camera.",
    points: [
      "Flexible hourly or full-event packages",
      "Same-week teaser edit",
      "Multi-camera coverage available",
    ],
  },
  {
    index: "04",
    title: "Portraits",
    seed: "ir-svc-portraits",
    body: "Solo or family portrait sessions, shot with the same warmth as our wedding work — for the moments that don't need an occasion to matter.",
    points: [
      "Studio or on-location sessions",
      "Retouched digital gallery",
      "Optional short-form reel",
    ],
  },
];

const PROCESS = [
  { n: "01", title: "Enquire", body: "Tell us your date and vision — we reply within a day." },
  { n: "02", title: "Plan & Style", body: "We shape the shot list, timeline and mood together." },
  { n: "03", title: "Shoot the Day", body: "We stay unobtrusive and let the day lead the way." },
  { n: "04", title: "Deliver Your Film", body: "Your edit arrives within 2–4 weeks, ready to share." },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      {/* Full-width Hero Banner */}
      <section className="relative w-full overflow-hidden bg-ink py-20 text-linen md:py-28 min-h-[380px] md:min-h-[460px] flex items-center">
        {/* Full-width background image with cinematic gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/service-events.jpg"
            alt="Our Services"
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
            <span className="text-[13px] font-semibold tracking-[0.14em] text-rose">OUR SERVICES</span>
          </div>
          <h1 className="max-w-2xl font-serif text-[36px] font-medium leading-tight sm:text-[46px] md:text-[58px]">
            Moments for every <span className="italic text-rose">milestone.</span>
          </h1>
          <p className="mt-5 text-sm text-linen/60">
            Home <span className="px-2">/</span> Services
          </p>
        </div>
      </section>

      <section className="bg-linen pb-6 pt-24">
        <div className="mx-auto max-w-2xl px-6 md:px-8">
          <p className="text-base leading-relaxed text-bark/80">
            Every love story, every celebration, every quiet portrait sits
            somewhere between the everyday and the unrepeatable. We build our
            services around that — four ways of working, one way of seeing:
            closely, patiently, and with real emotion.
          </p>
        </div>
      </section>

      <section className="bg-linen py-16">
        <div className="mx-auto flex max-w-content flex-col gap-24 px-6 md:px-8">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <Photo seed={s.seed} aspect="aspect-[4/3.2]" alt={s.title} />
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <div className="mb-3.5 text-[13px] tracking-wider text-sand">
                  {s.index} / FOUR SERVICES
                </div>
                <h2 className="font-serif text-[26px] font-medium md:text-[34px]">{s.title}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-bark/80">{s.body}</p>
                <div className="mt-5 flex flex-col gap-2.5">
                  {s.points.map((p) => (
                    <div key={p} className="flex items-start gap-2.5 text-sm text-bark/80">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#8f4636" strokeWidth="1.6" className="mt-0.5 flex-shrink-0">
                        <path d="M3 8.5l3 3 7-7" />
                      </svg>
                      {p}
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 border border-bark/25 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-rose-deep hover:text-rose-deep"
                >
                  Get a Quote
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-linen2 py-24">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <span className="text-[13px] font-semibold tracking-[0.14em] text-rose-deep">HOW IT WORKS</span>
            <h2 className="mt-4 font-serif text-[28px] font-medium md:text-[38px]">
              From first message to <span className="italic text-rose-deep">finished film.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {PROCESS.map((step) => (
              <div key={step.n}>
                <div className="font-serif text-[34px] italic text-[#c9a98f]">{step.n}</div>
                <h3 className="mt-3.5 text-[17px] font-semibold">{step.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-bark/80">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />

      <Footer />
    </>
  );
}
