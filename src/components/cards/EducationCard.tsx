import { Education } from "@/types/content";

interface EducationCardProps {
  education: Education;
  activeLabel: string;
  onInspect?: () => void;
  inspectLabel?: string;
}

export function EducationCard({
  education,
  activeLabel,
  onInspect,
  inspectLabel,
}: EducationCardProps) {
  const accent = education.accentColor || "var(--color-accent)";
  const interactive = typeof onInspect === "function";
  const Tag = interactive ? "button" : "div";
  const interactiveProps = interactive
    ? {
        type: "button" as const,
        onClick: onInspect,
        "aria-label": inspectLabel
          ? `${inspectLabel}: ${education.degree}`
          : education.degree,
      }
    : {};

  return (
    <Tag
      {...interactiveProps}
      className="group relative bg-surface border border-border clip-card overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_10px_30px_var(--color-glow-c)] w-full text-left cursor-pointer focus-visible:border-accent focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-glow-c)]"
    >
      <div
        className="absolute top-0 left-0 w-[3px] h-full transition-all duration-300 group-hover:w-[5px]"
        style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-[0.04] dotgrid-bg pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative p-6 md:p-7 pl-7 md:pl-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[0.65rem] tracking-[0.22em] uppercase py-0.5 px-2 border border-accent/40 text-accent bg-accent/5 clip-chip">
            EDU::REC
          </span>
          <span className="font-mono text-[0.7rem] text-muted/75 tracking-[0.14em]">
            {activeLabel}
          </span>
        </div>

        <div className="font-mono text-[1.2rem] md:text-[1.3rem] text-fg tracking-[0.02em] mb-2 leading-tight group-hover:text-accent transition-colors">
          {education.degree}
        </div>
        <div className="font-mono text-[0.92rem] text-accent tracking-[0.04em] mb-3 leading-snug">
          {education.school}
        </div>
        <div className="flex items-center gap-2 font-mono text-[0.78rem] text-muted tracking-[0.08em]">
          <span aria-hidden className="text-accent/60">
            ⌖
          </span>
          <span>{education.period}</span>
        </div>
      </div>
    </Tag>
  );
}
