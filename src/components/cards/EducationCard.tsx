import { Education } from "@/types/content";

interface EducationCardProps {
  education: Education;
  activeLabel: string;
}

export function EducationCard({ education, activeLabel }: EducationCardProps) {
  const accent = education.accentColor || "var(--color-accent)";
  return (
    <div className="group relative bg-surface border border-border clip-card overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_10px_30px_var(--color-glow-c)]">
      {/* Left accent bar */}
      <div
        className="absolute top-0 left-0 w-[3px] h-full transition-all duration-300 group-hover:w-[5px]"
        style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
        aria-hidden="true"
      />

      {/* Subtle dotgrid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.04] dotgrid-bg pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative p-6 md:p-7 pl-7 md:pl-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[0.55rem] tracking-[0.22em] uppercase py-0.5 px-2 border border-accent/40 text-accent bg-accent/5 clip-chip">
            EDU::REC
          </span>
          <span className="font-mono text-[0.62rem] text-muted/70 tracking-[0.12em]">
            {activeLabel}
          </span>
        </div>

        <div className="font-mono text-[1.05rem] text-fg tracking-[0.04em] mb-2 leading-tight">
          {education.degree}
        </div>
        <div className="font-mono text-[0.78rem] text-accent tracking-[0.06em] mb-2 leading-snug">
          {education.school}
        </div>
        <div className="flex items-center gap-2 font-mono text-[0.66rem] text-muted tracking-[0.1em]">
          <span className="text-accent/60">⌖</span>
          <span>{education.period}</span>
        </div>
      </div>
    </div>
  );
}
