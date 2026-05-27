'use client';

import Image from 'next/image';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { founder } from '@/lib/content';

export function FounderStory() {
  return (
    <section
      className="section-y bg-ivory"
      aria-labelledby="founder-heading"
    >
      <div className="page-gutter mx-auto max-w-content">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-16">
          {/* Image — left on desktop, 5 columns */}
          <Reveal className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-bone">
              <Image
                src={founder.image}
                alt={founder.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-mono-xs uppercase text-ash">
              Karina at the counter, summer 2025
            </p>
          </Reveal>

          {/* Quote + bio — right on desktop, 6 columns offset */}
          <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-7">
            <Eyebrow>Our story</Eyebrow>

            <div className="mt-8 flex items-start gap-6">
              <span
                className="font-display text-[120px] leading-none text-caramel lg:text-[160px]"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <div>
                <blockquote
                  id="founder-heading"
                  className="font-display italic text-display-sm text-espresso lg:text-display-md"
                >
                  {founder.quote}
                </blockquote>
              </div>
            </div>

            <figcaption className="mt-6 text-mono-sm uppercase text-mocha">
              <span className="text-espresso">{founder.name}</span> · {founder.role}
            </figcaption>

            <p className="mt-7 max-w-xl text-body-lg text-mocha">
              {founder.bio}
            </p>

            <div className="mt-7">
              <Button variant="secondary" as="a" href="/story" showArrow>
                Read her story
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
