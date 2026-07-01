"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, X, MapPin } from "lucide-react";
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

/* ── Rotating radar sweep overlay ── */
function RadarSweep({ rm }: { rm: boolean | null }) {
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

      {/* Conic sweep — fades behind the leading edge */}
      {!rm && (
        <motion.div
          className="absolute"
          style={{
            inset: "-20%",
            background:
              "conic-gradient(from 0deg at 50% 52%, transparent 0deg, rgba(59,130,246,0.10) 18deg, rgba(59,130,246,0.03) 42deg, transparent 55deg)",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Leading-edge bright line */}
      {!rm && (
        <motion.div
          className="absolute"
          style={{
            left: "50%",
            top: "4%",
            width: 1.5,
            height: "48%",
            background:
              "linear-gradient(to top, rgba(59,130,246,0.85) 0%, rgba(59,130,246,0.2) 70%, transparent 100%)",
            transformOrigin: "50% 100%",
            marginLeft: "-0.75px",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Radar rings */}
      {[22, 36, 50].map((r, i) => (
        <div
          key={r}
          className="absolute rounded-full border border-[#3b82f6]/10"
          style={{
            width:  `${r}%`,
            height: `${r * 1.15}%`,
            left:   `${50 - r / 2}%`,
            top:    `${52 - (r * 1.15) / 2}%`,
          }}
        />
      ))}

      {/* Center crosshair */}
      <div className="absolute" style={{ left: "calc(50% - 10px)", top: "calc(52% - 10px)", width: 20, height: 20 }}>
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[#3b82f6]/30" />
        <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-[#3b82f6]/30" />
        <motion.div
          className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-[#3b82f6]"
          animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

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

/* ── Animated coordinate ticker ── */
function CoordTicker({ clients }: { clients: Client[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % clients.length), 2200);
    return () => clearInterval(t);
  }, [clients.length]);
  const c = clients[idx];
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={idx}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3 }}
        className="font-mono text-[11px] text-[#60a5fa]/60"
      >
        {c.coordinates[1].toFixed(4)}°N &nbsp; {Math.abs(c.coordinates[0]).toFixed(4)}°W
      </motion.span>
    </AnimatePresence>
  );
}

export function USAClientMap({ clients }: USAClientMapProps) {
  const rm = useReducedMotion();
  const [active,   setActive]   = useState<Client | null>(null);
  const [scanned,  setScanned]  = useState(0);

  /* Increment "scanned" counter to simulate radar detecting properties */
  useEffect(() => {
    if (rm) { setScanned(clients.length); return; }
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      setScanned(n);
      if (n >= clients.length) clearInterval(t);
    }, 260);
    return () => clearInterval(t);
  }, [clients.length, rm]);

  return (
    <section className="section-pad" style={{ background: "linear-gradient(180deg,#05080f 0%,#080c18 100%)" }}>
      <div className="container-kio">

        {/* ── Command header ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
          className="mb-8 overflow-hidden rounded-2xl border border-[#3b82f6]/14"
          style={{ background: "linear-gradient(135deg,rgba(59,130,246,0.07),rgba(6,182,212,0.04))" }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-[#3b82f6]/10 px-5 py-3">
            <div className="flex items-center gap-2.5">
              <motion.span
                className="h-2 w-2 rounded-full bg-[#3b82f6]"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#60a5fa]/70">
                Kiosist · Live Coverage Map
              </span>
            </div>
            <div className="flex items-center gap-4">
              <CoordTicker clients={clients} />
              <span className="hidden font-mono text-[11px] text-[#3b82f6]/40 sm:inline">
                ALBERS-USA PROJ
              </span>
            </div>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-3 divide-x divide-[#3b82f6]/10 px-2 py-1">
            {[
              { label: "Properties Detected", value: scanned, total: clients.length },
              { label: "States Active",        value: new Set(clients.map(c => c.state)).size, total: null },
              { label: "Radar Status",         value: null, status: "SCANNING" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center py-3">
                {s.value !== null ? (
                  <span className="font-mono text-xl font-black text-white">
                    {s.value}
                    {s.total && <span className="text-sm text-white/25">/{s.total}</span>}
                  </span>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]"
                      animate={{ scale:[1,1.6,1], opacity:[1,0.3,1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <span className="font-mono text-sm font-bold text-[#60a5fa]">{s.status}</span>
                  </div>
                )}
                <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/25">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Map with radar overlay ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16,1,0.3,1] }}
          className="relative overflow-hidden rounded-3xl border border-[#3b82f6]/12"
          style={{ background: "linear-gradient(180deg,#060a18 0%,#08101e 100%)" }}
        >
          {/* Radar overlays */}
          <RadarSweep rm={rm} />

          {/* Map */}
          <ComposableMap
            projection="geoAlbersUsa"
            className="relative z-20 w-full"
            style={{ height: "520px" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: GeoJSONFeature[] }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey as string}
                    geography={geo}
                    fill="#0d1e38"
                    stroke="#1a3358"
                    strokeWidth={0.6}
                    style={{
                      default: { outline: "none" } as React.CSSProperties,
                      hover:   { fill: "#1a2f50", outline: "none" } as React.CSSProperties,
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
                          — {active.testimonial.author}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Hotel property cards ── */}
        <div className="mt-10">
          <div className="mt-7">

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="mb-7 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#3b82f6]/14 px-5 py-3.5"
              style={{ background: "rgba(59,130,246,0.05)" }}
            >
              <div className="flex items-center gap-8">
                {[
                  { label: "Properties", value: clients.length },
                  { label: "States", value: new Set(clients.map(c => c.state)).size },
                ].map((s, si) => (
                  <div key={s.label} className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">{s.value}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#60a5fa]/50">{s.label}</span>
                    {si === 0 && <div className="ml-6 h-5 w-px bg-white/10" />}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <motion.span
                  className="h-2 w-2 rounded-full bg-[#3b82f6]"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0.3, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-semibold text-[#60a5fa]/70">Live · All Active</span>
              </div>
            </motion.div>

            {/* Card grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {clients.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 18, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.38, delay: i * 0.05, ease: [0.16,1,0.3,1] }}
                  whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
                  className="group relative cursor-default overflow-hidden rounded-xl border border-white/8 p-5"
                  style={{
                    background: "linear-gradient(150deg, rgba(15,22,42,0.97) 0%, rgba(10,14,30,1) 100%)",
                    transition: "border-color 0.25s, box-shadow 0.25s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.45)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(59,130,246,0.2), 0 12px 36px rgba(0,0,0,0.5), 0 0 28px rgba(59,130,246,0.12)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Sweep line */}
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-[#3b82f6]/80 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  {/* Bg tint */}
                  <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.08), transparent)" }} />

                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-black text-[#3b82f6]/14 select-none" style={{ fontSize: "2.2rem", lineHeight: 1 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-md border border-[#3b82f6]/25 bg-[#3b82f6]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#60a5fa]">
                      {c.state}
                    </span>
                  </div>

                  <p className="text-[.95rem] font-bold leading-snug text-white/90 transition-colors duration-200 group-hover:text-white">
                    {c.brand}
                  </p>
                  <p className="mt-1 text-sm text-white/38 transition-colors duration-200 group-hover:text-white/60">
                    {c.property}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/6 pt-3.5">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 shrink-0 text-[#3b82f6]/60 transition-colors duration-200 group-hover:text-[#60a5fa]" />
                      <span className="text-xs text-white/40 transition-colors duration-200 group-hover:text-white/65">{c.city}</span>
                    </div>
                    {c.testimonial && (
                      <div className="flex gap-0.5">
                        {Array.from({ length: c.testimonial.rating }).map((_, si) => (
                          <Star key={si} className="h-3 w-3 fill-[#3b82f6]/60 text-[#3b82f6]/60 transition-colors duration-200 group-hover:fill-[#60a5fa] group-hover:text-[#60a5fa]" />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-5 text-center text-xs text-white/18"
            >
              {clients.length} active properties across the USA · Kiosist
            </motion.p>
          </div>
        </div>

      </div>
    </section>
  );
}
