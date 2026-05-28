'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/ui/reveal';
import { Ornament } from '@/components/ui/ornament';
import { founder } from '@/lib/content';

export function StoryBody() {
  const t = useTranslations('pages.story');

  const blocks = [
    { eyebrow: t('body1Eyebrow'), title: t('body1Title'), text: t('body1Text') },
    { eyebrow: t('body2Eyebrow'), title: t('body2Title'), text: t('body2Text') },
    { eyebrow: t('body3Eyebrow'), title: t('body3Title'), text: t('body3Text') },
  ];

  return (
    <>
      {/* Founder portrait */}
      <section className="section-y-tight">
        <div className="page-gutter mx-auto max-w-content">
          <Reveal>
            <div className="relative mx-auto aspect-[16/10] w-full max-w-4xl overflow-hidden bg-bone sm:aspect-[16/9]">
              <Image
                src={founder.image}
                alt={founder.imageAlt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Narrative blocks */}
      <section className="section-y-tight" aria-label="Story">
        <div className="page-gutter mx-auto max-w-content">
          <div className="mx-auto flex max-w-2xl flex-col gap-16">
            {blocks.map((block) => (
              <Reveal key={block.eyebrow}>
                <Eyebrow>{block.eyebrow}</Eyebrow>
                <h2 className="mt-4 font-display text-display-sm text-espresso [text-wrap:balance]">
                  {block.title}
                </h2>
                <p className="mt-4 text-body-lg text-mocha [text-wrap:pretty]">{block.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="section-y bg-bone/40">
        <div className="page-gutter mx-auto max-w-content">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Ornament />
            <blockquote className="mt-8 font-display text-display-md italic text-espresso [text-wrap:balance]">
              &ldquo;{t('quote')}&rdquo;
            </blockquote>
            <p className="mt-8 text-mono-sm uppercase text-mocha">
              {t('quoteAuthor')} · {t('quoteRole')}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
