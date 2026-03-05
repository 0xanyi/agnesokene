"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/tributes", label: "Tributes" },
  { href: "/gallery", label: "Gallery" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/30 bg-cream/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="shrink-0 whitespace-nowrap font-[family-name:var(--font-serif)] text-base font-semibold tracking-[0.02em] text-foreground sm:text-xl md:text-2xl"
        >
          Mama Agnes Okene
        </Link>

        <div className="hidden items-center gap-4 md:flex lg:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[12px] uppercase tracking-[0.14em] transition-colors duration-200 hover:text-gold",
                pathname === link.href
                  ? "font-medium text-gold-dark"
                  : "text-warm-gray"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-md border border-border/50 px-3 py-2 text-xs uppercase tracking-[0.14em] text-warm-gray transition-colors hover:text-gold md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border/40 bg-cream/95 px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-[12px] uppercase tracking-[0.14em] transition-colors duration-200",
                  pathname === link.href
                    ? "bg-gold/10 font-medium text-gold-dark"
                    : "text-warm-gray hover:bg-secondary/60 hover:text-gold"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
