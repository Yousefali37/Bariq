import { createContext } from 'react'

export const SavedContext = createContext(null)
export const SAVED_STORAGE_KEY = 'bariq-saved-pieces'

export function readSaved() {
  if (typeof window === 'undefined') return []
  try {
    const stored = JSON.parse(
      window.localStorage.getItem(SAVED_STORAGE_KEY) || '[]',
    )
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}
