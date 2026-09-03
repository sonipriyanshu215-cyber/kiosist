"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { isRemoteImageSrc } from "@/lib/cms/image-props";

interface WhatIsKiosistProps {
  imageSrc?: string;
}

export function WhatIsKiosist({ imageSrc = "/img/about/kiosist-team.jpeg" }: WhatIsKiosistProps) {
  const rm = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-10 md:pt-8 lg:pt-14">
      {/* Ambient glow top-left- scoped so it never wraps a sticky/scroll element */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,.12) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Ambient glow bottom-right */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,.09) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Mobile (< md): a real stacked layout- full-width text block above
          a full-width photo, each sized for its own row instead of being
          two cramped desktop columns (38%/62%) shrunk to fit a phone.
          md+: reverts to the original side-by-side panels. */}
      <div className="relative z-10 flex flex-col md:min-h-[clamp(280px,58vw,560px)] md:flex-row">

        {/* Text block */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex w-full flex-col justify-center bg-black px-6 py-8 md:w-[38%] md:px-[clamp(12px,4vw,56px)] md:py-[clamp(16px,4vw,40px)]"
        >
          <h3 className="text-[clamp(1.6rem,7vw,2.2rem)] font-extrabold leading-snug text-kio-ink md:text-[clamp(1rem,3.2vw,2.6rem)]">
            Welcome To <span className="text-white">Kiosist</span>
          </h3>

          <p className="mt-2 text-[clamp(0.95rem,3.8vw,1.15rem)] font-semibold italic text-kio-muted md:text-[clamp(0.6rem,1.8vw,1.25rem)]">
            Where Every Hello Becomes a Story.
          </p>

          <div
            aria-hidden="true"
            className="my-4 h-px w-full max-w-[280px] rounded-full md:my-[clamp(8px,2.4vw,24px)]"
            style={{ background: "linear-gradient(90deg, var(--kio-accent), var(--kio-accent2), transparent)" }}
          />

          <p className="text-[clamp(0.9rem,3.6vw,1rem)] leading-[1.7] text-kio-muted md:text-[clamp(0.6rem,1.8vw,1rem)]">
            Welcome to our world-class team of Front Desk Executives where we serve multiple hotels in the US.
          </p>
          <p className="mt-3 text-[clamp(0.9rem,3.6vw,1rem)] leading-[1.7] text-kio-muted md:mt-[clamp(8px,2vw,20px)] md:text-[clamp(0.6rem,1.8vw,1rem)]">
            The first impression is the lasting impression! As a Front Desk Agent, you will take care of the guests from the moment they arrive through to their departure by ensuring they have a memorable experience with us.
          </p>
          <p className="mt-3 text-[clamp(0.9rem,3.6vw,1rem)] leading-[1.7] text-kio-muted md:mt-[clamp(8px,2vw,20px)] md:text-[clamp(0.6rem,1.8vw,1rem)]">
            We always want more enthusiastic and positive Front Desk &amp; Customer Service agents.
          </p>
        </motion.div>

        {/* Photo block */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[78vw] max-h-[420px] w-full md:h-auto md:max-h-none md:w-[62%]"
        >
          <Image
            src={imageSrc}
            unoptimized={isRemoteImageSrc(imageSrc)}
            alt="The Kiosist team at their office in India"
            fill
            className="object-cover object-[center_35%]"
            sizes="(min-width: 768px) 62vw, 100vw"
          />

          {/* Light overall tint for mood */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[rgba(0,0,0,0.22)]" />

          {/* Seam blend into the text panel- matches the panel's pure black so
              the two bleed together; only meaningful when they sit
              side-by-side, so it's md+ only- on mobile the photo is a full
              standalone block below the (already solid black) text block. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block"
            style={{ background: "linear-gradient(to right, #000 0%, rgba(0,0,0,0.88) 8%, rgba(0,0,0,0.55) 16%, rgba(0,0,0,0.2) 26%, transparent 40%)" }} />

          {/* Top fade on mobile- blends the photo's top edge into the text
              block above it instead of the side seam used at md+ */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 md:hidden"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 18%)" }} />

          {/* Bottom fade for depth */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 25%)" }} />
        </motion.div>
      </div>
    </section>
  );
}