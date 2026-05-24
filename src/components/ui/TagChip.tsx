export function TagChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.72rem] py-[0.28rem] px-[0.7rem] bg-surface-2 border border-border text-muted uppercase tracking-[0.1em] clip-chip transition-colors duration-200 hover:text-accent hover:border-accent/60">
      <span className="text-accent/60 mr-1">·</span>
      {children}
    </span>
  );
}
