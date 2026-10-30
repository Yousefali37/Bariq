import { useCurrency } from '../hooks/useCurrency'

function normaliseValues(values) {
  return values.map((value) =>
    typeof value === 'string' ? { id: value, label: value } : value,
  )
}

export default function ProductOptions({ options = [], value, onChange, namePrefix }) {
  const { format } = useCurrency()
  if (!options.length) return null

  return (
    <div className="product-options">
      {options.map((option) => {
        const values = normaliseValues(option.values)
        const selected = value[option.id] ?? values[0]?.id
        const hasSwatch = values.some((item) => item.swatch)

        return (
          <fieldset className="option-group" key={option.id}>
            <legend className="option-group__legend">{option.label}</legend>
            <div
              className={`option-values ${
                hasSwatch ? 'option-values--swatch' : 'option-values--pill'
              }`}
            >
              {values.map((item) => {
                const active = selected === item.id
                return (
                  <label
                    className={`option ${active ? 'is-active' : ''}`}
                    key={item.id}
                  >
                    <input
                      type="radio"
                      className="visually-hidden"
                      name={`${namePrefix}-${option.id}`}
                      value={item.id}
                      checked={active}
                      onChange={() => onChange(option.id, item.id)}
                    />
                    {item.swatch ? (
                      <span
                        className="option__swatch"
                        style={{ background: item.swatch }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="option__label">{item.label}</span>
                    {item.priceDelta ? (
                      <span className="option__delta">
                        {item.priceDelta > 0 ? '+' : ''}
                        {format(item.priceDelta)}
                      </span>
                    ) : null}
                  </label>
                )
              })}
            </div>
          </fieldset>
        )
      })}
    </div>
  )
}
