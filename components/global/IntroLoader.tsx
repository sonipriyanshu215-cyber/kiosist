"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

type Phase = "intro" | "glow" | "zoom" | "message";

/* ── Typing dots ── */
function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "6px 2px" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(59,130,246,0.8)", flexShrink: 0 }}
          animate={{ y: [0, -8, 0], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const MSG_LINES = [
  "When was the last time",
  "a hotel check‑in took under 30 seconds?",
  "No queue. No confusion.",
  "Just a kiosk that knows what you need —",
  "before you even ask.",
];

function KioskScreenContent({
  tod, onEnter, rm, isMobile,
}: { tod: string; onEnter: () => void; rm: boolean | null; isMobile: boolean }) {
  const [sub,   setSub]   = useState<"typing" | "revealing" | "cta">("typing");
  const [lines, setLines] = useState(0);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setSub("revealing"), rm ? 0 : 1200);
    return () => clearTimeout(t);
  }, [rm]);

  useEffect(() => {
    if (sub !== "revealing") return;
    if (rm) { setLines(MSG_LINES.length); setSub("cta"); return; }
    let n = 0;
    const id = setInterval(() => {
      n += 1; setLines(n);
      if (n >= MSG_LINES.length) { clearInterval(id); setTimeout(() => setSub("cta"), 400); }
    }, 480);
    return () => clearInterval(id);
  }, [sub, rm]);

  const cardW = isMobile ? "min(420px, 90vw)" : "min(520px, 44vw)";
  const fontSize = isMobile ? 13 : 14;

  return (
    <div style={{
      width: cardW,
      background: "linear-gradient(160deg,#1b2338 0%,#0c1120 100%)",
      borderRadius: isMobile ? 20 : 26,
      padding: isMobile ? "10px 10px 18px" : "12px 12px 24px",
      boxShadow: [
        "0 0 0 1px rgba(255,255,255,0.07)",
        "inset 0 1px 0 rgba(255,255,255,0.09)",
        "0 40px 80px rgba(0,0,0,0.9)",
        "0 0 60px rgba(59,130,246,0.22)",
      ].join(", "),
    }}>
      {/* Screen chrome */}
      <div style={{ borderRadius: isMobile ? 14 : 18, overflow: "hidden", position: "relative", background: "linear-gradient(180deg,#030b1a 0%,#050e24 100%)", boxShadow: "inset 0 0 0 1px rgba(59,130,246,0.2)" }}>
        {/* Glare */}
        <div style={{ position:"absolute",top:0,left:0,width:"52%",height:"38%",background:"linear-gradient(138deg,rgba(255,255,255,0.04) 0%,transparent 65%)",borderRadius:"14px 0 0 0",pointerEvents:"none",zIndex:30 }} />
        {/* Scanlines */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent 0px,transparent 3px,rgba(0,0,0,0.1) 3px,rgba(0,0,0,0.1) 4px)",pointerEvents:"none",zIndex:29 }} />

        {/* Status bar */}
        <div style={{ display:"flex",alignItems:"center",padding:`8px ${isMobile ? 14 : 18}px`,gap:8,background:"rgba(3,9,20,0.92)",borderBottom:"1px solid rgba(59,130,246,0.1)" }}>
          <div style={{ display:"flex",alignItems:"center",gap:5 }}>
            <div style={{ width:16,height:16,borderRadius:4,background:"linear-gradient(135deg,#2563eb,#0891b2)",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ color:"#fff",fontSize:9,fontWeight:900 }}>K</span>
            </div>
            <span style={{ color:"rgba(255,255,255,0.5)",fontSize:10,fontWeight:700,letterSpacing:"0.12em",fontFamily:"var(--font-mono),monospace" }}>KIOSIST</span>
          </div>
          <div style={{ flex:1 }} />
          <span style={{ color:"rgba(255,255,255,0.5)",fontSize:10,fontFamily:"var(--font-mono),monospace" }}>{clock}</span>
        </div>

        {/* Agent header */}
        <div style={{ display:"flex",alignItems:"center",gap:10,padding:`12px ${isMobile ? 14 : 18}px`,background:"rgba(3,10,22,0.75)",borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ width:38,height:38,borderRadius:11,flexShrink:0,background:"linear-gradient(135deg,#1d4ed8,#0891b2)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 3px 10px rgba(29,78,216,0.45)" }}>
            <span style={{ color:"#fff",fontWeight:900,fontSize:16 }}>K</span>
          </div>
          <div>
            <div style={{ color:"#f0f4ff",fontWeight:700,fontSize:14 }}>KioClerk</div>
            <div style={{ display:"flex",alignItems:"center",gap:4,marginTop:2 }}>
              <motion.span style={{ width:5,height:5,borderRadius:"50%",backgroundColor:"#34d399",display:"inline-block" }} animate={{ opacity:[1,0.3,1],scale:[1,1.4,1] }} transition={{ duration:1.5,repeat:Infinity }} />
              <span style={{ color:"#34d399",fontSize:10,fontFamily:"var(--font-mono),monospace" }}>Online · AI Receptionist</span>
            </div>
          </div>
          <div style={{ marginLeft:"auto",fontSize:10,color:"rgba(143,163,196,0.4)",fontFamily:"var(--font-mono),monospace" }}>{tod}</div>
        </div>

        {/* Chat bubble */}
        <div style={{ padding:`${isMobile ? 14 : 18}px ${isMobile ? 14 : 18}px 12px` }}>
          <div style={{ display:"flex",gap:9,alignItems:"flex-start" }}>
            <div style={{ width:30,height:30,borderRadius:9,flexShrink:0,background:"rgba(29,78,216,0.3)",border:"1px solid rgba(59,130,246,0.25)",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ color:"#93c5fd",fontSize:12,fontWeight:800 }}>K</span>
            </div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ backgroundColor:"rgba(29,78,216,0.18)",border:"1px solid rgba(59,130,246,0.15)",borderRadius:"4px 14px 14px 14px",padding:"12px 14px",minHeight:52 }}>
                <AnimatePresence mode="wait">
                  {sub === "typing" ? (
                    <motion.div key="dots" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.18 }}>
                      <TypingDots />
                    </motion.div>
                  ) : (
                    <motion.div key="msg" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.18 }}>
                      {MSG_LINES.slice(0, lines).map((line, i) => (
                        <motion.p key={i} initial={{ opacity:0,y:5 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35,ease:[0.16,1,0.3,1] }} style={{ margin:0,marginBottom:i<lines-1?5:0,fontSize,lineHeight:1.65,color:i===1?"#93c5fd":"#d1d9f0",fontWeight:i===1?600:400,fontFamily:"var(--font-body),sans-serif" }}>{line}</motion.p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div style={{ fontSize:9,color:"rgba(143,163,196,0.25)",marginTop:4,textAlign:"right",fontFamily:"var(--font-mono),monospace" }}>Just now</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding:`0 ${isMobile ? 14 : 18}px ${isMobile ? 14 : 18}px` }}>
          <AnimatePresence>
            {sub === "cta" && (
              <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.45,ease:[0.16,1,0.3,1] }}>
                <motion.button
                  onClick={onEnter}
                  whileHover={rm ? {} : { scale:1.02,y:-2 }}
                  whileTap={rm ? {} : { scale:0.97 }}
                  style={{ width:"100%",padding:`${isMobile ? 12 : 14}px 20px`,borderRadius:99,border:"none",background:"linear-gradient(135deg,#3b82f6,#06b6d4)",color:"#fff",fontSize:isMobile ? 14 : 15,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 6px 22px rgba(59,130,246,0.4)",fontFamily:"var(--font-body),sans-serif" }}
                >
                  Explore Kiosist
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </motion.button>
                <button
                  onClick={onEnter}
                  style={{ marginTop:8,width:"100%",background:"none",border:"none",color:"rgba(143,163,196,0.35)",fontSize:11,cursor:"pointer",padding:"4px 0",fontFamily:"var(--font-body),sans-serif" }}
                >
                  Skip intro
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home bar */}
        <div style={{ display:"flex",justifyContent:"center",padding:"10px 0 12px",background:"rgba(3,9,20,0.7)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ width:100,height:3,background:"rgba(255,255,255,0.18)",borderRadius:99 }} />
        </div>
      </div>

      <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,paddingTop:12 }}>
        <span style={{ color:"rgba(255,255,255,0.18)",fontSize:9,letterSpacing:"0.18em",fontWeight:700,fontFamily:"var(--font-mono),monospace" }}>KIOSIST</span>
        <motion.div style={{ width:5,height:5,borderRadius:3,background:"#34d399" }} animate={{ opacity:[1,0.35,1] }} transition={{ duration:2.2,repeat:Infinity }} />
        <span style={{ color:"rgba(255,255,255,0.1)",fontSize:8,fontFamily:"var(--font-mono),monospace" }}>KioClerk v2.1</span>
      </div>
    </div>
  );
}

