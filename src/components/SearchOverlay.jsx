import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { productCategories } from '../data/site'
import { resolveImage } from '../data/images'
import { useCatalog } from '../hooks/useCatalog'
import { useCurrency } from '../hooks/useCurrency'
import { ArrowUpRight, Close, SearchIcon, Sparkle } from './Icons'

const quickSearches = ['Gold', 'Silver', 'Pearl', 'Hoops', 'Ring']

export default function SearchOverlay({ open, onClose }) {
  const { products } = useCatalog()
  const { format } = useCurrency()
  const [query, setQuery] = useState('')
  const [wasOpen, setWasOpen] = useState(open)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Clear the field each time the overlay opens. Adjusting state during render
  // is the recommended alternative to a state-syncing effect.
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) setQuery('')
  }

  useEffect(() => {
    if (!open) return undefined
    const timeout = window.setTimeout(() => inputRef.current?.focus(), 120)
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []
    return products.filter((product) =>
      [
        product.name,
        product.categoryLabel,
        product.short,
        product.description,
        product.color,
        product.materials?.join(' '),
        product.materialFamilies?.join(' '),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(term),
    )
  }, [query, products])

  const goTo = (slug) => {
    onClose()
    navigate(`/piece/${slug}`)
  }

  return (
    <div
      className={`search-overlay ${open ? 'is-open' : ''}`}
      aria-hidden={!open}
      inert={!open}
    >
      <button
        type="button"
        className="overlay-scrim"
        onClick={onClose}
        aria-label="Close search"
        tabIndex={-1}
      />
      <div
        className="search-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Search the collection"
      >
        <div className="search-panel__top container">
          <span className="eyebrow">Search the collection</span>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close search">
            <Close size={22} />
          </button>
        </div>

        <div className="search-panel__body container">
          <form className="search-form" onSubmit={(event) => event.preventDefault()}>
            <SearchIcon size={26} />
            <label className="visually-hidden" htmlFor="site-search">
              Search pieces
            </label>
            <input
              ref={inputRef}
              id="site-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “gold”, “pearl” or “hoops”"
              autoComplete="off"
            />
            {query ? (
              <button type="button" className="search-form__clear" onClick={() => setQuery('')}>
                Clear
              </button>
            ) : null}
          </form>

          {query ? (
            <div className="search-results">
              <div className="search-results__head">
                <span className="eyebrow">
                  {results.length} {results.length === 1 ? 'piece' : 'pieces'}
                </span>
              </div>
              {results.length ? (
                <ul>
                  {results.map((product) => (
                    <li key={product.slug}>
                      <button type="button" onClick={() => goTo(product.slug)}>
                        <img src={resolveImage(product.image)} alt="" />
                        <span className="search-results__text">
                          <span className="search-results__category">
                            {product.categoryLabel}
                          </span>
                          <span className="search-results__name">{product.name}</span>
                        </span>
                        <span className="search-results__price">
                          {product.availability === 'sold-out'
                            ? 'Sold out'
                            : format(product.price)}
                        </span>
                        <ArrowUpRight size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="search-empty">
                  <Sparkle size={22} />
                  <p>No pieces found for “{query}”.</p>
                  <span>Try a finish, a category or a piece name.</span>
                </div>
              )}
            </div>
          ) : (
            <div className="search-default">
              <div className="search-default__block">
                <span className="eyebrow">Popular searches</span>
                <div className="search-chips">
                  {quickSearches.map((term) => (
                    <button key={term} type="button" onClick={() => setQuery(term)}>
                      {term}
                    </button>
                  ))}
                </div>
              </div>
              <div className="search-default__block">
                <span className="eyebrow">Browse</span>
                <div className="search-categories">
                  {productCategories
                    .filter((category) => category.id !== 'all')
                    .map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => {
                          onClose()
                          navigate(`/shop?category=${category.id}`)
                        }}
                      >
                        {category.label}
                        <ArrowUpRight size={14} />
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
