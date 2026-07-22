"use client";

import { motion } from "framer-motion";
import type { Client } from "@/content/clients";
import { PinWithPulse } from "@/components/clients/PinWithPulse";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";
import Map, { Marker } from "react-map-gl/maplibre";
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
  return (
    <section className="section-pad">
      <div className="container-kio">

        <RevealOnScroll className="mb-10 text-center">
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            <span className="text-gradient-shimmer">Powering Hospitality Across US</span>
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
          {/* Radar overlays- pointer-events-none so the map stays pannable underneath */}
          <RadarSweep />

          {/* Map- isolated on its own GPU layer so the WebGL canvas doesn't repaint/flicker
              while the page scrolls past the rounded, clipped ancestor above */}
          <div
            className="relative z-[5] h-[400px] w-full sm:h-[460px] md:h-[540px] lg:h-[640px]"
            style={{ transform: "translateZ(0)", willChange: "transform", isolation: "isolate" }}
          >
            <Map
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
                >
                  <PinWithPulse delay={i * 0.12} />
                </Marker>
              ))}
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
        </motion.div>

      </div>
    </section>
  );
}
