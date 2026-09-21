import Link from "next/link";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" />
      </>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10 9l6 3-6 3z" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    path: (
      <>
        <path d="M14 3v11.5a3.5 3.5 0 1 1-3-3.46" />
        <path d="M14 3c.4 2.2 2 3.9 4 4.3" />
      </>
    ),
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    path: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 17c1-3 1.3-5.6 1.3-7.4a2.2 2.2 0 0 1 4.4.2c0 2-1.2 3.7-2.9 3.7-.7 0-1.3-.3-1.6-.8" />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink2 pb-8 pt-16 text-linen">
      <div className="mx-auto max-w-content px-6 md:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 sm:pb-12 md:grid-cols-3">
          <div>
            <div className="mb-4 font-serif text-2xl font-semibold flex items-center gap-1">
              <span>instant</span>
              <span className="text-rose text-lg font-sans">⚡</span>
              <span className="italic text-rose">reels</span>
            </div>
            <p className="max-w-[280px] text-sm leading-relaxed text-linen/60">
              Turning fleeting moments into films you&rsquo;ll want to watch for
              the rest of your life.
            </p>
          </div>

          <div>
            <div className="mb-4 sm:mb-5 text-[12px] sm:text-[13px] font-bold tracking-wider uppercase text-linen/90">
              QUICK LINKS
            </div>
            <div className="flex flex-col gap-2.5 text-[15px] sm:text-sm">
              <Link href="/" className="text-linen/70 transition-colors hover:text-rose py-1">Home</Link>
              <Link href="/services" className="text-linen/70 transition-colors hover:text-rose py-1">Services</Link>
              <Link href="/portfolio" className="text-linen/70 transition-colors hover:text-rose py-1">Portfolio</Link>
              <Link href="/about" className="text-linen/70 transition-colors hover:text-rose py-1">About</Link>
              <Link href="/contact" className="text-linen/70 transition-colors hover:text-rose py-1">Contact</Link>
            </div>
          </div>

          <div>
            <div className="mb-4 sm:mb-5 text-[12px] sm:text-[13px] font-bold tracking-wider uppercase text-linen/90">
              FOLLOW US
            </div>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-linen transition-colors hover:border-rose hover:text-rose active:scale-95"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    {s.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-6 text-[13px] text-linen/50 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Instantreels. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-rose">Privacy</a>
            <a href="#" className="transition-colors hover:text-rose">Terms</a>
            <a href="#" className="transition-colors hover:text-rose">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
