"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

type Phase = "intro" | "welcome" | "cta";

const SESSION_KEY   = "kio_intro_seen";
const WELCOME_TEXT  =
  "Welcome to Kiosist! The future of hotel check-in is here. No queues, no confusion — just seamless, smart hospitality, powered by you.";

/* ── Speak with a male voice; returns a cancel fn ── */
function speakMale(
  text: string,
  onStart: () => void,
  onEnd:   () => void,
): () => void {
  if (typeof window === "undefined" || !window.speechSynthesis) { onEnd(); return () => {}; }

  const u    = new SpeechSynthesisUtterance(text);
  u.rate     = 0.86;
  u.pitch    = 0.82;
  u.volume   = 0.92;
  u.onstart  = onStart;
  u.onend    = onEnd;
  u.onerror  = () => onEnd();

  const go = () => {
    const voices = window.speechSynthesis.getVoices();
    const male =
      voices.find(v => /google uk english male|daniel|fred|alex|rishi|microsoft david|thomas/i.test(v.name)) ||
      voices.find(v => v.name.toLowerCase().includes("male")) ||
      voices.find(v => v.lang === "en-GB" && !/(kate|serena|female)/i.test(v.name)) ||
      voices.find(v => v.lang === "en-US" && !/(samantha|karen|victoria|moira|zoe)/i.test(v.name)) ||
      voices.find(v => v.lang.startsWith("en"));
    if (male) u.voice = male;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener("voiceschanged", go, { once: true });
  } else {
    /* Tiny delay so browser registers it as part of a user session */
    setTimeout(go, 80);
  }

  return () => window.speechSynthesis.cancel();
}

/* ── Floating dots ── */
const DOTS = [
  { x: 8,  y: 14, s: 2,   d: 8,  delay: 0.3 },
  { x: 88, y: 10, s: 1.5, d: 10, delay: 0.9 },
  { x: 5,  y: 62, s: 2,   d: 9,  delay: 1.3 },
  { x: 93, y: 70, s: 1.5, d: 7,  delay: 0.6 },
  { x: 50, y: 4,  s: 1,   d: 11, delay: 2.0 },
  { x: 20, y: 84, s: 2,   d: 8,  delay: 0.4 },
];

/* ── Sound toggle (re-play or stop) ── */
function SoundToggle({
  isSpeaking, hasSpoken, onToggle, isMobile,
}: {
  isSpeaking: boolean;
  hasSpoken:  boolean;
  onToggle:   () => void;
  isMobile:   boolean;
}) {
  const [supported, setSupported] = useState(false);
  useEffect(() => { setSupported("speechSynthesis" in window); }, []);
  if (!supported) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.35 }}
      onClick={onToggle}
      title={isSpeaking ? "Stop" : "Replay welcome"}
      style={{
        position:       "fixed",
        bottom:         isMobile ? 24 : 28,
        right:          isMobile ? 18 : 28,
        zIndex:         10070,
        width:          42,
        height:         42,
        borderRadius:   "50%",
        border:         `1px solid ${isSpeaking ? "rgba(59,130,246,0.6)" : "rgba(255,255,255,0.12)"}`,
        background:     isSpeaking
          ? "linear-gradient(135deg,#3b82f6,#06b6d4)"
          : "rgba(10,14,26,0.72)",
        backdropFilter: "blur(12px)",
        cursor:         "pointer",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        boxShadow:      isSpeaking ? "0 0 20px rgba(59,130,246,0.45)" : "none",
        transition:     "background 0.3s, border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {isSpeaking ? (
        /* Stop icon */
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      ) : (
        /* Speaker icon */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke={hasSpoken ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.8)"}
          strokeWidth="2" strokeLinecap="round" aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" strokeOpacity="0.45" />
        </svg>
      )}
    </motion.button>
  );
}

