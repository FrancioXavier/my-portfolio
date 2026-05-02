export function TagChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.6rem] py-[0.15rem] px-[0.4rem] bg-surface border border-border text-muted uppercase tracking-[0.06em]">
      {children}
    </span>
  );
}
