import { Achievement } from '@/types/content';

export function MetricCard({ achievement }: { achievement: Achievement }) {
  return (
    <div className="group relative bg-surface border border-border py-5 px-6 clip-card overflow-hidden transition-colors duration-300 hover:border-accent/60">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.10]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
        aria-hidden="true"
      />
      <span className="absolute top-2 right-3 font-mono text-[0.55rem] text-muted/40 tracking-[0.18em]">
        ::M
      </span>
      <span className="font-mono text-[1.6rem] md:text-[1.8rem] text-accent tracking-[0.04em] block mb-1 drop-shadow-[0_0_20px_var(--color-glow-c)]">
        {achievement.value}
      </span>
      <span className="font-mono text-[0.7rem] text-muted tracking-[0.08em] uppercase">
        {achievement.label}
      </span>
    </div>
  );
}
