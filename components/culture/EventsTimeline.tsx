"use client";

import { SafeImage } from "@/components/primitives/SafeImage";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { staggerParent, staggerChild } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const EVENTS = [
  {
    id: "e-1",
    name: "SURTI LEUVA PATIDAR SAMAJ National Gaam Volleyball Tournament & Annual Expo 2024",
    location: "Dallas-Fort Worth, TX",
    year: "2024",
    month: "November",
    description:
      "Kiosist (under NexTap) participated in the annual expo, showcasing our virtual front desk solution to the hospitality community and Patidar hotel operators across the USA.",
    photo: "/img/culture/expo-dfw-2024.webp",
    tags: ["Exhibition", "USA", "Hospitality"],
  },
  {
    id: "e-2",
    name: "Kiosist Team Annual Celebration 2024",
    location: "Surat, Gujarat",
    year: "2024",
    month: "March",
    description:
      "Our whole team came together to celebrate a year of growth — 50 hotels, a new office, and the launch of KioClerk v2.",
    photo: "/img/culture/celebration-2024.webp",
    tags: ["Internal", "Celebration"],
  },
];

export function EventsTimeline() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-pad bg-kio-bg-soft">
      <div className="container-kio">
        <RevealOnScroll className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-kio-accent">
            Events & Exhibitions
          </p>
          <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl">
            Where we&apos;ve shown up
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-kio-muted">
            Our participation in hospitality expos and community events across the USA.
          </p>
        </RevealOnScroll>

        <motion.div
          variants={staggerParent}
          initial={reducedMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-kio-line md:block" />

          <div className="space-y-12">
            {EVENTS.map((event, i) => (
              <motion.div
                key={event.id}
                variants={staggerChild}
                className={`relative grid gap-8 md:grid-cols-2 ${
                  i % 2 === 0 ? "" : "md:[direction:rtl]"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-1/2 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-kio-accent bg-kio-bg md:block" />

                {/* Content */}
                <div className={`${i % 2 === 0 ? "md:pr-12" : "md:pl-12 md:[direction:ltr]"}`}>
                  <div className="rounded-2xl bg-kio-bg p-8 shadow-sm ring-1 ring-kio-line transition-all hover:ring-kio-accent hover:shadow-md hover:shadow-kio-accent/10">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {event.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-kio-accent/10 px-3 py-0.5 text-xs font-medium text-kio-accent"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-kio-ink">{event.name}</h3>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-kio-muted">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-kio-accent" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-kio-accent" />
                        {event.month} {event.year}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-kio-muted">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Photo */}
                <div className={i % 2 === 0 ? "md:pl-12" : "md:pr-12 md:[direction:ltr]"}>
                  <div className="h-56 overflow-hidden rounded-2xl">
                    <SafeImage
                      src={event.photo}
                      alt={event.name}
                      width={600}
                      height={320}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
