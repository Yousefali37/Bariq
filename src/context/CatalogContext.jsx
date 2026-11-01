import { useCallback, useEffect, useMemo, useState } from 'react'
import { products as staticProducts } from '../data/products'
import { fetchProducts } from '../services/content'
import { CatalogContext } from './catalogStore'

/**
 * Shares one catalogue between the storefront and the admin panel.
 *
 * The static starter catalogue is shown immediately so the site never flashes
 * empty. Supabase is then asked for the live catalogue; when the table is empty
 * or unreachable, `fetchProducts()` falls back to the same static list.
 */
export function CatalogProvider({ children }) {
  const [products, setProducts] = useState(staticProducts)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const rows = await fetchProducts()
      if (rows.length) setProducts(rows)
      setError(null)
    } catch (cause) {
      setError(cause)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true

    fetchProducts()
      .then((rows) => {
        if (!active) return
        if (rows.length) setProducts(rows)
        setError(null)
      })
      .catch((cause) => {
        if (active) setError(cause)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const value = useMemo(() => {
    const bySlug = new Map(products.map((product) => [product.slug, product]))

    return {
      products,
      loading,
      error,
      refresh,
      getProduct: (slug) => bySlug.get(slug),
      getProductsBySlugs: (slugs = []) =>
        slugs.map((slug) => bySlug.get(slug)).filter(Boolean),
    }
  }, [products, loading, error, refresh])

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}
