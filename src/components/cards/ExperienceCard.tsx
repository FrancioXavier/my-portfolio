import Link from 'next/link';
import { TagChip } from '@/components/ui/TagChip';
import { Experience } from '@/types/content';

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link href={`/experience/${experience.slug}`} className="block border border-border bg-surface-2 p-6 md:p-8 clip-card transition-all duration-300 group hover:-translate-y-1 hover:border-accent hover:shadow-[0_10px_30px_var(--color-glow-c)] relative">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
        <div>
          <div className="font-mono text-lg text-fg tracking-[0.05em] mb-1 group-hover:text-accent transition-colors">{experience.role}</div>
          <div className="font-mono text-[0.8rem] text-accent tracking-[0.08em]"><span className="text-border">{"//"}</span> {experience.company}</div>
        </div>
        <div className="font-mono text-[0.7rem] text-muted tracking-[0.1em] mt-1 md:mt-0">{experience.period}</div>
      </div>
      
      <p className="font-body text-muted text-[0.9rem] leading-[1.6] mb-5 max-w-[800px]">
        {experience.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {experience.tags.map(tag => (
          <TagChip key={tag}>{tag}</TagChip>
        ))}
      </div>
      
      <div className="absolute right-6 bottom-6 md:right-8 md:bottom-8 font-mono text-xl text-border transition-colors duration-300 group-hover:text-accent">
        →
      </div>
    </Link>
  );
}
