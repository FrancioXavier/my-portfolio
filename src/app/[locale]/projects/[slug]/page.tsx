import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { StackChip } from '@/components/ui/StackChip';
import { MetricCard } from '@/components/ui/MetricCard';
import { CyberpunkButton } from '@/components/ui/CyberpunkButton';
import { PageNav } from '@/components/ui/PageNav';
import { getProjects } from '@/data';
import { routing, type Locale } from '@/i18n/routing';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const project of getProjects(locale)) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProjects(locale).find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'projects.page' });
  const tBreadcrumb = await getTranslations({ locale, namespace: 'breadcrumb' });

  const projects = getProjects(locale);
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = idx >= 0 ? projects[idx] : undefined;

  if (!project) {
    notFound();
  }

  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  const arch = project.architecture;
  const isAsciiArch = Array.isArray(arch);
  const isObjectArch = !isAsciiArch && arch && typeof arch === 'object';

  return (
    <div className="pt-[120px] pb-20 px-[clamp(1.25rem,5vw,4rem)] max-w-[1000px] mx-auto min-h-screen">
      <Breadcrumb
        items={[
          { label: tBreadcrumb('home'), href: '/' },
          { label: tBreadcrumb('projects'), href: '/#projects' },
          { label: project.title },
        ]}
      />

      <header className="mb-12 relative">
        <div className="font-mono text-[0.6rem] tracking-[0.22em] text-muted/60 uppercase mb-5 flex items-center gap-3">
          <span className="text-accent">REC //</span>
          <span>{String(idx + 1).padStart(2, '0')}.{String(projects.length).padStart(2, '0')}</span>
          <span className="text-border">|</span>
          <span>{project.category || t('projectFallback')}</span>
          <span className="flex-1 h-px bg-border/30 ml-2" />
        </div>

        <div className="flex flex-wrap items-end gap-4 mb-5">
          <h1 className="font-mono text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-fg drop-shadow-[0_0_20px_var(--color-glow-c)]">
            {project.title}
          </h1>
          <span
            className={`font-mono text-[0.7rem] py-1 px-2 border tracking-[0.06em] ${
              project.status === 'wip'
                ? 'border-accent-3 text-accent-3 bg-accent-3/10'
                : 'border-green text-green bg-green/10'
            }`}
          >
            {project.status === 'wip' ? t('wipFull') : t('liveFull')}
          </span>
        </div>

        {project.role && (
          <div className="font-mono text-[0.78rem] text-accent tracking-[0.08em] mb-5">
            <span className="text-border">{"//"}</span> {t('role')}: {project.role}
          </div>
        )}

        <p className="font-body text-[1.05rem] leading-[1.7] text-muted max-w-[760px] mb-8 border-l border-border pl-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3">
          {project.links?.demo && project.links.demo !== '#' && (
            <CyberpunkButton href={project.links.demo} variant="primary">
              {t('launchApp')}
            </CyberpunkButton>
          )}
          {project.links?.github && project.links.github !== '#' && (
            <CyberpunkButton href={project.links.github} variant="ghost">
              {t('viewSource')}
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
        <section className="mb-16">
          <h2 className="font-mono text-lg text-fg tracking-[0.1em] mb-6 flex items-center gap-3 pl-3 relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[60%] bg-accent shadow-[0_0_12px_var(--color-glow-c)]" aria-hidden="true" />
            <span className="text-accent">01.</span> {t('missionBriefing')}
          </h2>
          <div className="space-y-4 pl-3">
            {project.features.map((p, i) => (
              <p
                key={i}
                className="font-body text-[0.95rem] leading-[1.8] text-muted relative pl-6 before:content-['▸'] before:absolute before:left-0 before:top-0 before:text-accent/70 before:font-mono"
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      {arch && (
        <section className="mb-16">
          <h2 className="font-mono text-lg text-fg tracking-[0.1em] mb-6 flex items-center gap-3 pl-3 relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[60%] bg-accent shadow-[0_0_12px_var(--color-glow-c)]" aria-hidden="true" />
            <span className="text-accent">02.</span> {t('systemArchitecture')}
          </h2>

          {isAsciiArch && (
            <div className="relative">
              <div className="absolute -top-2 left-3 font-mono text-[0.55rem] tracking-[0.22em] text-muted/60 px-2 py-0.5 bg-bg border border-border/60">
                {t('asciiDiagram')}
              </div>
              <pre className="font-mono text-[0.78rem] leading-[1.6] text-muted bg-surface border border-border p-6 pt-8 overflow-x-auto clip-card">
                {(arch as string[]).join('\n')}
              </pre>
            </div>
          )}

          {isObjectArch && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border bg-surface p-6 clip-card">
                <h3 className="font-mono text-[0.78rem] text-accent tracking-[0.18em] mb-4 uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent" />
                  {t('frontend')}
                </h3>
                <ul className="list-none p-0 flex flex-col gap-2">
                  {((arch as { frontend: string[]; backend: string[] }).frontend ?? []).map(
                    (item: string, i: number) => (
                      <li
                        key={i}
                        className="font-body text-[0.9rem] text-muted pl-5 relative before:content-['>'] before:absolute before:left-0 before:text-accent-2 before:font-mono"
                      >
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <div className="border border-border bg-surface p-6 clip-card">
                <h3 className="font-mono text-[0.78rem] text-accent tracking-[0.18em] mb-4 uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-2" />
                  {t('backend')}
                </h3>
                <ul className="list-none p-0 flex flex-col gap-2">
                  {((arch as { frontend: string[]; backend: string[] }).backend ?? []).map(
                    (item: string, i: number) => (
                      <li
                        key={i}
                        className="font-body text-[0.9rem] text-muted pl-5 relative before:content-['>'] before:absolute before:left-0 before:text-accent-2 before:font-mono"
                      >
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          )}
        </section>
      )}

      <section className="mb-12">
        <h2 className="font-mono text-lg text-fg tracking-[0.1em] mb-6 flex items-center gap-3 pl-3 relative">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[60%] bg-accent shadow-[0_0_12px_var(--color-glow-c)]" aria-hidden="true" />
          <span className="text-accent">03.</span> {t('techStack')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {project.tags.map((tag) => (
            <StackChip key={tag} name={tag} />
          ))}
        </div>
      </section>

      <PageNav
        baseLabel={t('navBase')}
        prev={
          prev
            ? {
                href: `/projects/${prev.slug}`,
                label: prev.title,
                meta: prev.category || prev.role,
              }
            : null
        }
        next={
          next
            ? {
                href: `/projects/${next.slug}`,
                label: next.title,
                meta: next.category || next.role,
              }
            : null
        }
      />
    </div>
  );
}
