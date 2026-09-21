"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] sm:h-[76px] md:h-[84px] max-w-content items-center justify-between px-4 sm:px-6 md:px-8">
        <Link href="/" className="font-serif text-lg sm:text-xl font-semibold text-linen flex items-center gap-1">
          <span>instant</span>
          <span className="text-rose text-base font-sans">⚡</span>
          <span className="italic text-rose">reels</span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:gap-9 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[15px] font-medium transition-colors hover:text-rose ${
                pathname === link.href ? "text-rose" : "text-linen"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/contact"
            className="whitespace-nowrap bg-rose-deep px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-linen transition-all duration-200 hover:bg-rose-deep-hover active:scale-95 rounded-full sm:rounded-none"
          >
            Get Started
          </Link>
          
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-linen hover:bg-white/5 active:scale-95 md:hidden"
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown with Smooth Styling */}
      {open && (
        <div className="flex flex-col border-t border-white/10 bg-ink/98 px-6 pb-6 pt-3 md:hidden shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col divide-y divide-white/5">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-3.5 text-[15px] font-medium transition-colors flex items-center justify-between ${
                  pathname === link.href ? "text-rose font-semibold" : "text-linen/90 hover:text-rose"
                }`}
              >
                <span>{link.label}</span>
                {pathname === link.href && (
                  <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                )}
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-2">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-deep py-3 text-sm font-semibold text-linen shadow-md hover:bg-rose-deep-hover active:scale-95"
            >
              <span>Book Your Reel</span>
              <span className="font-mono text-xs">↗</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
