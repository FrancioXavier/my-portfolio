import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { StackChip } from '@/components/ui/StackChip';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageNav } from '@/components/ui/PageNav';
import { getExperiences } from '@/data';
import { routing, type Locale } from '@/i18n/routing';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const exp of getExperiences(locale)) {
      params.push({ locale, slug: exp.slug });
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
  const exp = getExperiences(locale).find((e) => e.slug === slug);
  if (!exp) return {};
  return {
    title: `${exp.role} · ${exp.company}`,
    description: exp.description,
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'experience.page' });
  const tBreadcrumb = await getTranslations({ locale, namespace: 'breadcrumb' });

  const experiences = getExperiences(locale);
  const idx = experiences.findIndex((e) => e.slug === slug);
  const experience = idx >= 0 ? experiences[idx] : undefined;

  if (!experience) {
    notFound();
  }

  const prev = idx > 0 ? experiences[idx - 1] : null;
  const next = idx < experiences.length - 1 ? experiences[idx + 1] : null;

  let sectionIndex = 1;
  const getIndex = () => String(sectionIndex++).padStart(2, '0');

  return (
    <div className="pt-[120px] pb-20 px-[clamp(1.25rem,5vw,4rem)] max-w-[1000px] mx-auto min-h-screen">
      <Breadcrumb
        items={[
          { label: tBreadcrumb('home'), href: '/' },
          { label: tBreadcrumb('experience'), href: '/#experience' },
          { label: experience.company },
        ]}
      />

      <header className="mb-12 border-b border-border pb-10">
        <div className="font-mono text-[0.6rem] tracking-[0.22em] text-muted/60 uppercase mb-5 flex items-center gap-3">
          <span className="text-accent">REC //</span>
          <span>{String(idx + 1).padStart(2, '0')}.{String(experiences.length).padStart(2, '0')}</span>
          <span className="text-border">|</span>
          <span>{experience.eyebrow || experience.type || t('positionFallback')}</span>
          <span className="flex-1 h-px bg-border/30 ml-2" />
        </div>

        <h1 className="font-mono text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-fg drop-shadow-[0_0_20px_var(--color-glow-c)] mb-3">
          {experience.role}
        </h1>
        <div className="font-mono text-xl text-accent tracking-[0.05em] mb-5">
          <span className="text-border">{"//"}</span> {experience.company}
        </div>
        <div className="font-mono text-[0.78rem] text-muted tracking-[0.1em] flex flex-wrap gap-x-4 gap-y-2 items-center">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            {experience.period}
          </span>
          <span className="text-border">|</span>
          <span>{experience.location}</span>
          {experience.type && (
            <>
              <span className="text-border">|</span>
              <span>{experience.type}</span>
            </>
          )}
        </div>
      </header>

      {experience.description && (
        <p className="font-body text-[1rem] leading-[1.8] text-muted mb-12 max-w-[800px] border-l border-border pl-4">
          {experience.description}
        </p>
      )}

      {experience.responsibilities && experience.responsibilities.length > 0 && (
        <section className="mb-12">
          <h2 className="font-mono text-lg text-fg tracking-[0.1em] mb-6 flex items-center gap-3 pl-3 relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[60%] bg-accent shadow-[0_0_12px_var(--color-glow-c)]" aria-hidden="true" />
            <span className="text-accent">{getIndex()}.</span> {t('coreResponsibilities')}
          </h2>
          <ul className="list-none p-0 flex flex-col gap-3 pl-3">
            {experience.responsibilities.map((resp, i) => (
              <li
                key={i}
                className="pl-6 relative font-body text-[0.95rem] leading-[1.7] text-muted before:content-['▸'] before:absolute before:left-0 before:top-0 before:text-accent before:font-mono"
              >
                {resp}
              </li>
            ))}
          </ul>
        </section>
      )}

      {experience.achievements && experience.achievements.length > 0 && (
        <section className="mb-12">
          <h2 className="font-mono text-lg text-fg tracking-[0.1em] mb-6 flex items-center gap-3 pl-3 relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[60%] bg-accent shadow-[0_0_12px_var(--color-glow-c)]" aria-hidden="true" />
            <span className="text-accent">{getIndex()}.</span> {t('keyAchievements')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {experience.achievements.map((ach, i) => (
              <MetricCard key={i} achievement={ach} />
            ))}
          </div>
        </section>
      )}

      {experience.tags && experience.tags.length > 0 && (
        <section className="mb-12">
          <h2 className="font-mono text-lg text-fg tracking-[0.1em] mb-6 flex items-center gap-3 pl-3 relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[60%] bg-accent shadow-[0_0_12px_var(--color-glow-c)]" aria-hidden="true" />
            <span className="text-accent">{getIndex()}.</span> {t('technologiesUsed')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {experience.tags.map((tag) => (
              <StackChip key={tag} name={tag} />
            ))}
          </div>
        </section>
      )}

      <PageNav
        baseLabel={t('navBase')}
        prev={
          prev
            ? {
                href: `/experience/${prev.slug}`,
                label: prev.role,
                meta: prev.company,
              }
            : null
        }
        next={
          next
            ? {
                href: `/experience/${next.slug}`,
                label: next.role,
                meta: next.company,
              }
            : null
        }
      />
    </div>
  );
}
