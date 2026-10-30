import { createContext } from 'react'
import { DEFAULT_CURRENCY, isCurrency } from '../services/currency'
import { readString } from '../services/storage'

export const CurrencyContext = createContext(null)
export const CURRENCY_STORAGE_KEY = 'bariq-currency'

export function readCurrency() {
  const stored = readString(CURRENCY_STORAGE_KEY, DEFAULT_CURRENCY)
  return isCurrency(stored) ? stored : DEFAULT_CURRENCY
}
