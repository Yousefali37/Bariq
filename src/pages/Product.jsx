import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Accordion from '../components/Accordion'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  Mail,
  WhatsApp,
} from '../components/Icons'
import { formatPrice, buildWhatsAppLink, site } from '../data/site'
import { getProduct, getRelated } from '../data/products'
import { useSaved } from '../hooks/useSaved'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Product() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const { isSaved, toggleSaved } = useSaved()
  const [activeImage, setActiveImage] = useState(0)
  const [imageSlug, setImageSlug] = useState(slug)

  // Reset the gallery when the visitor moves between pieces, without an effect.
  if (imageSlug !== slug) {
    setImageSlug(slug)
    setActiveImage(0)
  }

  usePageMeta(
    product ? product.name : 'Piece not found',
    product
      ? `${product.short} ${formatPrice(product.price)}. Available by private inquiry from Bariq.`
      : 'This piece could not be found.',
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
          <Link to="/collections" className="btn btn--dark">
            Return to the collection
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    )
  }

  const saved = isSaved(product.slug)
  const related = getRelated(product, 3)
  const images = product.gallery?.length ? product.gallery : [product.image]

  const message = `Hello Bariq, I would like to inquire about the ${product.name} (${formatPrice(
    product.price,
  )}). Is it available?`

  const accordionItems = [
    {
      title: 'Details',
      content: product.details,
    },
    {
      title: 'Materials & dimensions',
      content: [product.materials, product.dimensions],
    },
    {
      title: 'Care',
      content: product.care,
    },
    {
      title: 'Shipping & returns',
      content:
        'Shipped worldwide with tracked, insured delivery. In-stock pieces are dispatched within 2–3 business days. Unworn pieces may be returned within 14 days of delivery — please contact the concierge before returning anything.',
    },
  ]

  return (
    <>
      <section className="product-page">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/collections">Collections</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/collections?category=${product.category}`}>
              {product.categoryLabel}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{product.name}</span>
          </nav>

          <div className="product-layout">
            <div className="product-gallery">
              <div className="product-gallery__main">
                <img
                  key={`${product.slug}-${activeImage}`}
                  src={images[activeImage]}
                  alt={`${product.name} — view ${activeImage + 1}`}
                  fetchPriority="high"
                />
                {product.badge ? (
                  <span className="product-gallery__badge">{product.badge}</span>
                ) : null}
                <span className="product-gallery__index">
                  {String(activeImage + 1).padStart(2, '0')} /{' '}
                  {String(images.length).padStart(2, '0')}
                </span>
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
                      <img src={image} alt="" loading="lazy" />
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
                      {product.categoryLabel}
                    </span>
                    <h1 className="product-info__name">{product.name}</h1>
                  </div>
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
                </div>

                <p className="product-info__price">{formatPrice(product.price)}</p>
                <p className="product-info__short">{product.short}</p>

                <div className="product-info__color">
                  <span className="product-info__color-label">Colour</span>
                  <span className="product-info__swatch" aria-hidden="true" />
                  <span>{product.color}</span>
                </div>

                <div className="product-info__actions">
                  <a
                    className="btn btn--dark btn--full"
                    href={buildWhatsAppLink(message)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsApp size={17} />
                    Inquire on WhatsApp
                  </a>
                  <a
                    className="btn btn--ghost btn--full"
                    href={`mailto:${site.email}?subject=${encodeURIComponent(
                      `Inquiry — ${product.name}`,
                    )}&body=${encodeURIComponent(message)}`}
                  >
                    <Mail size={16} />
                    Inquire by email
                  </a>
                </div>

                <p className="product-info__note">
                  Available by private inquiry. We will confirm availability,
                  shipping and payment personally — usually within one working
                  day.
                </p>

                <ul className="product-assurance">
                  <li>
                    <Check size={14} />
                    Complimentary shipping over $250
                  </li>
                  <li>
                    <Check size={14} />
                    Hand-finished in small batches
                  </li>
                  <li>
                    <Check size={14} />
                    Private appointments worldwide
                  </li>
                </ul>

                <Accordion items={accordionItems} defaultOpen={0} />

                <div className="product-info__meta">
                  <span>Ref. {product.slug.toUpperCase()}</span>
                  <span>{site.currency}</span>
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
            <p className="product-story__quote">
              “An object should feel inevitable — as though it already existed and
              was simply waiting to be found.”
            </p>
            <span className="product-story__signature">
              The Bariq studio
            </span>
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
            link={{ to: '/collections' }}
            linkLabel="All pieces"
          />

          <div className="product-grid">
            {related.map((item, index) => (
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

      <div className="product-mobile-bar">
        <div className="product-mobile-bar__text">
          <span>{product.name}</span>
          <strong>{formatPrice(product.price)}</strong>
        </div>
        <a
          className="btn btn--dark btn--small"
          href={buildWhatsAppLink(message)}
          target="_blank"
          rel="noreferrer"
        >
          Inquire
          <ArrowRight size={14} />
        </a>
      </div>
    </>
  )
}
