'use client';

import { useTranslations } from 'next-intl';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Ornament } from '@/components/ui/ornament';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';

type PageCtaProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** External secondary link (e.g. WhatsApp) opens in a new tab */
  secondaryExternal?: boolean;
};

/**
 * Closing call-to-action band, reused at the foot of inner pages just above
 * the footer. Mirrors the newsletter section's centered editorial treatment
 * so pages feel consistent without each one re-inventing a CTA.
 */
export function PageCta({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  secondaryExternal,
}: PageCtaProps) {
  return (
    <section className="section-y bg-bone/40">
      <div className="page-gutter mx-auto max-w-content">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-display-md text-espresso [text-wrap:balance]">
              {title}
            </h2>
            <Ornament className="mt-6" />
            <p className="mt-6 max-w-md text-body-lg text-mocha [text-wrap:pretty]">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" size="lg" as="a" href={primaryHref} showArrow>
                {primaryLabel}
              </Button>
              {secondaryLabel && secondaryHref && (
                <Button
                  variant="secondary"
                  as="a"
                  href={secondaryHref}
                  {...(secondaryExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {secondaryLabel}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
