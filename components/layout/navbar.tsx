'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './language-switcher';
import { Eyebrow } from '@/components/ui/eyebrow';
import { categories } from '@/lib/content';
import { externalLinks } from '@/lib/links';
import { cn } from '@/lib/utils';
import { easings, durations } from '@/lib/motion';

type NavLink = {
  labelKey: 'desserts' | 'customCakes' | 'ourStory' | 'visit' | 'journal';
  href: string;
  hasMenu?: boolean;
};

const NAV_LINKS: ReadonlyArray<NavLink> = [
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

  // Debounce mega-menu close. When the cursor leaves the trigger and moves
  // toward the dropdown there's an inevitable pixel gap; without this, the
  // menu closes mid-transit. 120ms is short enough to feel responsive but
  // long enough to cover the gap.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };
  const openMenu = () => {
    cancelClose();
    setMegaOpen(true);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => cancelClose, []);

  const isElevated = scrolled || !transparent;

  return (
    <header
      className={cn(
        // Desktop-only — mobile uses MobileNav as a separate component
        'fixed inset-x-0 top-0 z-50 hidden lg:block',
        'transition-all',
        isElevated
          ? 'h-[72px] bg-ivory/85 backdrop-blur-md border-b border-whisper/60'
          : 'h-[96px] bg-transparent border-b border-transparent'
      )}
      style={{
        transitionDuration: '450ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Skip link */}
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
        {/* Left — wordmark. Flex centers logo+tagline vertically as the
            header height transitions 96→72px. Width animates on a single
            property for one smooth motion. */}
        <Link
          href="/"
          className="flex h-full items-center transition-[width] duration-base ease-out-slow"
          aria-label={t('home')}
          style={{ width: isElevated ? 96 : 132 }}
        >
          <Logo withTagline={!isElevated} className="w-full" />
        </Link>

        {/* Center — nav links */}
        <ul className="flex items-center gap-8" role="menubar">
          {NAV_LINKS.map((link) => (
            <li
              key={link.labelKey}
              role="none"
              onMouseEnter={() => link.hasMenu && openMenu()}
              onMouseLeave={() => link.hasMenu && scheduleClose()}
              className="relative"
            >
              <Link
                href={link.href}
                role="menuitem"
                className="nav-link inline-flex items-center gap-1.5"
                aria-haspopup={link.hasMenu ? 'true' : undefined}
                aria-expanded={link.hasMenu ? megaOpen : undefined}
              >
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
        <div className="flex items-center gap-6">
          <LanguageSwitcher />
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
            // Critical: hover-bridge. Opening the menu cancels any pending
            // close; entering keeps it open; leaving schedules a close.
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full border-b border-whisper bg-ivory/95 backdrop-blur-md"
          >
            {/* Invisible bridge above the menu surface — extends the hover
                target up into the gap between trigger and menu */}
            <div
              className="pointer-events-auto absolute -top-3 inset-x-0 h-3"
              aria-hidden="true"
            />

            <div className="page-gutter mx-auto grid max-w-content grid-cols-12 gap-8 py-8">
              {/* Categories list */}
              <div className="col-span-3">
                <Eyebrow>{t('byCategory')}</Eyebrow>
                <ul className="mt-5 space-y-3">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={cat.href}
                        onClick={() => setMegaOpen(false)}
                        className="font-display text-heading-md text-espresso underline-reveal inline-block"
                      >
                        {tCategories(`${cat.id}.name`)}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/desserts/sweets"
                      onClick={() => setMegaOpen(false)}
                      className="font-display text-heading-md text-espresso underline-reveal inline-block"
                    >
                      Sweets
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/desserts/seasonal"
                      onClick={() => setMegaOpen(false)}
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
                <Link
                  href="/desserts/cakes"
                  onClick={() => setMegaOpen(false)}
                  className="mt-5 group block"
                >
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
                    <Link
                      href="/desserts/macarons#gift"
                      onClick={() => setMegaOpen(false)}
                      className="underline-reveal inline-block text-espresso"
                    >
                      {t('macaronGiftBoxes')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/custom"
                      onClick={() => setMegaOpen(false)}
                      className="underline-reveal inline-block text-espresso"
                    >
                      {t('preOrderCake')}
                    </Link>
                  </li>
                  <li>
                    <a
                      href={externalLinks.wolt}
                      className="underline-reveal inline-block text-espresso"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('orderOnWolt')}
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/giftcards"
                      onClick={() => setMegaOpen(false)}
                      className="underline-reveal inline-block text-espresso"
                    >
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
