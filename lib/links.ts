/**
 * Single source of truth for off-site URLs.
 *
 * All external links must be opened with `target="_blank"` and
 * `rel="noopener noreferrer"` — the latter blocks the destination from
 * accessing `window.opener` (a known reverse-tabnabbing vector).
 *
 * To change any of these in production, edit this file only — every
 * navbar, footer, mobile-nav, and section reads from here.
 */

const WHATSAPP_PHONE = '37126530164';
const WHATSAPP_GREETING = encodeURIComponent(
  "Hello Arbooz! I'd like to ask about an order."
);

export const externalLinks = {
  wolt: 'https://wolt.com',
  // Pre-fills a polite greeting so the conversation starts mid-thread,
  // not as a cold "Hi". Especially useful on mobile.
  whatsapp: `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_GREETING}`,
  instagram: 'https://www.instagram.com/arbooz_cafe',
  // Tracking param (mibextid) stripped — it's a session identifier
  // that doesn't survive sharing and may not resolve cleanly.
  facebook: 'https://www.facebook.com/share/1KghwTWkj6/',
  googleMaps: 'https://maps.google.com/?q=Dzirnavu+34A+Riga',
  appleMaps: 'https://maps.apple.com/?q=Dzirnavu+34A+Riga',
} as const;

/**
 * Default props for any external <a> tag. Spread these to ensure safe
 * opener-blocking and a new tab.
 */
export const externalLinkProps = {
  target: '_blank' as const,
  rel: 'noopener noreferrer',
};
