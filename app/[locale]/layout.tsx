import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { fraunces, inter } from '@/app/fonts';
import { routing, type Locale } from '@/i18n/routing';
import '@/app/globals.css';

/**
 * Per-locale BCP-47 codes for the html lang attribute and OG locale fields.
 * Keep separate from routing.locales because the routing key (`ru`) and the
 * BCP-47 code (`ru-RU`) are not the same.
 */
const LOCALE_BCP47: Record<Locale, string> = {
  ru: 'ru-RU',
  en: 'en-GB',
  lv: 'lv-LV',
};

const LOCALE_OG: Record<Locale, string> = {
  ru: 'ru_RU',
  en: 'en_GB',
  lv: 'lv_LV',
};

export function generateStaticParams() {
  return routing.locales.map((locale: Locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) return {};

  const baseUrl = 'https://arbooz.lv';
  const alternateUrls: Record<string, string> = {};
  for (const l of routing.locales) {
    alternateUrls[LOCALE_BCP47[l]] = `${baseUrl}/${l}`;
  }
  alternateUrls['x-default'] = `${baseUrl}/${routing.defaultLocale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'Arbooz — Handmade Confections · Boutique Patisserie in Riga',
      template: '%s · Arbooz',
    },
    description:
      'A boutique patisserie on Dzirnavu 34A. Macarons, cakes, and pastries baked fresh in Riga since 2013. Custom cakes and seasonal menus.',
    keywords: [
      'patisserie Riga',
      'macarons Latvia',
      'custom cakes Riga',
      'arbooz',
      'handmade desserts',
      'wedding cakes Riga',
    ],
    authors: [{ name: 'Karina Krasovitskaya' }],
    creator: 'Arbooz',
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: alternateUrls,
    },
    openGraph: {
      type: 'website',
      locale: LOCALE_OG[locale as Locale],
      alternateLocale: routing.locales
        .filter((l: Locale) => l !== locale)
        .map((l: Locale) => LOCALE_OG[l]),
      url: `${baseUrl}/${locale}`,
      siteName: 'Arbooz',
      title: 'Arbooz — Handmade Confections',
      description:
        'A boutique patisserie on Dzirnavu 34A. Macarons, cakes, and pastries baked fresh in Riga since 2013.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Arbooz — Handmade Confections',
      description: 'A boutique patisserie on Dzirnavu 34A, Riga.',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
    // Discourage Google/Yandex auto-translate from re-rendering our copy.
    // We already ship first-class RU/EN/LV — auto-translation overlays
    // cause hydration mismatches and degrade quality.
    other: {
      google: 'notranslate',
    },
    icons: { icon: '/favicon.ico' },
  };
}

export const viewport: Viewport = {
  themeColor: '#FAF6F0',
  width: 'device-width',
  initialScale: 1,
  // Allow user pinch-zoom up to 5× — never lock zoom on accessibility grounds
  maximumScale: 5,
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for nested server components
  setRequestLocale(locale);

  return (
    <html
      lang={LOCALE_BCP47[locale]}
      dir="ltr"
      // Instruct browsers (and extensions like Yandex/Chrome translate,
      // Grammarly, Dark Reader) not to rewrite or annotate our DOM.
      // Combined with suppressHydrationWarning this eliminates the class
      // of hydration mismatch errors caused by browser DOM mutations.
      translate="no"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body
        className="grain-overlay min-h-screen bg-ivory text-espresso antialiased"
        suppressHydrationWarning
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
