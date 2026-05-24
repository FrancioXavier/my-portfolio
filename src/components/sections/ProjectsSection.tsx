import { getTranslations, getLocale } from "next-intl/server";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { FeaturedProjectCard } from "@/components/cards/FeaturedProjectCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { getProjects } from "@/data";
import type { Locale } from "@/i18n/routing";

export async function ProjectsSection() {
  const locale = (await getLocale()) as Locale;
  const projectsData = getProjects(locale);
  const t = await getTranslations({ locale, namespace: "projects" });

  const featured =
    projectsData.find((p) => p.featured) ?? projectsData[0];
  const rest = projectsData.filter((p) => p.slug !== featured?.slug);

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

        {featured && (
          <ScrollReveal>
            <FeaturedProjectCard
              project={featured}
              labels={{
                featured: t("featuredLabel"),
                viewDetails: t("featuredViewDetails"),
                launchApp: t("page.launchApp"),
                wip: t("page.wipFull"),
                live: t("page.liveFull"),
                stack: t("featuredStack"),
                terminalTitle: t("featuredTerminalTitle"),
              }}
            />
          </ScrollReveal>
        )}

        {rest.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="font-mono text-[0.65rem] py-1 px-2 border border-accent/40 text-accent bg-accent/5 tracking-tight uppercase clip-chip">
                {t("archiveTag")}
              </div>
              <h3 className="font-mono text-xs text-fg tracking-[0.22em] uppercase font-bold">
                {t("archiveHeader")}
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent" />
              <span className="font-mono text-[0.62rem] text-muted/55 tracking-[0.2em]">
                {t("count", {
                  count: String(rest.length).padStart(2, "0"),
                })}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((project, idx) => (
                <ScrollReveal
                  key={project.slug}
                  className="h-full"
                  delay={idx * 0.05}
                >
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
