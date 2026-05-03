"use client";
 
import { motion } from 'framer-motion';
import { BootSequence } from '@/components/effects/BootSequence';
import { RadarDeco } from '@/components/effects/RadarDeco';
import { GlitchText } from '@/components/effects/GlitchText';
import { CyberpunkButton } from '@/components/ui/CyberpunkButton';
import profileData from '@/data/profile.json';

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center relative overflow-x-hidden overflow-y-hidden pt-[120px] pb-20">
      <RadarDeco />

      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] w-full">
        <BootSequence />

        <motion.div 
          className="font-mono text-[0.78rem] text-accent-2 tracking-[0.28em] uppercase mb-3 drop-shadow-[0_0_10px_var(--color-glow-m)]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {profileData.eyebrow}
        </motion.div>

        <GlitchText text={profileData.name} />

        <motion.div 
          className="font-mono text-[1.2rem] text-accent tracking-[0.05em] mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          {profileData.role}
        </motion.div>

        <motion.p 
          className="font-body text-[0.9rem] text-muted leading-[1.65] max-w-[600px] mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          {profileData.bio}
        </motion.p>

        <motion.div 
          className="flex flex-wrap gap-5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <CyberpunkButton href={profileData.cta.primary.href} variant="primary">
            {profileData.cta.primary.label}
          </CyberpunkButton>
          <CyberpunkButton href={profileData.cta.secondary.href} variant="ghost">
            {profileData.cta.secondary.label}
          </CyberpunkButton>
        </motion.div>
      </div>
    </section>
  );
}
