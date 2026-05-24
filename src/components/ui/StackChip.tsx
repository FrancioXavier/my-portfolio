import Image from "next/image";

interface StackChipProps {
  name: string;
  icon?: string;
  years?: number;
  categoryCode?: string;
  onInspect?: () => void;
  inspectLabel?: string;
}

function getIconUrl(name: string, icon?: string) {
  const slug = icon || name.toLowerCase().replace(/\./g, "dot").replace(/\s+/g, "");
  const mapping: Record<string, string> = {
    nodedotjs: "nodejs",
    nextdotjs: "nextjs",
    vuedotjs: "vuejs",
    googlecloud: "googlecloud",
    amazonwebservices: "amazonwebservices",
    linux: "linux",
    github: "github",
    githubactions: "github",
    golang: "go",
    typescript: "typescript",
    postgresql: "postgresql",
    mysql: "mysql",
    redis: "redis",
    docker: "docker",
    laravel: "laravel",
    cloudflare: "cloudflare",
    aws: "amazonwebservices",
    gcp: "googlecloud",
    react: "react",
    tailwindcss: "tailwindcss",
    mongodb: "mongodb",
    nginx: "nginx",
    kubernetes: "kubernetes",
    grafana: "grafana",
    prometheus: "prometheus",
  };
  return `https://api.iconify.design/devicon:${mapping[slug] || slug}.svg`;
}

export function StackChip({
  name,
  icon,
  years,
  categoryCode,
  onInspect,
  inspectLabel,
}: StackChipProps) {
  if (years === undefined) {
    return (
      <div className="group relative font-mono inline-flex items-center gap-2 py-2 px-3 bg-surface/50 border border-border/60 text-muted clip-chip transition-all duration-300 hover:text-fg hover:border-accent hover:-translate-y-0.5 hover:bg-surface backdrop-blur-sm">
        {name && (
          <div className="w-4 h-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Image
              src={getIconUrl(name, icon)}
              alt={`${name} icon`}
              width={16}
              height={16}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
        )}
        <span className="text-[0.85rem] sm:text-[0.88rem] tracking-[0.04em]">{name}</span>
      </div>
    );
  }

  const yearLabel = years.toString().padStart(2, "0");
  const interactive = typeof onInspect === "function";
  const Tag = interactive ? "button" : "div";
  const interactiveProps = interactive
    ? {
        type: "button" as const,
        onClick: onInspect,
        "aria-label": inspectLabel ? `${inspectLabel}: ${name}` : name,
      }
    : {};

  return (
    <Tag
      {...interactiveProps}
      className="group relative font-mono flex flex-col bg-surface/60 border border-border/60 clip-card transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:bg-surface backdrop-blur-sm overflow-hidden h-[115px] sm:h-[120px] w-full text-left cursor-pointer focus-visible:border-accent focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-glow-c)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/[0.05] to-accent-2/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div
        aria-hidden
        className="absolute -top-px -right-px w-[28px] h-[14px] bg-border/40 group-hover:bg-accent transition-colors duration-300"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
      />

      {categoryCode && (
        <div className="absolute top-2.5 left-3 z-10 font-mono text-[0.65rem] tracking-[0.22em] text-muted/50 group-hover:text-accent-2 transition-colors duration-300">
          [{categoryCode}]
        </div>
      )}

      <div className="relative z-10 flex items-center gap-3 px-4 sm:px-5 pt-8">
        {name && (
          <div className="w-7 h-7 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
            <Image
              src={getIconUrl(name, icon)}
              alt={`${name} icon`}
              width={28}
              height={28}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
        )}
        <span className="text-[1.05rem] text-fg tracking-[0.02em] truncate">{name}</span>
      </div>

      <div className="relative z-10 mt-auto flex items-end justify-end gap-2 px-4 sm:px-5 pb-3 sm:pb-3.5">
        <div className="flex flex-col items-end leading-none">
          <span className="font-mono text-[1.6rem] sm:text-[1.8rem] text-accent drop-shadow-[0_0_12px_var(--color-glow-c)] leading-none tabular-nums tracking-[-0.04em]">
            {yearLabel}
          </span>
          <span className="font-mono text-[0.62rem] text-accent-2 tracking-[0.24em] mt-1">
            YRS
          </span>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent via-accent-2 to-transparent group-hover:w-full transition-[width] duration-700 ease-out"
      />
    </Tag>
  );
}
