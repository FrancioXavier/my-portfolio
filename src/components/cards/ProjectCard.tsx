import Link from 'next/link';
import { TagChip } from '@/components/ui/TagChip';
import { Project } from '@/types/content';
import clsx from 'clsx';

export function ProjectCard({ project }: { project: Project }) {
  const isWip = project.status === 'wip';
  
  const thumbClasses = clsx(
    "h-[160px] relative border-b border-border overflow-hidden",
    project.slug === 'cloudvault' && "bg-[linear-gradient(135deg,var(--color-surface-2),oklch(18%_0.04_280))]",
    project.slug === 'cfworker-kit' && "bg-[linear-gradient(135deg,var(--color-surface-2),oklch(14%_0.04_220))]"
  );

  const gridStyle = {
    backgroundImage: isWip || project.slug === 'orbitcms' || project.slug === 'cloudvault' || project.slug === 'cfworker-kit' || project.slug === 'rediswatcher'
      ? `linear-gradient(${project.slug === 'orbitcms' || project.slug === 'cfworker-kit' ? 'var(--color-accent-2)' : 'var(--color-accent-3)'} 1px, transparent 1px), linear-gradient(90deg, ${project.slug === 'orbitcms' || project.slug === 'cfworker-kit' ? 'var(--color-accent-2)' : 'var(--color-accent-3)'} 1px, transparent 1px)`
      : 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
    backgroundSize: '22px 22px'
  };

  return (
    <Link href={`/projects/${project.slug}`} className="flex flex-col bg-surface border border-border clip-card transition-all duration-300 group hover:-translate-y-1 hover:border-accent hover:shadow-[0_10px_30px_var(--color-glow-c)] h-full">
      <div className={thumbClasses}>
        <div className="absolute inset-0 opacity-10" style={gridStyle}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-4xl font-bold tracking-[0.1em] text-border group-hover:text-accent-2 transition-colors duration-300">
          {project.slug === 'orbitcms' ? '[CMS]' : project.slug === 'cloudvault' ? '[CVT]' : project.slug === 'pgshield' ? '[PGS]' : project.slug === 'cfworker-kit' ? '[CFW]' : project.slug === 'rediswatcher' ? '[RDW]' : '[NXF]'}
        </div>
        
        <div className={clsx(
          "absolute top-4 right-4 font-mono text-[0.6rem] py-1 px-2 border",
          isWip 
            ? "border-accent-3 text-accent-3 bg-accent-3/10" 
            : "border-green text-green bg-green/10"
        )}>
          {isWip ? '◐ WIP' : '● LIVE'}
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <div className="font-mono text-lg text-fg tracking-[0.05em] mb-2">{project.title}</div>
        <p className="font-body text-muted text-[0.88rem] leading-[1.6] mb-5 flex-1 line-clamp-3 overflow-hidden text-ellipsis">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <TagChip key={tag}>{tag}</TagChip>
          ))}
        </div>
        <div className="font-mono text-[0.66rem] tracking-[0.15em] text-accent uppercase flex items-center transition-all duration-300 group-hover:tracking-[0.2em]">
          VIEW PROJECT →
        </div>
      </div>
    </Link>
  );
}
