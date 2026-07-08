import Link from "next/link";
import Image from "next/image";

const FOOTER_COLS = [
  {
    heading: "Company",
    links: [
      { href: "/about",     label: "About Us" },

      { href: "/clients",   label: "Clients" },
      { href: "/career",    label: "Join Us" },
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
    href: "https://www.facebook.com/VirtualFrontDeskExperience/",
    label: "Facebook",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/kiosist-pvt-ltd/?originalSubdomain=in",
    label: "LinkedIn",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/kiosist_hospitality/?hl=en",
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
      <div className="container-kio py-9">
        {/* Trailing 1fr spacer track absorbs the row's extra width on wide
            screens instead of stretching Company/Contact to the far right
            edge- shifts them left, closer to Brand, without clustering them
            into a fixed/auto layout. */}
        <div className="grid items-start gap-8 md:grid-cols-[1.3fr_0.85fr_0.85fr_0.9fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/img/kiosist-logo.png"
                alt="Kiosist"
                width={1545}
                height={435}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <div className="mt-4 flex gap-2.5">
              {SOCIAL.map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-kio-line text-kio-muted transition-all hover:border-kio-accent/40 hover:text-kio-ink hover:-translate-y-0.5"
                >
                  {svg}
                </a>
              ))}
            </div>
            <p className="mt-4 max-w-[360px] text-[.875rem] leading-[1.6] text-kio-muted">
              Smart self-service kiosk solutions for the modern hospitality industry.
              Saving hotels thousands while elevating the guest experience.
            </p>
          </div>

          {/* Columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-3 text-[.85rem] font-bold uppercase tracking-[.05em] text-kio-muted">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2">
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

          {/* Map- lives in the trailing spacer column, using the space
              that would otherwise sit empty on wide screens. Extra bottom
              margin keeps it clear of the fixed FloatingCTA widget parked
              in the viewport's bottom-right corner. */}
          <a
            href="https://maps.app.goo.gl/F5UT1wo9Qf5RhDUaA"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Kiosist office location in Google Maps"
            className="mb-16 block aspect-square w-full max-w-[220px] overflow-hidden rounded-xl border border-kio-line md:justify-self-end"
          >
            <iframe
              title="Kiosist office location"
              src="https://www.google.com/maps?q=21.1775001,72.7962931&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, pointerEvents: "none" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex={-1}
            />
          </a>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-kio-line py-4">
        <div className="container-kio flex flex-wrap items-center justify-between gap-3 text-[.8rem] text-kio-muted">
          <p>
            © 2026 <span className="text-kio-accent2">Kiosist</span>. All Rights Reserved. Designed with ♥ for hospitality.
          </p>
         
        </div>
      </div>
    </footer>
  );
}
