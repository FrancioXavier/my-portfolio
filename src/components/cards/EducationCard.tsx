import { Education } from '@/types/content';

export function EducationCard({ education }: { education: Education }) {
  return (
    <div 
      className="bg-surface border border-border border-l-4 p-6"
      style={{ borderLeftColor: education.accentColor || 'var(--color-accent)' }}
    >
      <div className="font-mono text-base text-fg tracking-[0.05em] mb-1">{education.degree}</div>
      <div className="font-mono text-[0.7rem] text-muted tracking-[0.1em] mb-1.5">{education.school}</div>
      <div className="font-mono text-[0.65rem] text-border tracking-[0.1em]">{education.period}</div>
    </div>
  );
}
