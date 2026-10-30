// ---------------------------------------------------------------------------
// Content validation
//
// A lightweight guard against the most common editorial mistakes: duplicate
// slugs, missing imagery, broken edit/product references and incomplete
// product records. Run with `npm run validate:content` (also part of lint).
// ---------------------------------------------------------------------------
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { edits } from '../src/data/edits.js'
import { journal } from '../src/data/journal.js'
import { products } from '../src/data/products.js'

const errors = []
const warnings = []

const CATEGORIES = new Set(['jewelry', 'hair', 'bags', 'eyewear', 'silk'])
const AVAILABILITY = new Set(['in-stock', 'limited', 'made-to-order'])

const imageFiles = new Set(
  (await readdir(path.join(process.cwd(), 'src', 'assets', 'images')))
    .filter((file) => /\.(jpe?g|png)$/i.test(file))
    .map((file) => file.replace(/\.(jpe?g|png)$/i, '')),
)

const fail = (scope, message) => errors.push(`${scope}: ${message}`)
const warn = (scope, message) => warnings.push(`${scope}: ${message}`)

function uniqueSlugs(items, scope) {
  const seen = new Set()
  items.forEach((item) => {
    if (!item.slug) fail(scope, 'missing slug')
    else if (seen.has(item.slug)) fail(scope, `duplicate slug "${item.slug}"`)
    else seen.add(item.slug)
  })
}

uniqueSlugs(products, 'products')
uniqueSlugs(journal, 'journal')
uniqueSlugs(edits, 'edits')

const productSlugs = new Set(products.map((product) => product.slug))

products.forEach((product) => {
  const scope = `product/${product.slug || '?'}`
  ;['name', 'categoryLabel', 'short', 'description', 'color'].forEach(
    (field) => {
      if (!product[field]) fail(scope, `missing ${field}`)
    },
  )
  if (!CATEGORIES.has(product.category)) {
    fail(scope, `unknown category "${product.category}"`)
  }
  if (typeof product.price !== 'number' || product.price <= 0) {
    fail(scope, 'price must be a positive number')
  }
  if (!AVAILABILITY.has(product.availability)) {
    fail(scope, `unknown availability "${product.availability}"`)
  }
  if (!imageFiles.has(product.image)) {
    fail(scope, `image "${product.image}" not found in src/assets/images`)
  }
  ;(product.gallery || []).forEach((key) => {
    if (!imageFiles.has(key)) {
      fail(scope, `gallery image "${key}" not found`)
    }
  })
  if (!Array.isArray(product.details) || product.details.length < 2) {
    warn(scope, 'fewer than two detail lines')
  }
  const optionIds = new Set()
  ;(product.options || []).forEach((option) => {
    if (optionIds.has(option.id)) fail(scope, `duplicate option "${option.id}"`)
    optionIds.add(option.id)
    if (!option.values?.length) fail(scope, `option "${option.id}" has no values`)
  })
})

journal.forEach((article) => {
  const scope = `journal/${article.slug || '?'}`
  ;['title', 'category', 'excerpt', 'displayDate'].forEach((field) => {
    if (!article[field]) fail(scope, `missing ${field}`)
  })
  if (!imageFiles.has(article.cover)) {
    fail(scope, `cover "${article.cover}" not found`)
  }
  if (!Array.isArray(article.body) || !article.body.length) {
    fail(scope, 'body is empty')
  }
  if (!Array.isArray(article.tags) || !article.tags.length) {
    warn(scope, 'no tags')
  }
  ;(article.related || []).forEach((slug) => {
    if (!journal.some((entry) => entry.slug === slug)) {
      fail(scope, `related article "${slug}" not found`)
    }
  })
  if (article.readingMinutes && article.readingMinutes < 1) {
    warn(scope, 'reading time looks wrong')
  }
})

edits.forEach((edit) => {
  const scope = `edit/${edit.slug || '?'}`
  ;['title', 'kicker', 'description', 'imageAlt'].forEach((field) => {
    if (!edit[field]) fail(scope, `missing ${field}`)
  })
  if (!imageFiles.has(edit.image)) {
    fail(scope, `image "${edit.image}" not found`)
  }
  if (!edit.products?.length) fail(scope, 'no products')
  ;(edit.products || []).forEach((slug) => {
    if (!productSlugs.has(slug)) fail(scope, `product "${slug}" not found`)
  })
  ;(edit.hotspots || []).forEach((hotspot) => {
    if (!edit.products.includes(hotspot.slug)) {
      warn(scope, `hotspot "${hotspot.slug}" is not in the edit's product list`)
    }
    if (hotspot.x < 0 || hotspot.x > 100 || hotspot.y < 0 || hotspot.y > 100) {
      fail(scope, `hotspot "${hotspot.slug}" is outside the image`)
    }
  })
})

warnings.forEach((message) => console.warn(`  warn  ${message}`))

if (errors.length) {
  errors.forEach((message) => console.error(`  error ${message}`))
  console.error(`\ncontent: ${errors.length} error(s) found`)
  process.exitCode = 1
} else {
  console.log(
    `content: ${products.length} products, ${journal.length} articles, ${edits.length} edits — valid`,
  )
}
