import { Achievement } from '@/types/content';

export function MetricCard({ achievement }: { achievement: Achievement }) {
  return (
    <div className="bg-surface border border-border py-5 px-6 clip-card">
      <span className="font-mono text-[1.8rem] text-accent tracking-[0.04em] block mb-1 drop-shadow-[0_0_20px_var(--color-glow-c)]">
        {achievement.value}
      </span>
      <span className="font-mono text-[0.7rem] text-muted tracking-[0.08em]">
        {achievement.label}
      </span>
    </div>
  );
}