const DOTS = [
  { x:8,  y:14, s:2,   d:8,  delay:0.3 },
  { x:88, y:10, s:1.5, d:10, delay:0.9 },
  { x:5,  y:62, s:2,   d:9,  delay:1.3 },
  { x:93, y:70, s:1.5, d:7,  delay:0.6 },
  { x:50, y:4,  s:1,   d:11, delay:2.0 },
  { x:20, y:84, s:2,   d:8,  delay:0.4 },
];

const SESSION_KEY = "kio_intro_seen";

export function IntroLoader() {
  const rm = useReducedMotion();
  const [mounted,    setMounted]    = useState(false);
  const [visible,    setVisible]    = useState(false);
  const [phase,      setPhase]      = useState<Phase>("intro");
  const [kioskPhase, setKioskPhase] = useState<"idle" | "enter" | "zoomed">("idle");
  const [tod,        setTod]        = useState("Good Day");
  const [isMobile,   setIsMobile]   = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const h = new Date().getHours();
    setTod(h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening");

    if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    sessionStorage.setItem(SESSION_KEY, "1");
    setMounted(true);
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (rm) { setKioskPhase("enter"); setPhase("message"); }
    else setKioskPhase("enter");
  }, [mounted, rm]);

  useEffect(() => {
    if (phase !== "intro" || rm) return;
    const t = setTimeout(() => setPhase("glow"), 2100);
    return () => clearTimeout(t);
  }, [phase, rm]);

  useEffect(() => {
    if (phase !== "glow") return;
    const t = setTimeout(() => setPhase("zoom"), 650);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "zoom") return;
    const t = setTimeout(() => setPhase("message"), 1100);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "zoom") return;
    setKioskPhase("zoomed");
  }, [phase]);

  const handleEnter = useCallback(() => setVisible(false), []);
  const handleExitComplete = useCallback(() => {
    document.documentElement.removeAttribute("data-intro");
    setMounted(false);
  }, []);

  if (!mounted) return null;

  const screenActive = phase === "zoom" || phase === "message";

  /* ── Kiosk animation targets — different for mobile ── */
  const kioskAnim = {
    idle:   { rotateY: isMobile ? 0 : -22, rotateX: isMobile ? 8 : 6, scale: isMobile ? 0.8 : 0.84, y: 36, x: 0, opacity: 0 },
    enter:  { rotateY: 0, rotateX: 0, scale: 1, y: 0, x: 0, opacity: 1 },
    zoomed: isMobile
      ? { rotateY: 0, rotateX: 0, scale: 0.48, y: "-28vh", x: 0, opacity: 0.7 }
      : { rotateY: -8, rotateX: 0, scale: 1.6, y: 0, x: "-22vw", opacity: 0.95 },
  };

  const kioskW = isMobile ? "min(260px, 72vw)" : "min(380px, 52vw)";

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          className="kio-loader-bg"
          style={{ position:"fixed",inset:0,zIndex:10000,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden" }}
          aria-hidden="true"
        >
          {/* Dot grid */}
          <div className="pointer-events-none absolute inset-0" style={{ backgroundImage:"radial-gradient(circle,rgba(59,130,246,0.14) 1px,transparent 1px)",backgroundSize:"48px 48px",opacity:0.55 }} />

          {/* Ambient glow blob */}
          <motion.div
            className="pointer-events-none absolute rounded-full"
            style={{ width:isMobile?420:700,height:isMobile?420:700,background:"radial-gradient(circle,rgba(59,130,246,0.09),transparent 65%)",left:"calc(50% - 210px)",top:"calc(50% - 210px)" }}
            animate={{ x: screenActive ? (isMobile ? 0 : "-22vw") : 0, y: screenActive && isMobile ? "-20vh" : 0 }}
            transition={{ duration:1.0,ease:[0.16,1,0.3,1] }}
          />

          {/* Floating dots */}
          {!rm && DOTS.map((d,i) => (
            <motion.span key={i} style={{ position:"absolute",left:`${d.x}%`,top:`${d.y}%`,width:d.s,height:d.s,borderRadius:"50%",backgroundColor:"#3b82f6",opacity:0.26 }} animate={{ y:[0,-24,0],opacity:[0.26,0.1,0.26] }} transition={{ duration:d.d,delay:d.delay,repeat:Infinity,ease:"easeInOut" }} />
          ))}

          {/* Kiosk */}
          <div style={{ position:"relative",zIndex:10010 }}>
            <div style={{ perspective:"900px",perspectiveOrigin:"50% 50%" }}>
              <motion.div
                initial={kioskAnim.idle}
                animate={kioskAnim[kioskPhase]}
                transition={kioskPhase==="enter" ? { duration:1.8,ease:[0.16,1,0.3,1] } : kioskPhase==="zoomed" ? { duration:0.95,ease:[0.16,1,0.3,1] } : {}}
                style={{ position:"relative",width:kioskW,aspectRatio:"260/390",transformStyle:"preserve-3d",willChange:"transform" }}
              >
                <Image src="/img/hero/kiosk.webp" alt="KioClerk Kiosk" fill className="object-contain" priority sizes={kioskW} />

                <AnimatePresence>
                  {(phase==="glow"||phase==="zoom"||phase==="message") && (
                    <motion.div key="sg" initial={{ opacity:0 }} animate={{ opacity:phase==="message"?0.45:[0,1,0.6] }} exit={{ opacity:0 }} transition={{ duration:0.9 }} style={{ position:"absolute",inset:0,borderRadius:14,background:"radial-gradient(ellipse 68% 38% at 50% 32%,rgba(59,130,246,0.6) 0%,rgba(6,182,212,0.2) 44%,transparent 68%)",pointerEvents:"none" }} />
                  )}
                </AnimatePresence>

                {!rm && phase==="glow" && (
                  <motion.div style={{ position:"absolute",left:"15%",right:"15%",height:1,background:"linear-gradient(90deg,transparent,rgba(59,130,246,0.8),transparent)",pointerEvents:"none" }} animate={{ top:["15%","54%"] }} transition={{ duration:0.75,ease:"easeInOut" }} />
                )}
                {!rm && phase==="glow" && (
                  <motion.div initial={{ opacity:0,scale:0.88 }} animate={{ opacity:[0,0.4,0.12,0.4],scale:[0.88,1.03,1,1.03] }} transition={{ duration:3,repeat:Infinity,ease:"easeInOut" }} style={{ position:"absolute",inset:-18,borderRadius:26,border:"1px solid rgba(59,130,246,0.28)",pointerEvents:"none" }} />
                )}
              </motion.div>
            </div>
          </div>

          {/* Scrim */}
          <AnimatePresence>
            {screenActive && (
              <motion.div key="scrim" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.38 }} style={{ position:"fixed",inset:0,backgroundColor:"rgba(0,3,14,0.62)",zIndex:10055,pointerEvents:"none" }} />
            )}
          </AnimatePresence>

          {/* Desktop beams */}
          {!isMobile && (
            <AnimatePresence>
              {screenActive && !rm && (
                <motion.div key="beams" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.55,delay:0.3 }} style={{ position:"fixed",left:"calc(50% - 22vw)",top:"calc(50% - 319px)",zIndex:10056,pointerEvents:"none" }}>
                  {[
                    { a:17,w:1.5,op:0.36,delay:0.16 },
                    { a:21,w:2.0,op:0.48,delay:0.08 },
                    { a:25,w:3.0,op:0.62,delay:0.00 },
                    { a:29,w:2.0,op:0.48,delay:0.08 },
                    { a:33,w:1.5,op:0.36,delay:0.16 },
                  ].map((b,i) => (
                    <motion.div key={i} style={{ position:"absolute",top:0,left:0,width:"clamp(180px,32vw,560px)",height:b.w,background:`linear-gradient(90deg,rgba(59,130,246,${b.op+0.1}),rgba(6,182,212,${b.op*0.45}),transparent)`,transform:`rotate(${b.a}deg)`,transformOrigin:"0% 50%",borderRadius:99 }} animate={{ opacity:[0,b.op,b.op*0.55,b.op] }} transition={{ duration:2.2,delay:b.delay+0.4,repeat:Infinity,ease:"easeInOut" }} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Chat screen — centered on mobile, right-aligned on desktop */}
          <AnimatePresence>
            {screenActive && (
              <motion.div
                key="screen"
                style={{
                  position:       "fixed",
                  inset:          0,
                  display:        "flex",
                  alignItems:     isMobile ? "flex-end" : "center",
                  justifyContent: isMobile ? "center"   : "flex-end",
                  paddingBottom:  isMobile ? 28          : 0,
                  paddingRight:   isMobile ? 0           : "clamp(16px,5vw,72px)",
                  zIndex:         10060,
                  pointerEvents:  "none",
                }}
                exit={{ opacity:0,transition:{ duration:0.3 } }}
              >
                <motion.div
                  style={{ pointerEvents:"auto" }}
                  initial={{ scale:0.10, opacity:0, y: isMobile ? 60 : 0 }}
                  animate={
                    phase==="zoom"
                      ? isMobile
                        ? { scale:[0.10,1],  opacity:[0,1], y:[60,0] }
                        : { scale:[0.10,0.065,1], opacity:[0,1,1], y:0 }
                      : { scale:1, opacity:1, y:0 }
                  }
                  exit={{ scale:0.07, opacity:0 }}
                  transition={{
                    scale:   { duration:1.0, ease:"easeInOut" },
                    opacity: { duration:0.22 },
                    y:       { duration:1.0, ease:[0.16,1,0.3,1] },
                  }}
                >
                  <KioskScreenContent tod={tod} onEnter={handleEnter} rm={rm} isMobile={isMobile} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corner brackets */}
          {(["top-5 left-5","top-5 right-5","bottom-5 left-5","bottom-5 right-5"] as const).map((pos,i) => (
            <motion.div key={i} initial={{ opacity:0 }} animate={{ opacity:0.18 }} transition={{ delay:0.3+i*0.06 }} className={`pointer-events-none absolute ${pos}`} style={{ width:24,height:24,borderTop:i<2?"1px solid #3b82f6":"none",borderBottom:i>=2?"1px solid #3b82f6":"none",borderLeft:i%2===0?"1px solid #3b82f6":"none",borderRight:i%2===1?"1px solid #3b82f6":"none" }} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
