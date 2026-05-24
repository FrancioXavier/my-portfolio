import { Link } from "@/i18n/routing";
import type { Project } from "@/types/content";

interface FeaturedProjectCardProps {
  project: Project;
  labels: {
    featured: string;
    viewDetails: string;
    launchApp: string;
    wip: string;
    live: string;
    stack: string;
    terminalTitle: string;
  };
}

export function FeaturedProjectCard({
  project,
  labels,
}: FeaturedProjectCardProps) {
  const isWip = project.status === "wip";
  const statusLabel = isWip ? labels.wip : labels.live;
  const statusGlyph = isWip ? "◐" : "●";
  const statusColor = isWip ? "text-accent-3" : "text-green";

  const topStack = project.tags.slice(0, 4);
  const demoHref = project.links?.demo && project.links.demo !== "#"
    ? project.links.demo
    : undefined;

  return (
    <div className="relative w-full">
      <div
        aria-hidden
        className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,var(--color-glow-c)_0%,transparent_65%)] opacity-30 blur-2xl pointer-events-none"
      />

      <div className="relative bg-[oklch(9%_0.025_240/0.92)] border border-border/80 rounded-[10px] overflow-hidden backdrop-blur-md shadow-[0_30px_80px_-30px_oklch(0%_0_0/0.9),_0_0_0_1px_oklch(82%_0.22_195/0.08)_inset]">
        <div className="relative flex items-center h-10 px-4 bg-[oklch(13%_0.03_235/0.95)] border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_oklch(0%_0_0/0.3)]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_oklch(0%_0_0/0.3)]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_oklch(0%_0_0/0.3)]" />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[0.78rem] text-muted/85 tracking-[0.14em] truncate max-w-[60%]">
            {labels.terminalTitle}
          </span>
          <span className="ml-auto font-mono text-[0.62rem] tracking-[0.28em] text-accent-2 uppercase">
            [★ {labels.featured}]
          </span>
        </div>

        <div className="relative font-mono text-[clamp(0.92rem,1.05vw,1.05rem)] leading-[1.85] text-fg/95 px-6 md:px-10 py-7 md:py-9">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent_0,transparent_3px,oklch(82%_0.22_195/0.025)_3px,oklch(82%_0.22_195/0.025)_4px)]"
          />

          <div className="relative flex flex-col gap-5 max-w-[920px]">
            <div className="text-muted/70 truncate">
              <span className="text-accent">$</span>{" "}
              <span className="text-fg/80">cat</span>{" "}
              <span className="text-accent-2">{project.slug}.json</span>{" "}
              <span className="text-muted/60">--pretty</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="font-mono text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.05] tracking-[0.02em] text-fg drop-shadow-[0_0_18px_var(--color-glow-c)]">
                {project.title.toUpperCase()}
              </h3>
              <div className="flex items-center flex-wrap gap-3 text-[0.92rem] tracking-[0.04em]">
                <span className="text-accent-2/60">▸</span>
                <span className="text-muted">{project.category}</span>
                <span className="text-border/60">·</span>
                <span className={`${statusColor} inline-flex items-center gap-1.5`}>
                  <span aria-hidden>{statusGlyph}</span>
                  {statusLabel}
                </span>
              </div>
            </div>

            <p className="font-body text-fg/80 text-[clamp(1rem,1.15vw,1.15rem)] leading-[1.65] max-w-[680px]">
              {project.description}
            </p>

            <div className="flex items-center flex-wrap gap-2 text-[0.88rem]">
              <span className="text-accent-2/60 mr-1">▸</span>
              <span className="text-muted/80 mr-1">{labels.stack}:</span>
              {topStack.map((tag, i) => (
                <span key={tag} className="inline-flex items-center gap-2">
                  <span className="text-fg/90">{tag}</span>
                  {i < topStack.length - 1 && (
                    <span className="text-border/70">·</span>
                  )}
                </span>
              ))}
              {project.tags.length > topStack.length && (
                <span className="text-muted/50 ml-1">
                  +{project.tags.length - topStack.length}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <Link
                href={`/projects/${project.slug}` as `/projects/${string}`}
                className="inline-flex items-center gap-2 font-mono text-[0.82rem] tracking-[0.18em] uppercase py-2.5 px-4 bg-accent text-bg clip-btn hover:shadow-[0_0_28px_var(--color-glow-c)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 btn-scanline"
              >
                <span className="text-bg/70">{">"}</span>
                <span>{labels.viewDetails}</span>
                <span aria-hidden>→</span>
              </Link>
              {demoHref && (
                <a
                  href={demoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[0.82rem] tracking-[0.18em] uppercase py-2.5 px-4 border border-border/70 text-muted bg-bg/40 clip-btn hover:text-accent hover:border-accent hover:shadow-[0_0_20px_var(--color-glow-c)] transition-all duration-300"
                >
                  <span>{labels.launchApp}</span>
                  <span aria-hidden className="text-accent-2/80">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
