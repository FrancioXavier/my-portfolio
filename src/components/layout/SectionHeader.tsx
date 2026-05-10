interface SectionHeaderProps {
  number: string;
  label: string;
  title: string;
  subtitle: string;
  count?: string;
}

export function SectionHeader({ number, label, title, subtitle, count }: SectionHeaderProps) {
  return (
    <div className="mb-14 relative">
      {/* Corner brackets */}
      <div className="absolute -left-1 -top-1 w-3 h-3 border-l border-t border-accent/60" aria-hidden="true" />
      <div className="absolute -left-1 top-[40px] w-3 h-3 border-l border-b border-accent/60" aria-hidden="true" />

      <div className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-accent flex items-center gap-3 mb-3 pl-4">
        <span>{number}</span>
        <span className="text-border">{"//"}</span>
        <span>{label}</span>
        {count ? (
          <>
            <span className="flex-1 h-px bg-gradient-to-r from-border/40 via-border/10 to-transparent ml-2" />
            <span className="text-muted/70 text-[0.62rem] tracking-[0.18em]">
              {count}
            </span>
          </>
        ) : (
          <span className="flex-1 h-px bg-gradient-to-r from-border/40 to-transparent ml-2" />
        )}
      </div>

      <h2 className="font-mono text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[0.05em] text-fg drop-shadow-[0_0_20px_var(--color-glow-c)] mb-4 pl-4 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[60%] bg-accent shadow-[0_0_12px_var(--color-glow-c)]" aria-hidden="true" />
        {title}
      </h2>

      <p className="text-muted font-body text-[0.95rem] max-w-[600px] leading-relaxed pl-4">
        {subtitle}
      </p>
    </div>
  );
}
