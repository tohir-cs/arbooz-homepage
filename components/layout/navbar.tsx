'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './language-switcher';
import { Eyebrow } from '@/components/ui/eyebrow';
import { categories } from '@/lib/content';
import { cn } from '@/lib/utils';
import { easings, durations } from '@/lib/motion';

const NAV_LINKS = [
  { labelKey: 'desserts', href: '/desserts', hasMenu: true },
  { labelKey: 'customCakes', href: '/custom' },
  { labelKey: 'ourStory', href: '/story' },
  { labelKey: 'visit', href: '/visit' },
  { labelKey: 'journal', href: '/journal' },
];

type NavbarProps = {
  /** Whether the navbar should start transparent (over a hero image). */
  transparent?: boolean;
};

export function Navbar({ transparent = true }: NavbarProps) {
  const t = useTranslations('nav');
  const tCategories = useTranslations('categories');
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isElevated = scrolled || !transparent;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all',
        isElevated
          ? 'h-[72px] bg-ivory/85 backdrop-blur-md border-b border-whisper/60'
          : 'h-[96px] bg-transparent border-b border-transparent'
      )}
      style={{ transitionDuration: '450ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <a
        href="#main"
        className="sr-only-focusable absolute left-4 top-4 z-10 bg-espresso px-4 py-2 text-mono-sm text-ivory"
      >
        {t('skip')}
      </a>

      <nav
        aria-label="Primary"
        className="page-gutter mx-auto flex h-full max-w-content items-center justify-between"
      >
        {/* Left — wordmark */}
        <Link
          href="/"
          className="block transition-all"
          aria-label={t('home')}
          style={{
            width: isElevated ? 110 : 140,
            transitionDuration: '450ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Logo withTagline={!isElevated} />
        </Link>

        {/* Center — nav links */}
        <ul className="hidden items-center gap-8 lg:flex" role="menubar">
          {NAV_LINKS.map((link) => (
            <li
              key={link.labelKey}
              role="none"
              onMouseEnter={() => link.hasMenu && setMegaOpen(true)}
              onMouseLeave={() => link.hasMenu && setMegaOpen(false)}
              className="relative"
            >
              <Link href={link.href} role="menuitem" className="nav-link inline-flex items-center gap-1.5">
                {t(link.labelKey)}
                {link.hasMenu && (
                  <ChevronDown
                    className={cn(
                      'size-3 transition-transform duration-quick ease-out-slow',
                      megaOpen && 'rotate-180'
                    )}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right — language switcher */}
        <div className="hidden items-center gap-6 lg:flex">
          <LanguageSwitcher tone={isElevated ? 'dark' : 'dark'} />
        </div>

        {/* Mobile placeholder — actual mobile nav is rendered separately */}
        <div className="lg:hidden">
          <LanguageSwitcher tone="dark" />
        </div>
      </nav>

      {/* Mega menu — Desserts dropdown */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: durations.quick, ease: easings.outSlow }}
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
            className="absolute inset-x-0 top-full hidden border-b border-whisper bg-ivory/95 backdrop-blur-md lg:block"
          >
            <div className="page-gutter mx-auto grid max-w-content grid-cols-12 gap-8 py-8">
              {/* Categories list */}
              <div className="col-span-3">
                <Eyebrow>{t('byCategory')}</Eyebrow>
                <ul className="mt-5 space-y-3">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={cat.href}
                        className="font-display text-heading-md text-espresso underline-reveal inline-block"
                      >
                        {tCategories(`${cat.id}.name`)}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/desserts/sweets"
                      className="font-display text-heading-md text-espresso underline-reveal inline-block"
                    >
                      Sweets
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/desserts/seasonal"
                      className="font-display text-heading-md text-caramel italic underline-reveal inline-block"
                    >
                      Seasonal
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Featured editorial card */}
              <div className="col-span-6">
                <Eyebrow>{t('featuredThisWeek')}</Eyebrow>
                <Link href="/desserts/cakes" className="mt-5 group block">
                  <div className="relative aspect-[16/9] overflow-hidden bg-bone">
                    <Image
                      src={categories[2].image}
                      alt={tCategories('cakes.imageAlt')}
                      fill
                      sizes="40vw"
                      className="object-cover transition-transform duration-slow ease-out-slow group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-display-sm text-espresso">
                    {t('featuredTitle')}
                  </h3>
                  <p className="mt-1 text-body-md text-mocha">
                    {t('featuredDescription')}
                  </p>
                </Link>
              </div>

              {/* Quick links */}
              <div className="col-span-3">
                <Eyebrow>{t('shop')}</Eyebrow>
                <ul className="mt-5 space-y-3 text-body-md">
                  <li>
                    <Link href="/desserts/macarons#gift" className="underline-reveal inline-block text-espresso">
                      {t('macaronGiftBoxes')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/custom" className="underline-reveal inline-block text-espresso">
                      {t('preOrderCake')}
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://wolt.com"
                      className="underline-reveal inline-block text-espresso"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t('orderOnWolt')}
                    </a>
                  </li>
                  <li>
                    <Link href="/giftcards" className="underline-reveal inline-block text-espresso">
                      {t('giftCards')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
