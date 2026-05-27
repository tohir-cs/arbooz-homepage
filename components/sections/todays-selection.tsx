'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Tag } from '@/components/ui/tag';
import { Reveal } from '@/components/ui/reveal';
import { Link } from '@/i18n/navigation';
import { todaysSelection, type Product } from '@/lib/content';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

function ProductCard({ product }: { product: Product }) {
  const t = useTranslations(`products.${product.id}`);

  return (
    <motion.article
      variants={fadeUp}
      className="group flex w-[78vw] shrink-0 snap-start flex-col sm:w-[46vw] lg:w-[26vw] xl:w-[320px]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bone">
        <Image
          src={product.image}
          alt={t('imageAlt')}
          fill
          sizes="(min-width: 1280px) 320px, (min-width: 1024px) 26vw, (min-width: 640px) 46vw, 78vw"
          className="object-cover transition-transform duration-slow ease-out-slow group-hover:scale-[1.04]"
        />
        {product.tag && (
          <div className="absolute left-4 top-4">
            <Tag variant={product.tag} />
          </div>
        )}
      </div>

      <div className="mt-5">
        <Eyebrow className="text-mocha">{t('flavor')}</Eyebrow>
        <h3 className="mt-2 font-display text-heading-lg text-espresso">{t('name')}</h3>
        <p className="mt-2 max-w-xs text-body-sm text-mocha">{t('description')}</p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-sans text-body-md font-medium text-espresso">{product.price}</span>
          <span className="text-mono-xs uppercase text-ash">/ {t('unit')}</span>
        </div>
      </div>
    </motion.article>
  );
}

export function TodaysSelection() {
  const t = useTranslations('todays');
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 'left' | 'right') => {
    if (!scrollerRef.current) return;
    const card = scrollerRef.current.querySelector('article');
    const distance = card ? card.getBoundingClientRect().width + 32 : 360;
    scrollerRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="todays-selection"
      className="section-y"
      aria-labelledby="todays-heading"
    >
      <div className="page-gutter mx-auto max-w-content">
        <Reveal>
          <div className="grid grid-cols-12 items-end gap-y-6 lg:gap-x-8">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <h2
                id="todays-heading"
                className="mt-5 font-display text-display-lg text-espresso"
              >
                {t('titlePrefix')} <span className="italic">{t('titleEmphasis')}</span> {t('titleSuffix')}
                <br />
                {t('titleLine2')}
              </h2>
            </div>
            <div className="col-span-12 hidden items-center justify-end gap-3 lg:col-span-5 lg:flex">
              <button
                type="button"
                onClick={() => scrollBy('left')}
                aria-label={t('scrollLeft')}
                className="flex size-[48px] items-center justify-center rounded-pill border border-espresso/20 text-espresso transition-all duration-base ease-out-slow hover:border-espresso hover:bg-espresso hover:text-ivory"
              >
                <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy('right')}
                aria-label={t('scrollRight')}
                className="flex size-[48px] items-center justify-center rounded-pill border border-espresso/20 text-espresso transition-all duration-base ease-out-slow hover:border-espresso hover:bg-espresso hover:text-ivory"
              >
                <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroller — extends beyond container on the right so cards bleed off-edge */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="page-gutter mx-auto mt-8 max-w-content lg:mt-16"
      >
        <div
          ref={scrollerRef}
          className="-mr-[24px] flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 pr-[24px] md:-mr-[48px] md:pr-[48px] lg:-mr-[80px] lg:pr-[80px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {todaysSelection.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.div>

      <div className="page-gutter mx-auto mt-8 max-w-content">
        <Link
          href="/desserts"
          className="underline-reveal inline-flex items-center gap-2 text-mono-sm uppercase text-espresso"
        >
          {t('seeFullCounter')}
          <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
