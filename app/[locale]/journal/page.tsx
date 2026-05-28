import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { PageShell } from '@/components/layout/page-shell';
import { PageHero } from '@/components/sections/page-hero';
import { JournalList } from '@/components/sections/journal-list';
import { PageCta } from '@/components/sections/page-cta';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'pages.journal' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `https://arbooz.lv/${locale}/journal` },
  };
}

export default async function JournalPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'pages.journal' });

  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow={t('eyebrow')}
          title={
            <>
              {t('title')} <span className="italic text-caramel">{t('titleEmphasis')}</span>
              {t('titleSuffix')}
            </>
          }
          description={t('description')}
        />
        <JournalList />
        <PageCta
          eyebrow={t('ctaEyebrow')}
          title={t('ctaTitle')}
          description={t('ctaDescription')}
          primaryLabel={t('ctaPrimary')}
          primaryHref="/desserts"
          secondaryLabel={t('ctaSecondary')}
          secondaryHref="/visit"
        />
      </main>
    </PageShell>
  );
}
