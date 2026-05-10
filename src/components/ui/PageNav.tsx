"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface PageNavItem {
  href: string;
  label: string;
  meta?: string;
}

interface PageNavProps {
  prev?: PageNavItem | null;
  next?: PageNavItem | null;
  baseLabel?: string;
}

export function PageNav({ prev, next, baseLabel = "INDEX" }: PageNavProps) {
  const t = useTranslations("pageNav");

  return (
    <nav
      aria-label="Adjacent records"
      className="mt-20 pt-8 border-t border-border/60 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {prev ? (
        <Link
          href={prev.href as "/"}
          className="group relative bg-surface/40 border border-border p-5 clip-card transition-all duration-300 hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_10px_30px_var(--color-glow-c)] flex flex-col gap-1.5 text-left"
        >
          <span className="font-mono text-[0.6rem] tracking-[0.22em] text-muted uppercase flex items-center gap-2 group-hover:text-accent transition-colors">
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            {t("previous")} · {baseLabel}
          </span>
          <span className="font-mono text-[0.95rem] text-fg group-hover:text-accent transition-colors truncate">
            {prev.label}
          </span>
          {prev.meta && (
            <span className="font-mono text-[0.65rem] text-muted/70 tracking-[0.12em] truncate">
              {prev.meta}
            </span>
          )}
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={next.href as "/"}
          className="group relative bg-surface/40 border border-border p-5 clip-card transition-all duration-300 hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_10px_30px_var(--color-glow-c)] flex flex-col gap-1.5 text-right md:items-end"
        >
          <span className="font-mono text-[0.6rem] tracking-[0.22em] text-muted uppercase flex items-center gap-2 group-hover:text-accent transition-colors">
            {t("next")} · {baseLabel}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
          <span className="font-mono text-[0.95rem] text-fg group-hover:text-accent transition-colors truncate">
            {next.label}
          </span>
          {next.meta && (
            <span className="font-mono text-[0.65rem] text-muted/70 tracking-[0.12em] truncate">
              {next.meta}
            </span>
          )}
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}
    </nav>
  );
}
