import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import OrderButton from '../components/OrderButton'
import PageHeader from '../components/PageHeader'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { ArrowUpRight, Close, Filter } from '../components/Icons'
import { sortOptions } from '../data/products'
import { productCategories, site } from '../data/site'
import {
  availabilityOptions,
  filterProducts,
  getFacets,
  paginate,
  priceBands,
  sortProducts,
  uniqueList,
} from '../services/catalogue'
import { breadcrumbJsonLd, collectionJsonLd, graph } from '../services/seo'
import { useCatalog } from '../hooks/useCatalog'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Shop() {
  const { products } = useCatalog()
  const [searchParams, setSearchParams] = useSearchParams()
  const [panelOpen, setPanelOpen] = useState(false)
  const resultsRef = useRef(null)

  const facets = useMemo(() => getFacets(products), [products])

  const categoryParam = searchParams.get('category')
  const activeCategory = productCategories.some(
    (category) => category.id === categoryParam,
  )
    ? categoryParam
    : 'all'

  const materialParam = searchParams.get('material')
  const colorParam = searchParams.get('color')
  const availabilityParam = searchParams.get('availability')
  const priceParam = searchParams.get('price')

  const lists = {
    material: uniqueList(materialParam),
    color: uniqueList(colorParam),
    availability: uniqueList(availabilityParam),
    price: uniqueList(priceParam),
  }

  const sortParam = searchParams.get('sort')
  const sort = sortOptions.some((option) => option.id === sortParam)
    ? sortParam
    : 'curated'
  const page = Number(searchParams.get('page')) || 1

  const filtered = useMemo(
    () =>
      sortProducts(
        filterProducts(
          {
            category: activeCategory,
            materials: lists.material,
            colors: lists.color,
            availability: lists.availability,
            price: lists.price,
          },
          products,
        ),
        sort,
      ),
    [
      products,
      activeCategory,
      sort,
      lists.material,
      lists.color,
      lists.availability,
      lists.price,
    ],
  )

  const paged = paginate(filtered, page)

  const updateParams = (mutate) => {
    const next = new URLSearchParams(searchParams)
    mutate(next)
    next.delete('page')
    setSearchParams(next, { replace: true })
  }

  const setCategory = (id) => {
    updateParams((next) => {
      if (id === 'all') next.delete('category')
      else next.set('category', id)
    })
  }

  const toggleList = (key, value) => {
    updateParams((next) => {
      const current = uniqueList(next.get(key))
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
      if (updated.length) next.set(key, updated.join(','))
      else next.delete(key)
    })
  }

  const setSort = (value) => {
    updateParams((next) => {
      if (value === 'curated') next.delete('sort')
      else next.set('sort', value)
    })
  }

  const clearAll = () => {
    setSearchParams(new URLSearchParams(), { replace: true })
    setPanelOpen(false)
  }

  const goToPage = (nextPage) => {
    const next = new URLSearchParams(searchParams)
    if (nextPage <= 1) next.delete('page')
    else next.set('page', String(nextPage))
    setSearchParams(next)
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const activeChips = [
    ...(activeCategory !== 'all'
      ? [
          {
            key: 'category',
            value: activeCategory,
            label:
              productCategories.find((category) => category.id === activeCategory)
                ?.label || activeCategory,
          },
        ]
      : []),
    ...lists.material.map((value) => ({
      key: 'material',
      value,
      label: value,
    })),
    ...lists.color.map((value) => ({
      key: 'color',
      value,
      label: value,
    })),
    ...lists.availability.map((value) => ({
      key: 'availability',
      value,
      label:
        availabilityOptions.find((option) => option.id === value)?.label || value,
    })),
    ...lists.price.map((value) => ({
      key: 'price',
      value,
      label: priceBands.find((band) => band.id === value)?.label || value,
    })),
  ]

  const activeLabel =
    productCategories.find((category) => category.id === activeCategory)?.label ||
    'All pieces'

  usePageMeta(
    activeCategory === 'all' ? 'Shop' : `${activeLabel} — Shop`,
    'Shop waterproof stainless-steel jewelry from Bariq — gold and silver necklaces, rings, earrings and bracelets, priced in EGP and delivered across Egypt.',
    {
      url: `/shop${activeCategory === 'all' ? '' : `?category=${activeCategory}`}`,
      jsonLd: graph(
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Shop', path: '/shop' },
          ...(activeCategory === 'all'
            ? []
            : [{ name: activeLabel, path: `/shop?category=${activeCategory}` }]),
        ]),
        collectionJsonLd(
          activeCategory === 'all' ? 'The collection' : activeLabel,
          'Waterproof stainless-steel jewelry in gold and silver, priced in EGP and delivered across Egypt.',
          filtered,
          `/shop${activeCategory === 'all' ? '' : `?category=${activeCategory}`}`,
        ),
      ),
    },
  )

  const filterGroups = [
    {
      key: 'material',
      label: 'Material',
      options: facets.materials.map((item) => ({
        id: item.id,
        label: item.id,
        count: item.count,
      })),
    },
    {
      key: 'color',
      label: 'Finish',
      options: facets.colors.map((item) => ({
        id: item.id,
        label: item.id,
        count: item.count,
      })),
    },
    {
      key: 'availability',
      label: 'Availability',
      options: facets.availability,
    },
    {
      key: 'price',
      label: 'Price',
      options: facets.price,
    },
  ]

  return (
    <>
      <PageHeader
        eyebrow="The collection"
        title={
          <>
            Made to be worn,
            <br />
            <em>not protected.</em>
          </>
        }
        intro="Necklaces, rings, earrings and bracelets in waterproof stainless steel — warm gold and quiet silver, priced in Egyptian pounds. Sold-out pieces stay visible so you can still save them. Every order is placed by Instagram DM."
      />

      <section className="shop">
        <div className="container">
          <div className="shop-toolbar">
            <div
              className="shop-filters"
              role="group"
              aria-label="Filter by category"
            >
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

            <div className="shop-toolbar__end">
              <button
                type="button"
                className={`shop-filter-toggle ${panelOpen ? 'is-open' : ''}`}
                onClick={() => setPanelOpen((value) => !value)}
                aria-expanded={panelOpen}
                aria-controls="shop-filter-panel"
              >
                <Filter size={15} />
                Filters
                {activeChips.length ? (
                  <span className="shop-filter-toggle__count">
                    {activeChips.length}
                  </span>
                ) : null}
              </button>

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
          </div>

          <div
            id="shop-filter-panel"
            className={`shop-filter-panel ${panelOpen ? 'is-open' : ''}`}
            hidden={!panelOpen}
          >
            {filterGroups.map((group) => (
              <fieldset className="filter-group" key={group.key}>
                <legend>{group.label}</legend>
                <div className="filter-group__options">
                  {group.options.map((option) => {
                    const checked = lists[group.key].includes(option.id)
                    return (
                      <label
                        className={`filter-option ${checked ? 'is-active' : ''}`}
                        key={option.id}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleList(group.key, option.id)}
                        />
                        <span className="filter-option__box" aria-hidden="true">
                          {checked ? '✓' : ''}
                        </span>
                        <span>{option.label}</span>
                        {typeof option.count === 'number' ? (
                          <span className="filter-option__count">
                            {option.count}
                          </span>
                        ) : null}
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            ))}

            <div className="shop-filter-panel__foot">
              <button type="button" className="link-underline" onClick={clearAll}>
                Clear all
              </button>
              <button
                type="button"
                className="btn btn--dark btn--small"
                onClick={() => setPanelOpen(false)}
              >
                Show {filtered.length}{' '}
                {filtered.length === 1 ? 'piece' : 'pieces'}
              </button>
            </div>
          </div>

          {activeChips.length ? (
            <div className="shop-chips" aria-label="Active filters">
              {activeChips.map((chip) => (
                <button
                  type="button"
                  className="shop-chip"
                  key={`${chip.key}-${chip.value}`}
                  onClick={() => {
                    if (chip.key === 'category') setCategory('all')
                    else toggleList(chip.key, chip.value)
                  }}
                  aria-label={`Remove filter ${chip.label}`}
                >
                  {chip.label}
                  <Close size={12} />
                </button>
              ))}
              <button
                type="button"
                className="shop-chips__clear"
                onClick={clearAll}
              >
                Clear all
              </button>
            </div>
          ) : null}

          <div className="shop-results" ref={resultsRef}>
            <span className="eyebrow">
              {activeLabel} — {filtered.length}{' '}
              {filtered.length === 1 ? 'piece' : 'pieces'}
              {paged.pageCount > 1
                ? ` · page ${paged.page} of ${paged.pageCount}`
                : ''}
            </span>
            {paged.total ? (
              <span className="shop-results__range">
                Showing {paged.from}–{paged.to} of {paged.total}
              </span>
            ) : null}
          </div>

          {paged.items.length ? (
            <div className="product-grid product-grid--shop">
              {paged.items.map((product, index) => (
                <Reveal
                  className="product-grid__item"
                  delay={(index % 4) * 60}
                  key={product.slug}
                >
                  <ProductCard product={product} priority={index < 4} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="shop-empty">
              <span className="eyebrow">Nothing quite matches</span>
              <h2>
                Try a lighter <em>edit.</em>
              </h2>
              <p>
                No pieces match these filters. Remove one, or message us on
                Instagram and we will help you find something.
              </p>
              <button type="button" className="btn btn--dark" onClick={clearAll}>
                Clear filters
              </button>
            </div>
          )}

          <Pagination
            page={paged.page}
            pageCount={paged.pageCount}
            onPage={goToPage}
            label="Collection pages"
          />

          <Reveal className="shop-foot" variant="fade">
            <div className="shop-foot__text">
              <span className="eyebrow">Not sure where to begin?</span>
              <h2>
                We are happy to <em>help you choose.</em>
              </h2>
              <p>
                Send us the piece you are considering and your city. We will
                confirm availability, the delivery fee and cash on delivery
                personally.
              </p>
            </div>
            <div className="shop-foot__actions">
              <OrderButton
                className="btn btn--dark"
                message={`Hello ${site.name}, I am looking at the ${activeLabel.toLowerCase()} and would like some help choosing.`}
                label="Message us on Instagram"
              />
              <a
                className="link-underline"
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
              >
                {site.instagramHandle}
                <ArrowUpRight size={14} />
              </a>
              <span className="shop-foot__location">{site.location}</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
