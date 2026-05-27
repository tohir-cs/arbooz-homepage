'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

type RevealProps = HTMLMotionProps<'div'>;

/**
 * Default scroll-triggered reveal. Fires once at 15% in view,
 * lifts 16px while fading from opacity 0 → 1 over 700ms.
 * Honors prefers-reduced-motion via the global CSS rule.
 */
export function Reveal({ className, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
