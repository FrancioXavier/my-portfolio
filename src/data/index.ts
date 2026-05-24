import enProfile from './en/profile.json';
import enProjects from './en/projects.json';
import enExperiences from './en/experiences.json';
import enEducation from './en/education.json';
import enStacks from './en/stacks.json';
import enAbout from './en/about.json';

import ptProfile from './pt/profile.json';
import ptProjects from './pt/projects.json';
import ptExperiences from './pt/experiences.json';
import ptEducation from './pt/education.json';
import ptStacks from './pt/stacks.json';
import ptAbout from './pt/about.json';

import type { Locale } from '@/i18n/routing';
import type { Profile, Project, Experience, Education, About } from '@/types/content';

const data = {
  en: {
    profile: enProfile,
    projects: enProjects,
    experiences: enExperiences,
    education: enEducation,
    stacks: enStacks,
    about: enAbout,
  },
  pt: {
    profile: ptProfile,
    projects: ptProjects,
    experiences: ptExperiences,
    education: ptEducation,
    stacks: ptStacks,
    about: ptAbout,
  },
} as const;

export function getProfile(locale: Locale): Profile {
  return data[locale].profile as Profile;
}

export function getProjects(locale: Locale): Project[] {
  return data[locale].projects as unknown as Project[];
}

export function getExperiences(locale: Locale): Experience[] {
  return data[locale].experiences as unknown as Experience[];
}

export function getEducation(locale: Locale): Education[] {
  return data[locale].education as Education[];
}

export function getAbout(locale: Locale): About {
  return data[locale].about as About;
}

export type StackCategoryItem = {
  name: string;
  icon?: string;
  years: number;
  description?: string;
  useCases?: string[];
};
export type StackCategoryEntry = {
  id: string;
  label: string;
  items: StackCategoryItem[];
};

export function getStacks(locale: Locale): StackCategoryEntry[] {
  return data[locale].stacks as StackCategoryEntry[];
}
