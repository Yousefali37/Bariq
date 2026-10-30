# Bariq — بريق

**Objects of quiet light.**

A production-minded editorial website for Bariq, a small house of hand-finished
jewelry and considered accessories. The site is a showcase and inquiry experience
rather than a checkout: every piece is offered by private inquiry through
WhatsApp or email.

Built with React 19, Vite 8, React Router 7 and hand-written CSS.

---

## Quick start

```bash
npm install
npm run dev      # local dev server with HMR
npm run build    # production build to /dist
npm run preview  # preview the production build locally
npm run lint     # ESLint (flat config)
```

Requires Node.js 20.19+ (Vite 8 requirement).

---

## What is included

| Area | Route | Notes |
| --- | --- | --- |
| Home | `/` | Hero, manifesto, category tiles, featured edit, campaign, values, journal, concierge CTA |
| Collections | `/collections` | Category filters (URL-driven) and sorting |
| Product | `/piece/:slug` | Gallery, details accordion, saved state, WhatsApp/email inquiry, related pieces, mobile inquiry bar |
| Our story | `/story` | Brand narrative, process, atelier, materials |
| Journal | `/journal` | Featured article and index |
| Article | `/journal/:slug` | Long-form article with next-story link |
| Concierge | `/contact` | Validated inquiry form that opens WhatsApp or email, FAQs |
| Privacy | `/privacy` | Legal copy (review before launch) |
| Terms | `/terms` | Legal copy (review before launch) |
| Not found | `*` | Editorial 404 |

Shared features:

- Sticky, blur-backed header with search, saved-pieces drawer and inquiry CTA.
- Full-screen mobile menu and search overlay (keyboard Escape, focus on open).
- Scroll-reveal animations via `IntersectionObserver`, with a reduced-motion path.
- Saved pieces persisted to `localStorage` (no account, no backend).
- WhatsApp deep links with prefilled, piece-specific messages.
- Per-page document titles and descriptions.
- SPA fallback configs for Netlify and Vercel.

---

## Project structure

```
public/
  favicon.svg          Custom Bariq sparkle mark
  _redirects           Netlify SPA fallback
  robots.txt
src/
  App.jsx              Route table
  main.jsx             BrowserRouter + SavedProvider + global CSS
  assets/images/       Placeholder photography (see below)
  components/          Header, Footer, overlays, product card, Reveal, etc.
  context/
    SavedContext.jsx   SavedProvider (localStorage persistence + drawer state)
    savedStore.js      Context object, storage key, safe read helper
  data/
    site.js            Brand config, contact details, values, FAQs, helpers
    products.js        Catalog, sorting options, related-product helper
    journal.js         Articles and navigation helpers
  hooks/
    useSaved.js        Context hook
    usePageMeta.js     Title/description management
  pages/               Home, Shop, Product, Story, Journal, Article, Contact, Legal, NotFound
  styles/
    home.css           Home sections
    shop.css           Collections + product detail
    pages.css          Story, journal, article, contact, legal, 404
  index.css            Tokens, base, header/footer, overlays, cards, responsive
```

---

## Editing content

All copy and catalog data live in `src/data/`:

- **Brand details, contact, FAQs, values, process** — `src/data/site.js`
- **Products** — `src/data/products.js` (name, slug, category, price in USD,
  short/long description, materials, dimensions, care, gallery, badges,
  `featured` / `newest` flags)
- **Journal articles** — `src/data/journal.js` (block-based body: `p`, `h2`, `quote`)

Styling is driven by CSS custom properties at the top of `src/index.css`
(ivory, antique gold, espresso; Bodoni Moda + Jost + Noto Naskh Arabic).
Fonts load from Google Fonts in `index.html`.

### Before launch — replace these placeholders

- [ ] **WhatsApp number** — `site.whatsapp` / `site.whatsappDisplay` (currently `+971 50 123 4567`)
- [ ] **Email** — `site.email` (currently `concierge@bariq.studio`)
- [ ] **Instagram** — `site.instagram` / `site.instagramHandle`
- [ ] **Locations and hours** — `site.location`, `site.hours`, `site.appointment`
- [ ] **All photography** — `src/assets/images/` (see credits below)
- [ ] **Product copy, prices, materials and dimensions** — review for accuracy
- [ ] **Shipping, returns and legal copy** — have privacy/terms reviewed for your jurisdiction
- [ ] **Domain** — canonical/OG URLs are not yet set; update `index.html`,
  `public/robots.txt` and add a sitemap for the live domain

---

## Photography

The images in `src/assets/images/` are **temporary placeholders sourced from
[Pexels](https://www.pexels.com/)**. The Pexels license does not require
attribution, but these are stock images of other people's work and should be
replaced with original Bariq campaign and product photography before launch.

Recommended replacement set:

- One hero/campaign portrait (portrait crop, warm light)
- Two to three editorial/lifestyle images
- One atelier/process image
- One still life
- One image per product, plus a secondary view for the gallery

Keep the same filenames (or update the imports in the pages) and the layouts
will adapt. Product galleries support multiple images via the `gallery` array.

---

## Deployment

The app uses `BrowserRouter`, so the host must rewrite unknown paths to
`index.html`.

- **Netlify** — `public/_redirects` is included (`/* /index.html 200`).
- **Vercel** — `vercel.json` rewrites all paths to `/index.html`.
- **Other static hosts** — configure an equivalent SPA fallback, then deploy the
  output of `npm run build` (`dist/`).

No environment variables or backend services are required.

---

## Accessibility & motion

- Skip link, landmarks, labelled controls and visible focus states.
- Overlays close on Escape; the search field receives focus on open.
- Decorative images use empty `alt`; meaningful images are described.
- `prefers-reduced-motion` disables reveals, the custom cursor, the seal
  rotation and smooth scrolling.

---

## Notes

- The repo is not a git repository; there is no commit history.
- Prices are displayed in USD and are indicative until confirmed by the
  concierge. There is intentionally no cart or online payment.
- Saved pieces are stored only in the visitor's browser and are not sent to a
  server.
"# Bariq" 
