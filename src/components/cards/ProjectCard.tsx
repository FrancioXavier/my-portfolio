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
    "h-[160px] relative border-b border-border overflow-hidden",
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
      className="flex flex-col bg-surface border border-border clip-card transition-all duration-300 group hover:-translate-y-1 hover:border-accent hover:shadow-[0_10px_30px_var(--color-glow-c)] h-full relative"
    >
      <div className={thumbClasses}>
        <div
          className="absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20"
          style={gridStyle}
        />

        {/* Center monogram */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-4xl font-bold tracking-[0.1em] text-border group-hover:text-accent-2 transition-colors duration-300">
          [{project.preview}]
        </div>

        {/* Diagonal scanline that animates on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute -inset-1/2 rotate-12 bg-gradient-to-b from-transparent via-accent/10 to-transparent translate-y-full group-hover:translate-y-[-50%] transition-transform duration-1000" />
        </div>

        {/* Status badge */}
        <div
          className={clsx(
            "absolute top-3 right-3 font-mono text-[0.6rem] py-1 px-2 border tracking-[0.06em]",
            isWip
              ? "border-accent-3 text-accent-3 bg-accent-3/10"
              : "border-green text-green bg-green/10",
          )}
        >
          {isWip ? t("wip") : t("live")}
        </div>

        {/* Category badge */}
        {project.category && (
          <div className="absolute top-3 left-3 font-mono text-[0.55rem] py-0.5 px-1.5 bg-bg/70 border border-border/60 text-muted tracking-[0.16em] uppercase clip-chip backdrop-blur-sm">
            {project.category}
          </div>
        )}
      </div>

      <div className="p-6 md:p-7 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[0.55rem] tracking-[0.22em] text-muted/60 uppercase">
            ID:{project.slug.toUpperCase().slice(0, 6)}
          </span>
          <span className="flex-1 h-px bg-border/30" />
        </div>

        <div className="font-mono text-lg text-fg tracking-[0.05em] mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </div>
        <p className="font-body text-muted text-[0.88rem] leading-[1.6] mb-5 flex-1 line-clamp-3 overflow-hidden text-ellipsis">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 5).map((tag) => (
            <TagChip key={tag}>{tag}</TagChip>
          ))}
          {project.tags.length > 5 && (
            <span className="font-mono text-[0.6rem] text-muted/60 tracking-[0.08em] py-[0.2rem]">
              +{project.tags.length - 5}
            </span>
          )}
        </div>
        <div className="font-mono text-[0.66rem] tracking-[0.15em] text-accent uppercase flex items-center gap-2 transition-all duration-300 group-hover:tracking-[0.2em]">
          <span>{t("viewProject")}</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
