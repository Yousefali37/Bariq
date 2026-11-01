import { Link } from 'react-router-dom'
import { useCurrency } from '../hooks/useCurrency'
import { useSaved } from '../hooks/useSaved'
import { ArrowUpRight, Heart } from './Icons'
import Picture from './Picture'

export default function ProductCard({ product, priority = false }) {
  const { isSaved, toggleSaved } = useSaved()
  const { format } = useCurrency()
  const saved = isSaved(product.slug)
  const soldOut = product.availability === 'sold-out'

  return (
    <article className={`product-card ${soldOut ? 'is-sold-out' : ''}`.trim()}>
      <div className="product-card__media">
        <Link
          to={`/piece/${product.slug}`}
          className="product-card__link"
          aria-label={`View ${product.name}`}
          data-cursor="view"
        >
          <Picture
            name={product.image}
            alt={product.name}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
          />
          <span className="product-card__view">
            View piece
            <ArrowUpRight size={14} />
          </span>
        </Link>

        {soldOut ? (
          <span className="product-card__badge product-card__badge--sold">
            Sold out
          </span>
        ) : product.badge ? (
          <span className="product-card__badge">{product.badge}</span>
        ) : null}

        <button
          type="button"
          className={`save-button ${saved ? 'is-saved' : ''}`}
          onClick={() => toggleSaved(product.slug)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
        >
          <Heart size={16} filled={saved} />
        </button>
      </div>

      <div className="product-card__info">
        <div className="product-card__text">
          <span className="product-card__category">{product.categoryLabel}</span>
          <h3 className="product-card__name">
            <Link to={`/piece/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>
        <span className="product-card__price">{format(product.price)}</span>
      </div>
    </article>
  )
}
