import { HomePage } from '@/components/home-page';

// Schema.org structured data for local business
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: 'Arbooz',
  alternateName: 'arbOOz boutique cafe',
  description:
    'A boutique patisserie specializing in macarons, cakes, cupcakes, and custom celebration cakes in Riga since 2013.',
  image: 'https://arbooz.lv/og.jpg',
  url: 'https://arbooz.lv',
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

export default function LocaleHomePage() {
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
