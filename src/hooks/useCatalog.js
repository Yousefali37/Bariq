import { useContext } from 'react'
import { CatalogContext } from '../context/catalogStore'

export function useCatalog() {
  const context = useContext(CatalogContext)
  if (!context) {
    throw new Error('useCatalog must be used inside a CatalogProvider')
  }
  return context
}
