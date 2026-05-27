import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

type EyebrowProps = HTMLAttributes<HTMLParagraphElement> & {
  tone?: 'default' | 'mocha' | 'caramel' | 'ivory';
};

export function Eyebrow({ className, tone = 'mocha', children, ...props }: EyebrowProps) {
  const toneClass = {
    default: 'text-espresso',
    mocha: 'text-mocha',
    caramel: 'text-caramel',
    ivory: 'text-ivory/80',
  }[tone];

  return (
    <p
      className={cn('text-mono-sm uppercase', toneClass, className)}
      {...props}
    >
      {children}
    </p>
  );
}
