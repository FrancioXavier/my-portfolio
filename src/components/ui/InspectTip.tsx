interface InspectTipProps {
  children: React.ReactNode;
}

export function InspectTip({ children }: InspectTipProps) {
  return (
    <div className="inline-flex items-center gap-3 mt-4 font-mono text-[0.72rem] tracking-[0.22em] uppercase text-muted/75">
      <span className="inline-flex items-center gap-2 text-accent">
        <span
          aria-hidden
          className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--color-glow-c)]"
        />
        <span>// TIP</span>
      </span>
      <span aria-hidden className="text-border/70">
        ::
      </span>
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-flex items-center justify-center min-w-[1.4rem] h-[1.4rem] px-1.5 border border-border/70 text-accent-2/85 text-[0.62rem] tracking-normal"
      >
        ↵
      </span>
    </div>
  );
}
