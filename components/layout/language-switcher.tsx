'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Locale = 'ru' | 'en' | 'lv';

type LanguageSwitcherProps = {
  tone?: 'dark' | 'light';
  className?: string;
};

const LOCALES: Locale[] = ['ru', 'en', 'lv'];

const LOCALE_LABELS: Record<Locale, { short: string; long: string }> = {
  ru: { short: 'RU', long: 'Русский' },
  en: { short: 'EN', long: 'English' },
  lv: { short: 'LV', long: 'Latviešu' },
};

/**
 * Locale switcher.
 *
 * Stability:
 * - Uses next-intl's useRouter.replace so the cookie persists automatically
 * - useTransition for non-blocking navigation with a subtle pending state
 * - 44px minimum hit target per WCAG even though the visible label is small
 * - Active locale gets an underline (works without hover — critical on mobile)
 */
export function LanguageSwitcher({ tone = 'dark', className }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const activeColor = tone === 'light' ? 'text-ivory' : 'text-espresso';
  const inactiveColor = tone === 'light' ? 'text-ivory/55' : 'text-mocha';
  const separatorColor = tone === 'light' ? 'text-ivory/30' : 'text-ash';

  const switchLocale = (next: Locale) => {
    if (next === currentLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className={cn(
        'inline-flex items-center text-mono-sm uppercase',
        isPending && 'opacity-60',
        className
      )}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((locale, i) => {
        const isActive = currentLocale === locale;
        return (
          <span key={locale} className="contents">
            {i > 0 && (
              <span
                className={cn('select-none', separatorColor)}
                aria-hidden="true"
              >
                ·
              </span>
            )}
            <button
              type="button"
              onClick={() => switchLocale(locale)}
              aria-pressed={isActive}
              aria-label={`Switch to ${LOCALE_LABELS[locale].long}`}
              disabled={isPending}
              className={cn(
                // 44px hit target via padding; visible label remains small
                'relative inline-flex min-h-[44px] min-w-[36px] items-center justify-center px-2',
                'transition-colors duration-quick ease-out-slow',
                'hover:text-caramel disabled:cursor-wait',
                isActive ? activeColor : inactiveColor,
                // Underline indicator — works without hover (mobile-first)
                isActive &&
                  'after:absolute after:bottom-[8px] after:h-px after:w-3 after:bg-current after:content-[""]'
              )}
            >
              {LOCALE_LABELS[locale].short}
            </button>
          </span>
        );
      })}
    </div>
  );
}
