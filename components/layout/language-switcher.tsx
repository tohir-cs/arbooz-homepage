'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type Locale = 'RU' | 'EN' | 'LV';

type LanguageSwitcherProps = {
  defaultLocale?: Locale;
  tone?: 'dark' | 'light';
  className?: string;
};

const LOCALES: Locale[] = ['RU', 'EN', 'LV'];

export function LanguageSwitcher({
  defaultLocale = 'RU',
  tone = 'dark',
  className,
}: LanguageSwitcherProps) {
  // In production this would read from URL / cookie / next-intl.
  // For now we hold local state so the UI is interactive.
  const [active, setActive] = useState<Locale>(defaultLocale);

  const activeColor = tone === 'light' ? 'text-ivory' : 'text-espresso';
  const inactiveColor = tone === 'light' ? 'text-ivory/45' : 'text-mocha';
  const separatorColor = tone === 'light' ? 'text-ivory/30' : 'text-ash';

  return (
    <div
      className={cn('inline-flex items-center text-mono-sm uppercase', className)}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((locale, i) => (
        <span key={locale} className="contents">
          {i > 0 && <span className={cn('mx-2', separatorColor)}>·</span>}
          <button
            type="button"
            onClick={() => setActive(locale)}
            aria-pressed={active === locale}
            aria-label={`Switch language to ${locale}`}
            className={cn(
              'transition-colors duration-quick ease-out-slow hover:text-caramel',
              active === locale ? activeColor : inactiveColor
            )}
          >
            {locale}
          </button>
        </span>
      ))}
    </div>
  );
}
