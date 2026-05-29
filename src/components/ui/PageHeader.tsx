import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="border-b border-impala/15 bg-night/40">
      <div className="container-page py-12 sm:py-16">
        <p className="section-eyebrow animate-fade-up">{eyebrow}</p>
        <h1 className="section-title mt-3 animate-fade-up">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-parchment animate-fade-up">{description}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}
