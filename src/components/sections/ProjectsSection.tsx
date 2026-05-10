import { getTranslations, getLocale } from "next-intl/server";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { getProjects } from "@/data";
import type { Locale } from "@/i18n/routing";

export async function ProjectsSection() {
  const locale = (await getLocale()) as Locale;
  const projectsData = getProjects(locale);
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <section
      id="projects"
      className="py-[calc(80px+4rem)] pb-[5rem] overflow-x-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] w-full">
        <ScrollReveal>
          <SectionHeader
            number="03"
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
            count={t("count", {
              count: String(projectsData.length).padStart(2, "0"),
            })}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, idx) => (
            <ScrollReveal
              key={project.slug}
              className={`h-full ${idx === 0 || idx === 3 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
