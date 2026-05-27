'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/ui/reveal';
import { Ornament } from '@/components/ui/ornament';
import { press } from '@/lib/content';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

// Decorative laurel — drawn inline so it inherits color and scales crisply
function Laurel({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 8 Q5 20 10 32"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M30 8 Q35 20 30 32"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="9" cy="14" rx="2.5" ry="1" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(-30 9 14)" />
      <ellipse cx="8" cy="20" rx="2.5" ry="1" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(-15 8 20)" />
      <ellipse cx="9" cy="26" rx="2.5" ry="1" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(15 9 26)" />
      <ellipse cx="31" cy="14" rx="2.5" ry="1" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(30 31 14)" />
      <ellipse cx="32" cy="20" rx="2.5" ry="1" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(15 32 20)" />
      <ellipse cx="31" cy="26" rx="2.5" ry="1" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(-15 31 26)" />
    </svg>
  );
}

export function Press() {
  return (
    <section
      className="section-y bg-ivory"
      aria-labelledby="press-heading"
    >
      <div className="page-gutter mx-auto max-w-content">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <Eyebrow>Press & recognition</Eyebrow>
            <h2
              id="press-heading"
              className="mt-5 max-w-2xl font-display text-display-md text-espresso"
            >
              A small <span className="italic">jewel of a patisserie</span>,
              quietly making a name.
            </h2>
            <Ornament className="mt-6" />
          </div>
        </Reveal>

        <motion.ul
          role="list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:gap-16"
        >
          {press.map((item, index) => (
            <motion.li
              key={item.label}
              variants={fadeUp}
              className="flex flex-col items-center text-center"
            >
              {index === 0 ? (
                <div className="flex items-center gap-1 text-caramel" aria-label="4.7 out of 5 stars">
                  {[0, 1, 2, 3].map((i) => (
                    <Star key={i} className="size-4 fill-current" strokeWidth={0} aria-hidden="true" />
                  ))}
                  <Star className="size-4 fill-current" strokeWidth={0} aria-hidden="true" style={{ clipPath: 'inset(0 30% 0 0)' }} />
                </div>
              ) : (
                <Laurel className="text-caramel" />
              )}

              <p className="mt-4 text-mono-xs uppercase tracking-wider text-caramel">
                {item.label}
              </p>

              <blockquote className="mt-6 max-w-xs font-display italic text-display-sm text-espresso">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <p className="mt-6 text-mono-sm uppercase text-mocha">
                — {item.source}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
