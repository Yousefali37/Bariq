// Indicative display currencies. Product prices are authored in USD; these
// static rates exist so international visitors can read a familiar figure.
// Replace with a live rate feed (or a build-time snapshot) before launch.
export const currencies = [
  {
    code: 'USD',
    label: 'USD · US Dollar',
    short: 'USD',
    rate: 1,
    locale: 'en-US',
  },
  {
    code: 'GBP',
    label: 'GBP · Pound Sterling',
    short: 'GBP',
    rate: 0.79,
    locale: 'en-GB',
  },
  {
    code: 'AED',
    label: 'AED · UAE Dirham',
    short: 'AED',
    rate: 3.6725,
    locale: 'en-AE',
  },
]

export const DEFAULT_CURRENCY = 'USD'

export function getCurrency(code = DEFAULT_CURRENCY) {
  return (
    currencies.find((currency) => currency.code === code) ??
    currencies.find((currency) => currency.code === DEFAULT_CURRENCY)
  )
}

export function isCurrency(code) {
  return currencies.some((currency) => currency.code === code)
}

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
