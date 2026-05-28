'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { LanguageSwitcher } from './language-switcher';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Ornament } from '@/components/ui/ornament';
import { Link } from '@/i18n/navigation';
import { externalLinks, externalLinkProps } from '@/lib/links';
import { cn } from '@/lib/utils';
import { easings, durations } from '@/lib/motion';

const NAV_LINKS = [
  { labelKey: 'desserts', href: '/desserts' },
  { labelKey: 'customCakes', href: '/custom' },
  { labelKey: 'ourStory', href: '/story' },
  { labelKey: 'visit', href: '/visit' },
  { labelKey: 'journal', href: '/journal' },
] as const;

const SECONDARY = [
  { labelKey: 'orderOnWolt', href: externalLinks.wolt },
  { labelKey: 'whatsApp', href: externalLinks.whatsapp },
] as const;

export function MobileNav({ transparent = true }: { transparent?: boolean }) {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isElevated = scrolled || !transparent;

  return (
    <>
      {/* Mobile header bar */}
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 h-16 lg:hidden',
          'transition-all duration-base ease-out-slow',
          isElevated || open
            ? 'bg-ivory/95 backdrop-blur-md border-b border-whisper/60'
            : 'bg-transparent'
        )}
      >
        <div className="page-gutter mx-auto flex h-full items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t('menu')}
            aria-expanded={open}
            className="-ml-2 flex size-11 items-center justify-center text-espresso"
          >
            <Menu strokeWidth={1.25} className="size-6" aria-hidden="true" />
          </button>

          <Link href="/" aria-label={t('home')} className="block w-24 shrink-0">
            <Logo withTagline={false} />
          </Link>

          <div className="-mr-1">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Menu panel + scrim */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: durations.quick, ease: easings.outSlow }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-espresso/55 lg:hidden"
              aria-hidden="true"
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.45, ease: easings.outSlow }}
              className="fixed inset-y-0 left-0 z-50 flex w-[88%] max-w-md flex-col bg-ivory lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label={t('menu')}
              style={{ paddingTop: 'env(safe-area-inset-top)' }}
            >
              <div className="flex items-center justify-between px-6 py-5">
                <Logo withTagline={false} className="w-24" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="-mr-2 flex size-11 items-center justify-center text-espresso"
                >
                  <X strokeWidth={1.25} className="size-6" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-8 pt-8">
                <Eyebrow>{t('menu')}</Eyebrow>
                <ul className="mt-6 space-y-7">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.labelKey}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: durations.base,
                        ease: easings.outSlow,
                        delay: 0.1 + i * 0.05,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block font-display text-display-sm text-espresso"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <div className="my-7 flex items-center justify-center">
                  <Ornament />
                </div>

                <Eyebrow>{t('orderNow')}</Eyebrow>
                <ul className="mt-5 space-y-4">
                  {SECONDARY.map((link) => (
                    <li key={link.labelKey}>
                      <a
                        href={link.href}
                        {...externalLinkProps}
                        className="block text-body-md text-espresso underline-reveal w-fit"
                      >
                        {t(link.labelKey)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="border-t border-whisper px-6 py-6"
                style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' }}
              >
                <Eyebrow className="mb-3">{t('language')}</Eyebrow>
                <LanguageSwitcher />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
