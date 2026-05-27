'use client';

import Image from 'next/image';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/ui/reveal';
import { visit } from '@/lib/content';

// Stylized hand-drawn map of central Riga around Dzirnavu 34A
function StylizedMap() {
  return (
    <div
      className="relative aspect-[16/9] w-full overflow-hidden border border-whisper bg-bone"
      aria-label="Stylized map showing the Arbooz location at Dzirnavu 34A, Riga"
      role="img"
    >
      <svg
        viewBox="0 0 800 450"
        className="absolute inset-0 size-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background warm wash */}
        <rect width="800" height="450" fill="#F2EBE0" />

        {/* Park / green block */}
        <path
          d="M50 100 L200 80 L220 220 L60 240 Z"
          fill="#A8B59A"
          opacity="0.35"
        />
        <text x="125" y="170" fontSize="9" fill="#7A6B5F" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          Vērmanes dārzs
        </text>

        {/* Block 2 */}
        <path
          d="M620 80 L750 80 L760 200 L630 220 Z"
          fill="#A8B59A"
          opacity="0.25"
        />

        {/* Street: Brīvības — wide vertical */}
        <path d="M380 0 L390 450" stroke="#E5DDD0" strokeWidth="38" />
        <text x="385" y="50" fontSize="9" fill="#B5A99D" fontFamily="serif" textAnchor="middle">
          Brīvības iela
        </text>

        {/* Street: Dzirnavu — horizontal */}
        <path d="M0 270 L800 280" stroke="#E5DDD0" strokeWidth="32" />
        <text x="100" y="265" fontSize="9" fill="#7A6B5F" fontFamily="serif">
          Dzirnavu iela
        </text>

        {/* Street: Elizabetes — horizontal upper */}
        <path d="M0 130 L800 140" stroke="#E5DDD0" strokeWidth="24" />
        <text x="500" y="125" fontSize="9" fill="#B5A99D" fontFamily="serif">
          Elizabetes iela
        </text>

        {/* Street: Antonijas — vertical */}
        <path d="M530 0 L535 450" stroke="#E5DDD0" strokeWidth="22" />
        <text x="540" y="400" fontSize="9" fill="#B5A99D" fontFamily="serif">
          Antonijas
        </text>

        {/* Building blocks */}
        <rect x="430" y="190" width="80" height="60" fill="#FAF6F0" stroke="#E5DDD0" strokeWidth="0.5" />
        <rect x="430" y="310" width="80" height="55" fill="#FAF6F0" stroke="#E5DDD0" strokeWidth="0.5" />
        <rect x="430" y="380" width="80" height="50" fill="#FAF6F0" stroke="#E5DDD0" strokeWidth="0.5" />
        <rect x="270" y="190" width="80" height="60" fill="#FAF6F0" stroke="#E5DDD0" strokeWidth="0.5" />
        <rect x="270" y="310" width="80" height="55" fill="#FAF6F0" stroke="#E5DDD0" strokeWidth="0.5" />
        <rect x="270" y="380" width="80" height="50" fill="#FAF6F0" stroke="#E5DDD0" strokeWidth="0.5" />
        <rect x="555" y="190" width="60" height="60" fill="#FAF6F0" stroke="#E5DDD0" strokeWidth="0.5" />
        <rect x="555" y="310" width="60" height="55" fill="#FAF6F0" stroke="#E5DDD0" strokeWidth="0.5" />
        <rect x="630" y="310" width="60" height="55" fill="#FAF6F0" stroke="#E5DDD0" strokeWidth="0.5" />
        <rect x="200" y="310" width="60" height="55" fill="#FAF6F0" stroke="#E5DDD0" strokeWidth="0.5" />

        {/* Arbooz pin — pulse and dot */}
        <g transform="translate(465 280)">
          <circle cx="0" cy="0" r="20" fill="#C68A4F" opacity="0.15">
            <animate attributeName="r" values="20;30;20" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.15;0;0.15" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="10" fill="#C68A4F" opacity="0.3" />
          <circle cx="0" cy="0" r="5" fill="#C68A4F" />
        </g>
        <text x="465" y="320" fontSize="10" fill="#2A1E18" fontFamily="serif" fontStyle="italic" textAnchor="middle" fontWeight="500">
          arbOOz
        </text>
        <text x="465" y="335" fontSize="8" fill="#7A6B5F" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">
          34A
        </text>

        {/* Compass */}
        <g transform="translate(740 410)">
          <circle cx="0" cy="0" r="14" fill="#FAF6F0" stroke="#7A6B5F" strokeWidth="0.5" />
          <path d="M0 -10 L3 0 L0 10 L-3 0 Z" fill="#2A1E18" />
          <text x="0" y="-16" fontSize="7" fill="#2A1E18" fontFamily="serif" textAnchor="middle">N</text>
        </g>
      </svg>
    </div>
  );
}

export function Visit() {
  return (
    <section
      className="section-y bg-bone/40"
      aria-labelledby="visit-heading"
    >
      <div className="page-gutter mx-auto max-w-content">
        {/* Top: photo + info */}
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-16">
          <Reveal className="col-span-12 lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden bg-bone lg:aspect-[5/6]">
              <Image
                src={visit.image}
                alt={visit.imageAlt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-mono-xs uppercase text-ash">
              The boutique on Dzirnavu, photographed September 2025
            </p>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-5 lg:pt-8">
            <Eyebrow>Visit us</Eyebrow>

            <h2
              id="visit-heading"
              className="mt-5 font-display text-display-md text-espresso"
            >
              Ten seats and a counter,
              <br />
              tucked away on <span className="italic">Dzirnavu</span>.
            </h2>

            {/* Address */}
            <div className="mt-7 flex items-start gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-caramel" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="text-body-lg text-espresso">{visit.address}</p>
                <p className="text-body-md text-mocha">{visit.city}</p>
              </div>
            </div>

            {/* Hours table */}
            <div className="mt-8">
              <p className="text-mono-sm uppercase text-mocha">Hours</p>
              <dl className="mt-3 divide-y divide-whisper">
                {visit.hours.map((h) => (
                  <div key={h.day} className="flex items-baseline justify-between py-3">
                    <dt className="text-body-md text-espresso">{h.day}</dt>
                    <dd className="font-sans text-body-md text-mocha tabular-nums">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Quick contact */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-body-md">
              <a
                href={`tel:${visit.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 text-espresso underline-reveal w-fit"
              >
                <Phone className="size-4 text-caramel" strokeWidth={1.5} aria-hidden="true" />
                {visit.phone}
              </a>
              <a
                href={`mailto:${visit.email}`}
                className="inline-flex items-center gap-2 text-espresso underline-reveal w-fit"
              >
                <Mail className="size-4 text-caramel" strokeWidth={1.5} aria-hidden="true" />
                Email
              </a>
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                as="a"
                href="https://maps.google.com/?q=Dzirnavu+34A+Riga"
                target="_blank"
                rel="noreferrer"
                showArrow
              >
                Get directions
              </Button>
              <Button
                variant="tertiary"
                as="a"
                href="https://wa.me/37126530164"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="mr-1 size-4" strokeWidth={1.5} aria-hidden="true" />
                WhatsApp us
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal className="mt-16 lg:mt-24">
          <StylizedMap />
        </Reveal>
      </div>
    </section>
  );
}
