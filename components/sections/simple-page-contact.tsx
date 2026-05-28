'use client';

import { useTranslations } from 'next-intl';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { visit } from '@/lib/content';
import { externalLinks, externalLinkProps } from '@/lib/links';

export function SimplePageContact() {
  const t = useTranslations('visit');

  const rows = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: visit.phone,
      href: externalLinks.whatsapp,
      external: true,
    },
    {
      icon: Phone,
      label: t('email') === 'Email' ? 'Phone' : 'Телефон',
      value: visit.phone,
      href: `tel:${visit.phone.replace(/\s/g, '')}`,
      external: false,
    },
    {
      icon: Mail,
      label: 'Email',
      value: visit.email,
      href: `mailto:${visit.email}`,
      external: false,
    },
    {
      icon: MapPin,
      label: t('address'),
      value: `${visit.address}, ${visit.city}`,
      href: externalLinks.googleMaps,
      external: true,
    },
  ];

  return (
    <section className="section-y" aria-label="Contact details">
      <div className="page-gutter mx-auto max-w-content">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <Reveal key={row.label}>
                <a
                  href={row.href}
                  {...(row.external ? externalLinkProps : {})}
                  className="group flex items-start gap-4"
                >
                  <Icon className="mt-1 size-5 shrink-0 text-caramel" strokeWidth={1.5} aria-hidden="true" />
                  <span className="flex flex-col">
                    <span className="text-mono-xs uppercase text-mocha">{row.label}</span>
                    <span className="mt-1 text-body-lg text-espresso transition-colors duration-quick group-hover:text-caramel [text-wrap:pretty]">
                      {row.value}
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
