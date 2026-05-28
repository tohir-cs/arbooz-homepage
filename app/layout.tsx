/**
 * Root layout. Intentionally bare — the meaningful layout (with html, body,
 * fonts, providers, and locale-aware lang attribute) lives in
 * [locale]/layout.tsx so it can read the active locale.
 *
 * Returning `children` directly is the documented next-intl 4.x pattern for
 * App Router with localized layouts. Next.js still requires this file to
 * exist, but it should not render html/body.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
