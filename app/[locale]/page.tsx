import { setRequestLocale } from 'next-intl/server';
import { HomePage } from '@/components/home-page';
import { routing, type Locale } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

/**
 * Locale-aware JSON-LD. Tells Schema.org-aware crawlers which language
 * the structured data describes — important for international SEO.
 */
function buildStructuredData(locale: Locale) {
  const localeBcp47: Record<Locale, string> = {
    ru: 'ru-RU',
    en: 'en-GB',
    lv: 'lv-LV',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: 'Arbooz',
    alternateName: 'arbOOz boutique cafe',
    description:
      'A boutique patisserie specializing in macarons, cakes, cupcakes, and custom celebration cakes in Riga since 2013.',
    inLanguage: localeBcp47[locale],
    image: 'https://arbooz.lv/og.jpg',
    url: `https://arbooz.lv/${locale}`,
    telephone: '+371 26 530 164',
    email: 'karina@arbooz.lv',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dzirnavu iela 34A',
      addressLocality: 'Rīga',
      postalCode: 'LV-1010',
      addressCountry: 'LV',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 56.9554,
      longitude: 24.1213,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '11:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '11:00',
        closes: '17:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '177',
    },
    priceRange: '€€',
    servesCuisine: 'French patisserie',
    founder: {
      '@type': 'Person',
      name: 'Karina Krasovitskaya',
    },
    foundingDate: '2013-06-04',
  };
}

export default function LocaleHomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const structuredData = buildStructuredData(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePage />
    </>
  );
}
