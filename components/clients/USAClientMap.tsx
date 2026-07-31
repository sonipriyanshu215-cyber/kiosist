"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Client } from "@/content/clients";
import { PinWithPulse } from "@/components/clients/PinWithPulse";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// How far a pin's pulsing ring visually reaches at its largest (PinWithPulse
// animates its ring out to ~3.2x a 5px radius)- used as the obstacle size
// so a label never lands on top of a pin that isn't its own.
const PIN_OBSTACLE_RADIUS = 16;
const LABEL_GAP = 6; // breathing room between a pin's ring and its label

type Point = { x: number; y: number };
type Box = { left: number; right: number; top: number; bottom: number };

function boxesOverlap(a: Box, b: Box) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function circleIntersectsBox(circle: Point, radius: number, box: Box) {
  const closestX = Math.max(box.left, Math.min(circle.x, box.right));
  const closestY = Math.max(box.top, Math.min(circle.y, box.bottom));
  const dx = circle.x - closestX;
  const dy = circle.y - closestY;
  return dx * dx + dy * dy < radius * radius;
}

// Every label is offered the SAME ordered menu of clean anchor spots around
// its pin- centered below (the default, no connector needed since that's
// the assumed relationship), then centered above/right/left, then the four
// diagonals, then the same four cardinal spots again at double the distance
// as a last resort for the very tightest clusters. This is what keeps the
// result looking like a designed map instead of the free-form push-until-
// it-fits approach that gave every label its own arbitrary offset direction.
function candidateSpotsFor(cx: number, cy: number, w: number, h: number) {
  const r = PIN_OBSTACLE_RADIUS, g = LABEL_GAP;
  return [
    { left: cx - w / 2, top: cy + r + g, connector: false }, // bottom-center (default)
    { left: cx - w / 2, top: cy - r - g - h, connector: true }, // top-center
    { left: cx + r + g, top: cy - h / 2, connector: true }, // right-center
    { left: cx - r - g - w, top: cy - h / 2, connector: true }, // left-center
    { left: cx + 4, top: cy + r + g, connector: true }, // bottom-right
    { left: cx - w - 4, top: cy + r + g, connector: true }, // bottom-left
    { left: cx + 4, top: cy - r - g - h, connector: true }, // top-right
    { left: cx - w - 4, top: cy - r - g - h, connector: true }, // top-left
    { left: cx - w / 2, top: cy + 2 * (r + g), connector: true }, // bottom-center, farther out
    { left: cx - w / 2, top: cy - 2 * (r + g) - h, connector: true }, // top-center, farther out
    { left: cx + 2 * (r + g), top: cy - h / 2, connector: true }, // right-center, farther out
    { left: cx - 2 * (r + g) - w, top: cy - h / 2, connector: true }, // left-center, farther out
    { left: cx + 4, top: cy + 2 * (r + g), connector: true }, // bottom-right, farther out
    { left: cx - w - 4, top: cy + 2 * (r + g), connector: true }, // bottom-left, farther out
    { left: cx + 4, top: cy - 2 * (r + g) - h, connector: true }, // top-right, farther out
    { left: cx - w - 4, top: cy - 2 * (r + g) - h, connector: true }, // top-left, farther out
    { left: cx - w / 2, top: cy + 3 * (r + g), connector: true }, // bottom-center, even farther
    { left: cx - w / 2, top: cy - 3 * (r + g) - h, connector: true }, // top-center, even farther
    { left: cx + 3 * (r + g), top: cy - h / 2, connector: true }, // right-center, even farther
    { left: cx - 3 * (r + g) - w, top: cy - h / 2, connector: true }, // left-center, even farther
  ];
}

