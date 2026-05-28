'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, MessageCircle, Navigation, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/ui/reveal';
import { visit } from '@/lib/content';
import { externalLinks, externalLinkProps } from '@/lib/links';

// Stylized hand-drawn map of central Riga around Dzirnavu 34A.
// Improvements over the prior version:
//   - Larger pin & label so it reads on mobile
//   - Slightly stronger street contrast
//   - Subtle compass repositioned out of the legibility zone
function StylizedMap({ label }: { label: string }) {
  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden border border-whisper bg-bone sm:aspect-[16/9]"
      aria-label={label}
      role="img"
    >
      <svg
        viewBox="0 0 800 450"
        className="absolute inset-0 size-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Background warm wash */}
        <rect width="800" height="450" fill="#F2EBE0" />

        {/* Park / green block */}
        <path d="M50 100 L200 80 L220 220 L60 240 Z" fill="#A8B59A" opacity="0.4" />
        <text x="125" y="170" fontSize="10" fill="#5B5045" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          Vērmanes dārzs
        </text>

        {/* Block 2 */}
        <path d="M620 80 L750 80 L760 200 L630 220 Z" fill="#A8B59A" opacity="0.3" />

        {/* Streets */}
        <path d="M380 0 L390 450" stroke="#E5DDD0" strokeWidth="38" />
        <text x="402" y="50" fontSize="10" fill="#7A6B5F" fontFamily="serif">Brīvības iela</text>

        <path d="M0 270 L800 280" stroke="#E5DDD0" strokeWidth="32" />
        <text x="80" y="265" fontSize="10" fill="#5B5045" fontFamily="serif">Dzirnavu iela</text>

        <path d="M0 130 L800 140" stroke="#E5DDD0" strokeWidth="24" />
        <text x="500" y="125" fontSize="10" fill="#7A6B5F" fontFamily="serif">Elizabetes iela</text>

        <path d="M530 0 L535 450" stroke="#E5DDD0" strokeWidth="22" />
        <text x="548" y="400" fontSize="10" fill="#7A6B5F" fontFamily="serif">Antonijas</text>

        {/* Building blocks */}
        <g fill="#FAF6F0" stroke="#E5DDD0" strokeWidth="0.5">
          <rect x="430" y="190" width="80" height="60" />
          <rect x="430" y="310" width="80" height="55" />
          <rect x="430" y="380" width="80" height="50" />
          <rect x="270" y="190" width="80" height="60" />
          <rect x="270" y="310" width="80" height="55" />
          <rect x="270" y="380" width="80" height="50" />
          <rect x="555" y="190" width="60" height="60" />
          <rect x="555" y="310" width="60" height="55" />
          <rect x="630" y="310" width="60" height="55" />
          <rect x="200" y="310" width="60" height="55" />
        </g>

        {/* Arbooz pin — pulsing dot, larger label so it reads on mobile */}
        <g transform="translate(465 280)">
          <circle cx="0" cy="0" r="22" fill="#C68A4F" opacity="0.18">
            <animate attributeName="r" values="22;32;22" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.18;0;0.18" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="11" fill="#C68A4F" opacity="0.35" />
          <circle cx="0" cy="0" r="5.5" fill="#C68A4F" />
        </g>
        <text x="465" y="322" fontSize="13" fill="#2A1E18" fontFamily="serif" fontStyle="italic" textAnchor="middle" fontWeight="500">
          arbOOz
        </text>
        <text x="465" y="338" fontSize="9" fill="#7A6B5F" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1.5">
          DZIRNAVU 34A
        </text>

        {/* Compass — moved to clear of label area */}
        <g transform="translate(745 420)">
          <circle cx="0" cy="0" r="14" fill="#FAF6F0" stroke="#7A6B5F" strokeWidth="0.5" />
          <path d="M0 -10 L3 0 L0 10 L-3 0 Z" fill="#2A1E18" />
          <text x="0" y="-16" fontSize="7" fill="#2A1E18" fontFamily="serif" textAnchor="middle">N</text>
        </g>
      </svg>
    </div>
  );
}

