export function RadarDeco() {
  return (
    <svg className="absolute -right-[15%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-20 pointer-events-none md:-right-[5%] md:opacity-40" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="190" stroke="var(--color-accent)" strokeWidth="0.5" strokeDasharray="3 9"/>
      <circle cx="200" cy="200" r="140" stroke="var(--color-accent)" strokeWidth="0.5" strokeDasharray="2 6"/>
      <circle cx="200" cy="200" r="90" stroke="var(--color-accent)" strokeWidth="0.5"/>
      <circle cx="200" cy="200" r="40" stroke="var(--color-accent-2)" strokeWidth="0.75"/>
      <line x1="10" y1="200" x2="390" y2="200" stroke="var(--color-border)" strokeWidth="0.5"/>
      <line x1="200" y1="10" x2="200" y2="390" stroke="var(--color-border)" strokeWidth="0.5"/>
      <line x1="55" y1="55" x2="345" y2="345" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="2 4"/>
      <line x1="345" y1="55" x2="55" y2="345" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="2 4"/>
      <circle cx="290" cy="130" r="5" fill="var(--color-accent-2)" opacity="0.8"/>
      <circle cx="120" cy="270" r="3" fill="var(--color-accent)" opacity="0.6"/>
      <circle cx="310" cy="280" r="4" fill="var(--color-accent-3)" opacity="0.7"/>
      <path d="M200 200 L290 130" stroke="var(--color-accent-2)" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.6"/>
      <path d="M200 200 L120 270" stroke="var(--color-accent)" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.5"/>
      <path d="M200 200 L310 280" stroke="var(--color-accent-3)" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.5"/>
      <polygon points="190,195 205,190 210,205 195,210" fill="var(--color-accent)" opacity="0.9"/>
      <animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="12s" repeatCount="indefinite"/>
    </svg>
  );
}
