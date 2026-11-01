// ---------------------------------------------------------------------------
// Content validation
//
// A lightweight guard against the most common editorial mistakes: duplicate
// slugs, missing imagery, unknown categories and incomplete product records.
// Run with `npm run validate:content` (also part of lint and prebuild).
// ---------------------------------------------------------------------------
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { products } from '../src/data/products.js'

const errors = []
const warnings = []

const CATEGORY_LABELS = {
  necklaces: 'Necklaces',
  rings: 'Rings',
  earrings: 'Earrings',
  bracelets: 'Bracelets',
}
const CATEGORIES = new Set(Object.keys(CATEGORY_LABELS))
const AVAILABILITY = new Set([
  'in-stock',
  'limited',
  'made-to-order',
  'sold-out',
])
const SIZE_GUIDES = new Set(['', 'rings', 'necklaces', 'bracelets'])
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

async function listImageKeys(directory, prefix = '') {
  try {
    const files = await readdir(directory)
    return files
      .filter((file) => /\.(jpe?g|png)$/i.test(file))
      .map((file) => `${prefix}${file.replace(/\.(jpe?g|png)$/i, '')}`)
  } catch {
    return []
  }
}

const imageDir = path.join(process.cwd(), 'src', 'assets', 'images')
const imageFiles = new Set([
  ...(await listImageKeys(imageDir)),
  ...(await listImageKeys(path.join(imageDir, 'Products'), 'product-')),
])

const fail = (scope, message) => errors.push(`${scope}: ${message}`)
const warn = (scope, message) => warnings.push(`${scope}: ${message}`)

const isImage = (key) =>
  typeof key === 'string' &&
  (/^https?:\/\//i.test(key) || imageFiles.has(key))

function uniqueSlugs(items, scope) {
  const seen = new Set()
  items.forEach((item) => {
    if (!item.slug) fail(scope, 'missing slug')
    else if (!SLUG_PATTERN.test(item.slug)) {
      fail(scope, `slug "${item.slug}" must be lowercase kebab-case`)
    } else if (seen.has(item.slug)) {
      fail(scope, `duplicate slug "${item.slug}"`)
    } else seen.add(item.slug)
  })
}

uniqueSlugs(products, 'products')

if (products.length !== 21) {
  warn('products', `expected 21 starter pieces, found ${products.length}`)
}

products.forEach((product) => {
  const scope = `product/${product.slug || '?'}`

  ;[
    'name',
    'categoryLabel',
    'short',
    'description',
    'color',
    'stockNote',
    'leadTime',
  ].forEach((field) => {
    if (!product[field]) fail(scope, `missing ${field}`)
  })

  if (!CATEGORIES.has(product.category)) {
    fail(scope, `unknown category "${product.category}"`)
  } else if (product.categoryLabel !== CATEGORY_LABELS[product.category]) {
    fail(
      scope,
      `categoryLabel "${product.categoryLabel}" should be "${CATEGORY_LABELS[product.category]}"`,
    )
  }

  if (typeof product.price !== 'number' || product.price <= 0) {
    fail(scope, 'price must be a positive number')
  }

  if (!AVAILABILITY.has(product.availability)) {
    fail(scope, `unknown availability "${product.availability}"`)
  }

  if (!isImage(product.image)) {
    fail(scope, `image "${product.image}" not found in src/assets/images`)
  }

  ;(product.gallery || []).forEach((key) => {
    if (!isImage(key)) {
      fail(scope, `gallery image "${key}" not found`)
    }
  })

  if (!Array.isArray(product.details) || product.details.length < 2) {
    warn(scope, 'fewer than two detail lines')
  }

  if (!Array.isArray(product.materials) || !product.materials.length) {
    warn(scope, 'no material details for search and structured data')
  }

  if (!Array.isArray(product.materialFamilies) || !product.materialFamilies.length) {
    fail(scope, 'missing materialFamilies')
  }

  if (!Array.isArray(product.colorFamilies) || !product.colorFamilies.length) {
    fail(scope, 'missing colorFamilies')
  }

  if (!SIZE_GUIDES.has(product.sizeGuide || '')) {
    fail(scope, `unknown sizeGuide "${product.sizeGuide}"`)
  }

  const optionIds = new Set()
  ;(product.options || []).forEach((option) => {
    if (!option.id) fail(scope, 'option is missing an id')
    if (optionIds.has(option.id)) fail(scope, `duplicate option "${option.id}"`)
    optionIds.add(option.id)
    if (!option.label) fail(scope, `option "${option.id}" is missing a label`)
    if (!option.values?.length) {
      fail(scope, `option "${option.id}" has no values`)
    }
    ;(option.values || []).forEach((value) => {
      if (!value.id || !value.label) {
        fail(scope, `option "${option.id}" has a value without id or label`)
      }
    })
  })
})

warnings.forEach((message) => console.warn(`  warn  ${message}`))

if (errors.length) {
  errors.forEach((message) => console.error(`  error ${message}`))
  console.error(`\ncontent: ${errors.length} error(s) found`)
  process.exitCode = 1
} else {
  console.log(`content: ${products.length} products — valid`)
}
