import { getTranslations, getLocale } from "next-intl/server";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { EducationCard } from "@/components/cards/EducationCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { getEducation } from "@/data";
import type { Locale } from "@/i18n/routing";

export async function EducationSection() {
  const locale = (await getLocale()) as Locale;
  const educationData = getEducation(locale);
  const t = await getTranslations({ locale, namespace: "education" });
  const isSingle = educationData.length === 1;

  return (
    <section
      id="education"
      className="py-[calc(80px+4rem)] pb-[5rem] overflow-x-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] w-full">
        <ScrollReveal>
          <SectionHeader
            number="04"
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
            count={t("count", {
              count: String(educationData.length).padStart(2, "0"),
            })}
          />
        </ScrollReveal>

        <div
          className={
            isSingle
              ? "max-w-[640px]"
              : "grid grid-cols-1 md:grid-cols-2 gap-6"
          }
        >
          {educationData.map((education, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <EducationCard education={education} activeLabel={t("active")} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
