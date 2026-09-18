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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink">
      <div className="mx-auto flex h-[84px] max-w-content items-center justify-between px-6 md:px-8">
        <Link href="/" className="font-serif text-xl font-semibold text-linen">
          instant<span className="italic text-rose">reels</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
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

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="whitespace-nowrap bg-rose-deep px-6 py-3 text-sm font-semibold text-linen transition-colors hover:bg-rose-deep-hover"
          >
            Get Started
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#f4ede2" strokeWidth="1.6" strokeLinecap="round">
              <line x1="2" y1="6" x2="20" y2="6" />
              <line x1="2" y1="11" x2="20" y2="11" />
              <line x1="2" y1="16" x2="20" y2="16" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-white/10 bg-ink px-6 pb-6 pt-2 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`py-3 text-base ${
                pathname === link.href ? "text-rose" : "text-linen"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
