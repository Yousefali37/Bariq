import { journal } from '../data/journal'
import { products } from '../data/products'
import { readJson, writeJson } from './storage'

export const RECENT_SEARCHES_KEY = 'bariq-recent-searches'
const MAX_RECENT = 6

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'for',
  'in',
  'of',
  'on',
  'the',
  'to',
  'with',
])

export function normalise(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function distance(a, b) {
  const rows = a.length + 1
  const cols = b.length + 1
  let previous = Array.from({ length: cols }, (_, index) => index)

  for (let row = 1; row < rows; row += 1) {
    const current = [row]
    for (let col = 1; col < cols; col += 1) {
      const cost = a[row - 1] === b[col - 1] ? 0 : 1
      current[col] = Math.min(
        current[col - 1] + 1,
        previous[col] + 1,
        previous[col - 1] + cost,
      )
    }
    previous = current
  }

  return previous[cols - 1]
}

function fuzzyHit(token, text) {
  if (token.length < 4) return false
  const allowed = token.length > 6 ? 2 : 1
  return text
    .split(' ')
    .filter((word) => word.length >= 3)
    .some((word) => distance(token, word) <= allowed)
}

function scoreFields(term, tokens, fields) {
  let score = 0

  fields.forEach(({ value, weight }) => {
    const text = normalise(value)
    if (!text) return

    if (text === term) score += weight * 1.6
    else if (text.includes(term)) score += weight

    tokens.forEach((token) => {
      if (STOP_WORDS.has(token)) return
      if (text.includes(token)) score += weight * 0.5
      else if (fuzzyHit(token, text)) score += weight * 0.16
    })
  })

  return score
}

function productScore(product, term, tokens) {
  return scoreFields(term, tokens, [
    { value: product.name, weight: 100 },
    { value: product.categoryLabel, weight: 52 },
    { value: product.short, weight: 38 },
    { value: product.materialFamilies?.join(' '), weight: 34 },
    { value: product.color, weight: 28 },
    { value: product.materials, weight: 26 },
    { value: product.description, weight: 12 },
    { value: product.details?.join(' '), weight: 14 },
  ])
}

function articleScore(article, term, tokens) {
  return scoreFields(term, tokens, [
    { value: article.title, weight: 100 },
    { value: article.tags?.join(' '), weight: 56 },
    { value: article.category, weight: 48 },
    { value: article.excerpt, weight: 34 },
    {
      value: article.body?.map((block) => block.text).join(' '),
      weight: 8,
    },
  ])
}

/**
 * Search the catalogue and journal with lightweight typo tolerance.
 * Returns products and articles separately so the UI can group them.
 */
export function searchAll(query, { limit = 10 } = {}) {
  const term = normalise(query)
  if (!term) return { products: [], articles: [], total: 0 }

  const tokens = term.split(' ').filter(Boolean)

  const productHits = products
    .map((product) => ({
      item: product,
      score: productScore(product, term, tokens),
    }))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((hit) => hit.item)

  const articleHits = journal
    .map((article) => ({
      item: article,
      score: articleScore(article, term, tokens),
    }))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(3, Math.ceil(limit / 2)))
    .map((hit) => hit.item)

  return {
    products: productHits,
    articles: articleHits,
    total: productHits.length + articleHits.length,
  }
}

export function readRecentSearches() {
  const stored = readJson(RECENT_SEARCHES_KEY, [])
  return Array.isArray(stored)
    ? stored.filter((item) => typeof item === 'string').slice(0, MAX_RECENT)
    : []
}

export function addRecentSearch(query) {
  const term = query.trim()
  if (term.length < 2) return readRecentSearches()
  const current = readRecentSearches()
  const next = [
    term,
    ...current.filter((item) => item.toLowerCase() !== term.toLowerCase()),
  ].slice(0, MAX_RECENT)
  writeJson(RECENT_SEARCHES_KEY, next)
  return next
}

export function clearRecentSearches() {
  writeJson(RECENT_SEARCHES_KEY, [])
  return []
}
