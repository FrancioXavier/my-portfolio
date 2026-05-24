import { getTranslations, getLocale } from "next-intl/server";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { StacksMatrix } from "@/components/sections/StacksMatrix";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { InspectTip } from "@/components/ui/InspectTip";
import { getStacks } from "@/data";
import type { Locale } from "@/i18n/routing";

export async function StacksSection() {
  const locale = (await getLocale()) as Locale;
  const stacksData = getStacks(locale);
  const t = await getTranslations({ locale, namespace: "stacks" });

  const totalModules = stacksData.reduce((sum, c) => sum + c.items.length, 0);
  const totalYears = stacksData.reduce(
    (sum, c) => sum + c.items.reduce((s, i) => s + i.years, 0),
    0,
  );

  return (
    <section
      id="stacks"
      className="relative py-[calc(80px+4rem)] pb-[8rem] overflow-x-hidden"
    >
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"
      />

      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] w-full">
        <ScrollReveal>
          <SectionHeader
            number="01"
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
            count={t("count", {
              categories: stacksData.length,
              modules: totalModules,
            })}
            tip={<InspectTip>{t("inspectTip")}</InspectTip>}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <StacksMatrix stacks={stacksData} />
        </ScrollReveal>

        <div className="mt-20 pt-8 border-t border-border/15 flex justify-between items-center flex-wrap gap-4 opacity-60 font-mono text-[0.6rem] tracking-[0.22em] text-muted">
          <span>{t("core")}</span>
          <span className="text-accent/70">
            {t("aggregate", { years: totalYears })}
          </span>
        </div>
      </div>
    </section>
  );
}
