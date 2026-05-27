import { useTranslations } from 'next-intl';
import { Logo } from '@/components/ui/logo';
import { Eyebrow } from '@/components/ui/eyebrow';
import { FooterNewsletterForm } from './footer-newsletter-form';
import { Link } from '@/i18n/navigation';
import { visit } from '@/lib/content';

const COLUMNS = [
  {
    labelKey: 'visit',
    items: [
      { textKey: 'visit.address', href: 'https://maps.google.com/?q=Dzirnavu+34A+Riga' },
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
      { textKey: 'footer.links.instagram', href: 'https://instagram.com/arbooz.lv' },
      { textKey: 'footer.links.facebook', href: 'https://facebook.com/arbooz' },
      { textKey: 'footer.links.whatsapp', href: 'https://wa.me/37126530164' },
      { text: visit.phone, href: `tel:${visit.phone.replace(/\s/g, '')}` },
      { text: visit.email, href: `mailto:${visit.email}` },
    ],
  },
];

export function Footer() {
  const t = useTranslations();
  return (
    <footer className="bg-espresso text-bone">
      <div className="page-gutter mx-auto max-w-content pt-[120px] pb-[48px]">
        {/* Brand mark */}
        <div className="flex flex-col items-start gap-4">
          <Logo tone="ivory" withTagline={false} className="w-32" />
          <p className="text-mono-sm uppercase text-ash">{t('footer.tagline')}</p>
        </div>

        <hr className="my-[64px] border-0 border-t border-bone/10" />

        {/* Columns */}
        <div className="grid grid-cols-1 gap-[64px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {COLUMNS.map((col) => (
            <div key={col.labelKey}>
              <Eyebrow tone="ivory" className="text-bone">
                {t(`footer.${col.labelKey}`)}
              </Eyebrow>
              <ul className="mt-5 space-y-3 text-body-sm text-ash">
                {col.items.map((item, i) => {
                  const text = item.textKey ? t(item.textKey) : item.text || '';

                  return text === '' ? (
                    <li key={i} className="h-1" aria-hidden="true" />
                  ) : (
                    <li key={i}>
                      {item.href ? (
                        item.href.startsWith('/') ? (
                          <Link
                            href={item.href}
                            className="transition-colors duration-quick ease-out-slow hover:text-rose"
                          >
                            {text}
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                            className="transition-colors duration-quick ease-out-slow hover:text-rose"
                          >
                            {text}
                          </a>
                        )
                      ) : (
                        <span>{text}</span>
                      )}
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
            <p className="mt-3 text-body-md text-ash">
              {t('footer.stayDescription')}
            </p>
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
