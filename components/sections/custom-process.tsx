'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/ui/reveal';
import { customCakes } from '@/lib/content';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

export function CustomProcess() {
  const t = useTranslations('pages.custom');

  const steps = [
    { n: '01', title: t('step1Title'), body: t('step1Body') },
    { n: '02', title: t('step2Title'), body: t('step2Body') },
    { n: '03', title: t('step3Title'), body: t('step3Body') },
  ];

  const details = [
    { label: t('detail1Label'), value: t('detail1Value') },
    { label: t('detail2Label'), value: t('detail2Value') },
    { label: t('detail3Label'), value: t('detail3Value') },
    { label: t('detail4Label'), value: t('detail4Value') },
  ];

  return (
    <>
      {/* Feature image */}
      <section className="section-y-tight">
        <div className="page-gutter mx-auto max-w-content">
          <Reveal>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-bone sm:aspect-[16/8]">
              <Image
                src={customCakes.image}
                alt={t('metaTitle')}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process steps */}
      <section className="section-y-tight" aria-labelledby="process-heading">
        <div className="page-gutter mx-auto max-w-content">
          <Reveal>
            <Eyebrow>{t('stepsEyebrow')}</Eyebrow>
            <h2
              id="process-heading"
              className="mt-5 max-w-2xl font-display text-display-md text-espresso [text-wrap:balance]"
            >
              {t('stepsTitle')}
            </h2>
          </Reveal>

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8"
          >
            {steps.map((step) => (
              <motion.li key={step.n} variants={fadeUp} className="flex flex-col">
                <span className="font-display text-display-sm text-caramel">{step.n}</span>
                <h3 className="mt-4 font-display text-heading-lg text-espresso">{step.title}</h3>
                <p className="mt-3 text-body-md text-mocha [text-wrap:pretty]">{step.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Details */}
      <section className="section-y-tight bg-bone/40" aria-labelledby="details-heading">
        <div className="page-gutter mx-auto max-w-content">
          <Reveal>
            <Eyebrow>{t('detailsEyebrow')}</Eyebrow>
            <h2
              id="details-heading"
              className="mt-5 font-display text-display-md text-espresso [text-wrap:balance]"
            >
              {t('detailsTitle')}
            </h2>
          </Reveal>

          <motion.dl
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
          >
            {details.map((d) => (
              <motion.div
                key={d.label}
                variants={fadeUp}
                className="flex flex-col border-t border-whisper pt-4"
              >
                <dt className="text-mono-sm uppercase text-mocha">{d.label}</dt>
                <dd className="mt-2 text-body-lg text-espresso [text-wrap:pretty]">{d.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </section>
    </>
  );
}
