import { Link } from 'react-router-dom'
import { formatPrice } from '../data/site'
import { useSaved } from '../hooks/useSaved'
import { ArrowUpRight, Heart } from './Icons'

export default function ProductCard({ product, priority = false }) {
  const { isSaved, toggleSaved } = useSaved()
  const saved = isSaved(product.slug)

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link
          to={`/piece/${product.slug}`}
          className="product-card__link"
          aria-label={`View ${product.name}`}
          data-cursor="view"
        >
          <img
            src={product.image}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
          <span className="product-card__view">
            View piece
            <ArrowUpRight size={14} />
          </span>
        </Link>

        {product.badge ? (
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
        <span className="product-card__price">{formatPrice(product.price)}</span>
      </div>
    </article>
  )
}
