"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DiagTestClip() {
  return (
    <div>
      <section className="relative min-h-screen overflow-hidden lg:flex">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex min-h-[70vh] flex-col justify-center bg-black px-6 pb-16 pt-10 lg:min-h-screen lg:w-1/2 lg:pt-32 lg:px-14 xl:px-20"
        >
          <h1 className="text-4xl font-black text-white">Text panel placeholder</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden min-h-screen lg:absolute lg:inset-y-0 lg:right-0 lg:z-20 lg:block lg:w-[calc(50%+4rem)]"
          style={{ clipPath: "url(#aboutHeroCurve)", backgroundColor: "#ff1493" }}
        >
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="aboutHeroCurve" clipPathUnits="objectBoundingBox">
                <path d="M 0.075,0 C 0.075,0.2 0,0.35 0,0.5 C 0,0.65 0.075,0.8 0.075,1 L 1,1 L 1,0 Z" />
              </clipPath>
            </defs>
          </svg>
          <Image
            src="/img/about/agent-workstation-2.jpeg"
            alt="test"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1023px) 0px, 50vw"
            priority
          />
        </motion.div>
      </section>
    </div>
  );
}
