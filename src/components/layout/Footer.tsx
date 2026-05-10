import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getProfile } from "@/data";
import type { Locale } from "@/i18n/routing";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const profile = getProfile(locale);
  const t = await getTranslations({ locale, namespace: "footer" });
  const year = new Date().getFullYear();

  const marqueeItems = t.raw("marquee") as string[];

  const navItems = [
    { id: "stacks", label: t("nav.stacks") },
    { id: "experience", label: t("nav.experience") },
    { id: "projects", label: t("nav.projects") },
    { id: "contact", label: t("nav.contact") },
  ];

  return (
    <footer className="relative mt-24 border-t border-border bg-bg">
      {/* Top rail glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden="true"
      />

      {/* Marquee tagline */}
      <div className="overflow-hidden border-b border-border/60 py-2 bg-surface/30">
        <div className="marquee-track font-mono text-[0.62rem] tracking-[0.32em] text-muted/40 uppercase">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex shrink-0 items-center gap-10 px-5">
              {marqueeItems.map((label) => (
                <span key={`${group}-${label}`} className="flex items-center gap-3">
                  <span className="text-accent">▸</span>
                  <span>{label}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="md:col-span-2">
          <div className="font-mono text-[0.78rem] text-accent tracking-[0.12em] drop-shadow-[0_0_12px_var(--color-glow-c)] mb-3">
            SYS<span className="text-accent-2">://</span>{profile.name}
            <span className="animate-blink">_</span>
          </div>
          <p className="font-body text-muted text-[0.86rem] leading-[1.7] max-w-[420px]">
            {profile.bio}
          </p>

          <div className="mt-5 flex items-center gap-2 font-mono text-[0.62rem] text-green tracking-[0.12em]">
            <span className="w-1.5 h-1.5 bg-green rounded-full animate-status-pulse" />
            {t("available")}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div className="font-mono text-[0.62rem] text-accent tracking-[0.22em] uppercase mb-3 pb-2 border-b border-border/50">
            {t("navigationHeader")}
          </div>
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {navItems.map((item, i) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}` as "/"}
                  className="font-mono text-[0.72rem] text-muted hover:text-accent transition-colors flex items-center gap-2 group"
                >
                  <span className="text-accent/60 text-[0.6rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <div className="font-mono text-[0.62rem] text-accent tracking-[0.22em] uppercase mb-3 pb-2 border-b border-border/50">
            {t("externalLinksHeader")}
          </div>
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {profile.social.map((item) => (
              <li key={item.icon}>
                <a
                  href={item.href}
                  target={item.icon === "EM" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="font-mono text-[0.72rem] text-muted hover:text-accent transition-colors flex items-center gap-2 group"
                >
                  <span className="text-accent/60 text-[0.6rem]">↗</span>
                  <span className="group-hover:translate-x-0.5 transition-transform truncate max-w-[200px]">
                    {item.icon === "EM"
                      ? item.label
                      : item.label.replace(/^.*\//, "")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-border/60 px-[clamp(1.25rem,5vw,4rem)] py-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3 font-mono text-[0.6rem] text-muted/70 tracking-[0.14em]">
        <span>
          © {year} <span className="text-accent">{profile.name}</span> ·{" "}
          {t("rights")}
        </span>
        <span className="flex items-center gap-3">
          <span className="text-muted/50">PORTFOLIO_OS</span>
          <span className="text-border">|</span>
          <span className="text-muted/50">
            build.{year}.{String(new Date().getMonth() + 1).padStart(2, "0")}
          </span>
          <span className="text-border">|</span>
          <span className="text-green">{t("nominal")}</span>
        </span>
      </div>
    </footer>
  );
}
