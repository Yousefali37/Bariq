import ProductCard from './ProductCard'
import Reveal from './Reveal'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'

export default function RecentlyViewed({ excludeSlug, className = '' }) {
  const { recentProducts, clearRecent } = useRecentlyViewed()
  const items = recentProducts
    .filter((product) => product.slug !== excludeSlug)
    .slice(0, 4)

  if (!items.length) return null

  return (
    <section
      className={`section recent ${className}`.trim()}
      aria-labelledby="recently-viewed-title"
    >
      <div className="container">
        <div className="recent__head">
          <div>
            <span className="eyebrow">Continue looking</span>
            <h2 id="recently-viewed-title">Recently viewed.</h2>
          </div>
          <button type="button" className="link-underline" onClick={clearRecent}>
            Clear history
          </button>
        </div>

        <div className="product-grid">
          {items.map((product, index) => (
            <Reveal
              className="product-grid__item"
              delay={index * 60}
              key={product.slug}
            >
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
