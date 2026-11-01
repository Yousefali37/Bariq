import { products, sortOptions } from '../data/products'

export const PAGE_SIZE = 12

// Prices are authored in Egyptian pounds.
export const priceBands = [
  { id: 'under-1000', label: 'Under EGP 1,000', min: 0, max: 999 },
  { id: '1000-1999', label: 'EGP 1,000 – 1,999', min: 1000, max: 1999 },
  { id: '2000-plus', label: 'EGP 2,000 and above', min: 2000, max: Infinity },
]

export const availabilityOptions = [
  { id: 'in-stock', label: 'In stock' },
  { id: 'limited', label: 'Limited stock' },
  { id: 'made-to-order', label: 'Made to order' },
  { id: 'sold-out', label: 'Sold out' },
]

// Single entry point for catalogue reads. Pages pass the catalogue they
// received from CatalogContext, so admin edits appear without a rebuild.
export function getAllProducts(list = products) {
  return list
}

export function getProductBySlug(slug, list = products) {
  return list.find((product) => product.slug === slug)
}

export function getProductsBySlugs(slugs = [], list = products) {
  const lookup = new Map(list.map((product) => [product.slug, product]))
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

export function filterProducts(filters = {}, list = products) {
  const {
    category = 'all',
    materials = [],
    colors = [],
    availability = [],
    price = [],
  } = filters

  return list.filter((product) => {
    if (category !== 'all' && product.category !== category) return false
    if (!matchesList(product.materialFamilies, materials)) return false
    if (!matchesList(product.colorFamilies, colors)) return false
    if (!matchesList([product.availability], availability)) return false
    if (!matchesPrice(product.price, price)) return false
    return true
  })
}

// Sold-out pieces stay visible, but always sit at the end of the grid.
function soldOutLast(a, b) {
  const aSoldOut = a.availability === 'sold-out'
  const bSoldOut = b.availability === 'sold-out'
  if (aSoldOut === bSoldOut) return 0
  return aSoldOut ? 1 : -1
}

export function sortProducts(items, sort = 'curated') {
  const list = [...items]
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => soldOutLast(a, b) || a.price - b.price)
    case 'price-desc':
      return list.sort((a, b) => soldOutLast(a, b) || b.price - a.price)
    case 'name':
      return list.sort((a, b) => soldOutLast(a, b) || a.name.localeCompare(b.name))
    default:
      return list.sort(soldOutLast)
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

export function getFacets(list = products) {
  const countBy = (getValues) => {
    const map = new Map()
    list.forEach((product) => {
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
      count: list.filter((product) => product.availability === option.id).length,
    })),
    price: priceBands.map((band) => ({
      ...band,
      count: list.filter(
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
