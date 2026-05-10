import { Link } from "@/i18n/routing";
import { TagChip } from "@/components/ui/TagChip";
import { Experience } from "@/types/content";

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link
      href={`/experience/${experience.slug}` as `/experience/${string}`}
      className="block border border-border bg-surface-2 p-6 md:p-8 clip-card transition-all duration-300 group hover:-translate-y-1 hover:border-accent hover:shadow-[0_10px_30px_var(--color-glow-c)] relative overflow-hidden"
    >
      {/* Vertical accent rail (left edge) */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-4 bottom-4 w-[2px] bg-gradient-to-b from-accent/60 via-accent-2/40 to-transparent opacity-50 group-hover:opacity-100 group-hover:w-[3px] transition-all duration-300"
      />

      {/* Index marker */}
      <span
        aria-hidden="true"
        className="absolute -top-px left-6 font-mono text-[0.55rem] tracking-[0.22em] text-muted/50 px-2 py-0.5 bg-bg border border-border/60 group-hover:text-accent group-hover:border-accent/40 transition-colors"
      >
        {experience.eyebrow || "ROLE"}
      </span>

      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2 mt-3">
        <div>
          <div className="font-mono text-lg text-fg tracking-[0.05em] mb-1 group-hover:text-accent transition-colors">
            {experience.role}
          </div>
          <div className="font-mono text-[0.8rem] text-accent tracking-[0.08em]">
            <span className="text-border">{"//"}</span> {experience.company}
          </div>
        </div>
        <div className="font-mono text-[0.7rem] text-muted tracking-[0.1em] mt-1 md:mt-0 flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors"
            aria-hidden="true"
          />
          {experience.period}
        </div>
      </div>

      <p className="font-body text-muted text-[0.9rem] leading-[1.6] mb-5 max-w-[800px]">
        {experience.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-2">
        {experience.tags.map((tag) => (
          <TagChip key={tag}>{tag}</TagChip>
        ))}
      </div>

      <div className="absolute right-6 bottom-6 md:right-8 md:bottom-8 font-mono text-xl text-border transition-all duration-300 group-hover:text-accent group-hover:translate-x-1">
        →
      </div>
    </Link>
  );
}
