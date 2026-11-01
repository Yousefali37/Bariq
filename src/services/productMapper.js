// Shared product helpers for the public catalogue and the admin panel.
// Supabase stores snake_case columns; the storefront uses camelCase fields.

export const CATEGORY_LABELS = {
  necklaces: 'Necklaces',
  rings: 'Rings',
  earrings: 'Earrings',
  bracelets: 'Bracelets',
}

export const AVAILABILITY_META = {
  'in-stock': {
    label: 'In stock',
    stockNote: 'In stock',
    leadTime: 'Dispatches in 1–2 business days',
  },
  limited: {
    label: 'Limited stock',
    stockNote: 'Limited stock',
    leadTime: 'Dispatches in 1–2 business days',
  },
  'made-to-order': {
    label: 'Made to order',
    stockNote: 'Made to order',
    leadTime: 'Made to order — 2–3 weeks',
  },
  'sold-out': {
    label: 'Sold out',
    stockNote: 'Sold out',
    leadTime: 'Message us on Instagram for restock',
  },
}

export const AVAILABILITY_OPTIONS = Object.entries(AVAILABILITY_META).map(
  ([id, meta]) => ({ id, label: meta.label }),
)

export const SIZE_GUIDES = [
  { id: '', label: 'No size guide' },
  { id: 'rings', label: 'Ring sizes' },
  { id: 'necklaces', label: 'Chain lengths' },
  { id: 'bracelets', label: 'Bracelet sizes' },
]

function toArray(value) {
  if (!value) return []
  if (Array.isArray(value)) return value
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return []
    try {
      const parsed = JSON.parse(trimmed)
      if (Array.isArray(parsed)) return parsed
    } catch {
      // Not JSON — treat it as a newline or comma separated list.
    }
    return trimmed
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

export function slugify(value = '') {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function normaliseProduct(row = {}) {
  const category = row.category || 'necklaces'
  const availability = row.availability || 'in-stock'
  const meta = AVAILABILITY_META[availability] || AVAILABILITY_META['in-stock']

  return {
    id: row.id,
    slug: row.slug || '',
    name: row.name || '',
    category,
    categoryLabel:
      row.category_label ||
      row.categoryLabel ||
      CATEGORY_LABELS[category] ||
      category,
    price: Number(row.price) || 0,
    image: row.image || '',
    gallery: toArray(row.gallery),
    availability,
    stockNote: row.stock_note || row.stockNote || meta.stockNote,
    leadTime: row.lead_time || row.leadTime || meta.leadTime,
    materialFamilies: toArray(row.material_families || row.materialFamilies),
    colorFamilies: toArray(row.color_families || row.colorFamilies),
    materials: toArray(row.materials),
    color: row.color || '',
    short: row.short || '',
    description: row.description || row.short || '',
    details: toArray(row.details),
    options: toArray(row.options),
    sizeGuide: row.size_guide || row.sizeGuide || '',
    badge: row.badge || '',
    featured: Boolean(row.featured),
    newest: Boolean(row.newest),
    createdAt: row.created_at || row.createdAt,
  }
}

export function toDbProduct(product = {}) {
  return {
    slug: product.slug || slugify(product.name),
    name: product.name || '',
    category: product.category || 'necklaces',
    category_label:
      product.categoryLabel ||
      CATEGORY_LABELS[product.category] ||
      product.category,
    price: Number(product.price) || 0,
    image: product.image || '',
    gallery: toArray(product.gallery),
    availability: product.availability || 'in-stock',
    stock_note: product.stockNote || '',
    lead_time: product.leadTime || '',
    material_families: toArray(product.materialFamilies),
    color_families: toArray(product.colorFamilies),
    materials: toArray(product.materials),
    color: product.color || '',
    short: product.short || '',
    description: product.description || '',
    details: toArray(product.details),
    options: toArray(product.options),
    size_guide: product.sizeGuide || '',
    badge: product.badge || '',
    featured: Boolean(product.featured),
    newest: Boolean(product.newest),
  }
}

export function emptyProduct() {
  return normaliseProduct({
    slug: '',
    name: '',
    category: 'earrings',
    price: 0,
    image: '',
    availability: 'in-stock',
    materialFamilies: ['Stainless steel'],
    colorFamilies: ['Gold'],
    materials: ['Waterproof 316L stainless steel', '18k gold PVD finish'],
    color: 'Gold',
    short: '',
    description: '',
    details: ['Waterproof 316L stainless steel', '18k gold PVD finish'],
    options: [],
    featured: false,
    newest: false,
  })
}
