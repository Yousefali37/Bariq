# Bariq — بريق

**Waterproof stainless-steel jewelry, made for every day in Egypt.**

Bariq is an Egyptian jewelry house working in high-grade 316L stainless steel
with warm gold PVD and brushed silver finishes. This repository is the public
catalogue and the small admin panel the owner uses to keep it current.

The site is a **catalogue, not a checkout**. Every order is placed by Instagram
DM, prices are shown in **EGP**, and delivery is available to every Egyptian
governorate with **cash on delivery**. There is no cart, account, discount code
or online payment.

Built with React 19, Vite 8, React Router 7, Supabase (optional) and hand-written
CSS.

---

## Quick start

```bash
npm install
npm run dev       # local dev server with HMR
npm run build     # production build to /dist (runs images, sitemap, validation)
npm run preview   # preview the production build locally
npm run lint      # ESLint + content validation
```

Requires Node.js 20.19+ (Vite 8 requirement).

---

## Routes

| Area | Route | Notes |
| --- | --- | --- |
| Home | `/` | Hero, manifesto, shop section, featured pieces, values, Instagram CTA |
| Shop | `/shop` | Category, finish, material, availability and price filters; sold-out pieces stay visible |
| Product | `/piece/:slug` | Gallery, options, size guide, sold-out state, Instagram order button |
| Our story | `/story` | Brand narrative, process, materials |
| Gallery | `/gallery` | Product and studio photography with category filters |
| Contact | `/contact` | How ordering works, delivery, payment, FAQs |
| Privacy | `/privacy` | Legal copy — review before launch |
| Terms | `/terms` | Legal copy — review before launch |
| Admin | `/admin` | Supabase-authenticated product and media manager |
| Not found | `*` | Editorial 404 |

`/collections` redirects to `/shop` so older links keep working.

Shared features:

- Sticky header, full-screen mobile menu and keyboard-accessible search overlay.
- Wishlist saved to `localStorage` — no account required.
- One shared catalogue (`CatalogProvider`) for the storefront, wishlist, search,
  recent views and admin panel.
- Instagram order buttons that open the DM inbox and copy the piece details to
  the clipboard for the customer to paste.
- Per-page titles, descriptions, canonical URLs, Open Graph tags and JSON-LD.
- `prefers-reduced-motion` support and visible focus states.

---

## Content and catalogue

All starter content lives in `src/data/`:

- **Brand, delivery, FAQs, values, process, size guides** — `src/data/site.js`
- **Starter catalogue** — `src/data/products.js` (21 pieces, EGP prices,
  categories, finishes, sold-out flags, options, image keys `product-1` …
  `product-21`)

Product photography lives in `src/assets/images/Products/1.png` …
`21.png`. The image pipeline exposes them as `product-1` … `product-21`.
Top-level photography keeps its file name as its key.

The public site reads products from Supabase. Until the table has rows, it falls
back to the static starter catalogue, so the shop is never empty.

### Admin panel

1. Create a Supabase project and run `supabase_schema.sql` in the SQL editor.
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local`.
3. Create an email/password user under **Authentication → Users** in Supabase.
4. Start the site and sign in at `/admin/login`.
5. Open **Products → Import starter catalogue** once. This inserts the 21
   starter pieces. Existing slugs are left unchanged if you run it again.

The product editor supports name, slug, category, EGP price, availability
(including **sold out**), stock note, lead time, finish, badge, material and
finish filters, materials, short and full descriptions, detail lines, gallery
images, main image upload, size guide, featured/newest flags and advanced JSON
options. Saving a product while the table is still empty imports the whole
starter catalogue first, so adding one piece never hides the other 20.

The **Media** page uploads to the public `media` bucket and copies public URLs.

---

## Images

```bash
npm run images
```

Reads `src/assets/images` (including `Products/`) and writes responsive AVIF,
WebP and JPEG derivatives to `public/media`, plus
`src/data/generated/imageManifest.js` and the social card
`public/og-image.jpg`.

Replace the source files and re-run — no component changes are needed. Product
pages can use either a logical key (`product-1`) or a full Supabase media URL.

---

## Environment variables

Create `.env.local` (see `.env.example` if present) with:

```bash
# Public site URL — used for canonical, OG and JSON-LD URLs.
VITE_SITE_URL=https://bariq.studio

# Instagram ordering
VITE_INSTAGRAM_URL=https://instagram.com/bariq.studio
VITE_INSTAGRAM_HANDLE=@bariq.studio

# Catalogue currency (EGP only)
VITE_DEFAULT_CURRENCY=EGP

# Analytics is off by default. No advertising or behavioural tracking is used.
VITE_ANALYTICS_ENABLED=false

# Optional admin panel / live catalogue
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

The Instagram handle, site URL, prices, delivery fees and returns language are
**placeholders** until the client confirms them.

---

## SEO

- `index.html` holds the default title, description, canonical and Open Graph
  tags. Replace `https://bariq.studio` with the live domain before launch.
- `src/hooks/usePageMeta.js` manages per-page metadata and JSON-LD.
- `src/services/seo.js` builds Organization, WebSite, Product, Breadcrumb,
  Collection and FAQ structured data. Product offers use `priceCurrency: EGP`
  and map sold-out pieces to `schema.org/SoldOut`.
- `scripts/sitemap.mjs` writes `public/sitemap.xml` with the shop, gallery,
  story, contact, legal and product URLs.
- `public/robots.txt` allows the storefront and blocks `/admin`.

The copy targets the brand and the phrase “stainless steel jewelry Egypt”
without keyword stuffing.

---

## Deployment

The app uses `BrowserRouter`, so the host must rewrite unknown paths to
`index.html`.

- **Netlify** — `public/_redirects` is included (`/* /index.html 200`).
- **Vercel** — `vercel.json` rewrites all paths to `/index.html`.
- **Other static hosts** — configure an equivalent SPA fallback, then deploy the
  output of `npm run build` (`dist/`).

`npm run build` runs the image pipeline, sitemap generator and content validation
first via `prebuild`.

---

## Before launch — confirm with the client

- [ ] **Instagram handle** — `site.instagram` / `site.instagramHandle` and the
      `VITE_INSTAGRAM_*` variables
- [ ] **Domain** — `VITE_SITE_URL`, `index.html`, `public/robots.txt`
- [ ] **Prices** — every EGP price in `src/data/products.js`
- [ ] **Delivery fees by city** — currently described as confirmed on Instagram
- [ ] **Returns policy** — placeholder language in `site.js` and the product page
- [ ] **Product copy and photography** — review every piece for accuracy
- [ ] **Legal pages** — have privacy and terms reviewed for Egypt
- [ ] **Final brand approval** — Bariq means “shimmer / glint of light” in Arabic

There is intentionally no cart, checkout, account system, discount code, gift
card, newsletter, blog or care-guide page.
"# bariq" 
