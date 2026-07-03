"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  properties: z.string().optional(),
  message: z.string().min(10, "Please add a message (at least 10 characters)"),
});

type FormData = z.infer<typeof schema>;

interface InquiryFormProps {
  onSuccess?: () => void;
  isModal?: boolean;
}

export function InquiryForm({ onSuccess, isModal = false }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSubmitted(true);
    setTimeout(() => onSuccess?.(), 2000);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="h-16 w-16 text-kio-success" />
        </motion.div>
        <h3 className="mt-4 text-xl font-bold text-kio-ink">Message sent!</h3>
        <p className="mt-2 text-sm text-kio-muted">
          We&apos;ll be in touch within 24 hours.
        </p>
      </motion.div>
    );
  }

  const inputClass =
    "input-field";

  const errorClass = "mt-1 text-xs text-kio-error";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-kio-ink mb-1">
            Name *
          </label>
          <input id="contact-name" {...register("name")} placeholder="Your name" className={inputClass} suppressHydrationWarning />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-kio-ink mb-1">
            Email *
          </label>
          <input id="contact-email" type="email" {...register("email")} placeholder="you@example.com" className={inputClass} suppressHydrationWarning />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      {!isModal && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-phone" className="block text-sm font-medium text-kio-ink mb-1">
              Phone
            </label>
            <input id="contact-phone" type="tel" {...register("phone")} placeholder="+1 555 000 0000" className={inputClass} suppressHydrationWarning />
          </div>
          <div>
            <label htmlFor="contact-company" className="block text-sm font-medium text-kio-ink mb-1">
              Hotel / Company
            </label>
            <input id="contact-company" {...register("company")} placeholder="Your hotel name" className={inputClass} suppressHydrationWarning />
          </div>
        </div>
      )}

      {!isModal && (
        <div>
          <label htmlFor="contact-properties" className="block text-sm font-medium text-kio-ink mb-1">
            Number of Properties
          </label>
          <select id="contact-properties" {...register("properties")} className={inputClass} suppressHydrationWarning>
            <option value="">Select…</option>
            <option value="1">1 property</option>
            <option value="2-5">2–5 properties</option>
            <option value="6-10">6–10 properties</option>
            <option value="10+">10+ properties</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-kio-ink mb-1">
          Message *
        </label>
        <textarea
          id="contact-message"
          {...register("message")}
          rows={isModal ? 4 : 5}
          placeholder="Tell us about your hotel and what you need…"
          className={`${inputClass} resize-none`}
          suppressHydrationWarning
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_var(--kio-glow)] transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, var(--kio-accent), var(--kio-accent2))" }}
        suppressHydrationWarning
      >
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
