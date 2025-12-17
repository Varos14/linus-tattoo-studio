"use client";

import Link from "next/link";
import { useState } from "react";
import { STUDIO } from "@/lib/config";

const nav = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/artists", label: "Artists" },
  { href: "/booking", label: "Booking" },
  { href: "/faq", label: "FAQ" },
  { href: "/aftercare", label: "Aftercare" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="z-50 w-full border-b border-white/10 backdrop-blur bg-background/80 shadow-lg">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-wide hover:text-foreground/90 transition-colors">
          {STUDIO.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative hover:text-foreground transition-colors duration-200 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-foreground before:transition-all before:duration-200 hover:before:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-foreground/10 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur border-t border-white/10">
          <nav className="mx-auto max-w-6xl px-4 py-6">
            <div className="flex flex-col gap-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-foreground/80 hover:text-foreground transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-foreground/5"
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-4 mt-2">
                <a
                  href={STUDIO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-foreground/5"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.949.013 6.76.064c-1.188.05-2.005.242-2.712.516a5.41 5.41 0 00-1.955 1.276A5.41 5.41 0 001.27 3.05C.994 3.757.802 4.574.752 5.762.701 6.95.688 7.397.688 11.017s.013 4.067.064 5.255c.05 1.188.242 2.005.516 2.712a5.41 5.41 0 001.276 1.955 5.41 5.41 0 001.955 1.276c.707.274 1.524.466 2.712.516 1.188.05 1.635.064 5.255.064s4.067-.013 5.255-.064c1.188-.05 2.005-.242 2.712-.516a5.41 5.41 0 001.955-1.276 5.41 5.41 0 001.276-1.955c.274-.707.466-1.524.516-2.712.05-1.188.064-1.635.064-5.255s-.013-4.067-.064-5.255c-.05-1.188-.242-2.005-.516-2.712a5.41 5.41 0 00-1.276-1.955A5.41 5.41 0 0017.274.58c-.707-.274-1.524-.466-2.712-.516C15.374.013 14.927 0 11.307 0h-.29zm-.005 1.802h.29c3.546 0 3.955.013 5.35.064 1.086.042 1.677.23 2.067.383a3.61 3.61 0 011.36.886 3.61 3.61 0 01.886 1.36c.153.39.341.981.383 2.067.051 1.395.064 1.804.064 5.35s-.013 3.955-.064 5.35c-.042 1.086-.23 1.677-.383 2.067a3.61 3.61 0 01-.886 1.36 3.61 3.61 0 01-1.36.886c-.39.153-.981.341-2.067.383-1.395.051-1.804.064-5.35.064s-3.955-.013-5.35-.064c-1.086-.042-1.677-.23-2.067-.383a3.61 3.61 0 01-1.36-.886 3.61 3.61 0 01-.886-1.36c-.153-.39-.341-.981-.383-2.067C1.49 14.972 1.477 14.563 1.477 11.017s.013-3.955.064-5.35c.042-1.086.23-1.677.383-2.067a3.61 3.61 0 011.36-.886 3.61 3.61 0 012.067-.383c1.395-.051 1.804-.064 5.35-.064zm0 2.716a8.3 8.3 0 100 16.6 8.3 8.3 0 000-16.6zm0 2.716a5.584 5.584 0 110 11.168 5.584 5.584 0 010-11.168zm8.466-2.716a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0z"/>
                  </svg>
                  Follow on Instagram
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

