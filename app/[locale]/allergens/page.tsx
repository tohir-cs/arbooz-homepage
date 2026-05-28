import { getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { SimplePage } from '@/components/sections/simple-page';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'pages.simple.allergens' });
  return {
    title: t('metaTitle'),
    description: t('description'),
    alternates: { canonical: `https://arbooz.lv/${locale}/allergens` },
  };
}

export default function AllergensPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <SimplePage locale={locale} pageKey="allergens" />;
}
