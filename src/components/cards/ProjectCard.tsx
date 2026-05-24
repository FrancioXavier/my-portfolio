"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { TagChip } from "@/components/ui/TagChip";
import { Project } from "@/types/content";
import clsx from "clsx";

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("projects");
  const isWip = project.status === "wip";

  const thumbClasses = clsx(
    "h-[180px] relative border-b border-border overflow-hidden",
    project.slug === "cloudvault" &&
      "bg-[linear-gradient(135deg,var(--color-surface-2),oklch(18%_0.04_280))]",
    project.slug === "cfworker-kit" &&
      "bg-[linear-gradient(135deg,var(--color-surface-2),oklch(14%_0.04_220))]",
  );

  const accentTint =
    project.slug === "orbitcms" || project.slug === "cfworker-kit"
      ? "var(--color-accent-2)"
      : project.slug === "cloudvault" || project.slug === "rediswatcher"
        ? "var(--color-accent-3)"
        : "var(--color-accent)";

  const gridStyle = {
    backgroundImage: `linear-gradient(${accentTint} 1px, transparent 1px), linear-gradient(90deg, ${accentTint} 1px, transparent 1px)`,
    backgroundSize: "22px 22px",
  };

  return (
    <Link
      href={`/projects/${project.slug}` as `/projects/${string}`}
      className="flex flex-col bg-surface border border-border clip-card transition-all duration-300 group hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_40px_-12px_var(--color-glow-c)] h-full relative"
    >
      <div className={thumbClasses}>
        <div
          className="absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20"
          style={gridStyle}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[2.6rem] font-bold tracking-[0.1em] text-border group-hover:text-accent-2 transition-colors duration-300">
          [{project.preview}]
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute -inset-1/2 rotate-12 bg-gradient-to-b from-transparent via-accent/10 to-transparent translate-y-full group-hover:translate-y-[-50%] transition-transform duration-1000" />
        </div>

        <div
          className={clsx(
            "absolute top-3 right-3 font-mono text-[0.7rem] py-1 px-2.5 border tracking-[0.12em] uppercase",
            isWip
              ? "border-accent-3 text-accent-3 bg-accent-3/10"
              : "border-green text-green bg-green/10",
          )}
        >
          {isWip ? t("wip") : t("live")}
        </div>

        {project.category && (
          <div className="absolute top-3 left-3 font-mono text-[0.65rem] py-1 px-2 bg-bg/70 border border-border/60 text-muted tracking-[0.18em] uppercase clip-chip backdrop-blur-sm">
            {project.category}
          </div>
        )}
      </div>

      <div className="p-6 md:p-7 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[0.65rem] tracking-[0.24em] text-muted/60 uppercase">
            ID:{project.slug.toUpperCase().slice(0, 6)}
          </span>
          <span className="flex-1 h-px bg-border/30" />
        </div>

        <div className="font-mono text-[1.25rem] md:text-[1.35rem] text-fg tracking-[0.02em] mb-3 leading-tight group-hover:text-accent transition-colors">
          {project.title}
        </div>
        <p className="font-body text-fg/75 text-[1rem] leading-[1.6] mb-5 flex-1 line-clamp-3 overflow-hidden text-ellipsis">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.slice(0, 5).map((tag) => (
            <TagChip key={tag}>{tag}</TagChip>
          ))}
          {project.tags.length > 5 && (
            <span className="font-mono text-[0.72rem] text-muted/60 tracking-[0.1em] py-[0.28rem]">
              +{project.tags.length - 5}
            </span>
          )}
        </div>
        <div className="inline-flex self-start items-center gap-2 font-mono text-[0.78rem] tracking-[0.22em] uppercase py-2 px-3.5 border border-border/70 text-muted bg-bg/40 clip-btn group-hover:text-bg group-hover:bg-accent group-hover:border-accent group-hover:shadow-[0_0_22px_var(--color-glow-c)] transition-all duration-300">
          <span>{t("viewProject")}</span>
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
