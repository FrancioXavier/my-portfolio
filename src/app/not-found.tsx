import Link from 'next/link';
import { CyberpunkButton } from '@/components/ui/CyberpunkButton';

export default function NotFound() {
  return (
    <div className="min-h-[100svh] pt-[120px] pb-20 px-[clamp(1.25rem,5vw,4rem)] flex items-center">
      <div className="max-w-[820px] mx-auto w-full">
        <div className="font-mono text-[0.66rem] tracking-[0.32em] uppercase text-accent-2 mb-6 flex items-center gap-3 drop-shadow-[0_0_10px_var(--color-glow-m)]">
          <span className="w-2 h-2 bg-accent-2 animate-status-pulse rounded-full" />
          SYSTEM_FAULT // 404
        </div>

        <h1 className="font-mono text-[clamp(4rem,14vw,9rem)] leading-[0.9] tracking-[0.04em] text-fg drop-shadow-[0_0_30px_var(--color-glow-c)] mb-6">
          404<span className="text-accent">_</span>
        </h1>

        <pre className="font-mono text-[0.78rem] leading-[1.7] text-muted bg-surface border border-border p-5 mb-8 overflow-x-auto clip-card max-w-[640px]">
{`> SCAN_RESULT ............... NO_MATCH
> URI_LOOKUP ................. FAILED
> ROUTE_INDEX ................ MISSING
> RECOVERY_PROTOCOL .......... ENGAGED

> The transmission you requested could not be located in the
> archive. The signature may have been moved, corrupted, or
> never existed.`}
        </pre>

        <div className="flex flex-wrap gap-3">
          <CyberpunkButton href="/" variant="primary">
            RETURN_HOME
          </CyberpunkButton>
          <CyberpunkButton href="/#projects" variant="ghost">
            VIEW_PROJECTS
          </CyberpunkButton>
          <CyberpunkButton href="/#contact" variant="ghost">
            REPORT_ISSUE
          </CyberpunkButton>
        </div>

        <div className="mt-12 font-mono text-[0.62rem] text-muted/40 tracking-[0.18em] flex items-center gap-3">
          <span>SUGGESTION:</span>
          <Link href="/" className="text-accent hover:text-accent-2 transition-colors">
            /
          </Link>
          <Link href="/#stacks" className="text-accent hover:text-accent-2 transition-colors">
            /#stacks
          </Link>
          <Link href="/#projects" className="text-accent hover:text-accent-2 transition-colors">
            /#projects
          </Link>
        </div>
      </div>
    </div>
  );
}
