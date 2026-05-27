import { cn } from '@/lib/utils';

type OrnamentProps = {
  className?: string;
  tone?: 'caramel' | 'ivory' | 'mocha';
};

export function Ornament({ className, tone = 'caramel' }: OrnamentProps) {
  const toneClass = {
    caramel: 'text-caramel',
    ivory: 'text-ivory/70',
    mocha: 'text-mocha',
  }[tone];

  return (
    <span
      aria-hidden="true"
      className={cn('inline-flex items-center justify-center', toneClass, className)}
    >
      <svg
        width="28"
        height="12"
        viewBox="0 0 28 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 6 L10 6"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <path
          d="M18 6 L28 6"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <circle cx="14" cy="6" r="2" stroke="currentColor" strokeWidth="0.75" fill="none" />
      </svg>
    </span>
  );
}
