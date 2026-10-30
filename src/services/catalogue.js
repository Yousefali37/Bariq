import { products, sortOptions } from '../data/products'

export const PAGE_SIZE = 8

export const priceBands = [
  { id: 'under-150', label: 'Under $150', min: 0, max: 149 },
  { id: '150-249', label: '$150 – $249', min: 150, max: 249 },
  { id: '250-plus', label: '$250 and above', min: 250, max: Infinity },
]

export const availabilityOptions = [
  { id: 'in-stock', label: 'In stock' },
  { id: 'limited', label: 'Limited run' },
  { id: 'made-to-order', label: 'Made to order' },
]

// Single entry point for catalogue reads. When a backend or CMS arrives, only
// this module changes: pages already consume these helpers.
export function getAllProducts() {
  return products
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug)
}

export function getProductsBySlugs(slugs = []) {
  const lookup = new Map(products.map((product) => [product.slug, product]))
  return slugs.map((slug) => lookup.get(slug)).filter(Boolean)
}

export function getSortOptions() {
  return sortOptions
}

function matchesList(values = [], selected = []) {
  if (!selected.length) return true
  return values.some((value) => selected.includes(value))
}

function matchesPrice(price, selected = []) {
  if (!selected.length) return true
  return selected.some((bandId) => {
    const band = priceBands.find((item) => item.id === bandId)
    return band ? price >= band.min && price <= band.max : false
  })
}

export function filterProducts(filters = {}) {
  const {
    category = 'all',
    materials = [],
    colors = [],
    availability = [],
    price = [],
  } = filters

  return products.filter((product) => {
    if (category !== 'all' && product.category !== category) return false
    if (!matchesList(product.materialFamilies, materials)) return false
    if (!matchesList(product.colorFamilies, colors)) return false
    if (!matchesList([product.availability], availability)) return false
    if (!matchesPrice(product.price, price)) return false
    return true
  })
}

export function sortProducts(items, sort = 'curated') {
  const list = [...items]
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price)
    case 'newest':
      return list.sort((a, b) => Number(b.newest) - Number(a.newest))
    case 'name':
      return list.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return list
  }
}

export function paginate(items, page = 1, perPage = PAGE_SIZE) {
  const total = items.length
  const pageCount = Math.max(1, Math.ceil(total / perPage))
  const current = Math.min(Math.max(1, Number(page) || 1), pageCount)
  const start = (current - 1) * perPage
  return {
    items: items.slice(start, start + perPage),
    page: current,
    pageCount,
    total,
    from: total ? start + 1 : 0,
    to: Math.min(start + perPage, total),
    perPage,
  }
}

export function getFacets() {
  const countBy = (getValues) => {
    const map = new Map()
    products.forEach((product) => {
      getValues(product).forEach((value) => {
        map.set(value, (map.get(value) || 0) + 1)
      })
    })
    return [...map.entries()].map(([id, count]) => ({ id, count }))
  }

  return {
    materials: countBy((product) => product.materialFamilies || []),
    colors: countBy((product) => product.colorFamilies || []),
    availability: availabilityOptions.map((option) => ({
      ...option,
      count: products.filter((product) => product.availability === option.id)
        .length,
    })),
    price: priceBands.map((band) => ({
      ...band,
      count: products.filter(
        (product) => product.price >= band.min && product.price <= band.max,
      ).length,
    })),
  }
}

export function uniqueList(value) {
  if (!value) return []
  return [
    ...new Set(
      value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ]
}
