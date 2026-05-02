"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Image from 'next/image';
import profile from '@/data/profile.json';

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const socialIconConfigs = {
    GH: 'logos:github-icon',
    LI: 'logos:linkedin-icon',
    EM: 'logos:google-gmail'
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-3.5 px-8 bg-bg/90 backdrop-blur-md border-b border-border">
      <Link href="/" className="font-mono text-[0.8rem] text-accent no-underline tracking-[0.12em] drop-shadow-[0_0_12px_var(--color-glow-c)]">
        SYS<span className="text-accent-2">://</span>PORTFOLIO<span className="animate-blink">_</span>
      </Link>
      
      <div className="flex items-center gap-10">
        {isHome ? (
          <ul className="hidden md:flex gap-7 list-none m-0 p-0">
            <li><a href="#stacks" className="font-mono text-[0.72rem] text-muted uppercase tracking-[0.1em] transition-colors hover:text-accent hover:drop-shadow-[0_0_8px_var(--color-glow-c)]">Stacks</a></li>
            <li><a href="#experience" className="font-mono text-[0.72rem] text-muted uppercase tracking-[0.1em] transition-colors hover:text-accent hover:drop-shadow-[0_0_8px_var(--color-glow-c)]">Experience</a></li>
            <li><a href="#projects" className="font-mono text-[0.72rem] text-muted uppercase tracking-[0.1em] transition-colors hover:text-accent hover:drop-shadow-[0_0_8px_var(--color-glow-c)]">Projects</a></li>
          </ul>
        ) : (
          <Link href="/#projects" className="font-mono text-[0.72rem] text-muted uppercase tracking-[0.1em] transition-colors hover:text-accent hover:drop-shadow-[0_0_8px_var(--color-glow-c)]">
            ← BACK TO PROJECTS
          </Link>
        )}

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 border-r border-border pr-6 mr-4">
            {profile.social.map((item) => {
              const iconName = socialIconConfigs[item.icon as keyof typeof socialIconConfigs];
              return (
                <a 
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-muted hover:text-accent transition-all duration-200 hover:drop-shadow-[0_0_8px_var(--color-glow-c)] p-2 hover:bg-accent/5 rounded-sm flex items-center justify-center"
                  aria-label={item.label}
                  title={item.label}
                >
                  {iconName && (
                    <div className="relative w-4 h-4 transition-all duration-300">
                      <Image
                        src={`https://api.iconify.design/${iconName}.svg`}
                        alt={`${item.label} icon`}
                        width={16}
                        height={16}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    </div>
                  )}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex font-mono text-[0.62rem] text-green items-center gap-2 tracking-[0.08em]">
            <div className="w-1.5 h-1.5 bg-green rounded-full animate-status-pulse"></div>
            SYSTEM ONLINE
          </div>
        </div>
      </div>
    </nav>
  );
}
