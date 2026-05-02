import Image from 'next/image';

interface StackChipProps {
  name: string;
  icon?: string;
}

export function StackChip({ name, icon }: StackChipProps) {
  // Map simpleicons slugs to devicon slugs where they differ
  const getIconUrl = (name: string, icon?: string) => {
    const slug = icon || name.toLowerCase().replace(/\./g, 'dot').replace(/\s+/g, '');
    
    const mapping: Record<string, string> = {
      'nodedotjs': 'nodejs',
      'nextdotjs': 'nextjs',
      'vuedotjs': 'vuejs',
      'googlecloud': 'googlecloud',
      'amazonwebservices': 'amazonwebservices',
      'linux': 'linux',
      'github': 'github',
      'githubactions': 'github',
      'golang': 'go',
      'typescript': 'typescript',
      'postgresql': 'postgresql',
      'mysql': 'mysql',
      'redis': 'redis',
      'docker': 'docker',
      'laravel': 'laravel',
      'cloudflare': 'cloudflare',
      'aws': 'amazonwebservices',
      'gcp': 'googlecloud',
      'react': 'react',
      'tailwindcss': 'tailwindcss',
      'mongodb': 'mongodb',
      'nginx': 'nginx',
      'kubernetes': 'kubernetes',
      'grafana': 'grafana',
      'prometheus': 'prometheus'
    };
    
    const iconSlug = mapping[slug] || slug;
    return `https://api.iconify.design/devicon:${iconSlug}.svg`;
  };

  return (
    <div className="group relative font-mono text-[0.72rem] flex items-center gap-3 py-3 px-4 bg-surface/40 border border-border/50 text-muted clip-chip transition-all duration-300 hover:text-accent hover:border-accent hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(var(--color-accent),0.15)] backdrop-blur-sm overflow-hidden min-h-[52px] w-full">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {name && (
        <div className="relative z-10 w-4 h-4 flex items-center justify-center transition-all duration-300">
          <Image
            src={getIconUrl(name, icon)}
            alt={`${name} icon`}
            width={20}
            height={20}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      )}

      <span className="relative z-10 tracking-wider text-lg font-medium">
        {name}
      </span>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-border group-hover:bg-accent transition-colors duration-300"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
    </div>
  );
}
