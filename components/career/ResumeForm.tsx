"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Upload, CheckCircle, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { staggerChild } from "@/lib/motion";
import { roleOptions } from "@/content/roles";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  role: z.string().min(1, "Please select a role"),
  experience: z.string().min(1, "Please select experience"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ResumeFormProps {
  // Compact mode for dropping the form into another layout (e.g. the
  // Contact page's card column)- skips the full-bleed section wrapper,
  // ambient glow orbs and mascot illustration, keeping just the heading,
  // stepper and form itself.
  embedded?: boolean;
}

export function ResumeForm({ embedded = false }: ResumeFormProps) {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const rm = useReducedMotion();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const STEPS = [
    { label: "Personal Details", fields: ["name", "email", "phone"] as const },
    { label: "Job Role", fields: ["role", "experience"] as const },
    { label: "Message", fields: ["message"] as const },
    { label: "Resume", fields: [] as const },
  ];

  async function nextStep() {
    const fields = STEPS[step].fields;
    const valid = fields.length === 0 || (await trigger(fields));
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function onSubmit(data: FormData) {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => v && formData.append(k, v));
    if (file) formData.append("resume", file);

    await fetch("/api/careers", { method: "POST", body: formData });
    setSubmitted(true);
  }

  function handleFile(f: File | undefined) {
    if (f && f.size <= 5 * 1024 * 1024) setFile(f);
  }

  const FieldError = ({ name }: { name: keyof FormData }) =>
    errors[name] ? (
      <motion.p
        variants={staggerChild}
        initial="hidden"
        animate="show"
        className="mt-1 text-xs text-kio-error"
      >
        {errors[name]?.message}
      </motion.p>
    ) : null;

  const formBlock = (
    <div className="w-full max-w-2xl">
      <RevealOnScroll className="mb-[clamp(8px,2.5vw,40px)] text-left">
        <h2 className="mt-3 text-[clamp(0.75rem,2.8vw,2.25rem)] font-bold text-kio-ink">
          Want To Make Career In <span className="text-color-cycle">Hospitality</span>? Join Us Now
        </h2>
      </RevealOnScroll>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-3xl border border-kio-success/25 bg-kio-bg-soft py-20 text-center"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <CheckCircle className="mx-auto h-20 w-20 text-kio-success" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-2xl font-bold text-kio-ink"
          >
            Application Received!
          </motion.h3>
          <p className="mt-3 max-w-sm px-6 text-kio-muted">
            We&apos;ll review your application and be in touch within 2–3 business days.
          </p>
        </motion.div>
      ) : (
        <>
          {/* Stepper */}
          <div className="mb-[clamp(8px,2.5vw,40px)] flex items-start justify-center">
            {STEPS.map((s, i) => (
              <div key={s.label} className="flex items-start">
                <div className="flex flex-col items-center gap-[clamp(2px,0.6vw,8px)]">
                  <motion.div
                    animate={{
                      scale: i === step ? 1.08 : 1,
                      borderColor:
                        i < step ? "var(--kio-success)" : i === step ? "var(--kio-accent)" : "var(--kio-line)",
                    }}
                    transition={{ duration: 0.3 }}
                    className={`flex h-[clamp(20px,5vw,40px)] w-[clamp(20px,5vw,40px)] items-center justify-center rounded-full border-2 text-[clamp(0.55rem,1.6vw,0.875rem)] font-bold leading-none tabular-nums ${
                      i < step
                        ? "bg-kio-success/15 text-kio-success"
                        : i === step
                        ? "bg-kio-accent/15 text-kio-accent"
                        : "text-kio-muted"
                    }`}
                  >
                    {i < step ? <Check className="h-[clamp(0.5rem,1.6vw,1rem)] w-[clamp(0.5rem,1.6vw,1rem)]" /> : i + 1}
                  </motion.div>
                  <span
                    className={`max-w-[64px] text-center text-[clamp(0.4rem,1.2vw,0.75rem)] font-medium leading-tight ${
                      i === step ? "text-kio-accent" : "text-kio-muted"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="mx-[clamp(2px,1vw,12px)] mt-[calc(clamp(10px,2.5vw,20px)-1px)] h-0.5 w-[clamp(10px,4vw,64px)] overflow-hidden rounded-full bg-kio-line">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-kio-accent to-kio-accent2"
                      initial={false}
                      animate={{ scaleX: i < step ? 1 : 0 }}
                      style={{ transformOrigin: "left" }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative overflow-hidden rounded-3xl border border-kio-line bg-kio-bg-soft p-[clamp(8px,3vw,32px)] shadow-lg shadow-black/5"
          >
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-kio-ink mb-1">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      {...register("name")}
                      placeholder="Your full name"
                      className="input-field"
                      suppressHydrationWarning
                    />
                    <FieldError name="name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-kio-ink mb-1">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="your@email.com"
                      className="input-field"
                      suppressHydrationWarning
                    />
                    <FieldError name="email" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-kio-ink mb-1">
                      Phone *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      placeholder="+91 98765 43210"
                      className="input-field"
                      suppressHydrationWarning
                    />
                    <FieldError name="phone" />
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-kio-ink mb-1">
                      Role of Interest *
                    </label>
                    <select
                      id="role"
                      {...register("role")}
                      className="input-field"
                      suppressHydrationWarning
                    >
                      <option value="">Select a role…</option>
                      {roleOptions.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <FieldError name="role" />
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-kio-ink mb-1">
                      Experience *
                    </label>
                    <select
                      id="experience"
                      {...register("experience")}
                      className="input-field"
                      suppressHydrationWarning
                    >
                      <option value="">Select experience…</option>
                      <option value="0">Fresher (0 years)</option>
                      <option value="0-1">0–1 years</option>
                      <option value="1-3">1–3 years</option>
                      <option value="3-5">3–5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                    <FieldError name="experience" />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-kio-ink mb-1">
                      Why Kiosist? (optional)
                    </label>
                    <textarea
                      id="message"
                      {...register("message")}
                      rows={5}
                      placeholder="Tell us what excites you about this role…"
                      className="w-full rounded-xl border border-kio-line bg-kio-bg px-4 py-3 text-sm resize-none focus:border-kio-primary focus:outline-none focus:ring-1 focus:ring-kio-primary"
                      suppressHydrationWarning
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium text-kio-ink mb-2">
                      Upload Resume (PDF, max 5 MB)
                    </label>
                    <label
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        handleFile(e.dataTransfer.files?.[0]);
                      }}
                      className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 cursor-pointer transition-colors ${
                        file
                          ? "border-kio-success bg-kio-success/5"
                          : dragOver
                          ? "border-kio-accent bg-kio-accent/10"
                          : "border-kio-line hover:border-kio-accent hover:bg-kio-accent/5"
                      }`}
                    >
                      <input
                        type="file"
                        accept=".pdf"
                        className="sr-only"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                        suppressHydrationWarning
                      />
                      {file ? (
                        <>
                          <CheckCircle className="h-10 w-10 text-kio-success" />
                          <p className="text-sm font-medium text-kio-ink">{file.name}</p>
                          <p className="text-xs text-kio-muted">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </>
                      ) : (
                        <>
                          <motion.div
                            animate={rm ? {} : { y: [0, -6, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Upload className="h-10 w-10 text-kio-muted" />
                          </motion.div>
                          <p className="text-sm font-medium text-kio-ink">
                            Drag & drop or click to upload
                          </p>
                          <p className="text-xs text-kio-muted">PDF only · max 5 MB</p>
                        </>
                      )}
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-2 rounded-full border border-kio-line px-6 py-2.5 text-sm font-medium text-kio-muted hover:border-kio-accent hover:text-kio-accent transition-colors"
                  suppressHydrationWarning
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 rounded-full bg-kio-primary px-8 py-2.5 text-sm font-semibold text-white hover:bg-kio-primary/85 transition-colors"
                  suppressHydrationWarning
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-full bg-kio-accent px-10 py-2.5 text-sm font-semibold text-kio-ink hover:bg-kio-accent/85 transition-colors"
                  suppressHydrationWarning
                >
                  Apply Now
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );

  if (embedded) {
    return formBlock;
  }

  return (
    <section id="apply" className="section-pad relative overflow-hidden bg-kio-bg scroll-mt-24">
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
        <div className="mx-auto grid grid-cols-[1.05fr_0.75fr] max-w-6xl items-center gap-[clamp(8px,3vw,48px)]">
          {formBlock}

          {/* Mascot image- mirrors the site's recurring 3D-illustrated agent */}
          <RevealOnScroll className="flex justify-self-center">
            <motion.div
              className="relative w-full max-w-[clamp(80px,26vw,340px)]"
              animate={rm ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-[10%] bottom-4 -z-10 aspect-square rounded-full opacity-40 blur-2xl"
                style={{ background: "radial-gradient(circle, var(--kio-accent), var(--kio-accent2) 70%, transparent 100%)" }}
                animate={rm ? {} : { scale: [1, 1.15, 1], opacity: [0.4, 0.55, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <Image
                src="/img/hero/concierge.png"
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
