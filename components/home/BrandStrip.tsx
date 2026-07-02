"use client";

const ROW1 = [
  { src: "/img/logos/Americas_Best_Value_Inn_Logo.png", alt: "Americas Best Value Inn & Suites" },
  { src: "/img/logos/Baymont Logo.png",                 alt: "Baymont by Wyndham"              },
  { src: "/img/logos/Days Inn.png",                     alt: "Days Inn by Wyndham"             },
  { src: "/img/logos/gilman-logo-days-inn.png",         alt: "Days Inn & Suites by Wyndham"    },
  { src: "/img/logos/Econolodge Logo.png",              alt: "Econo Lodge"                     },
  { src: "/img/logos/HomeTowne Studios Logo.png",       alt: "HomeTowne Studios by Red Roof"   },
  { src: "/img/logos/Howard-Johnson-logo.png",          alt: "Howard Johnson by Wyndham"       },
  { src: "/img/logos/laquinta logo.png",                alt: "La Quinta by Wyndham"            },
];

const ROW2 = [
  { src: "/img/logos/Microtel Logo.png",                alt: "Microtel by Wyndham"             },
  { src: "/img/logos/Motel6 logo.png",                  alt: "Motel 6"                         },
  { src: "/img/logos/Quality-Inn-Icon-New-1.png",       alt: "Quality Inn"                     },
  { src: "/img/logos/RedRoof Logo 2.png",               alt: "Red Roof Inn"                    },
  { src: "/img/logos/Sleep Inn Logo.png",               alt: "Sleep Inn"                       },
  { src: "/img/logos/Super-8-Logo.png",                 alt: "Super 8 by Wyndham"              },
  { src: "/img/logos/SureStay Logo1.png",               alt: "SureStay by Best Western"        },
  { src: "/img/logos/Travelodge logo.png",              alt: "Travelodge by Wyndham"           },
];

function LogoItem({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group flex h-16 w-44 shrink-0 items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="h-full w-full select-none object-contain"
        style={{
          filter:     "grayscale(1) brightness(0.55)",
          opacity:    0.65,
          transition: "filter 0.35s ease, opacity 0.35s ease",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLImageElement).style.filter  = "none";
          (e.currentTarget as HTMLImageElement).style.opacity = "1";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLImageElement).style.filter  = "grayscale(1) brightness(0.55)";
          (e.currentTarget as HTMLImageElement).style.opacity = "0.65";
        }}
      />
    </div>
  );
}

export function BrandStrip() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-24">

      {/* Tagline above heading */}
      <div className="mb-10 text-center">
        <span className="section-label">Our Hotel Partners</span>
        <p className="text-[clamp(1.1rem,2.5vw,1.6rem)] font-bold tracking-wide text-kio-ink">
          Trusted by Hotels.{" "}
          <span className="text-color-cycle">Loved by Guests.</span>{" "}
          Across USA.
        </p>
      </div>

      {/* Left fade mask */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
        style={{ background: "linear-gradient(to right, #0d1117, transparent)" }} />
      {/* Right fade mask */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
        style={{ background: "linear-gradient(to left, #0d1117, transparent)" }} />

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden mb-6">
        <div className="marquee-track flex w-max items-center gap-10 px-10">
          {[...ROW1, ...ROW1].map((logo, i) => (
            <LogoItem key={i} {...logo} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <div className="marquee-track-reverse flex w-max items-center gap-10 px-10">
          {[...ROW2, ...ROW2].map((logo, i) => (
            <LogoItem key={i} {...logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
