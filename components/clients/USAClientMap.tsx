"use client";

import { useEffect, useRef, useState } from "react";
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

// Pan/zoom limit- deliberately looser than USA_BOUNDS. If it matched
// USA_BOUNDS exactly, fitBounds' extra padding (added on narrow viewports so
// edge-state label pills clear the rounded/clipped container edge) would
// have nowhere to go: it can't zoom out to create margin when that margin
// would show area outside maxBounds, so padding silently did nothing. This
// gives it room, revealing a sliver of ocean/Canada/Mexico instead of
// clipping East/West Coast state labels.
const MAX_PAN_BOUNDS: [[number, number], [number, number]] = [
  [-142, 15],
  [-50, 58],
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
  // MapLibre/react-map-gl builds its own DOM (canvas + controls) that can't
  // be reproduced server-side- rendering it during SSR causes a hydration
  // mismatch. Mounting it only after the client confirms hydration keeps the
  // server and first client render identical (both show the placeholder).
  const [mounted, setMounted] = useState(false);
  // Narrow viewports render the same continental-US bounds into a much
  // narrower box, so edge states sit close enough to the rounded/clipped
  // container edge that their label pills get cut off- both coasts (New
  // York/Virginia in the east, California in the west), so asymmetric
  // padding just trades clipping on one side for the other. Zooming out
  // further (uniform padding, lower minZoom, wider maxBounds) is the only
  // fix that helps both sides at once. minZoom also has to drop on narrow
  // viewports- at the default 3 it was already the floor fitBounds hit, so
  // it had no room to zoom out and honor any extra padding at all.
  const [fitPadding, setFitPadding] = useState(24);
  const [minZoom, setMinZoom] = useState(3);
  // Measured (not guessed) so the map is exactly as tall as the space left
  // under the fixed nav + heading- as large as it can be while still fitting
  // fully in the first viewport, on any screen size.
  const cardRef = useRef<HTMLDivElement>(null);
  const [mapHeight, setMapHeight] = useState<number | null>(null);
  useEffect(() => {
    setMounted(true);
    const narrow = window.innerWidth < 640;
    setFitPadding(narrow ? 60 : 24);
    setMinZoom(narrow ? 1 : 3);

    const measure = () => {
      if (!cardRef.current) return;
      const docTop = cardRef.current.getBoundingClientRect().top + window.scrollY;
      const available = window.innerHeight - docTop - 6; // 6px bottom breathing room
      // The continental US bbox has a fixed ~1.78:1 (width:height) shape. If the
      // card is given more height than that shape needs at its current width,
      // fitBounds fills the extra room with real geography beyond the bbox
      // (ocean south of Florida, Canada up north) instead of cropping- which
      // reads as a big empty band. Capping height to what the width actually
      // calls for keeps the map filled edge-to-edge with no dead space, while
      // `available` still guarantees it fits the viewport.
      const width = cardRef.current.clientWidth;
      const idealForWidth = width / 1.78;
      const target = Math.min(available, idealForWidth);
      // 360 is a soft floor for usability on tiny windows- it can still lose
      // to `available` above, because a slightly-short map beats one whose
      // bottom edge is cropped by the viewport.
      setMapHeight(Math.min(Math.max(target, 360), 940));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // 22 pins is too many to label all at once without the map turning into a
  // wall of pills- instead nothing is labeled by default, and clicking a pin
  // reveals just that city's name, directly below its dot. Clicking it again
  // (or clicking another pin) hides it.
  const [activeId, setActiveId] = useState<string | null>(null);
  // Hovering a pin previews its state name- separate from the click-to-reveal
  // city label above, so mousing across the map is a lightweight way to scan
  // state coverage without having to click each pin.
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="pb-0 pt-[112px] lg:pt-[76px]">
      <div className="container-kio">

        <RevealOnScroll className="mb-3 text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
            Powering <span className="text-color-cycle">Hospitality Across US</span>
          </h2>
        </RevealOnScroll>

        {/* ── Map with radar overlay ── */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
          className="relative w-full overflow-hidden rounded-3xl border border-[#3b82f6]/12"
          style={{
            background: "linear-gradient(180deg,#060a18 0%,#08101e 100%)",
            height: mapHeight ? `${mapHeight}px` : "clamp(360px, 85vh, 940px)",
          }}
        >
          {/* Radar overlays- pointer-events-none so the map stays pannable underneath */}
          <RadarSweep />

          {/* Map- isolated on its own GPU layer so the WebGL canvas doesn't repaint/flicker
              while the page scrolls past the rounded, clipped ancestor above */}
          <div
            className="relative z-[5] h-full w-full"
            style={{
              transform: "translateZ(0)",
              willChange: "transform",
              isolation: "isolate",
            }}
          >
            {mounted && (
              <Map
                initialViewState={{
                  bounds: USA_BOUNDS,
                  fitBoundsOptions: { padding: fitPadding },
                }}
                maxBounds={MAX_PAN_BOUNDS}
                minZoom={minZoom}
                maxZoom={12}
                style={{ width: "100%", height: "100%" }}
                mapStyle={MAP_STYLE}
                attributionControl={false}
                onClick={() => setActiveId(null)}
                scrollZoom={false}
                dragPan={false}
                dragRotate={false}
                doubleClickZoom={false}
                touchZoomRotate={false}
                touchPitch={false}
                boxZoom={false}
                keyboard={false}
              >
                {clients
                  .map((c, i) => ({ c, i }))
                  // react-map-gl positions each marker with its own CSS transform, so
                  // each one forms its own stacking context- a z-index inside one
                  // marker's subtree can never lift it above a sibling marker's dot,
                  // only DOM order can. Rendering the active/hovered marker last
                  // (without changing its `i`, so the pulse animation's delay stays
                  // put) is what keeps its label from being clipped by a neighboring
                  // pin in dense clusters.
                  .sort(
                    (a, b) =>
                      (a.c.id === activeId || a.c.id === hoveredId ? 1 : 0) -
                      (b.c.id === activeId || b.c.id === hoveredId ? 1 : 0)
                  )
                  .map(({ c, i }) => {
                    const active = activeId === c.id;
                    const hovered = hoveredId === c.id;
                    return (
                      <Marker
                        key={c.id}
                        longitude={c.coordinates[0]}
                        latitude={c.coordinates[1]}
                        anchor="center"
                      >
                        <div
                          className="relative cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveId((prev) => (prev === c.id ? null : c.id));
                          }}
                          onMouseEnter={() => setHoveredId(c.id)}
                          onMouseLeave={() =>
                            setHoveredId((prev) => (prev === c.id ? null : prev))
                          }
                        >
                          <PinWithPulse delay={i * 0.12} />
                          {(active || hovered) && (
                            <span className="absolute left-1/2 top-full z-20 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#060a18]/90 px-2 py-1 text-[10px] font-semibold text-white shadow-md ring-1 ring-[#3b82f6]/40">
                              {c.city}
                            </span>
                          )}
                        </div>
                      </Marker>
                    );
                  })}
              </Map>
            )}
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
