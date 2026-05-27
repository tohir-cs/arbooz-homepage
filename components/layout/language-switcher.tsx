'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Locale = 'ru' | 'en' | 'lv';

type LanguageSwitcherProps = {
  defaultLocale?: Locale;
  tone?: 'dark' | 'light';
  className?: string;
};

const LOCALES: Locale[] = ['ru', 'en', 'lv'];

export function LanguageSwitcher({
  defaultLocale = 'ru',
  tone = 'dark',
  className,
}: LanguageSwitcherProps) {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname() || '/';
  const active = currentLocale || defaultLocale;

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
          <Link
            href={pathname}
            locale={locale}
            aria-pressed={active === locale}
            aria-label={`Switch language to ${locale.toUpperCase()}`}
            className={cn(
              'transition-colors duration-quick ease-out-slow hover:text-caramel',
              active === locale ? activeColor : inactiveColor
            )}
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
