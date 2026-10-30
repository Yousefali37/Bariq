import { useState } from 'react'
import { Minus, Plus } from './Icons'

export default function Accordion({ items, defaultOpen = -1, className = '' }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  return (
    <div className={`accordion ${className}`.trim()}>
      {items.map((item, index) => {
        const open = openIndex === index
        return (
          <div className={`accordion__item ${open ? 'is-open' : ''}`} key={item.title}>
            <h3 className="accordion__heading">
              <button
                type="button"
                className="accordion__trigger"
                onClick={() => setOpenIndex(open ? -1 : index)}
                aria-expanded={open}
                aria-controls={`accordion-panel-${index}`}
                id={`accordion-trigger-${index}`}
              >
                <span>{item.title}</span>
                <span className="accordion__icon" aria-hidden="true">
                  {open ? <Minus size={15} /> : <Plus size={15} />}
                </span>
              </button>
            </h3>
            <div
              className="accordion__panel"
              id={`accordion-panel-${index}`}
              role="region"
              aria-labelledby={`accordion-trigger-${index}`}
            >
              <div className="accordion__inner">
                {Array.isArray(item.content) ? (
                  <ul className="accordion__list">
                    {item.content.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.content}</p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
