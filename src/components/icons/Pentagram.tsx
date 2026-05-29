interface IconProps {
  className?: string;
  title?: string;
}

/** Пентаграмма в круге — символ защиты от одержимости. */
export function Pentagram({ className, title }: IconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinejoin="round"
    >
      {title ? <title>{title}</title> : null}
      <circle cx="50" cy="50" r="46" />
      <path d="M50 8 L61.8 78.5 L4.9 35.4 L95.1 35.4 L38.2 78.5 Z" />
    </svg>
  );
}

/** Дьявольская ловушка — упрощённый ритуальный символ. */
export function DevilsTrap({ className, title }: IconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinejoin="round"
    >
      {title ? <title>{title}</title> : null}
      <circle cx="50" cy="50" r="47" />
      <circle cx="50" cy="50" r="38" />
      <path d="M50 12 L61.8 74 L9 36 L91 36 L38.2 74 Z" />
      <circle cx="50" cy="50" r="14" />
    </svg>
  );
}
