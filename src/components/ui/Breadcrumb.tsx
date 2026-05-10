import { Link } from "@/i18n/routing";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="font-mono text-[0.66rem] text-muted tracking-[0.12em] mb-12 flex flex-wrap gap-2 items-center">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link
              href={item.href as "/"}
              className="text-accent hover:text-accent-2 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-fg">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="text-border">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
