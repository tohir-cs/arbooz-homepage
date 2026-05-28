'use client';

import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Ornament } from '@/components/ui/ornament';
import { easings, durations } from '@/lib/motion';

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  /** Optional alignment — centered for editorial pages, left for index pages */
  align?: 'center' | 'left';
};

/**
 * Standard inner-page header. Sits below the solid navbar (which is 72/96px),
 * so we pad the top generously. Keeps the editorial rhythm — eyebrow, serif
 * display title with optional italic emphasis passed as ReactNode, ornament,
 * and a lead paragraph. Animates in with the same fade-up curve used across
 * the site so it feels native.
 */
export function PageHero({ eyebrow, title, description, align = 'center' }: PageHeroProps) {
  const isCenter = align === 'center';

  return (
    <section className="bg-ivory pt-[140px] lg:pt-[200px]" aria-labelledby="page-heading">
      <div className="page-gutter mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.luxe, ease: easings.outSlow }}
          className={
            isCenter
              ? 'mx-auto flex max-w-3xl flex-col items-center text-center'
              : 'flex max-w-3xl flex-col items-start text-left'
          }
        >
          <Eyebrow>{eyebrow}</Eyebrow>

          <h1
            id="page-heading"
            className="mt-6 font-display text-display-lg text-espresso [text-wrap:balance] lg:text-display-xl"
          >
            {title}
          </h1>

          <Ornament className={isCenter ? 'mt-8' : 'mt-8'} />

          {description && (
            <p className="mt-8 max-w-xl text-body-lg text-mocha [text-wrap:pretty]">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
