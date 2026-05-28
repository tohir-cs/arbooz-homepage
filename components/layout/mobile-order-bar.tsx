'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { externalLinks, externalLinkProps } from '@/lib/links';
import { cn } from '@/lib/utils';

/**
 * Sticky mobile CTA bar. Stabilization choices:
 *
 * 1. Always rendered, slid in/out via transform — no AnimatePresence
 *    mount/unmount churn that would cause iOS Safari to recompute layout
 *    and flash whitespace at the bottom.
 *
 * 2. Bottom safe-area-inset padding so the bar clears the iPhone home
 *    indicator on rounded-screen devices without overlapping content.
 *
 * 3. `will-change: transform` and a single transform animation — no other
 *    layout-affecting properties change, so the body never reflows.
 *
 * 4. Visibility logic debounced via rAF to avoid scroll-jitter flicker.
 *
 * 5. tabIndex={-1} on links when hidden so they're not focusable while
 *    off-screen (keyboard users would otherwise tab into nothing).
 */
export function MobileOrderBar() {
  const t = useTranslations('mobileOrder');
  const [visible, setVisible] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const direction = y > lastY.current ? 'down' : 'up';
      const footer = document.getElementById('site-footer');
      const nearFooter =
        footer && y + window.innerHeight > footer.offsetTop - 100;

      if (y < 320) {
        setVisible(false);
      } else if (nearFooter) {
        setVisible(false);
      } else if (direction === 'up') {
        setVisible(true);
      } else if (direction === 'down') {
        setVisible(false);
      }

      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 border-t border-whisper bg-ivory/95 backdrop-blur-md lg:hidden',
        'transition-transform duration-base ease-out-slow',
        // Hidden state: slide fully below the viewport. Translate by
        // 100% + safe-area so the bar never peeks above the home indicator.
        visible
          ? 'translate-y-0'
          : 'translate-y-[calc(100%+env(safe-area-inset-bottom))]'
      )}
      style={{
        // Reserve room for the iOS home indicator below the touch row
        paddingBottom: 'env(safe-area-inset-bottom)',
        willChange: 'transform',
      }}
      role="region"
      aria-label={t('label')}
      aria-hidden={!visible}
    >
      <div className="flex items-stretch">
        <a
          href={externalLinks.wolt}
          {...externalLinkProps}
          className="flex min-h-[56px] flex-1 items-center justify-center gap-2 border-r border-whisper text-mono-sm uppercase text-espresso transition-colors duration-quick active:bg-bone"
          tabIndex={visible ? 0 : -1}
        >
          {t('wolt')}
          <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </a>
        <Link
          href="/custom"
          className="flex min-h-[56px] flex-1 items-center justify-center bg-caramel text-mono-sm uppercase text-ivory transition-colors duration-quick active:bg-caramel-deep"
          tabIndex={visible ? 0 : -1}
        >
          {t('cake')} →
        </Link>
      </div>
    </div>
  );
}
