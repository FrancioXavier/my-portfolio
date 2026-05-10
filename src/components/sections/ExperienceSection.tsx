import { getTranslations, getLocale } from "next-intl/server";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { getExperiences } from "@/data";
import type { Locale } from "@/i18n/routing";

export async function ExperienceSection() {
  const locale = (await getLocale()) as Locale;
  const experiencesData = getExperiences(locale);
  const t = await getTranslations({ locale, namespace: "experience" });

  return (
    <section
      id="experience"
      className="py-[calc(80px+4rem)] pb-[5rem] overflow-x-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] w-full">
        <ScrollReveal>
          <SectionHeader
            number="02"
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
            count={t("count", {
              count: String(experiencesData.length).padStart(2, "0"),
            })}
          />
        </ScrollReveal>

        <div className="flex flex-col gap-6 relative before:content-[''] before:absolute before:left-8 before:top-4 before:bottom-4 before:w-[1px] before:bg-border before:-z-10 md:before:hidden">
          {experiencesData.map((experience) => (
            <ScrollReveal key={experience.slug}>
              <ExperienceCard experience={experience} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
