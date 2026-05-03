import { SectionHeader } from '@/components/layout/SectionHeader';
import { EducationCard } from '@/components/cards/EducationCard';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import educationData from '@/data/education.json';

export function EducationSection() {
  return (
    <section id="education" className="py-[calc(80px+4rem)] pb-[5rem] overflow-x-hidden">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] w-full">
        <ScrollReveal>
          <SectionHeader 
            number="04" 
            label="Academic" 
            title="EDUCATION" 
            subtitle="Degrees and continuous learning." 
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationData.map((education, index) => (
            <ScrollReveal key={index}>
              <EducationCard education={education} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
