'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Ornament } from '@/components/ui/ornament';
import { Eyebrow } from '@/components/ui/eyebrow';
import { easings, durations } from '@/lib/motion';

/**
 * Locale-aware 404. Triggered by notFound() in any [locale] route when the
 * slug isn't recognized. The site chrome (navbar/footer) is not rendered here
 * because not-found boundaries sit outside the page tree — we keep it a clean,
 * self-contained editorial moment with a route back home.
 */
export default function LocaleNotFound() {
  const t = useTranslations('notFound');

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center bg-ivory px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.luxe, ease: easings.outSlow }}
        className="mx-auto flex max-w-xl flex-col items-center text-center"
      >
        <p
          className="font-display text-[clamp(5rem,15vw,9rem)] leading-none text-caramel"
          aria-hidden="true"
        >
          404
        </p>
        <Eyebrow className="mt-2">{t('eyebrow')}</Eyebrow>
        <h1 className="mt-4 font-display text-display-md text-espresso [text-wrap:balance]">
          {t('title')}
        </h1>
        <Ornament className="mt-6" />
        <p className="mt-6 max-w-md text-body-lg text-mocha [text-wrap:pretty]">
          {t('description')}
        </p>
        <div className="mt-8">
          <Button as="a" href="/" showArrow>
            {t('cta')}
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
