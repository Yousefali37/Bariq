import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { ArrowUpRight, WhatsApp } from '../components/Icons'
import { products, sortOptions } from '../data/products'
import {
  buildWhatsAppLink,
  productCategories,
  site,
} from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Shop() {
  usePageMeta(
    'Collections',
    'Explore the Bariq collection — hand-finished jewelry, hair accessories, bags, eyewear and silk, made in small batches.',
  )

  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('curated')

  const categoryParam = searchParams.get('category')
  const activeCategory = productCategories.some(
    (category) => category.id === categoryParam,
  )
    ? categoryParam
    : 'all'

  const setCategory = (id) => {
    if (id === 'all') {
      setSearchParams({}, { replace: true })
    } else {
      setSearchParams({ category: id }, { replace: true })
    }
  }

  const visibleProducts = useMemo(() => {
    const filtered =
      activeCategory === 'all'
        ? [...products]
        : products.filter((product) => product.category === activeCategory)

    switch (sort) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price)
      case 'newest':
        return filtered.sort((a, b) => Number(b.newest) - Number(a.newest))
      default:
        return filtered
    }
  }, [activeCategory, sort])

  const activeLabel =
    productCategories.find((category) => category.id === activeCategory)
      ?.label || 'All pieces'

  return (
    <>
      <PageHeader
        eyebrow="The collection"
        title={
          <>
            Small objects,
            <br />
            <em>considered.</em>
          </>
        }
        intro="Ten pieces, five disciplines, one point of view. Each is hand-finished in the studio and available by private inquiry — take your time."
      />

      <section className="shop">
        <div className="container">
          <div className="shop-toolbar">
            <div className="shop-filters" role="group" aria-label="Filter by category">
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`shop-filter ${
                    activeCategory === category.id ? 'is-active' : ''
                  }`}
                  onClick={() => setCategory(category.id)}
                  aria-pressed={activeCategory === category.id}
                >
                  {category.label}
                  <span className="shop-filter__count">
                    {category.id === 'all'
                      ? products.length
                      : products.filter(
                          (product) => product.category === category.id,
                        ).length}
                  </span>
                </button>
              ))}
            </div>

            <div className="shop-sort">
              <label htmlFor="sort">Sort</label>
              <div className="shop-sort__select">
                <select
                  id="sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option value={option.id} key={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="shop-results">
            <span className="eyebrow">
              {activeLabel} — {visibleProducts.length}{' '}
              {visibleProducts.length === 1 ? 'piece' : 'pieces'}
            </span>
          </div>

          <div className="product-grid product-grid--shop">
            {visibleProducts.map((product, index) => (
              <Reveal
                className="product-grid__item"
                delay={(index % 4) * 60}
                key={product.slug}
              >
                <ProductCard product={product} priority={index < 4} />
              </Reveal>
            ))}
          </div>

          <Reveal className="shop-foot" variant="fade">
            <div className="shop-foot__text">
              <span className="eyebrow">Not sure where to begin?</span>
              <h2>
                We are happy to <em>help you choose.</em>
              </h2>
              <p>
                Send us a note with what you have in mind — a gift, an occasion, a
                piece to wear every day. The concierge will answer personally.
              </p>
            </div>
            <div className="shop-foot__actions">
              <a
                className="btn btn--dark"
                href={buildWhatsAppLink(
                  `Hello Bariq, I am looking at the ${activeLabel.toLowerCase()} and would like some help choosing.`,
                )}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsApp size={17} />
                Ask the concierge
              </a>
              <Link to="/contact" className="link-underline">
                Or send an email
                <ArrowUpRight size={14} />
              </Link>
              <span className="shop-foot__location">{site.location}</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
