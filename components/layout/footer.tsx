import { Logo } from '@/components/ui/logo';
import { Eyebrow } from '@/components/ui/eyebrow';
import { FooterNewsletterForm } from './footer-newsletter-form';
import { visit } from '@/lib/content';

const COLUMNS = [
  {
    label: 'Visit',
    items: [
      { text: visit.address, href: 'https://maps.google.com/?q=Dzirnavu+34A+Riga' },
      { text: visit.city, href: '' },
      { text: '', href: '' },
      { text: 'Tue–Fri  11:00–18:00', href: '' },
      { text: 'Sat  11:00–17:00', href: '' },
      { text: 'Mon  11:00–18:00', href: '' },
      { text: 'Sun  closed', href: '' },
    ],
  },
  {
    label: 'Shop',
    items: [
      { text: 'Macarons', href: '/desserts/macarons' },
      { text: 'Cakes', href: '/desserts/cakes' },
      { text: 'Cupcakes', href: '/desserts/cupcakes' },
      { text: 'Custom cakes', href: '/custom' },
      { text: 'Gift boxes', href: '/desserts/macarons#gift' },
      { text: 'Seasonal', href: '/desserts/seasonal' },
    ],
  },
  {
    label: 'Story',
    items: [
      { text: 'Our story', href: '/story' },
      { text: 'Press', href: '/press' },
      { text: 'Journal', href: '/journal' },
      { text: 'Contact', href: '/contact' },
      { text: 'Allergens', href: '/allergens' },
    ],
  },
  {
    label: 'Connect',
    items: [
      { text: 'Instagram', href: 'https://instagram.com/arbooz.lv' },
      { text: 'Facebook', href: 'https://facebook.com/arbooz' },
      { text: 'WhatsApp', href: 'https://wa.me/37126530164' },
      { text: visit.phone, href: `tel:${visit.phone.replace(/\s/g, '')}` },
      { text: visit.email, href: `mailto:${visit.email}` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-espresso text-bone">
      <div className="page-gutter mx-auto max-w-content pt-[120px] pb-[48px]">
        {/* Brand mark */}
        <div className="flex flex-col items-start gap-4">
          <Logo tone="ivory" withTagline={false} className="w-32" />
          <p className="text-mono-sm uppercase text-ash">Handmade confections since 2013</p>
        </div>

        <hr className="my-[64px] border-0 border-t border-bone/10" />

        {/* Columns */}
        <div className="grid grid-cols-1 gap-[64px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {COLUMNS.map((col) => (
            <div key={col.label}>
              <Eyebrow tone="ivory" className="text-bone">
                {col.label}
              </Eyebrow>
              <ul className="mt-5 space-y-3 text-body-sm text-ash">
                {col.items.map((item, i) =>
                  item.text === '' ? (
                    <li key={i} className="h-1" aria-hidden="true" />
                  ) : (
                    <li key={i}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                          className="transition-colors duration-quick ease-out-slow hover:text-rose"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span>{item.text}</span>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-[64px] border-0 border-t border-bone/10" />

        {/* Newsletter */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-sm text-ivory">Stay in the kitchen.</h2>
            <p className="mt-3 text-body-md text-ash">
              Seasonal menus and behind-the-scenes notes from Karina. Never more than once a month.
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
              <a href="/privacy" className="transition-colors duration-quick hover:text-rose">
                Privacy
              </a>
            </li>
            <li>
              <a href="/terms" className="transition-colors duration-quick hover:text-rose">
                Terms
              </a>
            </li>
            <li>
              <a href="/allergens" className="transition-colors duration-quick hover:text-rose">
                Allergens
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
