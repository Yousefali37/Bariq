import { useCallback, useEffect, useMemo, useState } from 'react'
import { products } from '../data/products'
import { writeJson } from '../services/storage'
import {
  RECENTLY_VIEWED_KEY,
  RECENTLY_VIEWED_LIMIT,
  RecentlyViewedContext,
  readRecentlyViewed,
} from './recentlyViewedStore'

export function RecentlyViewedProvider({ children }) {
  const [slugs, setSlugs] = useState(readRecentlyViewed)

  useEffect(() => {
    writeJson(RECENTLY_VIEWED_KEY, slugs)
  }, [slugs])

  const recordView = useCallback((slug) => {
    if (!slug) return
    setSlugs((current) => {
      if (current[0] === slug) return current
      return [slug, ...current.filter((item) => item !== slug)].slice(
        0,
        RECENTLY_VIEWED_LIMIT,
      )
    })
  }, [])

  const clearRecent = useCallback(() => setSlugs([]), [])

  const recentProducts = useMemo(() => {
    const lookup = new Map(products.map((product) => [product.slug, product]))
    return slugs.map((slug) => lookup.get(slug)).filter(Boolean)
  }, [slugs])

  const value = useMemo(
    () => ({
      slugs,
      recentProducts,
      count: recentProducts.length,
      recordView,
      clearRecent,
    }),
    [slugs, recentProducts, recordView, clearRecent],
  )

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}
