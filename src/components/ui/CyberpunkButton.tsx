import Link from 'next/link';
import clsx from 'clsx';

interface CyberpunkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
}

export function CyberpunkButton({ 
  href, 
  variant = 'primary', 
  children, 
  className,
  type = 'button',
  disabled,
  ...props 
}: CyberpunkButtonProps) {
  const baseClasses = "inline-flex font-mono text-[0.7rem] tracking-[0.14em] uppercase py-3 px-6 transition-all duration-300 clip-btn hover:translate-y-[-2px] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed btn-scanline";
  
  const variantClasses = variant === 'primary' 
    ? "bg-accent text-bg hover:shadow-[0_0_35px_var(--color-glow-c),_0_0_15px_var(--color-accent)] border border-transparent"
    : "bg-surface-2 text-muted border border-border hover:text-accent hover:border-accent hover:shadow-[0_0_25px_var(--color-glow-c)]";

  const buttonClasses = clsx(baseClasses, variantClasses, className);

  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      disabled={disabled} 
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}
