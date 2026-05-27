'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/ui/reveal';
import { categories } from '@/lib/content';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Category = (typeof categories)[number];

function CategoryTile({
  category,
  className,
  index,
}: {
  category: Category;
  className?: string;
  index: number;
}) {
  return (
    <motion.a
      href={category.href}
      variants={fadeUp}
      className={cn(
        'group relative block overflow-hidden bg-bone',
        className
      )}
      aria-label={`Browse ${category.name}`}
    >
      <Image
        src={category.image}
        alt={category.imageAlt}
        fill
        sizes={category.span === 'large' ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 38vw, 100vw'}
        className="object-cover transition-transform duration-luxe ease-out-slow group-hover:scale-[1.04]"
      />

      {/* Bottom-anchored gradient for legibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-espresso/70 via-espresso/30 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7 lg:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="block text-mono-xs uppercase text-ivory/70">
              0{index + 1}
            </span>
            <h3 className="mt-2 font-display text-display-md text-ivory">
              {category.name}
            </h3>
            <p className="mt-2 max-w-xs text-body-md text-ivory/75">
              {category.accent}
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
    </motion.a>
  );
}

export function Categories() {
  // Asymmetric grid pattern: 7+5 then 5+7
  // Macarons (large) + Cupcakes (small)
  // Cakes (small) + Pastries (large)
  return (
    <section className="section-y bg-bone/40" aria-labelledby="categories-heading">
      <div className="page-gutter mx-auto max-w-content">
        <Reveal>
          <div className="grid grid-cols-12 items-end gap-y-6 lg:gap-x-8">
            <div className="col-span-12 lg:col-span-8">
              <Eyebrow>The collection</Eyebrow>
              <h2
                id="categories-heading"
                className="mt-5 font-display text-display-lg text-espresso"
              >
                Twelve flavors of macaron,
                <br />
                <span className="italic">nine</span> kinds of cake,
                <br />
                and the daily counter.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <p className="text-body-md text-mocha">
                Each season we retire a few favorites and introduce three new pieces — a quiet
                ritual that has shaped the menu since the boutique opened in June 2013.
              </p>
            </div>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-12 gap-4 md:gap-6 lg:mt-24 lg:gap-8"
        >
          {/* Row 1: Macarons (7) + Cupcakes (5) */}
          <CategoryTile
            category={categories[0]}
            index={0}
            className="col-span-12 aspect-[3/4] md:col-span-7 md:aspect-[5/6]"
          />
          <CategoryTile
            category={categories[1]}
            index={1}
            className="col-span-12 aspect-[3/4] md:col-span-5 md:aspect-[5/6]"
          />
          {/* Row 2: Cakes (5) + Pastries (7) */}
          <CategoryTile
            category={categories[2]}
            index={2}
            className="col-span-12 aspect-[3/4] md:col-span-5 md:aspect-[5/6]"
          />
          <CategoryTile
            category={categories[3]}
            index={3}
            className="col-span-12 aspect-[3/4] md:col-span-7 md:aspect-[5/6]"
          />
        </motion.div>
      </div>
    </section>
  );
}
