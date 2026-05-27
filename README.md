# Arbooz — Homepage

A production-quality Next.js 14 implementation of the Arbooz patisserie homepage, executing the warm-editorial-luxury design system defined in the strategy and design documents.

```
Live spec:    Boutique patisserie in Riga · arbooz.lv
Aesthetic:    Warm editorial luxury (Grolet / Ansel territory)
Built with:   Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion
```

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run build        # production bundle
```

Node 18.17+ required.

---

## Folder structure

```
arbooz-homepage/
├── app/
│   ├── fonts.ts                 — Fraunces + Inter via next/font (Cyrillic + Latin Ext)
│   ├── globals.css              — design tokens, grain overlay, helpers
│   ├── layout.tsx               — SEO metadata, font variables, html lang="ru"
│   └── page.tsx                 — homepage composition + JSON-LD Bakery schema
│
├── components/
│   ├── ui/                      — reusable primitives
│   │   ├── button.tsx           — discriminated-union button/anchor, 4 variants × 3 sizes
│   │   ├── eyebrow.tsx          — uppercase mono label above headlines
│   │   ├── logo.tsx             — hand-built ARBOOZ wordmark in SVG
│   │   ├── ornament.tsx         — small caramel flourish divider
│   │   ├── reveal.tsx           — Framer Motion fadeUp scroll-trigger wrapper
│   │   └── tag.tsx              — product pill (fresh-today, seasonal, limited, signature)
│   │
│   ├── layout/                  — chrome
│   │   ├── navbar.tsx           — scroll-aware (96→72px), transparent→blur, mega menu
│   │   ├── mobile-nav.tsx       — hamburger + slide-in panel with scrim
│   │   ├── language-switcher.tsx — RU·EN·LV with persistent state
│   │   ├── footer.tsx           — espresso, 4 columns, newsletter
│   │   └── mobile-order-bar.tsx — scroll-direction-aware sticky CTA
│   │
│   └── sections/                — homepage sections in scroll order
│       ├── hero.tsx
│       ├── todays-selection.tsx
│       ├── categories.tsx
│       ├── founder-story.tsx
│       ├── custom-cakes-banner.tsx
│       ├── press.tsx
│       ├── visit.tsx
│       ├── instagram-strip.tsx
│       └── newsletter.tsx
│
├── lib/
│   ├── content.ts               — realistic Arbooz products, hours, press, founder
│   ├── motion.ts                — easing + duration tokens, fadeUp/heroLift variants
│   └── utils.ts                 — cn() classname merger
│
├── tailwind.config.ts           — full design tokens (colors, type scale, spacing, animations)
├── next.config.mjs              — image domains, package optimization
└── tsconfig.json                — strict mode, path aliases
```

---

## Design system in code

**Colors** — declared in `tailwind.config.ts`:
```
--ivory #FAF6F0  · --bone #F2EBE0  · --whisper #E5DDD0
--espresso #2A1E18  · --mocha #7A6B5F  · --ash #B5A99D
--caramel #C68A4F (deep #A26F3D)  · --rose #E8C9C0  · --sage #A8B59A  · --berry #8B3A4E
```

**Typography** — Fraunces (display) + Inter (body), both with Latin + Cyrillic. Full scale `display-xl → mono-xs` configured with clamp() for fluid mobile-to-desktop sizing.

**Spacing** — custom 1-12 scale (4px → 200px) plus `page-gutter` and `section-y` helpers in globals.css. Section vertical padding: 80/112/160 (mobile/tablet/desktop).

**Animation tokens** — `ease-out-slow` (0.16, 1, 0.3, 1) is the default. Durations: 150/300/450/700/1000ms. All exposed via Tailwind utilities (`duration-base`, `ease-out-slow`).

**Motion philosophy** — slow, languid (~450ms base), no springs, fade-up reveals only. Honors `prefers-reduced-motion`.

---

## Notes for production

1. **Images** — placeholder photography is loaded from Unsplash via `next/image`. In production, swap to the real Arbooz photography. The `next.config.mjs` `remotePatterns` should be updated to the production CDN domain.

2. **CMS integration** — `lib/content.ts` is a static fixture. In production it would be replaced with Sanity, Contentful, or similar with locale fields for RU/EN/LV.

3. **i18n** — language switcher holds local state. For real multi-locale routing, wire it to `next-intl` with `[locale]` segments (`/ru/...`, `/en/...`, `/lv/...`).

4. **Newsletter** — the form posts nowhere. Connect to Mailchimp / Customer.io / a Next API route.

5. **JSON-LD** — Bakery schema with opening hours, geo, founder, and aggregate rating is included on the homepage for rich search results.

---

## Accessibility

- All interactive elements have visible 2px caramel focus rings at 4px offset
- Skip-to-content link on the navbar
- Body-scroll lock on mobile nav with Escape-to-close
- ARIA labels on icon-only controls
- All images have descriptive alt text
- `prefers-reduced-motion` collapses Ken Burns, stagger, and scroll reveals to fades
- Touch targets ≥ 44px on mobile
