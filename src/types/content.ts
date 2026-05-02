export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  eyebrow: string;
  role: string;
  bio: string;
  cta: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  social: SocialLink[];
}

export interface StackCategory {
  id: string;
  label: string;
  items: string[];
}

export interface Achievement {
  value: string;
  label: string;
}

export interface Experience {
  slug: string;
  eyebrow: string;
  role: string;
  company: string;
  period: string;
  type: string;
  location: string;
  description: string;
  tags: string[];
  responsibilities: string[];
  achievements: Achievement[];
  tech: string[];
}

export interface Project {
  slug: string;
  status: 'live' | 'wip';
  title: string;
  category: string;
  description: string;
  tags: string[];
  role: string;
  architecture?: string[] | { frontend: string[]; backend: string[] };
  features?: string[];
  longDescription?: string[];
  metrics?: Achievement[];
  tech: string[];
  links?: {
    github?: string;
    demo?: string;
  };
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  accentColor?: string;
}
