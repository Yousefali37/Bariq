import { useEffect, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import Accordion from '../components/Accordion'
import Lightbox from '../components/Lightbox'
import OrderButton from '../components/OrderButton'
import Picture from '../components/Picture'
import ProductCard from '../components/ProductCard'
import ProductOptions from '../components/ProductOptions'
import RecentlyViewed from '../components/RecentlyViewed'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import ShareButton from '../components/ShareButton'
import SizeGuide from '../components/SizeGuide'
import {
  ArrowUpRight,
  Check,
  Clock,
  Heart,
  Ruler,
  ZoomIn,
} from '../components/Icons'
import { getRelated } from '../data/products'
import { resolveImage } from '../data/images'
import { site } from '../data/site'
import { useCatalog } from '../hooks/useCatalog'
import { useCurrency } from '../hooks/useCurrency'
import { useSaved } from '../hooks/useSaved'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import { usePageMeta } from '../hooks/usePageMeta'
import {
  breadcrumbJsonLd,
  graph,
  organizationJsonLd,
  productJsonLd,
} from '../services/seo'

function normaliseValues(values = []) {
  return values.map((value) =>
    typeof value === 'string' ? { id: value, label: value } : value,
  )
}

function initialSelection(product) {
  if (!product?.options?.length) return {}
  return Object.fromEntries(
    product.options.map((option) => {
      const values = normaliseValues(option.values)
      return [option.id, values[0]?.id]
    }),
  )
}

function optionSummary(product, selection) {
  if (!product?.options?.length) return []
  return product.options
    .map((option) => {
      const chosen = normaliseValues(option.values).find(
        (value) => value.id === selection[option.id],
      )
      return chosen ? `${option.label}: ${chosen.label}` : null
    })
    .filter(Boolean)
}

export default function Product() {
  const { slug } = useParams()
  const { products, getProduct } = useCatalog()
  const { format } = useCurrency()
  const { isSaved, toggleSaved } = useSaved()
  const { recordView } = useRecentlyViewed()

  const product = getProduct(slug)
  const [selectionState, setSelectionState] = useState({
    slug: null,
    values: {},
  })
  const [activeImage, setActiveImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [sizeGuide, setSizeGuide] = useState(false)

  const selection =
    selectionState.slug === product?.slug
      ? selectionState.values
      : initialSelection(product)

  const soldOut = product?.availability === 'sold-out'

  useEffect(() => {
    if (!product?.slug) return undefined
    const timer = window.setTimeout(() => recordView(product.slug), 0)
    return () => window.clearTimeout(timer)
  }, [product?.slug, recordView])

  const closeLightbox = () => setLightboxOpen(false)
  const changeImage = (index) => setActiveImage(index)
  const closeSizeGuide = () => setSizeGuide(false)

  const images = product
    ? product.gallery?.length
      ? product.gallery
      : [product.image]
    : []
  const imageUrls = images.map((image) => resolveImage(image))

  const breadcrumbs = product
    ? [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        {
          name: product.categoryLabel || product.category,
          path: `/shop?category=${product.category}`,
        },
        { name: product.name, path: `/piece/${product.slug}` },
      ]
    : []

  usePageMeta(
    product ? product.name : 'Piece not found',
    product
      ? `${product.short || product.description?.slice(0, 120)} ${format(
          product.price,
        )} — waterproof stainless steel, delivered across Egypt.`
      : 'This piece could not be found.',
    product
      ? {
          image: resolveImage(product.image),
          imageAlt: product.name,
          type: 'product',
          url: `/piece/${product.slug}`,
          jsonLd: graph(
            productJsonLd({ ...product, image: resolveImage(product.image) }),
            breadcrumbJsonLd(breadcrumbs),
            organizationJsonLd(),
          ),
        }
      : { noindex: true },
  )

  if (!product) {
    return (
      <section className="missing section">
        <div className="container missing__inner">
          <span className="eyebrow">Not found</span>
          <h1>This piece has slipped away.</h1>
          <p>
            It may have sold, or the link may be old. The collection is just a
            moment away.
          </p>
          <Link to="/shop" className="btn btn--dark">
            Return to the shop
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    )
  }

  const saved = isSaved(product.slug)
  const summary = optionSummary(product, selection)
  const optionDelta = (product.options || []).reduce((total, option) => {
    const chosen = normaliseValues(option.values).find(
      (value) => value.id === selection[option.id],
    )
    return total + (chosen?.priceDelta || 0)
  }, 0)
  const total = product.price + optionDelta

  const message = soldOut
    ? `Hello ${site.name}, I would like to know when the ${product.name} (${format(
        total,
      )}) is back in stock.${summary.length ? `\n\n${summary.join('\n')}` : ''}\n\nMy city is: `
    : `Hello ${site.name}, I would like to order the ${product.name} (${format(
        total,
      )}).${summary.length ? `\n\n${summary.join('\n')}` : ''}\n\nMy city is: \nPlease confirm availability, the delivery fee and cash on delivery.`

  const relatedProducts = getRelated(product, 3, products)

  const accordionItems = [
    {
      title: 'Details',
      content: product.details || [],
    },
    {
      title: 'Delivery & payment',
      content: [
        'Delivery to all Egyptian governorates. The shipping fee depends on your city and is confirmed on Instagram before dispatch.',
        'Cash on delivery. You pay the courier when your order arrives.',
        'In-stock pieces are usually dispatched within 1–2 business days. Made-to-order pieces take 2–3 weeks.',
      ],
    },
    {
      title: 'Returns',
      content:
        'If something is not right, message us on Instagram before returning anything. Unworn pieces in their original packaging can usually be returned within 14 days; made-to-order and personalised pieces are final sale.',
    },
  ]

  return (
    <>
      <section className="product-page">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/shop">Shop</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/shop?category=${product.category}`}>
              {product.categoryLabel || product.category}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{product.name}</span>
          </nav>

          <div className="product-layout">
            <div className="product-gallery">
              <div className="product-gallery__main">
                <Picture
                  key={`${product.slug}-${activeImage}`}
                  name={images[activeImage]}
                  alt={`${product.name} — view ${activeImage + 1}`}
                  sizes="(max-width: 900px) 100vw, 55vw"
                  priority
                  onClick={() => setLightboxOpen(true)}
                />
                {soldOut ? (
                  <span className="product-gallery__badge product-gallery__badge--sold">
                    Sold out
                  </span>
                ) : product.badge ? (
                  <span className="product-gallery__badge">{product.badge}</span>
                ) : null}
                <span className="product-gallery__index">
                  {String(activeImage + 1).padStart(2, '0')} /{' '}
                  {String(images.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  className="product-gallery__zoom"
                  onClick={() => setLightboxOpen(true)}
                  aria-label={`Open larger image of ${product.name}`}
                >
                  <ZoomIn size={17} />
                  <span>View</span>
                </button>
              </div>

              {images.length > 1 ? (
                <div className="product-gallery__thumbs">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={`${image}-${index}`}
                      className={`product-gallery__thumb ${
                        activeImage === index ? 'is-active' : ''
                      }`}
                      onClick={() => setActiveImage(index)}
                      aria-label={`Show view ${index + 1} of ${product.name}`}
                      aria-current={activeImage === index}
                    >
                      <img src={resolveImage(image)} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="product-info">
              <div className="product-info__sticky">
                <div className="product-info__top">
                  <div>
                    <span className="product-info__category">
                      {product.categoryLabel || product.category}
                    </span>
                    <h1 className="product-info__name">{product.name}</h1>
                  </div>
                  <div className="product-info__tools">
                    <button
                      type="button"
                      className={`save-button save-button--inline ${
                        saved ? 'is-saved' : ''
                      }`}
                      onClick={() => toggleSaved(product.slug)}
                      aria-pressed={saved}
                      aria-label={
                        saved
                          ? `Remove ${product.name} from saved`
                          : `Save ${product.name}`
                      }
                    >
                      <Heart size={17} filled={saved} />
                    </button>
                    <ShareButton
                      compact
                      title={product.name}
                      text={product.short}
                      path={`/piece/${product.slug}`}
                      className="share-button--inline"
                    />
                  </div>
                </div>

                <p className="product-info__price">{format(total)}</p>
                {optionDelta ? (
                  <p className="product-info__price-note">
                    Base {format(product.price)}
                    {` · options ${format(optionDelta)}`}
                  </p>
                ) : null}

                <p className="product-info__short">{product.description}</p>

                <div className={`product-availability is-${product.availability}`}>
                  <span className="product-availability__dot" aria-hidden="true" />
                  <div>
                    <strong>{product.stockNote}</strong>
                    <span>
                      <Clock size={13} />
                      {product.leadTime}
                    </span>
                  </div>
                </div>

                <ProductOptions
                  options={product.options}
                  value={selection}
                  onChange={(optionId, value) =>
                    setSelectionState({
                      slug: product.slug,
                      values: { ...selection, [optionId]: value },
                    })
                  }
                  namePrefix={`piece-${product.slug}`}
                />

                {product.sizeGuide ? (
                  <button
                    type="button"
                    className="size-guide-trigger"
                    onClick={() => setSizeGuide(true)}
                  >
                    <Ruler size={15} />
                    Size guide
                    <ArrowUpRight size={13} />
                  </button>
                ) : null}

                {product.color ? (
                  <div className="product-info__color">
                    <span className="product-info__color-label">Finish</span>
                    <span className="product-info__swatch" aria-hidden="true" />
                    <span>{product.color}</span>
                  </div>
                ) : null}

                <div className="product-info__actions">
                  <OrderButton
                    className="btn btn--dark btn--full"
                    message={message}
                    label={soldOut ? 'Ask about restock' : 'Order on Instagram'}
                    copiedLabel="Copied — opening Instagram"
                  />
                </div>

                <p className="product-info__note">
                  {soldOut
                    ? 'This piece is currently sold out. Message us on Instagram and we will let you know when it returns.'
                    : 'Every order is placed by Instagram DM. We will confirm availability, the delivery fee and cash on delivery personally.'}
                </p>

                <ul className="product-assurance">
                  <li>
                    <Check size={14} />
                    Waterproof stainless steel
                  </li>
                  <li>
                    <Check size={14} />
                    Cash on delivery across Egypt
                  </li>
                </ul>

                <Accordion items={accordionItems} defaultOpen={0} />

                <div className="product-info__meta">
                  <span>Ref. {product.slug.toUpperCase()}</span>
                  <span>Prices in EGP · Delivery fee confirmed by city</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-story section">
        <div className="container product-story__grid">
          <Reveal className="product-story__label" variant="fade">
            <span className="eyebrow">The piece</span>
          </Reveal>
          <Reveal className="product-story__body" delay={70}>
            <p className="product-story__lede">{product.description}</p>
          </Reveal>
        </div>
      </section>

      <section className="section related">
        <div className="container">
          <SectionHead
            eyebrow="In good company"
            title={
              <>
                You may also <em>love.</em>
              </>
            }
            link={{ to: '/shop' }}
            linkLabel="All pieces"
          />

          <div className="product-grid">
            {relatedProducts.map((item, index) => (
              <Reveal
                className="product-grid__item"
                delay={index * 70}
                key={item.slug}
              >
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RecentlyViewed excludeSlug={product.slug} />

      <div className="product-mobile-bar">
        <div className="product-mobile-bar__text">
          <span>{product.name}</span>
          <strong>{format(total)}</strong>
        </div>
        <OrderButton
          className="btn btn--dark btn--small"
          message={message}
          label={soldOut ? 'Restock' : 'Order'}
          copiedLabel="Opening Instagram"
          iconSize={14}
        />
      </div>

      {lightboxOpen ? (
        <Lightbox
          images={imageUrls}
          index={activeImage}
          alt={product.name}
          onClose={closeLightbox}
          onIndexChange={changeImage}
        />
      ) : null}

      {sizeGuide ? (
        <SizeGuide kind={product.sizeGuide} onClose={closeSizeGuide} />
      ) : null}
    </>
  )
}
