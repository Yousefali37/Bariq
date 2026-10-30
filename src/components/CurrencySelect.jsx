import { useCurrency } from '../hooks/useCurrency'
import { track } from '../services/analytics'

export default function CurrencySelect({ className = '', id = 'currency' }) {
  const { code, currencies, setCurrency } = useCurrency()

  return (
    <label className={`currency-select ${className}`.trim()} htmlFor={id}>
      <span className="visually-hidden">Display currency</span>
      <select
        id={id}
        value={code}
        onChange={(event) => {
          setCurrency(event.target.value)
          track('currency_change', { currency: event.target.value })
        }}
      >
        {currencies.map((currency) => (
          <option value={currency.code} key={currency.code}>
            {currency.label}
          </option>
        ))}
      </select>
    </label>
  )
}
