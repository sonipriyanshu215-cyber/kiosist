"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/content/faqs";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

export function FAQAccordion() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="section-pad bg-kio-bg">
      <div className="container-kio">
        <RevealOnScroll className="mb-14 text-center">
          <h2 className="mt-3 text-3xl font-bold text-gradient-gold md:text-4xl">
            Questions we hear often
          </h2>
        </RevealOnScroll>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq) => {
            const isOpen = open === faq.id;
            return (
              <motion.div
                key={faq.id}
                layout
                className={`overflow-hidden rounded-2xl border bg-kio-bg-soft transition-colors ${
                  isOpen
                    ? "border-kio-accent bg-kio-accent/5"
                    : "border-kio-line"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold transition-colors ${isOpen ? "text-kio-accent" : "text-kio-ink"}`}>
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`shrink-0 text-2xl font-light transition-colors ${isOpen ? "text-kio-accent" : "text-kio-muted"}`}
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-kio-muted">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
