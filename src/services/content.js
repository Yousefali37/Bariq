import { supabase } from '../lib/supabase'
import { products as staticProducts } from '../data/products'
import { normaliseProduct } from './productMapper'

/**
 * Fetch the live catalogue. The static starter catalogue is the source of
 * truth until the owner imports it in the admin panel; once Supabase has rows,
 * those rows win.
 */
export async function fetchProducts() {
  if (!supabase) return staticProducts

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true })

  if (error || !data || data.length === 0) return staticProducts

  return data.map(normaliseProduct)
}

/** Fetch a single product by slug, falling back to the static catalogue. */
export async function fetchProductBySlug(slug) {
  if (!slug) return null

  if (supabase) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (!error && data) return normaliseProduct(data)
  }

  return staticProducts.find((product) => product.slug === slug) || null
}
