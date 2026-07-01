import Link from "next/link";
import Image from "next/image";

const FOOTER_COLS = [
  {
    heading: "Company",
    links: [
      { href: "/about",     label: "About Us" },
      { href: "/#features", label: "Our Product" },
      { href: "/clients",   label: "Clients" },
      { href: "/career",    label: "Join Us" },
    ],
  },
  {
    heading: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#how",      label: "How It Works" },
      { href: "/contact",   label: "Pricing" },
      { href: "/contact",   label: "Demo" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { href: "mailto:hr@kiosist.com", label: "hr@kiosist.com" },
      { href: "tel:9825400070",        label: "+91 98254 00070" },
      { href: "/contact",              label: "Surat, Gujarat" },
    ],
  },
];

const SOCIAL = [
  {
    href: "#",
    label: "Facebook",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "LinkedIn",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Instagram",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="border-t border-kio-line bg-kio-bg-soft">
      <div className="container-kio py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/img/kiosist-logo.png"
                alt="Kiosist"
                width={1122}
                height={794}
                className="h-[150px] w-auto object-contain"
              />
            </Link>
            <p className="mt-3.5 max-w-[280px] text-[.875rem] leading-[1.8] text-kio-muted">
              Smart self-service kiosk solutions for the modern hospitality industry.
              Saving hotels thousands while elevating the guest experience.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL.map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-kio-line text-kio-muted transition-all hover:border-kio-accent/40 hover:text-kio-ink hover:-translate-y-0.5"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 text-[.85rem] font-bold uppercase tracking-[.05em] text-kio-muted">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(({ href, label }) => (
                  <li key={href + label}>
                    <Link
                      href={href}
                      className="text-[.875rem] text-kio-muted transition-colors hover:text-kio-ink"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-kio-line py-5">
        <div className="container-kio flex flex-wrap items-center justify-between gap-3 text-[.8rem] text-kio-muted">
          <p>
            © 2024 <span className="text-kio-accent2">Kiosist</span>. All Rights Reserved. Designed with ♥ for hospitality.
          </p>
          <p>
            Developed by <span className="text-kio-accent2">Instance IT Solutions®</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
