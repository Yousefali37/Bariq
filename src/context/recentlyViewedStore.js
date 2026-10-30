import { createContext } from 'react'
import { readJson } from '../services/storage'

export const RecentlyViewedContext = createContext(null)
export const RECENTLY_VIEWED_KEY = 'bariq-recently-viewed'
export const RECENTLY_VIEWED_LIMIT = 8

export function readRecentlyViewed() {
  const stored = readJson(RECENTLY_VIEWED_KEY, [])
  return Array.isArray(stored)
    ? stored.filter((slug) => typeof slug === 'string').slice(0, RECENTLY_VIEWED_LIMIT)
    : []
}
