import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { PageShell } from '@/components/layout/page-shell';
import { PageHero } from '@/components/sections/page-hero';
import { CustomProcess } from '@/components/sections/custom-process';
import { PageCta } from '@/components/sections/page-cta';
import { externalLinks } from '@/lib/links';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'pages.custom' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `https://arbooz.lv/${locale}/custom` },
  };
}

export default async function CustomPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'pages.custom' });

  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow={t('eyebrow')}
          title={
            <>
              {t('title')} <span className="italic text-caramel">{t('titleEmphasis')}</span>{' '}
              {t('titleSuffix')}
            </>
          }
          description={t('description')}
        />
        <CustomProcess />
        <PageCta
          eyebrow={t('ctaEyebrow')}
          title={t('ctaTitle')}
          description={t('ctaDescription')}
          primaryLabel={t('ctaPrimary')}
          primaryHref={externalLinks.whatsapp}
          secondaryLabel={t('ctaSecondary')}
          secondaryHref="mailto:karina@arbooz.lv"
          secondaryExternal
        />
      </main>
    </PageShell>
  );
}
