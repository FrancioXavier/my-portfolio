import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { StacksSection } from "@/components/sections/StacksSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { getProfile } from "@/data";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const profile = getProfile(locale);

  return (
    <>
      <HeroSection profile={profile} />
      <StacksSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
