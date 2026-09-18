import Image from "next/image";

const SEED_MAP = {
  "ir-hero": "/photos/hero-bride.jpg",
  "ir-story": "/photos/story-flatlay.jpg",
  "ir-home-wed": "/photos/service-weddings.jpg",
  "ir-home-pre": "/photos/service-prewed.jpg",
  "ir-home-evt": "/photos/service-events.jpg",
  "ir-home-por": "/photos/service-portraits.jpg",
  "ir-work-1": "/photos/work-veil.jpg",
  "ir-work-2": "/photos/work-bw-couple.jpg",
  "ir-work-3": "/photos/work-details.jpg",
  "ir-work-4": "/photos/work-shadows.jpg",
  "ir-quote": "/photos/quote-bg.jpg",
  "ir-svc-wedding": "/photos/service-weddings.jpg",
  "ir-svc-prewedding": "/photos/service-prewed.jpg",
  "ir-svc-events": "/photos/service-events.jpg",
  "ir-svc-portraits": "/photos/service-portraits.jpg",
  "ir-about-story": "/photos/about-moment.jpg",
  "ir-founder": "/photos/service-portraits.jpg",
  "ir-pf-1": "/photos/hero-bride.jpg",
  "ir-pf-2": "/photos/service-weddings.jpg",
  "ir-pf-3": "/photos/work-bw-couple.jpg",
  "ir-pf-4": "/photos/service-prewed.jpg",
  "ir-pf-5": "/photos/work-veil.jpg",
  "ir-pf-6": "/photos/about-moment.jpg",
  "ir-pf-7": "/photos/service-events.jpg",
  "ir-pf-8": "/photos/quote-bg.jpg",
  "ir-pf-9": "/photos/work-details.jpg",
  "ir-pf-10": "/photos/service-portraits.jpg",
  "ir-pf-11": "/photos/story-flatlay.jpg",
  "ir-pf-12": "/photos/work-shadows.jpg",
};

export default function Photo({
  src,
  seed,
  aspect = "aspect-[4/5]",
  alt = "",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}) {
  const imageSrc =
    src ||
    (seed && SEED_MAP[seed]) ||
    (seed && seed.startsWith("/") ? seed : "/photos/hero-bride.jpg");

  return (
    <div className={`relative overflow-hidden ${aspect} ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 hover:scale-105"
        sizes={sizes}
        priority={priority}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/25" />
    </div>
  );
}
