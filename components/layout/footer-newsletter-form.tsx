'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function FooterNewsletterForm() {
  const t = useTranslations('common');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    // In production this posts to a serverless function.
  };

  if (submitted) {
    return (
      <div className="lg:col-span-7">
        <p className="font-display italic text-display-sm text-rose">
          {t('newsletterSuccess')}
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4 lg:col-span-7"
      onSubmit={onSubmit}
      aria-label="Newsletter signup"
    >
      <label className="flex-1">
        <span className="sr-only">{t('emailAddress')}</span>
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder={t('yourEmail')}
          // text-[16px] prevents iOS Safari from zooming on focus;
          // min-h-[56px] gives a comfortable mobile touch target
          className="block w-full min-h-[56px] border-0 border-b border-bone/30 bg-transparent pb-3 pt-4 font-sans text-[16px] sm:text-body-md text-ivory placeholder:text-ash focus:border-rose focus:outline-none"
        />
      </label>
      <Button variant="on-dark" size="md" type="submit" className="w-full sm:w-auto">
        {t('subscribe')}
      </Button>
    </form>
  );
}
