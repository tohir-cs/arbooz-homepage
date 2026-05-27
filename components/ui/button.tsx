'use client';

import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonStyles = cva(
  [
    'group inline-flex items-center justify-center gap-2',
    'font-sans text-mono-sm uppercase whitespace-nowrap',
    'transition-all duration-base ease-out-slow',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-caramel text-ivory rounded-button hover:bg-caramel-deep hover:-translate-y-px shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_10px_30px_-12px_rgba(166,111,61,0.45)]',
        secondary:
          'bg-transparent text-espresso rounded-button border border-espresso hover:bg-espresso hover:text-ivory hover:-translate-y-px',
        tertiary: 'underline-reveal px-0 py-0 text-espresso hover:text-caramel',
        'on-dark':
          'bg-transparent text-ivory rounded-button border border-ivory/70 hover:bg-ivory hover:text-espresso hover:-translate-y-px',
      },
      size: {
        sm: 'h-[40px] px-5 text-[0.75rem]',
        md: 'h-[48px] px-7',
        lg: 'h-[58px] px-9',
      },
    },
    compoundVariants: [
      { variant: 'tertiary', size: 'sm', class: 'h-auto px-0' },
      { variant: 'tertiary', size: 'md', class: 'h-auto px-0' },
      { variant: 'tertiary', size: 'lg', class: 'h-auto px-0' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type CommonProps = VariantProps<typeof buttonStyles> & {
  children: ReactNode;
  showArrow?: boolean;
  className?: string;
};

type ButtonOnlyProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    as?: 'button';
    href?: never;
  };

type AnchorOnlyProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    as: 'a';
    href: string;
  };

type ButtonProps = ButtonOnlyProps | AnchorOnlyProps;

const Arrow = () => (
  <ArrowRight
    className="size-4 transition-transform duration-base ease-out-slow group-hover:translate-x-1"
    strokeWidth={1.5}
    aria-hidden="true"
  />
);

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ className, variant, size, children, showArrow, ...rest }, ref) {
    const classes = cn(buttonStyles({ variant, size }), className);

    if (rest.as === 'a') {
      const { as: _ignored, href, ...anchorRest } = rest;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorRest}
        >
          <span>{children}</span>
          {showArrow && <Arrow />}
        </a>
      );
    }

    const { as: _ignored, ...buttonRest } = rest;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...buttonRest}
      >
        <span>{children}</span>
        {showArrow && <Arrow />}
      </button>
    );
  }
);
