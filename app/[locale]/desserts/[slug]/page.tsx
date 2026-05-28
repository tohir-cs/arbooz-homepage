import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { PageShell } from '@/components/layout/page-shell';
import { PageHero } from '@/components/sections/page-hero';
import { CategoryProducts } from '@/components/sections/category-products';
import { PageCta } from '@/components/sections/page-cta';
import { externalLinks } from '@/lib/links';

// Known category slugs. Anything else 404s (no silent homepage fallback).
const VALID_SLUGS = ['macarons', 'cupcakes', 'cakes', 'pastries', 'sweets', 'seasonal'] as const;
type ValidSlug = (typeof VALID_SLUGS)[number];

function isValidSlug(slug: string): slug is ValidSlug {
  return (VALID_SLUGS as readonly string[]).includes(slug);
}

// Map each slug to the product categories it should surface
const SLUG_TO_CATEGORIES: Record<ValidSlug, string[]> = {
  macarons: ['macaron'],
  cupcakes: ['cupcake'],
  cakes: ['cake'],
  pastries: ['pastry'],
  sweets: ['sweet'],
  seasonal: ['macaron', 'cake', 'cupcake', 'pastry', 'sweet'], // seasonal = tagged items
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    VALID_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  if (!hasLocale(routing.locales, locale) || !isValidSlug(slug)) return {};
  const tCat = await getTranslations({ locale, namespace: 'categories' });
  const tPage = await getTranslations({ locale, namespace: 'pages.category' });
  const name = tCat(`${slug}.name`);
  return {
    title: name,
    description: `${tPage('metaDescription')} ${name}.`,
    alternates: { canonical: `https://arbooz.lv/${locale}/desserts/${slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  if (!hasLocale(routing.locales, locale)) notFound();
  if (!isValidSlug(slug)) notFound();
  setRequestLocale(locale);

  const tPage = await getTranslations({ locale, namespace: 'pages.category' });
  const tCat = await getTranslations({ locale, namespace: 'categories' });
  const name = tCat(`${slug}.name`);

  // 'seasonal' shows only tagged-seasonal items; others filter by category
  const filterCategories = SLUG_TO_CATEGORIES[slug];

  return (
    <PageShell>
      <main id="main">
        <PageHero
          eyebrow={tPage('eyebrow')}
          title={<span className="italic text-caramel">{name}</span>}
          description={`${tPage('intro')} ${name.toLowerCase()}.`}
        />
        <CategoryProducts
          filterCategories={filterCategories}
          seasonalOnly={slug === 'seasonal'}
        />
        <PageCta
          eyebrow={tPage('ctaEyebrow')}
          title={tPage('ctaTitle')}
          description={tPage('ctaDescription')}
          primaryLabel={tPage('ctaPrimary')}
          primaryHref="/visit"
          secondaryLabel={tPage('ctaSecondary')}
          secondaryHref={externalLinks.whatsapp}
          secondaryExternal
        />
      </main>
    </PageShell>
  );
}
