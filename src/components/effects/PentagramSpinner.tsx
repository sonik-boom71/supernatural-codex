import { Pentagram } from '@/components/icons/Pentagram';
import { cn } from '@/lib/utils';

export function PentagramSpinner({ className }: { className?: string }) {
  return (
    <span
      className={cn('inline-block animate-spin-slow text-impala', className)}
      aria-hidden
    >
      <Pentagram className="h-full w-full drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
    </span>
  );
}
