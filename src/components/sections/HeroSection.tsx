import { BootSequence } from '@/components/effects/BootSequence';
import { RadarDeco } from '@/components/effects/RadarDeco';
import { GlitchText } from '@/components/effects/GlitchText';
import { CyberpunkButton } from '@/components/ui/CyberpunkButton';
import profileData from '@/data/profile.json';

export function HeroSection() {
  return (
    <>
      <RadarDeco />
      <section id="hero" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-[120px] pb-20 px-[clamp(1.25rem,5vw,4rem)] max-w-[1320px] mx-auto">
        <BootSequence />

        <div className="font-mono text-[0.78rem] text-accent-2 tracking-[0.28em] uppercase mb-3 opacity-0 animate-fade-up drop-shadow-[0_0_10px_var(--color-glow-m)]" style={{ animationDelay: '0.5s' }}>
          {profileData.eyebrow}
        </div>

        <GlitchText text={profileData.name} />

        <div className="font-mono text-[1.2rem] text-accent tracking-[0.05em] mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.9s' }}>
          {profileData.role}
        </div>

        <p className="font-body text-[0.9rem] text-muted leading-[1.65] max-w-[600px] mb-12 opacity-0 animate-fade-up" style={{ animationDelay: '1.1s' }}>
          {profileData.bio}
        </p>

        <div className="flex flex-wrap gap-5 opacity-0 animate-fade-up" style={{ animationDelay: '1.3s' }}>
          <CyberpunkButton href={profileData.cta.primary.href} variant="primary">
            {profileData.cta.primary.label}
          </CyberpunkButton>
          <CyberpunkButton href={profileData.cta.secondary.href} variant="ghost">
            {profileData.cta.secondary.label}
          </CyberpunkButton>
        </div>
      </section>
    </>
  );
}
