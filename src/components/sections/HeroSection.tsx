"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { StarGraph } from "@/components/effects/StarGraph";
import { TerminalWindow } from "@/components/effects/TerminalWindow";
import { CyberpunkButton } from "@/components/ui/CyberpunkButton";
import type { Profile } from "@/types/content";

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center items-center min-h-[100svh] overflow-hidden pt-[120px] pb-24"
    >
      <StarGraph />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_50%,transparent_0%,transparent_45%,var(--color-bg)_100%)] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-[980px] mx-auto px-[clamp(1.25rem,5vw,4rem)] flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 mb-5 py-1.5 px-3.5 border border-green/30 bg-green/5 clip-chip"
        >
          <span className="w-1.5 h-1.5 bg-green rounded-full animate-status-pulse" />
          <span className="font-mono text-[0.7rem] text-green tracking-[0.22em] uppercase">
            {t("openToOpportunities")}
          </span>
        </motion.div>

        <motion.div
          className="font-mono text-[0.78rem] text-accent-2 tracking-[0.36em] uppercase mb-7 drop-shadow-[0_0_10px_var(--color-glow-m)]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {t("sessionTag")}
        </motion.div>

        <TerminalWindow />

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mt-9"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <CyberpunkButton href={profile.cta.primary.href} variant="primary">
            {profile.cta.primary.label}
          </CyberpunkButton>
          <CyberpunkButton href={profile.cta.secondary.href} variant="ghost">
            {profile.cta.secondary.label}
          </CyberpunkButton>
        </motion.div>

        <motion.a
          href="#stacks"
          aria-label="Scroll to next section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.6rem] tracking-[0.28em] text-muted/60 hover:text-accent transition-colors"
        >
          <span>{t("scroll")}</span>
          <span className="w-px h-10 bg-gradient-to-b from-accent/60 to-transparent animate-bounce-down" />
        </motion.a>
      </div>
    </section>
  );
}
