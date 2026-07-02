"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const NAV_LINKS = [
  { href: "/about",      label: "About" },
  { href: "/clients",    label: "Clients" },
  { href: "/career",     label: "Career" },
  { href: "/culture",    label: "Culture" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-kio-line text-kio-muted transition-all hover:border-kio-accent/40 hover:text-kio-ink"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

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
      <div className="mx-auto flex h-[72px] max-w-container items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/img/kiosist-logo.png"
            alt="Kiosist"
            width={1122}
            height={794}
            className="h-[150px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex list-none">
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
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-full bg-gradient-to-r from-kio-accent to-kio-accent2 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_var(--kio-glow)] transition-all hover:opacity-90 hover:-translate-y-px lg:inline-flex"
          >
            Contact Us
          </Link>

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
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-full bg-gradient-to-r from-kio-accent to-kio-accent2 px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
}
