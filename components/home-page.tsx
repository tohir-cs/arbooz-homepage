import { PageShell } from '@/components/layout/page-shell';
import { Hero } from '@/components/sections/hero';
import { TodaysSelection } from '@/components/sections/todays-selection';
import { Categories } from '@/components/sections/categories';
import { FounderStory } from '@/components/sections/founder-story';
import { CustomCakesBanner } from '@/components/sections/custom-cakes-banner';
import { Press } from '@/components/sections/press';
import { Visit } from '@/components/sections/visit';
import { InstagramStrip } from '@/components/sections/instagram-strip';
import { Newsletter } from '@/components/sections/newsletter';

export function HomePage() {
  return (
    <PageShell transparentNav>
      <main id="main">
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
    </PageShell>
  );
}
