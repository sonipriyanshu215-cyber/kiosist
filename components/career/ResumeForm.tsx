"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { isRemoteImageSrc } from "@/lib/cms/image-props";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";
import { CognitoFormEmbed } from "@/components/career/CognitoFormEmbed";

interface ResumeFormProps {
  // Compact mode for dropping the form into another layout (e.g. the
  // Contact page's card column)- skips the full-bleed section wrapper,
  // ambient glow orbs and mascot illustration, keeping just the heading
  // and the embedded form itself.
  embedded?: boolean;
  mascotSrc?: string;
}

// Career/job application form. Was a custom multi-step form (react-hook-form
// + Zod validation, resume upload to Supabase, Resend email notification via
// /api/careers)- replaced 2026-09-04 with an embedded Cognito Forms widget,
// which now owns the fields, validation, resume upload and notifications on
// its own platform. Only the surrounding heading/section chrome stayed.
export function ResumeForm({
  embedded = false,
  mascotSrc = "/img/hero/agent-red.png",
}: ResumeFormProps) {
  const rm = useReducedMotion();

  const formBlock = (
    <div className="w-full max-w-2xl">
      <RevealOnScroll className="mb-[clamp(20px,5vw,40px)] text-center md:text-left">
        <h2 className="text-[clamp(1.5rem,4.2vw,2.25rem)] font-extrabold leading-[1.25] text-kio-ink">
          Want To Make Career In <span className="text-white">Hospitality</span>? Join Us Now
        </h2>
      </RevealOnScroll>

      {/* Same card treatment the old multi-step <form> had- kept so the
          Cognito embed still reads as part of this design system rather
          than a foreign white box. */}
      <div className="relative overflow-hidden rounded-3xl border border-kio-line bg-kio-bg-soft p-[clamp(8px,3vw,32px)] shadow-lg shadow-black/5">
        <CognitoFormEmbed />
      </div>
    </div>
  );

  if (embedded) {
    return formBlock;
  }

  return (
    <section id="apply" className="pt-2 pb-8 md:py-10 lg:py-12 relative overflow-hidden bg-kio-bg scroll-mt-24">
      {/* Ambient glow orbs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,.14) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-10 h-[380px] w-[380px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,.12) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.22, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container-kio relative z-10">
        {/* Mobile (< md): full-width form above a smaller centered mascot,
            instead of squeezing form fields into ~58% of the screen next
            to the character. md+: unchanged 1.05fr/0.75fr split. */}
        <div className="mx-auto grid grid-cols-1 gap-10 max-w-6xl md:grid-cols-[1.05fr_0.75fr] md:items-center md:gap-[clamp(8px,3vw,48px)]">
          {formBlock}

          {/* Mascot image- mirrors the site's recurring 3D-illustrated agent.
              Hidden on mobile (kept desktop-only) per explicit request. */}
          <RevealOnScroll className="hidden md:flex md:justify-self-center">
            <motion.div
              className="relative w-full max-w-[180px] md:max-w-[clamp(110px,22vw,250px)]"
              animate={rm ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Glow behind the character */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-[15%] -z-200 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(6,182,212,0.65), rgba(37,99,235,0.35) 40%, transparent 75%)",
                  filter: "blur(18px)",
                }}
                animate={rm ? {} : { opacity: [0.75, 0.5, 0.75] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />

              <Image
                src={mascotSrc}
                unoptimized={isRemoteImageSrc(mascotSrc)}
                alt="A Kiosist front desk agent ready to welcome your application"
                width={1024}
                height={1024}
                className="h-auto w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)]"
              />
            </motion.div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
