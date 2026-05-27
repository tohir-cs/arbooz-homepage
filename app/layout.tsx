import type { Metadata, Viewport } from 'next';
import { fraunces, inter } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://arbooz.lv'),
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
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['en_GB', 'lv_LV'],
    url: 'https://arbooz.lv',
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
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#FAF6F0',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="grain-overlay min-h-screen bg-ivory text-espresso antialiased">
        {children}
      </body>
    </html>
  );
}
