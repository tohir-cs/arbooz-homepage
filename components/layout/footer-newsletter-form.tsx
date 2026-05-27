'use client';

import type { FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function FooterNewsletterForm() {
  const t = useTranslations('common');
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      className="flex flex-col gap-4 sm:flex-row sm:items-end lg:col-span-7"
      onSubmit={onSubmit}
      aria-label="Newsletter signup"
    >
      <label className="flex-1">
        <span className="sr-only">{t('emailAddress')}</span>
        <input
          type="email"
          required
          placeholder={t('yourEmail')}
          className="w-full border-0 border-b border-bone/30 bg-transparent pb-3 pt-4 font-sans text-body-md text-ivory placeholder:text-ash focus:border-rose focus:outline-none"
        />
      </label>
      <Button variant="on-dark" size="md" type="submit">
        {t('subscribe')}
      </Button>
    </form>
  );
}
