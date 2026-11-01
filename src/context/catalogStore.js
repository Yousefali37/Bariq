import { createContext } from 'react'

// The context object lives apart from the provider so Fast Refresh can update
// the component file without invalidating every consumer.
export const CatalogContext = createContext(null)
