"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X, Phone, Mail, Info, Home, Users } from "lucide-react";

const NAV_LINKS = [
  { href: "/",            label: "Home" },
  { href: "/about",      label: "About" },
  { href: "/clients",    label: "Clients" },
  { href: "/career",     label: "Career" },
  { href: "/culture",    label: "Culture" },
  { href: "/contact",    label: "Contact Us" },
];

// Mirrors Footer.tsx's SOCIAL array- kept local since the top strip is
// icon-only (no labels/columns) and Footer's isn't exported for reuse.
const SOCIAL = [
  {
    href: "https://www.facebook.com/VirtualFrontDeskExperience/",
    label: "Facebook",
    svg: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/kiosist-pvt-ltd/?originalSubdomain=in",
    label: "LinkedIn",
    svg: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/kiosist_hospitality/?hl=en",
    label: "Instagram",
    svg: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

// Bottom app-style tab bar (mobile only)- Menu reuses the same mobileOpen
// state as the header's own dropdown, the rest jump to key pages.
const TAB_LINKS = [
  { href: "/about",   label: "Info",    icon: Info },
  { href: "/",         label: "Home",    icon: Home },
  { href: "/contact", label: "Contact", icon: Phone },
  { href: "/career",  label: "Join",    icon: Users },
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
    <>
    <motion.header
      className={`fixed inset-x-0 top-0 z-40 px-6 transition-all duration-300 ${
        scrolled
          ? "bg-kio-bg/90 backdrop-blur-xl border-b border-kio-line shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Contact/social strip- mobile only, edge-to-edge via -mx-6 */}
      <div className="-mx-6 flex items-center justify-between bg-kio-primary px-6 py-1.5 text-white lg:hidden">
        <div className="flex items-center gap-3.5">
          <a href="tel:9825400070" aria-label="Call Kiosist" className="opacity-90 transition-opacity hover:opacity-100">
            <Phone className="h-3.5 w-3.5" />
          </a>
          <a href="mailto:hr@kiosist.com" aria-label="Email Kiosist" className="opacity-90 transition-opacity hover:opacity-100">
            <Mail className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="flex items-center gap-3">
          {SOCIAL.map(({ href, label, svg }) => (
            <a key={label} href={href} aria-label={label} className="opacity-90 transition-opacity hover:opacity-100">
              {svg}
            </a>
          ))}
        </div>
      </div>

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
          {/* Join Us CTA */}
          <Link
            href="/career#apply"
            className="hidden items-center rounded-full bg-kio-accent px-5 py-2 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-kio-accent2 lg:flex"
          >
            Join Us
          </Link>
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
          <Link
            href="/career#apply"
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-lg bg-kio-accent px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-kio-accent2"
          >
            Join Us
          </Link>
        </div>
      </motion.div>
    </motion.header>

    {/* Bottom app-style tab bar- mobile only */}
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-kio-line bg-kio-bg/95 px-2 py-2 backdrop-blur-xl lg:hidden"
      aria-label="Mobile"
    >
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        suppressHydrationWarning
        className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[10px] font-medium transition-colors ${
          mobileOpen ? "bg-kio-accent text-white" : "text-kio-muted"
        }`}
      >
        {mobileOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
        Menu
      </button>
      {TAB_LINKS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[10px] font-medium transition-colors ${
              active ? "bg-kio-accent text-white" : "text-kio-muted"
            }`}
          >
            <Icon className="h-[18px] w-[18px]" />
            {label}
          </Link>
        );
      })}
    </nav>
    </>
  );
}
