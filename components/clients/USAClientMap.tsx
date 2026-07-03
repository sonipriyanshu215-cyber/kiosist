"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, MapPin } from "lucide-react";
import type { Client } from "@/content/clients";
import { PinWithPulse } from "@/components/clients/PinWithPulse";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";
import Map, { Marker, Popup, type MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// Free, no-token dark basemap (CARTO Dark Matter via MapLibre)
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

// Continental US bounds- Alaska/Hawaii will be off-screen at this view
const USA_BOUNDS: [[number, number], [number, number]] = [
  [-127, 22], // SW
  [-64, 51],  // NE
];

interface USAClientMapProps {
  clients: Client[];
}

/* ── Radar overlay (grid) ── */
function RadarSweep() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-3xl">
      {/* Scan grid */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Vignette edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 85% at 50% 52%, transparent 55%, rgba(10,14,28,0.72) 100%)",
        }}
      />
    </div>
  );
}

export function USAClientMap({ clients }: USAClientMapProps) {
  const [active,   setActive]   = useState<Client | null>(null);
  const mapRef = useRef<MapRef | null>(null);

  /* Fly to a marker when it becomes active, and back to the full US view when deselected */
  useEffect(() => {
    if (!mapRef.current) return;
    if (active) {
      mapRef.current.flyTo({
        center: active.coordinates as [number, number],
        zoom: 5.5,
        duration: 900,
      });
    } else {
      mapRef.current.fitBounds(USA_BOUNDS, { padding: 24, duration: 900 });
    }
  }, [active]);

  return (
    <section className="section-pad">
      <div className="container-kio">

        <RevealOnScroll className="mb-10 text-center">
          <p className="section-label">OUR HOTEL NETWORK</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            <span className="text-gradient-shimmer">Trusted by Hotel Brands Across the USA</span>
          </h2>
        </RevealOnScroll>

        {/* ── Map with radar overlay ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
          className="relative overflow-hidden rounded-3xl border border-[#3b82f6]/12"
          style={{ background: "linear-gradient(180deg,#060a18 0%,#08101e 100%)" }}
        >
          {/* Radar overlays- pointer-events-none so the map stays pannable/clickable underneath */}
          <RadarSweep />

          {/* Map- isolated on its own GPU layer so the WebGL canvas doesn't repaint/flicker
              while the page scrolls past the rounded, clipped ancestor above */}
          <div
            className="relative z-[5] h-[400px] w-full sm:h-[460px] md:h-[540px] lg:h-[640px]"
            style={{ transform: "translateZ(0)", willChange: "transform", isolation: "isolate" }}
          >
            <Map
              ref={mapRef}
              initialViewState={{
                bounds: USA_BOUNDS,
                fitBoundsOptions: { padding: 24 },
              }}
              maxBounds={USA_BOUNDS}
              minZoom={3}
              maxZoom={12}
              style={{ width: "100%", height: "100%" }}
              mapStyle={MAP_STYLE}
              attributionControl={false}
              onClick={() => setActive(null)}
              scrollZoom={false}
              dragPan={false}
              dragRotate={false}
              doubleClickZoom={false}
              touchZoomRotate={false}
              touchPitch={false}
              boxZoom={false}
              keyboard={false}
            >
              {clients.map((c, i) => (
                <Marker
                  key={c.id}
                  longitude={c.coordinates[0]}
                  latitude={c.coordinates[1]}
                  anchor="center"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setActive(c);
                  }}
                >
                  <div style={{ cursor: "pointer" }}>
                    <PinWithPulse delay={i * 0.12} active={active?.id === c.id} />
                  </div>
                </Marker>
              ))}

              {/* Logo popup- pops up above the pin for the selected location */}
              {active?.logoUrl && (
                <Popup
                  key={active.id}
                  longitude={active.coordinates[0]}
                  latitude={active.coordinates[1]}
                  anchor="bottom"
                  offset={22}
                  closeButton={false}
                  closeOnClick={false}
                  className="hotel-logo-popup"
                >
                  <img
                    src={active.logoUrl}
                    alt={active.brand}
                    className="block h-9 w-auto max-w-[120px] object-contain"
                  />
                </Popup>
              )}
            </Map>
          </div>

          {/* Scan progress bar at bottom of map */}
          <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-[#3b82f6]/10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: clients.length * 0.26, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* Detail panel */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.16,1,0.3,1] }}
                className="absolute bottom-6 left-6 z-40 max-w-xs overflow-hidden rounded-2xl border border-[#3b82f6]/25"
                style={{ background: "linear-gradient(145deg,rgba(8,14,32,0.97),rgba(6,10,24,0.99))", backdropFilter: "blur(12px)" }}
              >
                {/* Top accent line */}
                <div className="h-[2px] w-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]" />
                <div className="p-5">
                  <button
                    onClick={() => setActive(null)}
                    className="absolute right-3 top-4 rounded-full p-1 text-white/30 transition-colors hover:bg-white/8 hover:text-white/70"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="pr-6">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded border border-[#3b82f6]/30 bg-[#3b82f6]/12 px-2 py-0.5 font-mono text-[10px] font-bold text-[#60a5fa]">
                        {active.state}
                      </span>
                      <div className="flex items-center gap-1">
                        <motion.span
                          className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]"
                          animate={{ opacity:[1,0.3,1], scale:[1,1.4,1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="font-mono text-[10px] text-[#60a5fa]/60">ACTIVE</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-white">{active.brand}</h3>
                    <p className="mt-0.5 text-sm text-white/50">{active.property}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-[#3b82f6]/60" />
                      <span className="text-xs text-white/40">{active.city}</span>
                    </div>
                    {active.testimonial && (
                      <div className="mt-3 rounded-xl border border-white/6 bg-white/3 p-3">
                        <div className="mb-1.5 flex gap-0.5">
                          {Array.from({ length: active.testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-[#3b82f6] text-[#3b82f6]" />
                          ))}
                        </div>
                        <p className="text-xs italic leading-relaxed text-white/50">
                          &ldquo;{active.testimonial.quote}&rdquo;
                        </p>
                        <p className="mt-1.5 text-xs font-semibold text-white/60">
                         - {active.testimonial.author}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
