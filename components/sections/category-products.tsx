'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Tag } from '@/components/ui/tag';
import { Eyebrow } from '@/components/ui/eyebrow';
import { todaysSelection } from '@/lib/content';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

type CategoryProductsProps = {
  filterCategories: string[];
  seasonalOnly?: boolean;
};

export function CategoryProducts({ filterCategories, seasonalOnly }: CategoryProductsProps) {
  const tProducts = useTranslations('products');

  const items = todaysSelection.filter((p) => {
    if (seasonalOnly) return p.tag === 'seasonal';
    return filterCategories.includes(p.category);
  });

  // Fall back to the whole counter if a category has no sample items, so the
  // page is never empty (these are demo fixtures; real data comes from a CMS).
  const products = items.length > 0 ? items : todaysSelection;

  return (
    <section className="section-y" aria-label="Products">
      <div className="page-gutter mx-auto max-w-content">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
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
  );
}
