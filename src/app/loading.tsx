import { PentagramSpinner } from '@/components/effects/PentagramSpinner';

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <PentagramSpinner className="h-16 w-16" />
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-impala/70">
        Salt. Iron. Holy water. Loading…
      </p>
    </div>
  );
}
