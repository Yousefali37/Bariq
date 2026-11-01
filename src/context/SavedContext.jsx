import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCatalog } from '../hooks/useCatalog'
import { SAVED_STORAGE_KEY, SavedContext, readSaved } from './savedStore'

export function SavedProvider({ children }) {
  const { products } = useCatalog()
  const [saved, setSaved] = useState(readSaved)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved))
    } catch {
      // Storage can be unavailable in private browsing. The session still works.
    }
  }, [saved])

  const toggleSaved = useCallback((slug) => {
    setSaved((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    )
  }, [])

  const removeSaved = useCallback((slug) => {
    setSaved((current) => current.filter((item) => item !== slug))
  }, [])

  const isSaved = useCallback((slug) => saved.includes(slug), [saved])

  const openDrawer = useCallback(() => setIsOpen(true), [])
  const closeDrawer = useCallback(() => setIsOpen(false), [])

  const savedProducts = useMemo(() => {
    const lookup = new Map(products.map((product) => [product.slug, product]))
    return saved.map((slug) => lookup.get(slug)).filter(Boolean)
  }, [saved, products])

  const value = useMemo(
    () => ({
      saved,
      savedProducts,
      count: savedProducts.length,
      isSaved,
      toggleSaved,
      removeSaved,
      isOpen,
      openDrawer,
      closeDrawer,
    }),
    [
      saved,
      savedProducts,
      isSaved,
      toggleSaved,
      removeSaved,
      isOpen,
      openDrawer,
      closeDrawer,
    ],
  )

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
}