export function Visit() {
  const t = useTranslations('visit');
  const hours = [
    { day: t('days.tueFri'), time: '11:00 – 18:00' },
    { day: t('days.sat'), time: '11:00 – 17:00' },
    { day: t('days.mon'), time: '11:00 – 18:00' },
    { day: t('days.sun'), time: t('closed') },
  ];

  return (
    <section className="section-y bg-bone/40" aria-labelledby="visit-heading">
      <div className="page-gutter mx-auto max-w-content">
        {/* Top: photo + info */}
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-16">
          <Reveal className="col-span-12 lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden bg-bone lg:aspect-[5/6]">
              <Image
                src={visit.image}
                alt={t('imageAlt')}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-mono-xs uppercase text-ash">{t('caption')}</p>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-5 lg:pt-8">
            <Eyebrow>{t('eyebrow')}</Eyebrow>

            <h2
              id="visit-heading"
              className="mt-5 font-display text-display-md text-espresso [text-wrap:balance]"
            >
              {t('titleLine1')}
              <br />
              {t('titleLine2Prefix')} <span className="italic">{t('titleEmphasis')}</span>.
            </h2>

            {/* Address */}
            <div className="mt-7 flex items-start gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-caramel" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="text-body-lg text-espresso">{t('address')}</p>
                <p className="text-body-md text-mocha">{t('city')}</p>
              </div>
            </div>

            {/* Hours table */}
            <div className="mt-8">
              <p className="text-mono-sm uppercase text-mocha">{t('hours')}</p>
              <dl className="mt-3 divide-y divide-whisper">
                {hours.map((h) => (
                  <div key={h.day} className="flex items-baseline justify-between gap-3 py-3">
                    <dt className="text-body-md text-espresso">{h.day}</dt>
                    <dd className="font-sans text-body-md text-mocha tabular-nums">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Quick contact */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 text-body-md">
              <a
                href={`tel:${visit.phone.replace(/\s/g, '')}`}
                className="inline-flex min-h-[44px] items-center gap-2 text-espresso underline-reveal w-fit"
              >
                <Phone className="size-4 text-caramel" strokeWidth={1.5} aria-hidden="true" />
                {visit.phone}
              </a>
              <a
                href={`mailto:${visit.email}`}
                className="inline-flex min-h-[44px] items-center gap-2 text-espresso underline-reveal w-fit"
              >
                <Mail className="size-4 text-caramel" strokeWidth={1.5} aria-hidden="true" />
                {t('email')}
              </a>
            </div>

            {/* Primary CTA — Directions (Google), with WhatsApp secondary */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                as="a"
                href={externalLinks.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                showArrow
              >
                {t('directions')}
              </Button>
              <Button
                variant="tertiary"
                as="a"
                href={externalLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-1 size-4" strokeWidth={1.5} aria-hidden="true" />
                {t('whatsapp')}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal className="mt-16 lg:mt-24">
          <StylizedMap label={t('mapLabel')} />
        </Reveal>

        {/* Map provider quick-actions — appears below the stylized map */}
        <Reveal className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href={externalLinks.googleMaps}
            {...externalLinkProps}
            className="inline-flex min-h-[44px] items-center gap-2 border border-espresso/15 bg-ivory/60 px-5 text-mono-sm uppercase text-espresso transition-colors duration-quick ease-out-slow hover:border-espresso hover:bg-ivory"
          >
            <Navigation className="size-4 text-caramel" strokeWidth={1.5} aria-hidden="true" />
            Google Maps
          </a>
          <a
            href={externalLinks.appleMaps}
            {...externalLinkProps}
            className="inline-flex min-h-[44px] items-center gap-2 border border-espresso/15 bg-ivory/60 px-5 text-mono-sm uppercase text-espresso transition-colors duration-quick ease-out-slow hover:border-espresso hover:bg-ivory"
          >
            <Apple className="size-4 text-caramel" strokeWidth={1.5} aria-hidden="true" />
            Apple Maps
          </a>
        </Reveal>
      </div>
    </section>
  );
}
