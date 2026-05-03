import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { StackChip } from '@/components/ui/StackChip';
import { MetricCard } from '@/components/ui/MetricCard';
import experiencesData from '@/data/experiences.json';

export async function generateStaticParams() {
  return experiencesData.map((exp) => ({
    slug: exp.slug,
  }));
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experience = experiencesData.find((exp) => exp.slug === slug);

  if (!experience) {
    notFound();
  }

  let sectionIndex = 1;
  const getIndex = () => String(sectionIndex++).padStart(2, '0');

  return (
    <div className="pt-[120px] pb-20 px-[clamp(1.25rem,5vw,4rem)] max-w-[1000px] mx-auto min-h-screen">
      <Breadcrumb 
        items={[
          { label: 'HOME', href: '/' },
          { label: 'EXPERIENCE', href: '/#experience' },
          { label: experience.company }
        ]} 
      />

      <header className="mb-12 border-b border-border pb-8">
        <h1 className="font-mono text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-fg drop-shadow-[0_0_20px_var(--color-glow-c)] mb-3">
          {experience.role}
        </h1>
        <div className="font-mono text-xl text-accent tracking-[0.05em] mb-4">
          <span className="text-border">{"//"}</span> {experience.company}
        </div>
        <div className="font-mono text-[0.8rem] text-muted tracking-[0.1em] flex gap-4">
          <span>{experience.period}</span>
          <span className="text-border">|</span>
          <span>{experience.location}</span>
        </div>
      </header>

      {experience.description && (
        <div className="font-body text-[1rem] leading-[1.8] text-muted mb-12">
          {experience.description}
        </div>
      )}

      {experience.responsibilities && experience.responsibilities.length > 0 && (
        <div className="mb-12">
          <h2 className="font-mono text-lg text-fg tracking-[0.1em] mb-6 flex items-center gap-3">
            <span className="text-accent">{getIndex()}.</span> CORE RESPONSIBILITIES
          </h2>
          <ul className="list-none p-0 flex flex-col gap-4">
            {experience.responsibilities.map((resp, i) => (
              <li key={i} className="pl-6 relative font-body text-[0.95rem] leading-[1.6] text-muted before:content-['>'] before:absolute before:left-0 before:text-accent before:font-mono">
                {resp}
              </li>
            ))}
          </ul>
        </div>
      )}

      {experience.achievements && experience.achievements.length > 0 && (
        <div className="mb-12">
          <h2 className="font-mono text-lg text-fg tracking-[0.1em] mb-6 flex items-center gap-3">
            <span className="text-accent">{getIndex()}.</span> KEY ACHIEVEMENTS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {experience.achievements.map((ach, i) => (
              <MetricCard key={i} achievement={ach} />
            ))}
          </div>
        </div>
      )}

      {experience.tags && experience.tags.length > 0 && (
        <div className="mb-12">
          <h2 className="font-mono text-lg text-fg tracking-[0.1em] mb-6 flex items-center gap-3">
            <span className="text-accent">{getIndex()}.</span> TECHNOLOGIES USED
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {experience.tags.map((tag) => (
              <StackChip key={tag} name={tag} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
