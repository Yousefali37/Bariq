import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  currencies,
  formatMoney,
  getCurrency,
} from '../services/currency'
import { writeString } from '../services/storage'
import {
  CURRENCY_STORAGE_KEY,
  CurrencyContext,
  readCurrency,
} from './currencyStore'

export function CurrencyProvider({ children }) {
  const [code, setCode] = useState(readCurrency)

  useEffect(() => {
    writeString(CURRENCY_STORAGE_KEY, code)
    document.documentElement.lang = 'en'
  }, [code])

  const setCurrency = useCallback((next) => {
    if (currencies.some((currency) => currency.code === next)) setCode(next)
  }, [])

  const format = useCallback((amount) => formatMoney(amount, code), [code])

  const value = useMemo(
    () => ({
      code,
      currency: getCurrency(code),
      currencies,
      setCurrency,
      format,
      formatIn: formatMoney,
    }),
    [code, setCurrency, format],
  )

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  )
}
