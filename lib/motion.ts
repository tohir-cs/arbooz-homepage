import type { Variants, Transition } from 'framer-motion';

// Easing curves — match the CSS spec exactly
export const easings = {
  outSlow: [0.16, 1, 0.3, 1] as const,
  outQuick: [0.33, 1, 0.68, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

// Duration tokens (in seconds for Framer)
export const durations = {
  instant: 0.15,
  quick: 0.3,
  base: 0.45,
  slow: 0.7,
  luxe: 1.0,
};

// Standard fade-up reveal — used for sections entering the viewport
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easings.outSlow,
    },
  },
};

// Staggered container — children fade up in sequence at 80ms apart
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Slow lift used on hero text entry
export const heroLift: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.luxe,
      ease: easings.outSlow,
    },
  },
};

// Image fade — used when product images appear
export const imageFade: Variants = {
  hidden: { opacity: 0, scale: 1.02 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.slow,
      ease: easings.outSlow,
    },
  },
};

// Standard scroll-trigger viewport config — fires once at 15% in view
export const viewportOnce = { once: true, amount: 0.15 } as const;

// Hover transition shared by buttons and cards
export const hoverTransition: Transition = {
  duration: durations.base,
  ease: easings.outSlow,
};
