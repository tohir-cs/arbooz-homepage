'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Button } from '@/components/ui/button';
import { Ornament } from '@/components/ui/ornament';
import { Reveal } from '@/components/ui/reveal';

export function Newsletter() {
  const t = useTranslations('newsletter');
  const tCommon = useTranslations('common');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    // In production this posts to a serverless function
    setSubmitted(true);
  };

  return (
    <section className="section-y bg-bone/40" aria-labelledby="newsletter-heading">
      <div className="page-gutter mx-auto max-w-content">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Eyebrow>{t('eyebrow')}</Eyebrow>

            <h2
              id="newsletter-heading"
              className="mt-6 font-display text-display-lg text-espresso"
            >
              {t('titlePrefix')} <span className="italic">{t('titleEmphasis')}</span>.
            </h2>

            <Ornament className="mt-6" />

            <p className="mt-6 max-w-md text-body-lg text-mocha">{t('description')}</p>

            {!submitted ? (
              <form
                onSubmit={onSubmit}
                className="mt-8 flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:items-end sm:gap-4"
                aria-label="Newsletter signup"
              >
                <label className="flex-1 text-left">
                  <span className="text-mono-xs uppercase text-mocha">{t('yourEmail')}</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    inputMode="email"
                    placeholder={t('placeholder')}
                    // text-[16px] avoids iOS Safari zoom-on-focus;
                    // min-h-[56px] gives a comfortable mobile touch target
                    className="mt-2 block w-full min-h-[56px] border-0 border-b border-espresso/30 bg-transparent pb-3 pt-2 font-sans text-[16px] sm:text-body-md text-espresso placeholder:text-ash focus:border-caramel focus:outline-none"
                  />
                </label>
                <Button variant="primary" type="submit" className="w-full sm:w-auto">
                  {tCommon('subscribe')}
                </Button>
              </form>
            ) : (
              <div className="mt-8 w-full max-w-md rounded-button border border-caramel/30 bg-caramel/5 px-6 py-6 text-body-md text-espresso sm:px-8">
                <p className="font-display italic text-display-sm text-caramel">{t('success')}</p>
                <p className="mt-2 break-all text-mono-xs uppercase text-mocha">
                  {t('confirmation', { email })}
                </p>
              </div>
            )}

            <p className="mt-8 text-mono-xs uppercase text-ash">{t('note')}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
