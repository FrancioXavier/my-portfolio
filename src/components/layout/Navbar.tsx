"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import profile from "@/data/profile.json";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  // usePathname from next-intl/routing strips the locale prefix
  const isHome = pathname === "/";

  // Context-aware back link using translated labels
  const backTarget = (() => {
    if (pathname?.startsWith("/experience/")) {
      return { href: "/#experience" as const, label: t("back.experience") };
    }
    if (pathname?.startsWith("/projects/")) {
      return { href: "/#projects" as const, label: t("back.projects") };
    }
    return { href: "/" as const, label: t("back.home") };
  })();

  const navIds = ["stacks", "experience", "projects", "contact"] as const;

  const socialIconConfigs = {
    GH: "simple-icons:github",
    LI: "logos:linkedin-icon",
    EM: "logos:google-gmail",
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-3.5 px-[clamp(1rem,4vw,2rem)] bg-bg/85 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href="/"
        className="font-mono text-[0.78rem] text-accent no-underline tracking-[0.12em] drop-shadow-[0_0_12px_var(--color-glow-c)] whitespace-nowrap"
      >
        SYS<span className="text-accent-2">://</span>FRANCIO_XAVIER
        <span className="animate-blink">_</span>
      </Link>

      <div className="flex items-center gap-4 md:gap-8">
        {isHome ? (
          <ul className="hidden md:flex gap-7 list-none m-0 p-0">
            {navIds.map((id, i) => (
              <li key={id}>
                <motion.a
                  href={`#${id}`}
                  className="relative group font-mono text-[0.72rem] text-muted uppercase tracking-[0.1em] transition-colors duration-300 hover:text-accent"
                  whileHover={{ y: -2 }}
                >
                  <span className="text-accent/60 mr-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative z-10">{t(id)}</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[1px] bg-accent shadow-[0_0_8px_var(--color-glow-c)]"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </li>
            ))}
          </ul>
        ) : (
          <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
            <Link
              href={backTarget.href}
              className="font-mono text-[0.72rem] text-muted uppercase tracking-[0.1em] transition-colors hover:text-accent hover:drop-shadow-[0_0_8px_var(--color-glow-c)]"
            >
              {backTarget.label}
            </Link>
          </motion.div>
        )}

        <div className="flex items-center gap-3">
          {/* Social icons */}
          <div className="hidden sm:flex items-center gap-1 border-r border-border pr-4 mr-1">
            {profile.social.map((item) => {
              const iconName =
                socialIconConfigs[item.icon as keyof typeof socialIconConfigs];
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-muted hover:text-accent transition-all duration-200 hover:drop-shadow-[0_0_8px_var(--color-glow-c)] p-2 hover:bg-accent/5 rounded-sm flex items-center justify-center"
                  aria-label={item.label}
                  title={item.label}
                >
                  {iconName && (
                    <div className="relative w-4 h-4 transition-all duration-300">
                      <Image
                        src={`https://api.iconify.design/${iconName}.svg`}
                        alt={`${item.label} icon`}
                        width={16}
                        height={16}
                        className={`w-full h-full object-contain ${item.icon === "GH" ? "brightness-0 invert" : ""}`}
                        unoptimized
                      />
                    </div>
                  )}
                </a>
              );
            })}
          </div>

          {/* Locale switcher */}
          <LocaleSwitcher />

          {/* Available for hire pill */}
          <div className="hidden md:flex font-mono text-[0.62rem] text-green items-center gap-2 tracking-[0.08em]">
            <div className="w-1.5 h-1.5 bg-green rounded-full animate-status-pulse" />
            {t("availableForHire")}
          </div>
        </div>
      </div>

      <ScrollProgress />
    </motion.nav>
  );
}