/* ── Welcome character panel ── */
function CharacterPanel({
  phase, rm, isMobile, isSpeaking, onEnter,
}: {
  phase:      Phase;
  rm:         boolean | null;
  isMobile:   boolean;
  isSpeaking: boolean;
  onEnter:    () => void;
}) {
  const visible  = phase === "welcome" || phase === "cta";
  const imgW     = isMobile ? 170 : 240;
  const imgH     = Math.round(imgW * 2.05);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : 60, y: isMobile ? 40 : 0, scale: 0.88 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position:       "fixed",
            zIndex:         10020,
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            /* Desktop: right panel; Mobile: bottom center */
            ...(isMobile
              ? {
                  left:   "50%",
                  bottom: 0,
                  transform: "translateX(-50%)",
                }
              : {
                  right:  "clamp(40px, 8vw, 120px)",
                  bottom: 0,
                }),
          }}
        >
          {/* Speech bubble */}
          <AnimatePresence>
            {visible && (
              <motion.div
                key="bubble"
                initial={{ opacity: 0, y: 14, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background:   "rgba(255,255,255,0.96)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "16px 16px 16px 4px",
                  padding:      isMobile ? "10px 14px" : "12px 20px",
                  marginBottom: isMobile ? 8 : 14,
                  boxShadow:    "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.15)",
                  maxWidth:     isMobile ? 200 : 260,
                  textAlign:    "center",
                  position:     "relative",
                }}
              >
                <p style={{
                  margin:     0,
                  fontSize:   isMobile ? 12.5 : 14.5,
                  fontWeight: 800,
                  color:      "#0f172a",
                  lineHeight: 1.3,
                }}>
                  {isSpeaking
                    ? "Let me walk you through this…"
                    : phase === "cta"
                    ? "Ready to transform your hotel?"
                    : "Welcome to Kiosist! 👋"}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: isMobile ? 10 : 11.5, color: "#475569", lineHeight: 1.4 }}>
                  {isSpeaking
                    ? "Smart hospitality, powered by you"
                    : "The future of hotel check-in is here"}
                </p>
                {/* Talking indicator */}
                {isSpeaking && (
                  <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 6 }}>
                    {[0, 1, 2].map(i => (
                      <motion.div key={i}
                        style={{ width: 5, height: 5, borderRadius: "50%", background: "#3b82f6" }}
                        animate={{ scaleY: [1, 2.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14 }}
                      />
                    ))}
                  </div>
                )}
                {/* Bubble tail */}
                <div style={{
                  position:    "absolute",
                  bottom:      -9,
                  left:        24,
                  width:       0,
                  height:      0,
                  borderLeft:  "9px solid transparent",
                  borderRight: "9px solid transparent",
                  borderTop:   "9px solid rgba(255,255,255,0.96)",
                }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Concierge image ── */}
          <motion.div
            /* Idle float / talking bob */
            animate={rm ? {} : {
              y:      isSpeaking ? [0, -7, 0] : [0, -14, 0],
              rotate: isSpeaking ? [-1, 1, -1] : [-1.5, 1.5, -1.5],
            }}
            transition={{
              duration: isSpeaking ? 0.5 : 3.5,
              repeat:   Infinity,
              ease:     "easeInOut",
            }}
            style={{ position: "relative" }}
          >
            {/* Shadow beneath feet */}
            <div style={{
              position:     "absolute",
              bottom:       isMobile ? -4 : -6,
              left:         "50%",
              transform:    "translateX(-50%)",
              width:        imgW * 0.52,
              height:       10,
              borderRadius: "50%",
              background:   isSpeaking ? "rgba(59,130,246,0.28)" : "rgba(0,0,0,0.28)",
              filter:       "blur(7px)",
              transition:   "background 0.5s",
            }} />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/hero/concierge.png"
              alt="Kiosist concierge welcoming guests"
              width={imgW}
              height={imgH}
              style={{
                objectFit:     "contain",
                display:       "block",
                userSelect:    "none",
                pointerEvents: "none",
                filter: isSpeaking
                  ? "drop-shadow(0 0 22px rgba(59,130,246,0.6)) drop-shadow(0 12px 24px rgba(0,0,0,0.5))"
                  : "drop-shadow(0 12px 28px rgba(0,0,0,0.55))",
                transition: "filter 0.5s ease",
              }}
              draggable={false}
            />
          </motion.div>

          {/* CTA button */}
          <AnimatePresence>
            {phase === "cta" && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position:  "absolute",
                  bottom:    isMobile ? imgH + 24 : imgH + 20,
                  left:      "50%",
                  transform: "translateX(-50%)",
                  display:   "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  width: "max-content",
                }}
              >
                <motion.button
                  onClick={onEnter}
                  whileHover={rm ? {} : { scale: 1.04, y: -2 }}
                  whileTap={rm ? {}  : { scale: 0.97 }}
                  style={{
                    padding:       isMobile ? "13px 28px" : "14px 36px",
                    borderRadius:  99,
                    border:        "none",
                    background:    "linear-gradient(135deg, #3b82f6, #06b6d4)",
                    color:         "#fff",
                    fontSize:      isMobile ? 14 : 15,
                    fontWeight:    700,
                    cursor:        "pointer",
                    display:       "flex",
                    alignItems:    "center",
                    gap:           8,
                    boxShadow:     "0 6px 28px rgba(59,130,246,0.45), 0 0 0 1px rgba(255,255,255,0.08)",
                    fontFamily:    "var(--font-body), sans-serif",
                    whiteSpace:    "nowrap",
                  }}
                >
                  Explore Kiosist
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.button>
                <button
                  onClick={onEnter}
                  style={{
                    background: "none",
                    border:     "none",
                    color:      "rgba(255,255,255,0.28)",
                    fontSize:   11,
                    cursor:     "pointer",
                    fontFamily: "var(--font-body), sans-serif",
                    padding:    "2px 0",
                  }}
                >
                  Skip intro
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main loader ── */
export function IntroLoader() {
  const rm = useReducedMotion();

  const [mounted,    setMounted]    = useState(false);
  const [visible,    setVisible]    = useState(false);
  const [phase,      setPhase]      = useState<Phase>("intro");
  const [kioskPhase, setKioskPhase] = useState<"idle" | "enter" | "shrink">("idle");
  const [isMobile,   setIsMobile]   = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSpoken,  setHasSpoken]  = useState(false);
  const cancelRef = useState<(() => void) | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    sessionStorage.setItem(SESSION_KEY, "1");
    setMounted(true);
    setVisible(true);
  }, []);

  /* Start kiosk entrance */
  useEffect(() => {
    if (!mounted) return;
    setKioskPhase("enter");
  }, [mounted]);

  /* intro → welcome */
  useEffect(() => {
    if (phase !== "intro" || rm) return;
    const t = setTimeout(() => {
      setPhase("welcome");
      setKioskPhase("shrink");
    }, 1800);
    return () => clearTimeout(t);
  }, [phase, rm]);

  /* Reduced motion: skip straight to cta */
  useEffect(() => {
    if (!mounted || !rm) return;
    setPhase("cta");
  }, [mounted, rm]);

  /* welcome → attempt auto-play speech → cta after delay */
  useEffect(() => {
    if (phase !== "welcome" || rm) return;

    /* Attempt auto-play; browsers may block without user gesture */
    const cancelSpeech = speakMale(
      WELCOME_TEXT,
      () => { setIsSpeaking(true); setHasSpoken(true); },
      () => { setIsSpeaking(false); setPhase("cta"); },
    );
    cancelRef[0] = cancelSpeech;

    /* Fallback: show CTA after 3.5s even if speech is blocked */
    const fallback = setTimeout(() => setPhase("cta"), 3500);
    return () => {
      clearTimeout(fallback);
      cancelSpeech();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, rm]);

  const handleToggleSpeech = useCallback(() => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      setPhase("cta");
    } else {
      const cancelSpeech = speakMale(
        WELCOME_TEXT,
        () => { setIsSpeaking(true); setHasSpoken(true); },
        () => { setIsSpeaking(false); setPhase("cta"); },
      );
      cancelRef[0] = cancelSpeech;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpeaking]);

  const handleEnter = useCallback(() => {
    window.speechSynthesis?.cancel();
    setVisible(false);
  }, []);

  const handleExitComplete = useCallback(() => {
    document.documentElement.removeAttribute("data-intro");
    setMounted(false);
  }, []);

  if (!mounted) return null;

  /* Kiosk animation targets */
  const kioskAnim = {
    idle:   { scale: isMobile ? 0.78 : 0.82, y: 40,  opacity: 0,   x: 0 },
    enter:  { scale: 1,                       y: 0,   opacity: 1,   x: 0 },
    /* Shrink and move left to make room for character */
    shrink: isMobile
      ? { scale: 0.70, y: "-18vh", opacity: 0.75, x: 0 }
      : { scale: 1.20, y: 0,       opacity: 1.00, x: "-12vw" },
  };

  const kioskW = isMobile ? "min(480px, 96vw)" : "min(860px, 82vw)";

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="kio-loader-bg"
          style={{
            position:   "fixed",
            inset:      0,
            zIndex:     10000,
            display:    "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow:   "hidden",
          }}
          aria-hidden="true"
        >
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.13) 1px, transparent 1px)",
              backgroundSize:  "48px 48px",
              opacity: 0.5,
            }}
          />

          {/* Ambient glow — follows kiosk then shifts right */}
          <motion.div
            className="pointer-events-none absolute rounded-full"
            style={{
              width:      isMobile ? 380 : 640,
              height:     isMobile ? 380 : 640,
              background: "radial-gradient(circle, rgba(59,130,246,0.10), transparent 65%)",
              left:       "calc(50% - 320px)",
              top:        "calc(50% - 320px)",
            }}
            animate={{
              x: phase !== "intro" ? (isMobile ? 0 : "-18vw") : 0,
              y: phase !== "intro" &&  isMobile ? "-18vh" : 0,
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Floating particles */}
          {!rm && DOTS.map((d, i) => (
            <motion.span
              key={i}
              style={{
                position:        "absolute",
                left:            `${d.x}%`,
                top:             `${d.y}%`,
                width:           d.s,
                height:          d.s,
                borderRadius:    "50%",
                backgroundColor: "#3b82f6",
                opacity:         0.22,
              }}
              animate={{ y: [0, -22, 0], opacity: [0.22, 0.08, 0.22] }}
              transition={{ duration: d.d, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* ── Kiosk ── */}
          <div style={{ position: "relative", zIndex: 10010 }}>
            <div style={{ perspective: "900px", perspectiveOrigin: "50% 50%" }}>
              <motion.div
                initial={kioskAnim.idle}
                animate={kioskAnim[kioskPhase]}
                transition={
                  kioskPhase === "enter"  ? { duration: 1.7, ease: [0.16, 1, 0.3, 1] } :
                  kioskPhase === "shrink" ? { duration: 1.0, ease: [0.16, 1, 0.3, 1] } :
                  {}
                }
                style={{
                  position:       "relative",
                  width:          kioskW,
                  aspectRatio:    "4 / 3",
                  transformStyle: "preserve-3d",
                  willChange:     "transform",
                }}
              >
                <Image
                  src="/img/hero/machine.webp"
                  alt="Kiosist kiosk"
                  fill
                  className="object-contain"
                  priority
                  sizes={kioskW}
                />
                {/* Screen glow when character appears */}
                <AnimatePresence>
                  {phase !== "intro" && (
                    <motion.div
                      key="glow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9 }}
                      style={{
                        position:   "absolute",
                        inset:      0,
                        borderRadius: 14,
                        background: "radial-gradient(ellipse 68% 38% at 50% 32%, rgba(59,130,246,0.55) 0%, transparent 68%)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* ── Character panel (replaces chat card) ── */}
          <CharacterPanel
            phase={phase}
            rm={rm}
            isMobile={isMobile}
            isSpeaking={isSpeaking}
            onEnter={handleEnter}
          />

          {/* ── Sound toggle ── */}
          <SoundToggle
            isSpeaking={isSpeaking}
            hasSpoken={hasSpoken}
            onToggle={handleToggleSpeech}
            isMobile={isMobile}
          />

          {/* Corner brackets */}
          {(["top-5 left-5", "top-5 right-5", "bottom-5 left-5", "bottom-5 right-5"] as const).map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.16 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className={`pointer-events-none absolute ${pos}`}
              style={{
                width:       22,
                height:      22,
                borderTop:   i < 2  ? "1px solid #3b82f6" : "none",
                borderBottom:i >= 2 ? "1px solid #3b82f6" : "none",
                borderLeft:  i % 2 === 0 ? "1px solid #3b82f6" : "none",
                borderRight: i % 2 === 1 ? "1px solid #3b82f6" : "none",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
