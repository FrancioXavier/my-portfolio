"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";

const locales = ["en", "pt"] as const;

/**
 * Locale switcher — cyberpunk styled, persists choice to localStorage.
 * Uses next-intl Link to preserve the current path when switching.
 */
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  function handleSwitch(target: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", target);
    }
  }

  return (
    <div
      className="flex items-center gap-1 font-mono text-[0.62rem] tracking-[0.14em] border border-border/60 clip-chip"
      aria-label="Language switcher"
    >
      {locales.map((loc, idx) => {
        const isActive = loc === locale;
        return (
          <span key={loc} className="flex items-center">
            {idx > 0 && (
              <span className="text-border/60 select-none px-0.5">|</span>
            )}
            {isActive ? (
              <span className="py-1 px-2 text-accent drop-shadow-[0_0_6px_var(--color-glow-c)] cursor-default select-none">
                {loc.toUpperCase()}
              </span>
            ) : (
              <Link
                href={pathname}
                locale={loc}
                className="py-1 px-2 text-muted hover:text-accent transition-colors duration-200"
                onClick={() => handleSwitch(loc)}
              >
                {loc.toUpperCase()}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
