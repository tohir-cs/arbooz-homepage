import { useTranslations } from 'next-intl';
import { Logo } from '@/components/ui/logo';
import { Eyebrow } from '@/components/ui/eyebrow';
import { FooterNewsletterForm } from './footer-newsletter-form';
import { Link } from '@/i18n/navigation';
import { externalLinks, externalLinkProps } from '@/lib/links';
import { visit } from '@/lib/content';

type FooterLink =
  | { textKey: string; href: string }
  | { text: string; href: string }
  | { text: ''; href: '' };

const COLUMNS: { labelKey: string; items: FooterLink[] }[] = [
  {
    labelKey: 'visit',
    items: [
      { textKey: 'visit.address', href: externalLinks.googleMaps },
      { textKey: 'visit.city', href: '' },
      { text: '', href: '' },
      { text: 'Tue–Fri  11:00–18:00', href: '' },
      { text: 'Sat  11:00–17:00', href: '' },
      { text: 'Mon  11:00–18:00', href: '' },
      { text: 'Sun  closed', href: '' },
    ],
  },
  {
    labelKey: 'shop',
    items: [
      { textKey: 'footer.links.macarons', href: '/desserts/macarons' },
      { textKey: 'footer.links.cakes', href: '/desserts/cakes' },
      { textKey: 'footer.links.cupcakes', href: '/desserts/cupcakes' },
      { textKey: 'footer.links.customCakes', href: '/custom' },
      { textKey: 'footer.links.giftBoxes', href: '/desserts/macarons#gift' },
      { textKey: 'footer.links.seasonal', href: '/desserts/seasonal' },
    ],
  },
  {
    labelKey: 'story',
    items: [
      { textKey: 'footer.links.ourStory', href: '/story' },
      { textKey: 'footer.links.press', href: '/press' },
      { textKey: 'footer.links.journal', href: '/journal' },
      { textKey: 'footer.links.contact', href: '/contact' },
      { textKey: 'footer.links.allergens', href: '/allergens' },
    ],
  },
  {
    labelKey: 'connect',
    items: [
      { textKey: 'footer.links.instagram', href: externalLinks.instagram },
      { textKey: 'footer.links.facebook', href: externalLinks.facebook },
      { textKey: 'footer.links.whatsapp', href: externalLinks.whatsapp },
      { text: visit.phone, href: `tel:${visit.phone.replace(/\s/g, '')}` },
      { text: visit.email, href: `mailto:${visit.email}` },
    ],
  },
];

export function Footer() {
  const t = useTranslations();
  return (
    <footer className="bg-espresso text-bone">
      {/* Bottom padding on mobile leaves room for the sticky CTA bar (56px + safe-area) */}
      <div className="page-gutter mx-auto max-w-content pt-[120px] pb-[88px] lg:pb-[48px]">
        {/* Brand mark */}
        <div className="flex flex-col items-start gap-4">
          <Logo tone="ivory" withTagline={false} className="w-32" />
          <p className="text-mono-sm uppercase text-ash">{t('footer.tagline')}</p>
        </div>

        <hr className="my-[64px] border-0 border-t border-bone/10" />

        {/* Columns */}
        <div className="grid grid-cols-1 gap-[48px] sm:grid-cols-2 sm:gap-[64px] lg:grid-cols-4 lg:gap-8">
          {COLUMNS.map((col) => (
            <div key={col.labelKey}>
              <Eyebrow tone="ivory" className="text-bone">
                {t(`footer.${col.labelKey}`)}
              </Eyebrow>
              <ul className="mt-5 space-y-3 text-body-sm text-ash">
                {col.items.map((item, i) => {
                  const text = 'textKey' in item ? t(item.textKey) : item.text;

                  if (text === '') {
                    return <li key={i} className="h-1" aria-hidden="true" />;
                  }

                  if (!item.href) {
                    return (
                      <li key={i}>
                        <span>{text}</span>
                      </li>
                    );
                  }

                  if (item.href.startsWith('/')) {
                    return (
                      <li key={i}>
                        <Link
                          href={item.href}
                          className="transition-colors duration-quick ease-out-slow hover:text-rose"
                        >
                          {text}
                        </Link>
                      </li>
                    );
                  }

                  const isExternal = item.href.startsWith('http');
                  return (
                    <li key={i}>
                      <a
                        href={item.href}
                        {...(isExternal ? externalLinkProps : {})}
                        className="transition-colors duration-quick ease-out-slow hover:text-rose break-words"
                      >
                        {text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-[64px] border-0 border-t border-bone/10" />

        {/* Newsletter */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-sm text-ivory">{t('footer.stayTitle')}</h2>
            <p className="mt-3 text-body-md text-ash">{t('footer.stayDescription')}</p>
          </div>
          <FooterNewsletterForm />
        </div>

        <hr className="my-[64px] border-0 border-t border-bone/10" />

        {/* Bottom strip */}
        <div className="flex flex-col items-start justify-between gap-4 text-mono-xs uppercase text-ash sm:flex-row sm:items-center">
          <p>© 2013–2026 arbooz.lv</p>
          <ul className="flex flex-wrap gap-6">
            <li>
              <Link href="/privacy" className="transition-colors duration-quick hover:text-rose">
                {t('footer.privacy')}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors duration-quick hover:text-rose">
                {t('footer.terms')}
              </Link>
            </li>
            <li>
              <Link href="/allergens" className="transition-colors duration-quick hover:text-rose">
                {t('footer.allergens')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
