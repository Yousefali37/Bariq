// ---------------------------------------------------------------------------
// Sitemap generator
//
// Reads the content modules (they contain no Vite-specific imports) and writes
// public/sitemap.xml. Run via `npm run sitemap`, or automatically before a
// production build.
// ---------------------------------------------------------------------------
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { products } from '../src/data/products.js'

const siteUrl = (process.env.VITE_SITE_URL || 'https://bariq.studio').replace(
  /\/+$/,
  '',
)
const today = new Date().toISOString().slice(0, 10)

const staticPaths = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/shop', priority: '0.9', changefreq: 'weekly' },
  { path: '/gallery', priority: '0.6', changefreq: 'monthly' },
  { path: '/story', priority: '0.6', changefreq: 'yearly' },
  { path: '/contact', priority: '0.6', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.2', changefreq: 'yearly' },
  { path: '/terms', priority: '0.2', changefreq: 'yearly' },
]

const routes = [
  ...staticPaths,
  ...products.map((product) => ({
    path: `/piece/${product.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  })),
]

const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${escape(`${siteUrl}${route.path}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const output = path.join(process.cwd(), 'public', 'sitemap.xml')
await mkdir(path.dirname(output), { recursive: true })
await writeFile(output, xml, 'utf8')
console.log(`sitemap: ${routes.length} routes → public/sitemap.xml`)
