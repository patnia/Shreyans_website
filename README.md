# Shreyans Group Website

Marketing website for **Shreyans Group** (Faridabad, India, est. 1989), a precision-machined-components manufacturer operating under two business entities:

- **Shreyans Auto and Components (SAC)** — domestic (India) enquiries, brand blue
- **Shreyans Agricon Products (SAP)** — international / export enquiries, brand green

The site opens on a scroll-driven **Gateway** landing page (`/`) where a visitor picks a market. That choice is stored client-side and re-themes every page (colors, logo, copy) for the rest of the session — see [Theming](#theming-domestic-vs-international) below.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) — statically exported (`output: "export"`), no Node server required at runtime
- React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.ts`)
- [Framer Motion](https://www.framer.com/motion/) for the Gateway's scroll sequence and in-page transitions

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Turbopack dev server with hot reload |
| `npm run build` | Production build; outputs a fully static site to `out/` |
| `npm run start` | Serve the last `next build` output (Node-based; mainly for local sanity checks — the real deploy target is the static `out/` folder) |
| `npm run lint` | Run ESLint |

To preview the actual static export locally:

```bash
npm run build
npx serve out
```

## Project structure

```
src/app/
  page.tsx              # "/" — the Gateway (market picker), no header/footer chrome
  (site)/                # route group sharing Header + Footer layout
    home/, about/, capabilities/, products/, customers/, quality/, contact/

src/components/
  gateway.tsx            # scroll-driven landing sequence + reduced-motion fallback
  header.tsx, footer.tsx # market-aware nav/logo
  market-provider.tsx    # React context + localStorage persistence for the chosen market
  rfq-form.tsx           # "Request a quote" form
  ui/                     # smaller presentational building blocks

public/
  images/                # brand logos, product/company photography, customer logos, certs
  documents/              # downloadable brochure (PDF)
  videos/, viewer/         # misc media assets
```

## Theming: domestic vs. international

`src/app/globals.css` defines the palette as CSS custom properties on `:root`, with a `[data-market="domestic"]` block overriding the accent/dark tokens to SAC's blue. `MarketProvider` sets `document.documentElement.dataset.market` whenever the visitor's chosen market changes, so the whole site re-themes without a page reload. Fixed, non-swapping brand colors (`--color-sac`, `--color-sap`) are used only where both entities appear side by side, e.g. the Gateway.

Logos and copy are swapped per-component by reading `market` from `useMarket()` (see `header.tsx`, `footer.tsx`, `gateway.tsx`).

## Version history

This repo is the source of truth for the site — every meaningful change (copy, layout, branding, color scheme) should land as a commit with a clear message, so a previous look/behavior can always be recovered with `git log` + `git checkout` / `git revert` instead of redone by hand.

## Deployment

The site builds to static files (`out/`), so it can be hosted on any static host (Vercel, Netlify, GitHub Pages, S3 + CloudFront, etc.) with no server runtime. Point the host's build command at `npm run build` and its output directory at `out`.