function candidateOverlapScore(box: Box, placedBoxes: Box[], pinCenters: Point[]) {
  let score = 0;
  for (const pb of placedBoxes) {
    const ox = Math.min(box.right, pb.right) - Math.max(box.left, pb.left);
    const oy = Math.min(box.bottom, pb.bottom) - Math.max(box.top, pb.top);
    if (ox > 0 && oy > 0) score += ox * oy;
  }
  for (const p of pinCenters) {
    const closestX = Math.max(box.left, Math.min(p.x, box.right));
    const closestY = Math.max(box.top, Math.min(p.y, box.bottom));
    const dx = p.x - closestX, dy = p.y - closestY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < PIN_OBSTACLE_RADIUS) score += (PIN_OBSTACLE_RADIUS - dist) ** 2;
  }
  return score;
}

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

  // Every label is placed by trying the same ordered menu of anchor spots
  // (see candidateSpotsFor)- centered below its own pin first, and only
  // moving to a different spot if that default is already taken by an
  // earlier-placed label or sits on top of another pin's ring. That keeps
  // every label in one of a handful of clean, consistent relationships to
  // its dot instead of a free-form push landing each one at a different
  // arbitrary angle. A label only draws a connector line back to its pin
  // when it couldn't get the default spot, so the line only appears where
  // it's actually needed to show which dot a displaced label belongs to.
  const markerRefs = useRef<Record<string, HTMLDivElement>>({});
  const labelRefs = useRef<Record<string, HTMLSpanElement>>({});
  const [labelLayout, setLabelLayout] = useState<
    Record<string, { left: number; top: number; connector: boolean; lineDx: number; lineDy: number }>
  >({});

  const resolveLabelPlacement = useCallback(() => {
    const ids = clients.map((c) => c.id);
    const dims: Record<string, { w: number; h: number }> = {};
    const pinCenters: Record<string, Point> = {};
    ids.forEach((id) => {
      const labelEl = labelRefs.current[id];
      const markerEl = markerRefs.current[id];
      if (labelEl) {
        const r = labelEl.getBoundingClientRect();
        dims[id] = { w: r.width, h: r.height };
      }
      if (markerEl) {
        const r = markerEl.getBoundingClientRect();
        pinCenters[id] = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      }
    });

    const allPinCenters = ids.map((id) => pinCenters[id]).filter((p): p is Point => !!p);
    const placedBoxes: Box[] = [];
    const layout: Record<string, { left: number; top: number; connector: boolean; lineDx: number; lineDy: number }> = {};

    ids.forEach((id) => {
      const center = pinCenters[id];
      const dim = dims[id];
      const markerEl = markerRefs.current[id];
      if (!center || !dim || !markerEl) return;

      const candidates = candidateSpotsFor(center.x, center.y, dim.w, dim.h);
      let chosen = candidates[0];
      let placedCleanly = false;
      for (const cand of candidates) {
        const box: Box = { left: cand.left, right: cand.left + dim.w, top: cand.top, bottom: cand.top + dim.h };
        const hitsLabel = placedBoxes.some((pb) => boxesOverlap(box, pb));
        const hitsPin = allPinCenters.some((p) => circleIntersectsBox(p, PIN_OBSTACLE_RADIUS, box));
        if (!hitsLabel && !hitsPin) { chosen = cand; placedCleanly = true; break; }
      }
      // Every candidate still collided (can happen in the tightest clusters)-
      // rather than silently defaulting to the (already known to overlap)
      // bottom-center spot, pick whichever candidate overlaps the LEAST.
      if (!placedCleanly) {
        let bestScore = Infinity;
        for (const cand of candidates) {
          const box: Box = { left: cand.left, right: cand.left + dim.w, top: cand.top, bottom: cand.top + dim.h };
          const score = candidateOverlapScore(box, placedBoxes, allPinCenters);
          if (score < bestScore) { bestScore = score; chosen = cand; }
        }
      }
      placedBoxes.push({ left: chosen.left, right: chosen.left + dim.w, top: chosen.top, bottom: chosen.top + dim.h });

      // Express the chosen absolute screen position relative to this
      // marker's own div, since that's the label's actual positioning
      // context (react-map-gl places the div itself via the projection).
      const markerRect = markerEl.getBoundingClientRect();
      layout[id] = {
        left: chosen.left - markerRect.left,
        top: chosen.top - markerRect.top,
        connector: chosen.connector,
        // Vector from pin center to label center- a delta, so it's valid in
        // either absolute or marker-relative coordinates without conversion.
        lineDx: chosen.left + dim.w / 2 - center.x,
        lineDy: chosen.top + dim.h / 2 - center.y,
      };
    });

    setLabelLayout(layout);
  }, [clients]);

  useEffect(() => {
    if (!mounted) return;
    // A label's own width/height doesn't change with its position, so
    // (unlike the old push-based approach) there's nothing stale to reset
    // before remeasuring- just recompute once things have settled.
    const t = setTimeout(resolveLabelPlacement, 250); // let fitBounds + markers settle first
    window.addEventListener("resize", resolveLabelPlacement);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", resolveLabelPlacement);
    };
  }, [mounted, resolveLabelPlacement]);

  return (
    <section className="pb-0 pt-[76px]">
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
                scrollZoom={false}
                dragPan={false}
                dragRotate={false}
                doubleClickZoom={false}
                touchZoomRotate={false}
                touchPitch={false}
                boxZoom={false}
                keyboard={false}
              >
                {clients.map((c, i) => {
                  const layout = labelLayout[c.id];
                  return (
                    <Marker
                      key={c.id}
                      longitude={c.coordinates[0]}
                      latitude={c.coordinates[1]}
                      anchor="center"
                    >
                      <div
                        ref={(el) => {
                          if (el) markerRefs.current[c.id] = el;
                        }}
                        className="relative"
                      >
                        <PinWithPulse delay={i * 0.12} />
                        {/* Drawn for every marker (not just displaced ones) so it's
                            always unambiguous which dot a label belongs to, even
                            when two pins sit close enough for that to be unclear. */}
                        {layout && (
                          <div
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              left: 18,
                              top: 18,
                              width: Math.hypot(layout.lineDx, layout.lineDy),
                              height: 1,
                              background: "rgba(59,130,246,0.45)",
                              transform: `rotate(${(Math.atan2(layout.lineDy, layout.lineDx) * 180) / Math.PI}deg)`,
                              transformOrigin: "0 0",
                              pointerEvents: "none",
                            }}
                          />
                        )}
                        <span
                          ref={(el) => {
                            if (el) labelRefs.current[c.id] = el;
                          }}
                          className="absolute whitespace-nowrap rounded-full bg-[#060a18]/85 px-1.5 py-0.5 text-[9px] font-semibold text-white shadow-sm ring-1 ring-[#3b82f6]/30"
                          style={
                            layout
                              ? { left: layout.left, top: layout.top }
                              : { left: "50%", top: "100%", transform: "translate(-50%, 2px)" }
                          }
                        >
                          {c.state}
                        </span>
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
