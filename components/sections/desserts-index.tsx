'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Tag } from '@/components/ui/tag';
import { Reveal } from '@/components/ui/reveal';
import { Link } from '@/i18n/navigation';
import { categories, todaysSelection } from '@/lib/content';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

const MotionLink = motion(Link);

export function DessertsIndex() {
  const t = useTranslations('pages.desserts');
  const tCat = useTranslations('categories');
  const tProducts = useTranslations('products');

  return (
    <>
      {/* Category grid */}
      <section className="section-y" aria-label={t('eyebrow')}>
        <div className="page-gutter mx-auto max-w-content">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8"
          >
            {categories.map((category, index) => (
              <MotionLink
                key={category.id}
                href={category.href}
                variants={fadeUp}
                aria-label={`${t('browse')} ${tCat(`${category.id}.name`)}`}
                className={cn(
                  'group relative block overflow-hidden bg-bone',
                  index % 4 === 0 || index % 4 === 3
                    ? 'col-span-12 aspect-[3/4] md:col-span-7 md:aspect-[5/6]'
                    : 'col-span-12 aspect-[3/4] md:col-span-5 md:aspect-[5/6]'
                )}
              >
                <Image
                  src={category.image}
                  alt={tCat(`${category.id}.imageAlt`)}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-luxe ease-out-slow group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-espresso/70 via-espresso/30 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7 lg:p-8">
                  <div className="flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <span className="block text-mono-xs uppercase text-ivory/70">
                        0{index + 1}
                      </span>
                      <h2 className="mt-2 font-display text-display-md text-ivory [text-wrap:balance]">
                        {tCat(`${category.id}.name`)}
                      </h2>
                      <p className="mt-2 max-w-xs text-body-md text-ivory/75 [text-wrap:pretty]">
                        {tCat(`${category.id}.accent`)}
                      </p>
                    </div>
                    <span
                      className="hidden size-[48px] shrink-0 items-center justify-center rounded-pill border border-ivory/60 text-ivory transition-all duration-base ease-out-slow group-hover:border-ivory group-hover:bg-ivory group-hover:text-espresso md:flex"
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="size-4" strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </MotionLink>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Full counter list */}
      <section className="section-y-tight bg-bone/40" aria-label="Counter">
        <div className="page-gutter mx-auto max-w-content">
          <Reveal>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
          </Reveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:mt-12"
          >
            {todaysSelection.map((product) => (
              <motion.article key={product.id} variants={fadeUp} className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                  <Image
                    src={product.image}
                    alt={tProducts(`${product.id}.imageAlt`)}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                    className="object-cover transition-transform duration-slow ease-out-slow group-hover:scale-[1.04]"
                  />
                  {product.tag && (
                    <div className="absolute left-4 top-4">
                      <Tag variant={product.tag} />
                    </div>
                  )}
                </div>
                <div className="mt-5">
                  <Eyebrow className="text-mocha">{tProducts(`${product.id}.flavor`)}</Eyebrow>
                  <h3 className="mt-2 font-display text-heading-lg leading-tight text-espresso [text-wrap:balance] [hyphens:none]">
                    {tProducts(`${product.id}.name`)}
                  </h3>
                  <p className="mt-2 text-body-sm text-mocha [text-wrap:pretty]">
                    {tProducts(`${product.id}.description`)}
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-sans text-body-md font-medium text-espresso">
                      {product.price}
                    </span>
                    <span className="text-mono-xs uppercase text-ash">
                      / {tProducts(`${product.id}.unit`)}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
