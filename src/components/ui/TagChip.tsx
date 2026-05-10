export function TagChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.6rem] py-[0.2rem] px-[0.55rem] bg-surface-2 border border-border text-muted uppercase tracking-[0.08em] clip-chip transition-colors duration-200 hover:text-accent hover:border-accent/60">
      <span className="text-accent/60 mr-1">·</span>
      {children}
    </span>
  );
}
