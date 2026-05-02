export function Footer() {
  return (
    <footer className="border-t border-border py-7 px-[clamp(1.25rem,5vw,4rem)] flex justify-between font-mono text-[0.62rem] text-muted tracking-[0.1em] mt-20">
      <span>PORTFOLIO_OS v2.4.1 // ALL SYSTEMS NOMINAL</span>
      <span className="text-accent">© {new Date().getFullYear()} DEV.NAME</span>
    </footer>
  );
}
