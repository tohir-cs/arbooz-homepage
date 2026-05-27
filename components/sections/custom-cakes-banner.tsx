'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Ornament } from '@/components/ui/ornament';
import { customCakes } from '@/lib/content';
import { viewportOnce, fadeUp, staggerContainer } from '@/lib/motion';

export function CustomCakesBanner() {
  const t = useTranslations('custom');

  return (
    <section
      className="relative h-[700px] w-full overflow-hidden bg-espresso lg:h-[820px]"
      aria-labelledby="custom-heading"
    >
      <Image
        src={customCakes.image}
        alt={t('imageAlt')}
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark gradient for legibility — heavier at the bottom */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-espresso/50 via-espresso/40 to-espresso/70"
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative flex h-full items-center"
      >
        <div className="page-gutter mx-auto w-full max-w-content">
          <div className="max-w-2xl text-ivory">
            <motion.div variants={fadeUp}>
              <Eyebrow tone="ivory">{t('eyebrow')}</Eyebrow>
            </motion.div>

            <motion.h2
              id="custom-heading"
              variants={fadeUp}
              className="mt-6 font-display text-display-lg text-ivory lg:text-display-xl"
            >
              {t('titleLine1')}
              <br />
              {t('titleLine2Prefix')} <span className="italic text-rose">{t('titleEmphasis')}</span> {t('titleLine2Suffix')}
            </motion.h2>

            <motion.div variants={fadeUp} className="mt-4">
              <Ornament tone="ivory" className="opacity-70" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-lg text-body-lg text-ivory/85"
            >
              {t('description')}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-wrap items-center gap-5"
            >
              <Button variant="primary" size="lg" as="a" href="/custom" showArrow>
                {t('start')}
              </Button>
              <Button variant="on-dark" as="a" href="/custom#gallery">
                {t('gallery')}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
