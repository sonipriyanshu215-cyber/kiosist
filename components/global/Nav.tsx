"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/about",      label: "About" },
  { href: "/clients",    label: "Clients" },
  { href: "/career",     label: "Career" },
  { href: "/culture",    label: "Culture" },
  { href: "/contact",    label: "Contact Us" },
];

export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled]    = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
  });

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-40 px-6 transition-all duration-300 ${
        scrolled
          ? "bg-kio-bg/90 backdrop-blur-xl border-b border-kio-line shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-[72px] max-w-container items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/img/kiosist-logo.png"
            alt="Kiosist"
            width={1545}
            height={435}
            className="h-[52px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex list-none">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    active ? "text-kio-ink" : "text-kio-muted hover:text-kio-ink"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-kio-line text-kio-ink lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden border-t border-kio-line bg-kio-bg/97 backdrop-blur-xl lg:hidden"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-kio-accent/10 text-kio-ink"
                  : "text-kio-muted hover:bg-kio-bg-soft hover:text-kio-ink"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}
