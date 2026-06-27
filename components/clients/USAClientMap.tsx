"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";
import type { Client } from "@/content/clients";
import { PinWithPulse } from "@/components/clients/PinWithPulse";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  type GeoJSONFeature,
} from "react-simple-maps";

const GEO_URL = "/data/states-10m.json";

interface USAClientMapProps {
  clients: Client[];
}

export function USAClientMap({ clients }: USAClientMapProps) {
  const [active, setActive] = useState<Client | null>(null);

  return (
    <section className="section-pad bg-kio-primary">
      <div className="container-kio">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-kio-accent">
            Our Footprint
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Hotels we serve across the USA
          </h2>
          <p className="mt-3 text-white/60">
            Hover a pin to see the property. Click for details.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-kio-primary">
          <ComposableMap
            projection="geoAlbersUsa"
            className="w-full"
            style={{ height: "520px" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: GeoJSONFeature[] }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey as string}
                    geography={geo}
                    fill="#16385F"
                    stroke="#1E4A7A"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" } as React.CSSProperties,
                      hover: { fill: "#F5B82E22", outline: "none" } as React.CSSProperties,
                      pressed: { outline: "none" } as React.CSSProperties,
                    }}
                  />
                ))
              }
            </Geographies>

            {clients.map((c, i) => (
              <Marker
                key={c.id}
                coordinates={c.coordinates}
                onMouseEnter={() => setActive(c)}
                onClick={() => setActive(c)}
              >
                <PinWithPulse delay={i * 0.12} active={active?.id === c.id} />
              </Marker>
            ))}
          </ComposableMap>

          {/* Detail panel */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-6 left-6 max-w-xs rounded-2xl bg-kio-bg p-5 shadow-2xl"
              >
                <button
                  onClick={() => setActive(null)}
                  className="absolute right-3 top-3 rounded-full p-1 text-kio-muted hover:bg-kio-bg-soft"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="pr-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-kio-accent">
                    {active.state}
                  </p>
                  <h3 className="mt-1 font-bold text-kio-ink">{active.brand}</h3>
                  <p className="text-sm text-kio-muted">
                    {active.property} — {active.city}
                  </p>
                  {active.testimonial && (
                    <div className="mt-3 rounded-xl bg-kio-bg-soft p-3">
                      <div className="mb-1 flex gap-0.5">
                        {Array.from({ length: active.testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-kio-accent text-kio-accent" />
                        ))}
                      </div>
                      <p className="text-xs italic leading-relaxed text-kio-muted">
                        &ldquo;{active.testimonial.quote}&rdquo;
                      </p>
                      <p className="mt-1 text-xs font-semibold text-kio-ink">
                        — {active.testimonial.author}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accessible fallback table */}
        <details className="mt-8">
          <summary className="cursor-pointer text-sm text-kio-accent/70 transition-colors hover:text-kio-accent">
            View as table (accessible alternative)
          </summary>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-white/80">
              <thead>
                <tr className="border-b border-kio-accent/20 text-left text-xs uppercase tracking-wider text-kio-accent">
                  <th className="pb-2 pr-6">Brand</th>
                  <th className="pb-2 pr-6">Property</th>
                  <th className="pb-2 pr-6">City</th>
                  <th className="pb-2">State</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id} className="border-b border-white/10">
                    <td className="py-2 pr-6 font-medium text-white">{c.brand}</td>
                    <td className="py-2 pr-6">{c.property}</td>
                    <td className="py-2 pr-6">{c.city}</td>
                    <td className="py-2">{c.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </section>
  );
}
