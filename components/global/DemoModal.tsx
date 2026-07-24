"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { InquiryForm } from "@/components/contact/InquiryForm";

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

export function DemoModal({ open, onClose }: DemoModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-kio-primary/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book A Demo"
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-lg overflow-y-auto bg-kio-bg shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-kio-ink">Book A Demo</h2>
                  <p className="mt-1 text-sm text-kio-muted">
                    We&apos;ll be in touch within 24 hours.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-kio-muted hover:bg-kio-bg-soft hover:text-kio-ink transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <InquiryForm onSuccess={onClose} isModal />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
