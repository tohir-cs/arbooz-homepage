import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'fresh-today' | 'seasonal' | 'limited' | 'signature' | 'neutral';
};

const variants = {
  'fresh-today': 'bg-sage/40 text-espresso',
  seasonal: 'bg-rose text-berry',
  limited: 'bg-berry text-ivory',
  signature: 'bg-caramel/15 text-caramel-deep',
  neutral: 'bg-bone text-mocha',
} as const;

const labels = {
  'fresh-today': 'Fresh today',
  seasonal: 'Seasonal',
  limited: 'Limited',
  signature: 'Signature',
  neutral: '',
};

export function Tag({ variant = 'neutral', className, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-3 py-1.5 text-mono-xs uppercase',
        variants[variant],
        className
      )}
      {...props}
    >
      {children ?? labels[variant]}
    </span>
  );
}
