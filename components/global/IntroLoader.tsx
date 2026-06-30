"use client";

import { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";

type Phase = "intro" | "glow" | "zoom" | "message";

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

function KioskScreenContent({ tod, onEnter, rm }: { tod: string; onEnter: () => void; rm: boolean | null }) {
  const [sub,   setSub]  = useState<"typing" | "revealing" | "cta">("typing");
  const [lines, setLines] = useState(0);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setSub("revealing"), rm ? 0 : 1500);
    return () => clearTimeout(t);
  }, [rm]);

  useEffect(() => {
    if (sub !== "revealing") return;
    if (rm) { setLines(MSG_LINES.length); setSub("cta"); return; }
    let n = 0;
    const id = setInterval(() => {
      n += 1; setLines(n);
      if (n >= MSG_LINES.length) { clearInterval(id); setTimeout(() => setSub("cta"), 420); }
    }, 500);
    return () => clearInterval(id);
  }, [sub, rm]);

  return (
    <div style={{ width: "min(520px, 44vw)", background: "linear-gradient(160deg,#1b2338 0%,#0c1120 100%)", borderRadius: 26, padding: "12px 12px 24px", boxShadow: ["0 0 0 1px rgba(255,255,255,0.07)","inset 0 1px 0 rgba(255,255,255,0.09)","inset 0 -1px 0 rgba(0,0,0,0.6)","inset 2px 0 0 rgba(255,255,255,0.03)","inset -2px 0 0 rgba(255,255,255,0.03)","0 60px 120px rgba(0,0,0,0.95)","0 0 80px rgba(59,130,246,0.24)"].join(", ") }}>
      <div style={{ borderRadius: 18, overflow: "hidden", position: "relative", background: "linear-gradient(180deg,#030b1a 0%,#050e24 100%)", boxShadow: "inset 0 0 0 1px rgba(59,130,246,0.2),inset 0 2px 30px rgba(0,0,0,0.55)" }}>
        <div style={{ position:"absolute",top:0,left:0,width:"52%",height:"38%",background:"linear-gradient(138deg,rgba(255,255,255,0.042) 0%,transparent 65%)",borderRadius:"18px 0 0 0",pointerEvents:"none",zIndex:30 }} />
        <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent 0px,transparent 3px,rgba(0,0,0,0.12) 3px,rgba(0,0,0,0.12) 4px)",pointerEvents:"none",zIndex:29 }} />
        <div style={{ display:"flex",alignItems:"center",padding:"9px 18px",gap:8,background:"rgba(3,9,20,0.92)",borderBottom:"1px solid rgba(59,130,246,0.1)" }}>
          <div style={{ display:"flex",alignItems:"center",gap:5 }}>
            <div style={{ width:18,height:18,borderRadius:5,flexShrink:0,background:"linear-gradient(135deg,#2563eb,#0891b2)",display:"flex",alignItems:"center",justifyContent:"center" }}><span style={{ color:"#fff",fontSize:10,fontWeight:900 }}>K</span></div>
            <span style={{ color:"rgba(255,255,255,0.5)",fontSize:11,fontWeight:700,letterSpacing:"0.14em",fontFamily:"var(--font-mono),monospace" }}>KIOSIST</span>
          </div>
          <div style={{ flex:1 }} />
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none" aria-hidden="true"><circle cx="7" cy="10" r="1" fill="rgba(255,255,255,0.45)"/><path d="M4.8 7.6A3 3 0 0 1 7 6.8a3 3 0 0 1 2.2.8" stroke="rgba(255,255,255,0.45)" strokeWidth="1.3" strokeLinecap="round"/><path d="M2.6 5.2A6.2 6.2 0 0 1 7 3.4a6.2 6.2 0 0 1 4.4 1.8" stroke="rgba(255,255,255,0.35)" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <div style={{ display:"flex",alignItems:"center",gap:1 }}><div style={{ width:20,height:10,border:"1px solid rgba(255,255,255,0.28)",borderRadius:2.5,padding:"1.5px",display:"flex" }}><div style={{ width:"80%",background:"#34d399",borderRadius:1 }}/></div><div style={{ width:2,height:5,background:"rgba(255,255,255,0.28)",borderRadius:1 }}/></div>
          <span style={{ color:"rgba(255,255,255,0.5)",fontSize:11,fontFamily:"var(--font-mono),monospace",letterSpacing:"0.04em" }}>{clock}</span>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:12,padding:"14px 18px",background:"rgba(3,10,22,0.75)",borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ width:44,height:44,borderRadius:13,flexShrink:0,background:"linear-gradient(135deg,#1d4ed8,#0891b2)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(29,78,216,0.5)" }}><span style={{ color:"#fff",fontWeight:900,fontSize:18,fontFamily:"var(--font-display),sans-serif" }}>K</span></div>
          <div>
            <div style={{ color:"#f0f4ff",fontWeight:700,fontSize:15,fontFamily:"var(--font-display),sans-serif" }}>KioClerk</div>
            <div style={{ display:"flex",alignItems:"center",gap:4,marginTop:2 }}>
              <motion.span style={{ width:6,height:6,borderRadius:"50%",backgroundColor:"#34d399",display:"inline-block" }} animate={{ opacity:[1,0.3,1],scale:[1,1.4,1] }} transition={{ duration:1.5,repeat:Infinity }} />
              <span style={{ color:"#34d399",fontSize:11,fontFamily:"var(--font-mono),monospace" }}>Online · AI Receptionist</span>
            </div>
          </div>
          <div style={{ marginLeft:"auto",fontSize:11,color:"rgba(143,163,196,0.42)",fontFamily:"var(--font-mono),monospace" }}>{tod}</div>
        </div>
        <div style={{ padding:"20px 18px 14px" }}>
          <div style={{ display:"flex",gap:11,alignItems:"flex-start" }}>
            <div style={{ width:34,height:34,borderRadius:10,flexShrink:0,background:"rgba(29,78,216,0.3)",border:"1px solid rgba(59,130,246,0.25)",display:"flex",alignItems:"center",justifyContent:"center" }}><span style={{ color:"#93c5fd",fontSize:13,fontWeight:800 }}>K</span></div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ backgroundColor:"rgba(29,78,216,0.18)",border:"1px solid rgba(59,130,246,0.15)",borderRadius:"4px 16px 16px 16px",padding:"15px 17px",minHeight:60 }}>
                <AnimatePresence mode="wait">
                  {sub === "typing" ? (
                    <motion.div key="dots" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.18 }}><TypingDots /></motion.div>
                  ) : (
                    <motion.div key="msg" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.18 }}>
                      {MSG_LINES.slice(0, lines).map((line, i) => (
                        <motion.p key={i} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.38,ease:[0.16,1,0.3,1] }} style={{ margin:0,marginBottom:i<lines-1?6:0,fontSize:14,lineHeight:1.68,color:i===1?"#93c5fd":"#d1d9f0",fontWeight:i===1?600:400,fontFamily:"var(--font-body),sans-serif" }}>{line}</motion.p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div style={{ fontSize:10,color:"rgba(143,163,196,0.28)",marginTop:5,textAlign:"right",fontFamily:"var(--font-mono),monospace" }}>Just now</div>
            </div>
          </div>
        </div>
        <div style={{ padding:"0 18px 18px" }}>
          <AnimatePresence>
            {sub === "cta" && (
              <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5,ease:[0.16,1,0.3,1] }}>
                <motion.button onClick={onEnter} whileHover={rm?{}:{ scale:1.02,y:-2,boxShadow:"0 16px 44px rgba(59,130,246,0.55)" }} whileTap={rm?{}:{ scale:0.97 }} style={{ width:"100%",padding:"14px 24px",borderRadius:99,border:"none",background:"linear-gradient(135deg,#3b82f6,#06b6d4)",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 8px 28px rgba(59,130,246,0.4)",fontFamily:"var(--font-body),sans-serif" }}>
                  Explore Kiosist
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </motion.button>
                <button onClick={onEnter} style={{ marginTop:10,width:"100%",background:"none",border:"none",color:"rgba(143,163,196,0.38)",fontSize:12,cursor:"pointer",padding:"4px 0",fontFamily:"var(--font-body),sans-serif",transition:"color 0.2s" }} onMouseEnter={(e)=>{(e.currentTarget as HTMLButtonElement).style.color="rgba(143,163,196,0.75)";}} onMouseLeave={(e)=>{(e.currentTarget as HTMLButtonElement).style.color="rgba(143,163,196,0.38)";}}>Skip intro</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div style={{ display:"flex",justifyContent:"center",padding:"12px 0 14px",background:"rgba(3,9,20,0.7)",borderTop:"1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ width:120,height:3,background:"rgba(255,255,255,0.18)",borderRadius:99 }} />
        </div>
      </div>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:9,paddingTop:16 }}>
        <span style={{ color:"rgba(255,255,255,0.18)",fontSize:10,letterSpacing:"0.2em",fontWeight:700,fontFamily:"var(--font-mono),monospace" }}>KIOSIST</span>
        <motion.div style={{ width:6,height:6,borderRadius:3,background:"#34d399" }} animate={{ opacity:[1,0.35,1] }} transition={{ duration:2.2,repeat:Infinity }} />
        <span style={{ color:"rgba(255,255,255,0.1)",fontSize:9,fontFamily:"var(--font-mono),monospace" }}>KioClerk v2.1</span>
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
  { x:76, y:42, s:1,   d:9,  delay:2.2 },
  { x:35, y:91, s:1.5, d:7,  delay:1.0 },
];

const BEAMS = [
  { a:8,  w:1.0, op:0.20, delay:0.32 },
  { a:12, w:1.5, op:0.30, delay:0.24 },
  { a:17, w:2.0, op:0.44, delay:0.16 },
  { a:21, w:2.5, op:0.56, delay:0.08 },
  { a:25, w:3.5, op:0.68, delay:0.00 },
  { a:29, w:2.5, op:0.56, delay:0.08 },
  { a:33, w:2.0, op:0.44, delay:0.16 },
  { a:38, w:1.5, op:0.30, delay:0.24 },
  { a:42, w:1.0, op:0.20, delay:0.32 },
];

const SESSION_KEY = "kio_intro_seen";

// Declarative kiosk animation targets — keyed by phase
const KIOSK_ANIM = {
  idle:    { rotateY: -22, rotateX: 6, scale: 0.84, y: 36, x: 0,      opacity: 0    },
  enter:   { rotateY: 0,   rotateX: 0, scale: 1,    y: 0,  x: 0,      opacity: 1    },
  zoomed:  { rotateY: -8,  rotateX: 0, scale: 1.6,  y: 0,  x: "-22vw", opacity: 0.95 },
} as const;

const KIOSK_TRANSITION = {
  enter:  { duration: 1.8, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  zoomed: { duration: 0.95, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
};

export function IntroLoader() {
  const rm = useReducedMotion();

  // `mounted`    — in DOM (false after exit animation completes)
  // `visible`    — drives AnimatePresence; set false to trigger smooth fade-out
  // `kioskPhase` — declarative kiosk animation state
  const [mounted,    setMounted]    = useState(false);
  const [visible,    setVisible]    = useState(false);
  const [phase,      setPhase]      = useState<Phase>("intro");
  const [kioskPhase, setKioskPhase] = useState<"idle" | "enter" | "zoomed">("idle");
  const [tod,        setTod]        = useState("Good Day");

  /* ── One-time init: session check ── */
  useEffect(() => {
    const h = new Date().getHours();
    setTod(h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening");

    if (sessionStorage.getItem(SESSION_KEY) === "1") return; // return visit — skip

    sessionStorage.setItem(SESSION_KEY, "1");
    setMounted(true);
    setVisible(true);
  }, []);

  /* ── Start kiosk entry animation once loader is visible ── */
  useEffect(() => {
    if (!mounted) return;
    if (rm) {
      // Reduced motion: skip straight to face-on, no transition
      setKioskPhase("enter");
      setPhase("message");
    } else {
      setKioskPhase("enter");
    }
  }, [mounted, rm]);

  /* ── Phase timers — no extra guards, same as original ── */
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

  /* ── Kiosk slides left when screen pops ── */
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
          <div className="pointer-events-none absolute inset-0" style={{ backgroundImage:"radial-gradient(circle,rgba(59,130,246,0.14) 1px,transparent 1px)",backgroundSize:"48px 48px",opacity:0.55 }} />

          <motion.div
            className="pointer-events-none absolute rounded-full"
            style={{ width:700,height:700,background:"radial-gradient(circle,rgba(59,130,246,0.09),transparent 65%)",left:"calc(50% - 350px)",top:"calc(50% - 350px)" }}
            animate={{ x: screenActive ? "-22vw" : 0 }}
            transition={{ duration:1.0,ease:[0.16,1,0.3,1] }}
          />

          {!rm && DOTS.map((d,i) => (
            <motion.span key={i} style={{ position:"absolute",left:`${d.x}%`,top:`${d.y}%`,width:d.s,height:d.s,borderRadius:"50%",backgroundColor:"#3b82f6",opacity:0.26 }} animate={{ y:[0,-28,0],opacity:[0.26,0.1,0.26] }} transition={{ duration:d.d,delay:d.delay,repeat:Infinity,ease:"easeInOut" }} />
          ))}

          {/* Kiosk */}
          <div style={{ position:"relative",zIndex:10010 }}>
            <div style={{ perspective:"900px",perspectiveOrigin:"50% 50%" }}>
              <motion.div
                initial={KIOSK_ANIM.idle}
                animate={KIOSK_ANIM[kioskPhase]}
                transition={kioskPhase === "enter" ? KIOSK_TRANSITION.enter : kioskPhase === "zoomed" ? KIOSK_TRANSITION.zoomed : {}}
                style={{ position:"relative",width:"min(380px, 52vw)",aspectRatio:"260/390",transformStyle:"preserve-3d",willChange:"transform" }}
              >
                <Image src="/img/hero/kiosk.webp" alt="KioClerk Kiosk" fill className="object-contain" priority sizes="min(380px, 52vw)" />

                <AnimatePresence>
                  {(phase === "glow" || phase === "zoom" || phase === "message") && (
                    <motion.div key="sg" initial={{ opacity:0 }} animate={{ opacity:phase==="message"?0.55:[0,1,0.7] }} exit={{ opacity:0 }} transition={{ duration:0.9 }} style={{ position:"absolute",inset:0,borderRadius:14,background:"radial-gradient(ellipse 68% 38% at 50% 32%,rgba(59,130,246,0.6) 0%,rgba(6,182,212,0.2) 44%,transparent 68%)",pointerEvents:"none" }} />
                  )}
                </AnimatePresence>

                {!rm && phase === "glow" && (
                  <motion.div style={{ position:"absolute",left:"15%",right:"15%",height:1,background:"linear-gradient(90deg,transparent,rgba(59,130,246,0.8),transparent)",pointerEvents:"none" }} animate={{ top:["15%","54%"] }} transition={{ duration:0.75,ease:"easeInOut" }} />
                )}
                {!rm && phase === "glow" && (
                  <motion.div initial={{ opacity:0,scale:0.88 }} animate={{ opacity:[0,0.4,0.12,0.4],scale:[0.88,1.03,1,1.03] }} transition={{ duration:3,repeat:Infinity,ease:"easeInOut" }} style={{ position:"absolute",inset:-18,borderRadius:26,border:"1px solid rgba(59,130,246,0.28)",pointerEvents:"none" }} />
                )}
              </motion.div>
            </div>
          </div>

          <AnimatePresence>
            {screenActive && !rm && [0,1,2].map((i) => (
              <motion.div key={`ring-${i}`} style={{ position:"fixed",left:"calc(50% - 22vw)",top:"calc(50% - 319px)",transform:"translate(-50%,-50%)",borderRadius:"50%",border:"1px solid rgba(59,130,246,0.5)",pointerEvents:"none",zIndex:10052 }} initial={{ width:50,height:50,opacity:0 }} animate={{ width:[50,380],height:[50,380],opacity:[0.65,0] }} transition={{ duration:2.4,delay:i*0.82,repeat:Infinity,ease:"easeOut" }} />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {screenActive && !rm && (
              <motion.div key="beams" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.55,delay:0.3 }} style={{ position:"fixed",left:"calc(50% - 22vw)",top:"calc(50% - 319px)",zIndex:10056,pointerEvents:"none" }}>
                {BEAMS.map((b,i) => (
                  <motion.div key={i} style={{ position:"absolute",top:0,left:0,width:"clamp(220px,38vw,680px)",height:b.w,background:`linear-gradient(90deg,rgba(59,130,246,${b.op+0.1}),rgba(6,182,212,${b.op*0.45}),transparent)`,transform:`rotate(${b.a}deg)`,transformOrigin:"0% 50%",borderRadius:99 }} animate={{ opacity:[0,b.op,b.op*0.6,b.op] }} transition={{ duration:2.3,delay:b.delay+0.4,repeat:Infinity,ease:"easeInOut" }} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {screenActive && (
              <motion.div key="scrim" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.38 }} style={{ position:"fixed",inset:0,backgroundColor:"rgba(0,3,14,0.60)",zIndex:10055,pointerEvents:"none" }} />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {screenActive && (
              <motion.div key="screen" style={{ position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:"clamp(16px,5vw,72px)",zIndex:10060,pointerEvents:"none" }} exit={{ opacity:0,transition:{ duration:0.3 } }}>
                <motion.div style={{ pointerEvents:"auto" }} initial={{ scale:0.10,opacity:0 }} animate={phase==="zoom"?{ scale:[0.10,0.065,1],opacity:[0,1,1] }:{ scale:1,opacity:1 }} exit={{ scale:0.07,opacity:0 }} transition={{ scale:{ duration:1.05,times:[0,0.27,1],ease:"easeInOut" },opacity:{ duration:0.20 } }}>
                  <KioskScreenContent tod={tod} onEnter={handleEnter} rm={rm} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {(["top-5 left-5","top-5 right-5","bottom-5 left-5","bottom-5 right-5"] as const).map((pos,i) => (
            <motion.div key={i} initial={{ opacity:0 }} animate={{ opacity:0.18 }} transition={{ delay:0.3+i*0.06 }} className={`pointer-events-none absolute ${pos}`} style={{ width:28,height:28,borderTop:i<2?"1px solid #3b82f6":"none",borderBottom:i>=2?"1px solid #3b82f6":"none",borderLeft:i%2===0?"1px solid #3b82f6":"none",borderRight:i%2===1?"1px solid #3b82f6":"none" }} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
