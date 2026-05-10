import { getTranslations, getLocale } from "next-intl/server";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { StackChip } from "@/components/ui/StackChip";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { getStacks } from "@/data";
import type { Locale } from "@/i18n/routing";

export async function StacksSection() {
  const locale = (await getLocale()) as Locale;
  const stacksData = getStacks(locale);
  const t = await getTranslations({ locale, namespace: "stacks" });

  const totalModules = stacksData.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <section id="stacks" className="py-[calc(80px+4rem)] pb-[8rem] overflow-x-hidden">
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
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-16 relative">
          {/* Background Decorative Element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-px bg-gradient-to-r from-transparent via-border/30 to-transparent -rotate-1 opacity-50" />

          {stacksData.map((category, idx) => (
            <ScrollReveal
              key={category.id}
              className="group relative"
              delay={idx * 0.1}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="font-mono text-[0.65rem] py-1 px-2 border border-accent/30 text-accent bg-accent/5 tracking-tighter uppercase clip-chip">
                  {`CAT-${(idx + 1).toString().padStart(2, "0")}`}
                </div>
                <h3 className="font-mono text-xs text-fg tracking-[0.2em] uppercase font-bold">
                  {category.label}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-border/50 to-transparent" />
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.items.map((item) => (
                  <StackChip key={item.name} name={item.name} icon={item.icon} />
                ))}
              </div>

              {/* Side Accent Line */}
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-border/0 via-border/50 to-border/0 group-hover:via-accent/50 transition-all duration-700" />

              {/* Bottom Counter (Cyberpunk Style) */}
              <div className="mt-6 flex justify-end">
                <span className="font-mono text-[0.6rem] text-muted/30 group-hover:text-accent/40 transition-colors">
                  {t("statusReady", { count: category.items.length })}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Final Visual Polish */}
        <div className="mt-20 pt-10 border-t border-border/10 flex justify-between items-center opacity-30 font-mono text-[0.6rem] tracking-widest text-muted">
          <span>{t("core")}</span>
          <div className="flex gap-4">
            <span>{"// 0x01_STACKS"}</span>
            <span>{"// 0x02_PROJECTS"}</span>
            <span>{"// 0x03_CONTACT"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
