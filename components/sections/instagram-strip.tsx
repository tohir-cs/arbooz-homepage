'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/ui/reveal';
import { instagramFeed } from '@/lib/content';
import { externalLinks, externalLinkProps } from '@/lib/links';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

const INSTAGRAM_HANDLE = '@arbooz_cafe';

export function InstagramStrip() {
  const t = useTranslations('instagram');
  const tCommon = useTranslations('common');

  return (
    <section className="section-y-tight bg-ivory" aria-labelledby="instagram-heading">
      <div className="page-gutter mx-auto max-w-content">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <h2
                id="instagram-heading"
                className="mt-4 font-display text-display-md text-espresso"
              >
                <a
                  href={externalLinks.instagram}
                  {...externalLinkProps}
                  className="inline-flex items-center gap-3 underline-reveal"
                >
                  {INSTAGRAM_HANDLE}
                  <ArrowUpRight className="size-7 text-caramel" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </h2>
            </div>
            <p className="max-w-xs text-body-md text-mocha">{t('description')}</p>
          </div>
        </Reveal>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-8 grid grid-cols-2 gap-px md:grid-cols-3 lg:mt-16 lg:grid-cols-6"
      >
        {instagramFeed.map((post, index) => (
          <motion.a
            key={post.id}
            variants={fadeUp}
            href={externalLinks.instagram}
            {...externalLinkProps}
            aria-label={tCommon('externalPost', {
              index: index + 1,
              alt: t(`alts.${post.id}`),
            })}
            className="group relative block aspect-square overflow-hidden bg-bone"
          >
            <Image
              src={post.image}
              alt={t(`alts.${post.id}`)}
              fill
              sizes="(min-width: 1024px) 17vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-slow ease-out-slow group-hover:scale-[1.05]"
            />
            <div
              className="absolute inset-0 flex items-center justify-center bg-espresso/0 opacity-0 transition-all duration-base ease-out-slow group-hover:bg-espresso/40 group-hover:opacity-100"
              aria-hidden="true"
            >
              <Instagram className="size-7 text-ivory" strokeWidth={1.25} />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
