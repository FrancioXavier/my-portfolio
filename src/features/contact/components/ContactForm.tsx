"use client";

import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useTranslations } from "next-intl";
import { CyberpunkButton } from "@/components/ui/CyberpunkButton";

export const ContactForm = () => {
  const [state, handleSubmit] = useForm("xnnarbkd");
  const t = useTranslations("contact.form");

  if (state.succeeded) {
    return (
      <div className="p-12 bg-surface-2 border border-accent text-accent font-mono text-center clip-card animate-fade-up">
        <div className="text-3xl mb-3 drop-shadow-[0_0_20px_var(--color-glow-c)]">
          ✓
        </div>
        <p className="text-[1.1rem] mb-3 tracking-[0.12em] font-bold">
          {t("successTitle")}
        </p>
        <p className="text-muted text-[0.88rem] max-w-[420px] mx-auto leading-relaxed">
          {t("successDetail")}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-6 w-full bg-surface/40 p-7 md:p-9 border border-border/60 backdrop-blur-sm clip-card overflow-hidden"
    >
      {/* Subtle scanline backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, var(--color-accent), var(--color-accent) 1px, transparent 1px, transparent 4px)",
        }}
      />

      <div className="relative flex items-center gap-3 mb-1">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-accent py-1 px-2 border border-accent/40 bg-accent/5 clip-chip">
          {t("header")}
        </span>
        <span className="flex-1 h-px bg-border/40" />
        <span className="font-mono text-[0.6rem] text-muted/60 tracking-[0.18em]">
          {t("secure")}
        </span>
      </div>

      <div className="relative flex flex-col gap-2">
        <label
          htmlFor="name"
          className="font-mono text-[0.68rem] uppercase text-accent tracking-[0.2em] font-bold"
        >
          {t("nameLabel")}
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          placeholder={t("namePlaceholder")}
          className="bg-bg/60 border border-border p-4 font-mono text-[0.85rem] text-fg focus:border-accent focus:shadow-[0_0_15px_oklch(82%_0.22_195_/_0.2)] focus:outline-none transition-all clip-btn placeholder:text-muted/30"
        />
        <ValidationError
          prefix="Name"
          field="name"
          errors={state.errors}
          className="text-accent-2 font-mono text-[0.7rem] mt-1 italic"
        />
      </div>

      <div className="relative flex flex-col gap-2">
        <label
          htmlFor="email"
          className="font-mono text-[0.68rem] uppercase text-accent tracking-[0.2em] font-bold"
        >
          {t("emailLabel")}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder={t("emailPlaceholder")}
          className="bg-bg/60 border border-border p-4 font-mono text-[0.85rem] text-fg focus:border-accent focus:shadow-[0_0_15px_oklch(82%_0.22_195_/_0.2)] focus:outline-none transition-all clip-btn placeholder:text-muted/30"
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-accent-2 font-mono text-[0.7rem] mt-1 italic"
        />
      </div>

      <div className="relative flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-mono text-[0.68rem] uppercase text-accent tracking-[0.2em] font-bold"
        >
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder={t("messagePlaceholder")}
          className="bg-bg/60 border border-border p-4 font-mono text-[0.85rem] text-fg focus:border-accent focus:shadow-[0_0_15px_oklch(82%_0.22_195_/_0.2)] focus:outline-none transition-all clip-btn placeholder:text-muted/30 resize-none"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="text-accent-2 font-mono text-[0.7rem] mt-1 italic"
        />
      </div>

      <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        <div className="hidden sm:flex items-center gap-2 font-mono text-[0.6rem] text-muted/50 uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 bg-green rounded-full animate-status-pulse" />
          {t("secureEstablished")}
        </div>
        <CyberpunkButton
          type="submit"
          disabled={state.submitting}
          className={state.submitting ? "opacity-50 cursor-wait" : ""}
        >
          {state.submitting ? t("submitting") : t("submit")}
        </CyberpunkButton>
      </div>
    </form>
  );
};

export default ContactForm;
