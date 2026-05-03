"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import Image from 'next/image';
import profile from '@/data/profile.json';

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const socialIconConfigs = {
    GH: 'simple-icons:github',
    LI: 'logos:linkedin-icon',
    EM: 'logos:google-gmail'
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-3.5 px-8 bg-bg/90 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href="/" className="font-mono text-[0.8rem] text-accent no-underline tracking-[0.12em] drop-shadow-[0_0_12px_var(--color-glow-c)]">
        SYS<span className="text-accent-2">://</span>FRANCIO_XAVIER<span className="animate-blink">_</span>
      </Link>

      <div className="flex items-center gap-10">
        {isHome ? (
          <ul className="hidden md:flex gap-7 list-none m-0 p-0">
            {['stacks', 'experience', 'projects'].map((id) => (
              <li key={id}>
                <motion.a
                  href={`#${id}`}
                  className="relative group font-mono text-[0.72rem] text-muted uppercase tracking-[0.1em] transition-colors duration-300 hover:text-accent"
                  whileHover={{ y: -2 }}
                >
                  <span className="relative z-10">{id}</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[1px] bg-accent shadow-[0_0_8px_var(--color-glow-c)]"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                </motion.a>
              </li>
            ))}
          </ul>
        ) : (
          <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
            <Link href="/#projects" className="font-mono text-[0.72rem] text-muted uppercase tracking-[0.1em] transition-colors hover:text-accent hover:drop-shadow-[0_0_8px_var(--color-glow-c)]">
              ← BACK TO PROJECTS
            </Link>
          </motion.div>
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
                        className={`w-full h-full object-contain ${item.icon === 'GH' ? 'brightness-0 invert' : ''}`}
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
    </motion.nav>
  );
}
