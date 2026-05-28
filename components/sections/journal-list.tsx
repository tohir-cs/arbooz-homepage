'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/ui/reveal';
import { instagramFeed } from '@/lib/content';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

export function JournalList() {
  const t = useTranslations('pages.journal');

  const entries = [
    {
      title: t('entry1Title'),
      excerpt: t('entry1Excerpt'),
      date: t('entry1Date'),
      image: instagramFeed[2].image,
    },
    {
      title: t('entry2Title'),
      excerpt: t('entry2Excerpt'),
      date: t('entry2Date'),
      image: instagramFeed[1].image,
    },
    {
      title: t('entry3Title'),
      excerpt: t('entry3Excerpt'),
      date: t('entry3Date'),
      image: instagramFeed[3].image,
    },
  ];

  return (
    <section className="section-y" aria-label="Journal entries">
      <div className="page-gutter mx-auto max-w-content">
        <Reveal>
          <Eyebrow>{t('comingSoon')}</Eyebrow>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3"
        >
          {entries.map((entry) => (
            <motion.article key={entry.title} variants={fadeUp} className="group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-bone">
                <Image
                  src={entry.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover transition-transform duration-slow ease-out-slow group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-5 text-mono-xs uppercase text-ash">{entry.date}</p>
              <h2 className="mt-2 font-display text-heading-lg text-espresso [text-wrap:balance]">
                {entry.title}
              </h2>
              <p className="mt-2 text-body-md text-mocha [text-wrap:pretty]">{entry.excerpt}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
