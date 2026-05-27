'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { easings, durations } from '@/lib/motion';

export function MobileOrderBar() {
  const t = useTranslations('mobileOrder');
  const [visible, setVisible] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const direction = y > lastY.current ? 'down' : 'up';
      const footer = document.getElementById('site-footer');
      const nearFooter =
        footer && y + window.innerHeight > footer.offsetTop - 100;

      // Don't show in the first viewport (let the hero breathe)
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
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: easings.outSlow }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-whisper bg-ivory/95 backdrop-blur-md lg:hidden"
          role="region"
          aria-label={t('label')}
        >
          <div className="flex items-stretch">
            <a
              href="https://wolt.com"
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 border-r border-whisper py-4 text-mono-sm uppercase text-espresso transition-colors duration-quick active:bg-bone"
            >
              {t('wolt')}
              <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
            <Link
              href="/custom"
              className="flex flex-1 items-center justify-center bg-caramel py-4 text-mono-sm uppercase text-ivory transition-colors duration-quick active:bg-caramel-deep"
            >
              {t('cake')} →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
