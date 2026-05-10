import { getTranslations, getLocale } from "next-intl/server";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { CyberpunkButton } from "@/components/ui/CyberpunkButton";
import { ContactForm } from "@/features/contact";
import { getProfile } from "@/data";
import type { Locale } from "@/i18n/routing";

export async function ContactSection() {
  const locale = (await getLocale()) as Locale;
  const profile = getProfile(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  const labels: Record<string, string> = {
    GH: t("labels.GH"),
    LI: t("labels.LI"),
    EM: t("labels.EM"),
  };

  return (
    <section
      id="contact"
      className="py-[calc(80px+4rem)] pb-[5rem] border-t border-border mt-10 overflow-x-hidden relative"
    >
      {/* Decorative top corner brackets */}
      <div
        className="absolute top-8 left-[clamp(1.25rem,5vw,4rem)] w-4 h-4 border-l border-t border-accent/40"
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-[clamp(1.25rem,5vw,4rem)] w-4 h-4 border-r border-t border-accent/40"
        aria-hidden="true"
      />

      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] w-full">
        <ScrollReveal>
          <div className="text-center mb-14">
            <div className="font-mono text-[0.66rem] tracking-[0.32em] uppercase text-accent mb-4 flex items-center justify-center gap-3">
              <span className="w-10 h-px bg-accent/40" />
              <span>{t("endOfFile")}</span>
              <span className="w-10 h-px bg-accent/40" />
            </div>
            <h2 className="font-mono text-[clamp(2.4rem,5vw,3.4rem)] leading-[1] tracking-[0.05em] text-fg drop-shadow-[0_0_20px_var(--color-glow-c)] mb-5">
              {t("title")}
            </h2>
            <p className="text-muted font-body text-[0.95rem] max-w-[520px] mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-14 items-start">
            {/* Left rail: external links + system panel */}
            <div className="order-2 lg:order-1 flex flex-col gap-8 text-left">
              <div>
                <h3 className="font-mono text-[0.78rem] text-accent mb-5 uppercase tracking-[0.22em] flex items-center gap-3">
                  <span className="text-border">{"//"}</span>
                  {t("externalLinksHeader")}
                  <span className="flex-1 h-px bg-border/40" />
                </h3>
                <div className="flex flex-col gap-3">
                  {profile.social.map((item) => (
                    <CyberpunkButton
                      key={item.icon}
                      href={item.href}
                      variant="ghost"
                      className="w-full justify-between"
                    >
                      <span>{labels[item.icon] || item.label}</span>
                      <span className="opacity-60 text-[0.6rem] tracking-[0.18em]">
                        ↗
                      </span>
                    </CyberpunkButton>
                  ))}
                </div>
              </div>

              <div className="relative p-6 bg-surface-2/40 border-l-2 border-accent/40 font-mono text-[0.78rem] text-muted leading-loose backdrop-blur-sm clip-card overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-accent) 1px, transparent 1px)",
                    backgroundSize: "100% 4px",
                  }}
                />
                <p className="mb-1">
                  <span className="text-accent">&gt;</span>{" "}
                  {t("panel.establishing")}
                </p>
                <p className="mb-1">
                  <span className="text-accent">&gt;</span>{" "}
                  {t("panel.responseTime")}{" "}
                  <span className="text-fg">{t("panel.responseValue")}</span>
                </p>
                <p className="mb-1">
                  <span className="text-accent">&gt;</span>{" "}
                  {t("panel.location")}{" "}
                  <span className="text-fg">{t("panel.locationValue")}</span>
                </p>
                <p className="mb-1">
                  <span className="text-accent">&gt;</span>{" "}
                  {t("panel.timezone")}{" "}
                  <span className="text-fg">{t("panel.timezoneValue")}</span>
                </p>
                <p className="mt-3 text-accent-2 font-bold">
                  {t("panel.ready")}
                  <span className="animate-blink">_</span>
                </p>
              </div>
            </div>

            {/* Right: contact form */}
            <div className="order-1 lg:order-2">
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
