import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { PageShell } from '@/components/layout/page-shell';
import { PageHero } from '@/components/sections/page-hero';
import { Visit } from '@/components/sections/visit';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'pages.visit' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `https://arbooz.lv/${locale}/visit` },
  };
}

export default async function VisitPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'pages.visit' });

  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow={t('eyebrow')}
          title={
            <>
              {t('title')}
              <br />
              <span className="italic text-caramel">{t('titleEmphasis')}</span> {t('titleSuffix')}
            </>
          }
          description={t('description')}
        />
        {/* Reuse the rich Visit section (photo, hours, contacts, map, providers) */}
        <Visit />
      </main>
    </PageShell>
  );
}
