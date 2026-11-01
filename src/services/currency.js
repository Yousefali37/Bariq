// The catalogue is authored and sold in Egyptian pounds. A single currency is
// exposed so the rest of the site can keep using the same formatting helpers.
export const currencies = [
  {
    code: 'EGP',
    label: 'EGP · Egyptian Pound',
    short: 'EGP',
    rate: 1,
    locale: 'en-EG',
  },
]

export const DEFAULT_CURRENCY = 'EGP'

export function getCurrency(code = DEFAULT_CURRENCY) {
  return (
    currencies.find((currency) => currency.code === code) ??
    currencies.find((currency) => currency.code === DEFAULT_CURRENCY)
  )
}

export function isCurrency(code) {
  return currencies.some((currency) => currency.code === code)
}

// Prices are already stored in EGP. Kept as a named helper so older callers
// continue to work if the catalogue ever needs a conversion layer.
export function convertFromUsd(amount, code = DEFAULT_CURRENCY) {
  return Math.round(amount * getCurrency(code).rate)
}

export function formatMoney(amount, code = DEFAULT_CURRENCY) {
  const currency = getCurrency(code)
  try {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: 0,
    }).format(convertFromUsd(amount, currency.code))
  } catch {
    return `${currency.short} ${convertFromUsd(amount, currency.code)}`
  }
}
