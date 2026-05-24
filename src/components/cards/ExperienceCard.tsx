import { Link } from "@/i18n/routing";
import { TagChip } from "@/components/ui/TagChip";
import { Experience } from "@/types/content";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  seeDetailsLabel: string;
}

export function ExperienceCard({
  experience,
  index,
  seeDetailsLabel,
}: ExperienceCardProps) {
  const positionTag = (index + 1).toString().padStart(2, "0");

  return (
    <Link
      href={`/experience/${experience.slug}` as `/experience/${string}`}
      aria-label={`${experience.role} — ${experience.company}. ${seeDetailsLabel}`}
      className="block border border-border bg-surface-2 px-6 md:px-9 py-7 md:py-9 clip-card transition-all duration-300 group hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_45px_-15px_var(--color-glow-c)] relative overflow-hidden"
    >
      <span
        aria-hidden
        className="absolute left-0 top-5 bottom-5 w-[2px] bg-gradient-to-b from-accent/60 via-accent-2/40 to-transparent opacity-50 group-hover:opacity-100 group-hover:w-[3px] transition-all duration-300"
      />

      <span
        aria-hidden
        className="absolute -top-px left-6 md:left-9 inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.22em] uppercase text-muted/70 px-2.5 py-1 bg-bg border border-border/60 group-hover:text-accent group-hover:border-accent/50 transition-colors"
      >
        <span className="text-accent-2/70 group-hover:text-accent-2 transition-colors">
          [{positionTag}]
        </span>
        <span className="text-border/80">/</span>
        <span>{experience.eyebrow || "ROLE"}</span>
      </span>

      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-5 gap-3 mt-5">
        <div className="min-w-0">
          <div className="font-mono text-[clamp(1.35rem,1.9vw,1.65rem)] leading-[1.2] text-fg tracking-[0.02em] mb-2 group-hover:text-accent transition-colors">
            {experience.role}
          </div>
          <div className="font-mono text-[1rem] text-accent tracking-[0.04em]">
            <span className="text-border/70 mr-1">{"//"}</span>
            {experience.company}
          </div>
        </div>
        <div className="font-mono text-[0.88rem] text-fg/85 tracking-[0.08em] mt-1 md:mt-2 inline-flex items-center gap-2.5 self-start md:self-auto py-1.5 px-3 border border-border/60 bg-bg/60 clip-chip">
          <span
            aria-hidden
            className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent group-hover:shadow-[0_0_8px_var(--color-glow-c)] transition-all"
          />
          {experience.period}
        </div>
      </div>

      <p className="font-body text-fg/75 text-[1rem] md:text-[1.05rem] leading-[1.65] mb-6 max-w-[860px]">
        {experience.description}
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-2 pr-0 md:pr-[180px]">
        {experience.tags.map((tag) => (
          <TagChip key={tag}>{tag}</TagChip>
        ))}
      </div>

      <div className="mt-6 md:mt-0 md:absolute md:right-7 md:bottom-7 inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-[0.22em] uppercase py-2 px-3.5 border border-border/70 text-muted bg-bg/40 clip-btn group-hover:text-bg group-hover:bg-accent group-hover:border-accent group-hover:shadow-[0_0_22px_var(--color-glow-c)] transition-all duration-300">
        <span>{seeDetailsLabel}</span>
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </Link>
  );
}
