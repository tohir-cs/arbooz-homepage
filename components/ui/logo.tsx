import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  tone?: 'espresso' | 'ivory';
  withTagline?: boolean;
};

/**
 * Recreated ARBOOZ wordmark — narrow, hand-drawn character with stretched
 * verticals. Inline SVG so it inherits color and crisp at any size.
 */
export function Logo({ className, tone = 'espresso', withTagline = true }: LogoProps) {
  const colorClass = tone === 'ivory' ? 'text-ivory' : 'text-espresso';

  return (
    <span
      className={cn('inline-flex flex-col items-center leading-none', colorClass, className)}
      aria-label="Arbooz — Handmade Confections"
    >
      <svg
        viewBox="0 0 240 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
        role="img"
        aria-hidden="true"
      >
        {/* A */}
        <path
          d="M8 52 L22 8 L36 52 M14 38 L30 38"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* R */}
        <path
          d="M48 52 L48 8 L62 8 Q72 8 72 18 Q72 28 62 28 L48 28 M62 28 L72 52"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* B */}
        <path
          d="M86 8 L86 52 L100 52 Q110 52 110 42 Q110 32 100 32 L86 32 M86 32 L98 32 Q108 32 108 22 Q108 8 100 8 L86 8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* O */}
        <ellipse cx="135" cy="30" rx="13" ry="22" stroke="currentColor" strokeWidth="1.2" fill="none" />
        {/* O */}
        <ellipse cx="167" cy="30" rx="13" ry="22" stroke="currentColor" strokeWidth="1.2" fill="none" />
        {/* Z */}
        <path
          d="M190 8 L222 8 L190 52 L222 52"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {withTagline && (
        <span className="mt-2 text-mono-xs uppercase tracking-[0.32em] opacity-80">
          Handmade Confections
        </span>
      )}
    </span>
  );
}
