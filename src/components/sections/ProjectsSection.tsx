import { SectionHeader } from '@/components/layout/SectionHeader';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import type { Project } from '@/types/content';
import projectsJson from '@/data/projects.json';

const projectsData = projectsJson as Project[];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-[calc(80px+4rem)] px-[clamp(1.25rem,5vw,4rem)] pb-[5rem] max-w-[1320px] mx-auto">
      <ScrollReveal>
        <SectionHeader 
          number="03" 
          label="Selected Works" 
          title="PROJECTS" 
          subtitle="Featured builds and technical deep-dives." 
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, idx) => (
          <ScrollReveal key={project.slug} className={`h-full ${idx === 0 || idx === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
