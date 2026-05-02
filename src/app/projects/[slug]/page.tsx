import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { StackChip } from '@/components/ui/StackChip';
import { MetricCard } from '@/components/ui/MetricCard';
import { CyberpunkButton } from '@/components/ui/CyberpunkButton';
import projectsData from '@/data/projects.json';

export async function generateStaticParams() {
  return projectsData.map((proj) => ({
    slug: proj.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.find((proj) => proj.slug === slug);

  if (!project) {
    notFound();
  }

  // architecture can be a string[] (ASCII diagram) or { frontend, backend }
  const arch = project.architecture;
  const isAsciiArch = Array.isArray(arch);
  const isObjectArch = !isAsciiArch && arch && typeof arch === 'object';

  return (
    <div className="pt-[120px] pb-20 px-[clamp(1.25rem,5vw,4rem)] max-w-[1000px] mx-auto min-h-screen">
      <Breadcrumb
        items={[
          { label: 'HOME', href: '/' },
          { label: 'PROJECTS', href: '/#projects' },
          { label: project.title },
        ]}
      />

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <h1 className="font-mono text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-fg drop-shadow-[0_0_20px_var(--color-glow-c)]">
            {project.title}
          </h1>
          <span
            className={`font-mono text-[0.7rem] py-1 px-2 border ${
              project.status === 'wip'
                ? 'border-accent-3 text-accent-3 bg-accent-3/10'
                : 'border-green text-green bg-green/10'
            }`}
          >
            {project.status === 'wip' ? '◐ IN DEVELOPMENT' : '● LIVE SYSTEM'}
          </span>
        </div>

        <p className="font-body text-[1.1rem] leading-[1.6] text-muted max-w-[800px] mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-4">
          {project.links?.demo && project.links.demo !== '#' && (
            <CyberpunkButton href={project.links.demo} variant="primary">
              LAUNCH_APP
            </CyberpunkButton>
          )}
          {project.links?.github && project.links.github !== '#' && (
            <CyberpunkButton href={project.links.github} variant="ghost">
              VIEW_SOURCE
            </CyberpunkButton>
          )}
        </div>
      </header>

      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {project.metrics.map((metric, i) => (
            <MetricCard key={i} achievement={metric} />
          ))}
        </div>
      )}

      {project.features && project.features.length > 0 && (
        <div className="mb-16">
          <h2 className="font-mono text-lg text-fg tracking-[0.1em] mb-6 flex items-center gap-3">
            <span className="text-accent">01.</span> MISSION_BRIEFING
          </h2>
          <div className="space-y-4">
            {project.features.map((p, i) => (
              <p key={i} className="font-body text-[0.95rem] leading-[1.8] text-muted">
                {p}
              </p>
            ))}
          </div>
        </div>
      )}

      {arch && (
        <div className="mb-16">
          <h2 className="font-mono text-lg text-fg tracking-[0.1em] mb-6 flex items-center gap-3">
            <span className="text-accent">02.</span> SYSTEM_ARCHITECTURE
          </h2>

          {isAsciiArch && (
            <pre className="font-mono text-[0.78rem] leading-[1.6] text-muted bg-surface border border-border p-6 overflow-x-auto">
              {(arch as string[]).join('\n')}
            </pre>
          )}

          {isObjectArch && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border bg-surface p-6">
                <h3 className="font-mono text-[0.8rem] text-accent tracking-[0.1em] mb-4 uppercase">
                  Frontend
                </h3>
                <ul className="list-none p-0 flex flex-col gap-2">
                  {((arch as { frontend: string[]; backend: string[] }).frontend ?? []).map(
                    (item: string, i: number) => (
                      <li
                        key={i}
                        className="font-body text-[0.9rem] text-muted pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-accent-2"
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="border border-border bg-surface p-6">
                <h3 className="font-mono text-[0.8rem] text-accent tracking-[0.1em] mb-4 uppercase">
                  Backend / Infra
                </h3>
                <ul className="list-none p-0 flex flex-col gap-2">
                  {((arch as { frontend: string[]; backend: string[] }).backend ?? []).map(
                    (item: string, i: number) => (
                      <li
                        key={i}
                        className="font-body text-[0.9rem] text-muted pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-accent-2"
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mb-12">
        <h2 className="font-mono text-lg text-fg tracking-[0.1em] mb-6 flex items-center gap-3">
          <span className="text-accent">03.</span> TECH_STACK
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {project.tags.map((tag) => (
            <StackChip key={tag} name={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
