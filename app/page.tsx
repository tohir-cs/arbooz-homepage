import { Navbar } from '@/components/layout/navbar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Footer } from '@/components/layout/footer';
import { MobileOrderBar } from '@/components/layout/mobile-order-bar';
import { Hero } from '@/components/sections/hero';
import { TodaysSelection } from '@/components/sections/todays-selection';
import { Categories } from '@/components/sections/categories';
import { FounderStory } from '@/components/sections/founder-story';
import { CustomCakesBanner } from '@/components/sections/custom-cakes-banner';
import { Press } from '@/components/sections/press';
import { Visit } from '@/components/sections/visit';
import { InstagramStrip } from '@/components/sections/instagram-strip';
import { Newsletter } from '@/components/sections/newsletter';

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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navbar />
      <MobileNav />

      <main>
        <Hero />
        <TodaysSelection />
        <Categories />
        <FounderStory />
        <CustomCakesBanner />
        <Press />
        <Visit />
        <InstagramStrip />
        <Newsletter />
      </main>

      <div id="site-footer">
        <Footer />
      </div>

      <MobileOrderBar />
    </>
  );
}
