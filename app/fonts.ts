import { Fraunces, Inter } from 'next/font/google';

export const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});
