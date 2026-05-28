'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { easings, durations, staggerContainer, heroLift } from '@/lib/motion';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&q=90&w=1800';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      id="main"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ivory pt-24 lg:pt-32"
      aria-labelledby="hero-heading"
    >
      {/* Mobile-only image — appears at the top */}
      <div className="relative aspect-[4/5] w-full overflow-hidden lg:hidden">
        <Image
          src={HERO_IMAGE}
          alt={t('imageAlt')}
          fill
          priority
          sizes="100vw"
          className="object-cover animate-ken-burns"
        />
      </div>

      <div className="page-gutter mx-auto max-w-content">
        <div className="grid grid-cols-12 items-center gap-y-8 lg:min-h-[calc(100svh-128px)] lg:gap-x-8">
          {/* Text column — left on desktop, full-width on mobile */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="col-span-12 py-8 lg:col-span-5 lg:py-0"
          >
            <motion.div variants={heroLift}>
              <Eyebrow>{t('eyebrow')}</Eyebrow>
            </motion.div>

            <motion.h1
              id="hero-heading"
              variants={heroLift}
              className="mt-6 font-display text-display-xl text-espresso [text-wrap:balance]"
            >
              {t('titleLine1')}
              <br />
              <span className="italic text-caramel">{t('titleEmphasis')}</span> {t('titleLine2')}
            </motion.h1>

            <motion.p
              variants={heroLift}
              className="mt-8 max-w-md text-body-lg text-mocha [text-wrap:pretty]"
            >
              {t('description')}
            </motion.p>

            <motion.div variants={heroLift} className="mt-7 flex flex-wrap items-center gap-5">
              <Button variant="primary" size="lg" as="a" href="#todays-selection" showArrow>
                {t('todaysSelection')}
              </Button>
              <Button variant="tertiary" as="a" href="/custom" showArrow>
                {t('preOrderCake')}
              </Button>
            </motion.div>

            <motion.div
              variants={heroLift}
              className="mt-8 hidden items-center gap-3 text-mono-xs uppercase text-ash lg:flex"
            >
              <span>{t('scroll')}</span>
              <span className="h-px w-7 bg-ash" aria-hidden="true" />
            </motion.div>
          </motion.div>

          {/* Image column — right on desktop, hidden on mobile (rendered above) */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: durations.luxe, ease: easings.outSlow }}
            className="relative col-span-7 hidden aspect-[4/5] overflow-hidden lg:col-start-6 lg:block"
          >
            <Image
              src={HERO_IMAGE}
              alt={t('imageAlt')}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover animate-ken-burns"
            />
            {/* Editorial caption — bottom-right, small */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-end p-6">
              <span className="bg-ivory/90 px-3 py-1.5 text-mono-xs uppercase text-espresso backdrop-blur-sm">
                {t('caption')}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
