import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { getAbout } from "@/data";
import type { Locale } from "@/i18n/routing";

export async function AboutOrbitSection() {
  const locale = (await getLocale()) as Locale;
  const about = getAbout(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  // pseudo-random but deterministic azimuths for the radar pings
  const azimuths = [42, 96, 154, 208, 312, 22, 268, 132];

  return (
    <section
      id="about-orbit"
      className="relative py-[calc(80px+4rem)] pb-[7rem] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"
      />

      {/* atmospheric backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(82% 0.22 195 / 0.07), transparent 60%)",
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] w-full">
        <ScrollReveal>
          <div className="font-mono text-[0.66rem] tracking-[0.32em] uppercase text-green flex items-center gap-3 mb-12">
            <span className="w-2 h-2 bg-green rounded-full animate-status-pulse" />
            <span>{t("orbit.marker")}</span>
            <span className="flex-1 h-px bg-gradient-to-r from-green/40 via-border/20 to-transparent" />
            <span className="text-muted/70">{t("orbit.reticle")}</span>
          </div>
        </ScrollReveal>

        {/* asymmetric grid: bio | reticle | telemetry */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
          {/* LEFT — bio panel, lower */}
          <ScrollReveal>
            <div className="lg:mt-28 relative">
              <header className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-accent flex items-center gap-3 mb-4">
                <span className="w-3 h-px bg-accent" />
                <span>{t("orbit.operator")}</span>
              </header>
              <div className="relative bg-surface-2/30 backdrop-blur-sm border border-border/60 p-6 clip-card">
                <span aria-hidden className="absolute -top-px -left-px w-6 h-6 border-t border-l border-accent" />
                <span aria-hidden className="absolute -bottom-px -right-px w-6 h-6 border-b border-r border-accent" />
                <div className="space-y-4">
                  {about.summary.map((p, i) => (
                    <p
                      key={i}
                      className="text-fg/90 font-body text-[0.92rem] leading-[1.75]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between font-mono text-[0.6rem] tracking-[0.22em]">
                  <span className="text-accent">{about.callsign}</span>
                  <span className="text-muted/70">{about.location}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* CENTER — reticle portrait */}
          <ScrollReveal delay={0.05}>
            <div className="relative flex flex-col items-center">
              <div className="relative w-[min(420px,100%)] aspect-square">
                {/* rotating tickmarks ring */}
                <svg
                  aria-hidden
                  viewBox="0 0 400 400"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ animation: "spin 80s linear infinite" }}
                >
                  <defs>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); transform-origin: 200px 200px; } }`}</style>
                  </defs>
                  <g stroke="oklch(82% 0.22 195 / 0.55)" strokeWidth="1">
                    {Array.from({ length: 60 }).map((_, i) => {
                      const angle = (i * 6 * Math.PI) / 180;
                      const r1 = 196;
                      const r2 = i % 5 === 0 ? 182 : 190;
                      const x1 = 200 + Math.cos(angle) * r1;
                      const y1 = 200 + Math.sin(angle) * r1;
                      const x2 = 200 + Math.cos(angle) * r2;
                      const y2 = 200 + Math.sin(angle) * r2;
                      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                    })}
                  </g>
                  <g
                    fill="oklch(82% 0.22 195)"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="9"
                    opacity="0.8"
                  >
                    <text x="200" y="20" textAnchor="middle">N · 000</text>
                    <text x="386" y="204" textAnchor="end">E · 090</text>
                    <text x="200" y="394" textAnchor="middle">S · 180</text>
                    <text x="14" y="204">W · 270</text>
                  </g>
                </svg>

                {/* outer ring */}
                <svg
                  aria-hidden
                  viewBox="0 0 400 400"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="170"
                    fill="none"
                    stroke="oklch(82% 0.22 195 / 0.25)"
                    strokeWidth="1"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="148"
                    fill="none"
                    stroke="oklch(68% 0.28 320 / 0.30)"
                    strokeWidth="1"
                    strokeDasharray="2 6"
                  />
                </svg>

                {/* portrait disc */}
                <div className="absolute inset-[14%] rounded-full overflow-hidden border-2 border-accent/60 shadow-[0_0_60px_var(--color-glow-c),inset_0_0_40px_oklch(8%_0.04_280)] bg-bg">
                  <Image
                    src={about.photo}
                    alt={about.photoAlt}
                    fill
                    sizes="(max-width: 1024px) 80vw, 420px"
                    className="object-cover"
                  />
                </div>

                {/* corner crosshair brackets outside reticle */}
                <span aria-hidden className="absolute top-0 left-0 w-5 h-5 border-t border-l border-accent" />
                <span aria-hidden className="absolute top-0 right-0 w-5 h-5 border-t border-r border-accent" />
                <span aria-hidden className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-accent" />
                <span aria-hidden className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-accent" />
              </div>

              {/* callsign nameplate */}
              <div className="relative mt-6 px-5 py-2 border border-accent/40 bg-surface-2/40 clip-chip font-mono text-[0.78rem] tracking-[0.26em] text-accent flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-green rounded-full animate-status-pulse" />
                {about.callsign}
                <span className="text-muted/60 text-[0.6rem]">· {about.id}</span>
              </div>
              <div className="mt-2 font-mono text-[0.62rem] tracking-[0.28em] text-muted/70">
                {about.role}
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT — anomaly log (curiosities) */}
          <ScrollReveal delay={0.1}>
            <div className="lg:mt-12">
              <header className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-accent-2 flex items-center gap-3 mb-4">
                <span className="w-3 h-px bg-accent-2" />
                <span>{t("orbit.anomaly")}</span>
              </header>
              <ol className="relative space-y-3 pl-6 border-l border-dashed border-accent-2/30">
                {about.curiosities.map((c, i) => (
                  <li key={i} className="relative">
                    {/* ping dot */}
                    <span
                      aria-hidden
                      className="absolute -left-[31px] top-2.5 w-3 h-3 rounded-full bg-accent-2/30 border border-accent-2"
                    >
                      <span className="absolute inset-0 rounded-full bg-accent-2/60 animate-ping" />
                    </span>
                    <div className="bg-surface-2/30 border border-border/40 p-3.5 clip-chip backdrop-blur-sm hover:border-accent-2/40 transition-colors">
                      <div className="flex items-center justify-between gap-3 mb-1.5 font-mono text-[0.58rem] tracking-[0.24em] uppercase">
                        <span className="text-accent-2/90">[{c.tag}]</span>
                        <span className="text-muted/60">
                          {t("orbit.azimuth")} {String(azimuths[i % azimuths.length]).padStart(3, "0")}°
                        </span>
                      </div>
                      <p className="text-fg/85 font-body text-[0.82rem] leading-snug">
                        {c.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>
        </div>

        {/* BOTTOM — telemetry gauges */}
        <ScrollReveal delay={0.15}>
          <div className="mt-16">
            <header className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-green flex items-center gap-3 mb-5">
              <span className="w-3 h-px bg-green" />
              <span>{t("orbit.telemetry")}</span>
              <span className="flex-1 h-px bg-gradient-to-r from-green/30 to-transparent" />
            </header>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {about.supplemental.map((row, i) => {
                const bars = 8;
                const filled = 4 + (i % 5);
                const colorClass =
                  i % 3 === 0 ? "text-accent" : i % 3 === 1 ? "text-accent-2" : "text-green";
                return (
                  <div
                    key={i}
                    className="relative p-4 bg-surface-2/30 border border-border/50 clip-chip backdrop-blur-sm"
                  >
                    <div className="font-mono text-[0.58rem] tracking-[0.24em] uppercase text-muted/70 mb-2">
                      {row.label}
                    </div>
                    <div className={`font-mono text-[0.78rem] tracking-[0.04em] ${colorClass} mb-3 leading-snug min-h-[2.4em]`}>
                      {row.value}
                    </div>
                    <div className="flex gap-[3px] items-end h-4">
                      {Array.from({ length: bars }).map((_, b) => (
                        <span
                          key={b}
                          className={`flex-1 ${
                            b < filled ? colorClass : "text-border"
                          }`}
                          style={{
                            background: "currentColor",
                            height: `${30 + (b * 70) / bars}%`,
                            opacity: b < filled ? 0.85 : 0.25,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
