import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { buildWhatsAppLink, formatPrice } from '../data/site'
import { useSaved } from '../hooks/useSaved'
import { ArrowUpRight, Close, Sparkle, Trash, WhatsApp } from './Icons'

export default function SavedDrawer() {
  const { savedProducts, count, isOpen, closeDrawer, removeSaved } = useSaved()

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') closeDrawer()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeDrawer])

  const message = savedProducts.length
    ? `Hello Bariq, I would like to inquire about these saved pieces:\n\n${savedProducts
        .map((product) => `• ${product.name} — ${formatPrice(product.price)}`)
        .join('\n')}\n\nCould you share availability and shipping details?`
    : 'Hello Bariq, I would like help choosing a piece.'

  return (
    <div
      className={`saved-overlay ${isOpen ? 'is-open' : ''}`}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <button
        type="button"
        className="overlay-scrim"
        onClick={closeDrawer}
        aria-label="Close saved pieces"
        tabIndex={-1}
      />
      <aside
        className="saved-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Saved pieces"
      >
        <div className="saved-drawer__head">
          <div>
            <span className="eyebrow">Your selection</span>
            <h2>
              Saved pieces <span>({count})</span>
            </h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={closeDrawer}
            aria-label="Close saved pieces"
          >
            <Close size={22} />
          </button>
        </div>

        {count ? (
          <>
            <div className="saved-drawer__body">
              {savedProducts.map((product) => (
                <div className="saved-item" key={product.slug}>
                  <Link
                    to={`/piece/${product.slug}`}
                    className="saved-item__media"
                    onClick={closeDrawer}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img src={product.image} alt="" />
                  </Link>
                  <div className="saved-item__text">
                    <span className="saved-item__category">{product.categoryLabel}</span>
                    <Link to={`/piece/${product.slug}`} onClick={closeDrawer}>
                      <h3>{product.name}</h3>
                    </Link>
                    <span className="saved-item__price">{formatPrice(product.price)}</span>
                  </div>
                  <button
                    type="button"
                    className="saved-item__remove"
                    onClick={() => removeSaved(product.slug)}
                    aria-label={`Remove ${product.name} from saved`}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="saved-drawer__foot">
              <a
                className="btn btn--dark btn--full"
                href={buildWhatsAppLink(message)}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsApp size={17} />
                Inquire about saved pieces
              </a>
              <p>We will confirm availability, shipping and payment personally.</p>
              <Link to="/contact" className="link-underline" onClick={closeDrawer}>
                Or write to the concierge
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </>
        ) : (
          <div className="saved-empty">
            <Sparkle size={26} />
            <h3>Nothing saved yet.</h3>
            <p>
              Save pieces as you browse and they will wait for you here — a quiet
              shortlist for when you are ready.
            </p>
            <Link to="/collections" className="btn btn--dark" onClick={closeDrawer}>
              Explore the collection
            </Link>
          </div>
        )}
      </aside>
    </div>
  )
}
