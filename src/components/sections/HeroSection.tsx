"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BootSequence } from "@/components/effects/BootSequence";
import { RadarDeco } from "@/components/effects/RadarDeco";
import { GlitchText } from "@/components/effects/GlitchText";
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
      className="relative flex flex-col justify-center min-h-[100svh] overflow-x-hidden overflow-y-hidden pt-[120px] pb-24"
    >
      <RadarDeco />

      {/* Left vertical HUD rail (desktop only, decorative) */}
      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col gap-3 font-mono text-[0.55rem] tracking-[0.32em] text-muted/40 uppercase pointer-events-none">
        <span className="rotate-180" style={{ writingMode: "vertical-rl" }}>
          LAT: -7.21 · LON: -39.31
        </span>
      </div>

      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] w-full relative z-10">
        <BootSequence />

        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center gap-2 mb-5 py-1 px-3 border border-green/30 bg-green/5 clip-chip"
        >
          <span className="w-1.5 h-1.5 bg-green rounded-full animate-status-pulse" />
          <span className="font-mono text-[0.58rem] text-green tracking-[0.22em] uppercase">
            {t("openToOpportunities")}
          </span>
        </motion.div>

        <motion.div
          className="font-mono text-[0.78rem] text-accent-2 tracking-[0.28em] uppercase mb-3 drop-shadow-[0_0_10px_var(--color-glow-m)]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {profile.eyebrow}
        </motion.div>

        <GlitchText text={profile.name} />

        <motion.div
          className="font-mono text-[clamp(1rem,1.6vw,1.2rem)] text-accent tracking-[0.05em] mb-7"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          {profile.role}
        </motion.div>

        <motion.p
          className="font-body text-[0.95rem] text-muted leading-[1.7] max-w-[600px] mb-10 border-l border-border pl-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          {profile.bio}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <CyberpunkButton href={profile.cta.primary.href} variant="primary">
            {profile.cta.primary.label}
          </CyberpunkButton>
          <CyberpunkButton href={profile.cta.secondary.href} variant="ghost">
            {profile.cta.secondary.label}
          </CyberpunkButton>
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#stacks"
          aria-label="Scroll to next section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.6rem] tracking-[0.28em] text-muted/60 hover:text-accent transition-colors group"
        >
          <span>{t("scroll")}</span>
          <span className="w-px h-10 bg-gradient-to-b from-accent/60 to-transparent animate-bounce-down" />
        </motion.a>
      </div>
    </section>
  );
}
