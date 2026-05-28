import { getTranslations } from 'next-intl/server';
import { PageShell } from '@/components/layout/page-shell';
import { PageHero } from '@/components/sections/page-hero';
import { SimplePageContact } from '@/components/sections/simple-page-contact';

type SimplePageProps = {
  locale: string;
  /** key under pages.simple.{pageKey} */
  pageKey: 'press' | 'contact' | 'allergens' | 'privacy' | 'terms' | 'giftcards';
  /** Show the contact block (phone/email/socials) below the hero */
  withContact?: boolean;
};

/**
 * Shared layout for lightweight informational pages reached from the footer.
 * Each is a real, unique route with its own metadata and copy — no homepage
 * fallback. Content is intentionally concise; these can grow into full pages
 * later without changing the route architecture.
 */
export async function SimplePage({ locale, pageKey, withContact }: SimplePageProps) {
  const t = await getTranslations({ locale, namespace: `pages.simple.${pageKey}` });

  return (
    <PageShell>
      <main id="main">
        <PageHero eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
        {withContact ? <SimplePageContact /> : <div className="pb-[120px]" />}
      </main>
    </PageShell>
  );
}
