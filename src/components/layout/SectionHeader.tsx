interface SectionHeaderProps {
  number: string;
  label: string;
  title: string;
  subtitle: string;
}

export function SectionHeader({ number, label, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <div className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-accent flex items-center gap-3 mb-3">
        <span>{number}</span>
        <span className="text-border">{"//"}</span>
        <span>{label}</span>
      </div>
      <h2 className="font-mono text-[2.5rem] leading-[1.1] tracking-[0.05em] text-fg drop-shadow-[0_0_20px_var(--color-glow-c)] mb-4">
        {title}
      </h2>
      <p className="text-muted font-body text-[0.95rem] max-w-[600px]">
        {subtitle}
      </p>
    </div>
  );
}
