'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { LanguageSwitcher } from './language-switcher';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Ornament } from '@/components/ui/ornament';
import { cn } from '@/lib/utils';
import { easings, durations } from '@/lib/motion';

const NAV_LINKS = [
  { label: 'Desserts', href: '/desserts' },
  { label: 'Custom Cakes', href: '/custom' },
  { label: 'Our Story', href: '/story' },
  { label: 'Visit', href: '/visit' },
  { label: 'Journal', href: '/journal' },
];

const SECONDARY = [
  { label: 'Order on Wolt', href: 'https://wolt.com', external: true },
  { label: 'WhatsApp +371 26 530 164', href: 'https://wa.me/37126530164', external: true },
];

export function MobileNav({ transparent = true }: { transparent?: boolean }) {
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
      {/* Bar */}
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 h-16 lg:hidden',
          'transition-all duration-base ease-out-slow',
          isElevated || open
            ? 'bg-ivory/90 backdrop-blur-md border-b border-whisper/60'
            : 'bg-transparent'
        )}
      >
        <div className="page-gutter mx-auto flex h-full items-center justify-between">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="-ml-2 p-2 text-espresso"
          >
            <Menu strokeWidth={1.25} className="size-6" aria-hidden="true" />
          </button>

          <a href="/" aria-label="Arbooz — Home" className="block w-24">
            <Logo withTagline={false} />
          </a>

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
              aria-label="Site menu"
            >
              <div className="flex items-center justify-between px-6 py-5">
                <Logo withTagline={false} className="w-24" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="-mr-2 p-2 text-espresso"
                >
                  <X strokeWidth={1.25} className="size-6" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-8 pt-8">
                <Eyebrow>Menu</Eyebrow>
                <ul className="mt-6 space-y-7">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: durations.base,
                        ease: easings.outSlow,
                        delay: 0.1 + i * 0.05,
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block font-display text-display-sm text-espresso"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <div className="my-7 flex items-center justify-center">
                  <Ornament />
                </div>

                <Eyebrow>Order now</Eyebrow>
                <ul className="mt-5 space-y-4">
                  {SECONDARY.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noreferrer' : undefined}
                        className="block text-body-md text-espresso underline-reveal w-fit"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-whisper px-6 py-6">
                <Eyebrow className="mb-3">Language</Eyebrow>
                <LanguageSwitcher />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
