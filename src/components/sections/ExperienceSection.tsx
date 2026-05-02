import { SectionHeader } from '@/components/layout/SectionHeader';
import { ExperienceCard } from '@/components/cards/ExperienceCard';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import experiencesData from '@/data/experiences.json';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-[calc(80px+4rem)] px-[clamp(1.25rem,5vw,4rem)] pb-[5rem] max-w-[1320px] mx-auto">
      <ScrollReveal>
        <SectionHeader 
          number="02" 
          label="Work History" 
          title="EXPERIENCE" 
          subtitle="Professional roles — click any entry for the full technical breakdown." 
        />
      </ScrollReveal>

      <div className="flex flex-col gap-6 relative before:content-[''] before:absolute before:left-8 before:top-4 before:bottom-4 before:w-[1px] before:bg-border before:-z-10 md:before:hidden">
        {experiencesData.map((experience) => (
          <ScrollReveal key={experience.slug}>
            <ExperienceCard experience={experience} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
