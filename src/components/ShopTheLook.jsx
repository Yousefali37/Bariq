import { Link } from 'react-router-dom'
import { getProductsBySlugs } from '../services/catalogue'
import { useCurrency } from '../hooks/useCurrency'
import { ArrowUpRight } from './Icons'

export default function ShopTheLook({ edit, showList = true }) {
  const { format } = useCurrency()
  if (!edit) return null
  const pieces = getProductsBySlugs(edit.products)
  const lookup = new Map(pieces.map((product) => [product.slug, product]))

  return (
    <div className="look">
      <figure className="look__media">
        <img src={edit.image} alt={edit.imageAlt} loading="lazy" />
        {edit.hotspots?.map((hotspot) => {
          const product = lookup.get(hotspot.slug)
          if (!product) return null
          return (
            <Link
              key={hotspot.slug}
              to={`/piece/${product.slug}`}
              className="look__spot"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              aria-label={`Shop ${product.name} — ${format(product.price)}`}
            >
              <span className="look__dot" aria-hidden="true">
                <span />
              </span>
              <span className="look__tip">
                <span className="look__tip-label">{hotspot.label}</span>
                <strong>{product.name}</strong>
                <em>{format(product.price)}</em>
              </span>
            </Link>
          )
        })}
        <figcaption className="look__caption">
          <span>Shop the look</span>
          <span>{edit.kicker}</span>
        </figcaption>
      </figure>

      {showList ? (
        <ul className="look__list" aria-label="Pieces in this edit">
          {pieces.map((product) => (
            <li key={product.slug}>
              <Link to={`/piece/${product.slug}`}>
                <img src={product.image} alt="" loading="lazy" />
                <span className="look__list-text">
                  <span>{product.categoryLabel}</span>
                  <strong>{product.name}</strong>
                </span>
                <span className="look__list-price">{format(product.price)}</span>
                <ArrowUpRight size={14} />
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
