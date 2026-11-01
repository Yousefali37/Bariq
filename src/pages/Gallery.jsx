import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import OrderButton from '../components/OrderButton'
import PageHeader from '../components/PageHeader'
import Picture from '../components/Picture'
import Reveal from '../components/Reveal'
import { ArrowUpRight } from '../components/Icons'
import { productCategories, site } from '../data/site'
import { useCatalog } from '../hooks/useCatalog'
import { usePageMeta } from '../hooks/usePageMeta'
import editorial from '../assets/images/editorial.jpg'
import editorial2 from '../assets/images/editorial-2.jpg'
import stillLife from '../assets/images/still-life.jpg'
import atelier from '../assets/images/atelier.jpg'

const studioShots = [
  {
    src: editorial,
    alt: 'Bariq campaign portrait in warm afternoon light',
    caption: 'Campaign N° 01 — First Light',
    span: 'wide',
  },
  {
    src: stillLife,
    alt: 'Gold jewelry arranged on a warm studio table',
    caption: 'The studio table',
    span: 'tall',
  },
  {
    src: atelier,
    alt: 'Hands finishing a piece of jewelry in the Bariq studio',
    caption: 'In the studio, Cairo',
    span: '',
  },
  {
    src: editorial2,
    alt: 'Editorial portrait in warm gold light',
    caption: 'Warm gold, cool water',
    span: '',
  },
]

export default function Gallery() {
  const { products } = useCatalog()
  const [filter, setFilter] = useState('all')

  usePageMeta(
    'Gallery',
    'A closer look at Bariq — waterproof stainless-steel jewelry in gold and silver, photographed in the Cairo studio and worn in warm light.',
  )

  const filters = [
    { id: 'all', label: 'All images' },
    ...productCategories.filter((category) => category.id !== 'all'),
    { id: 'studio', label: 'The studio' },
  ]

  const visibleProducts = useMemo(() => {
    if (filter === 'studio') return []
    if (filter === 'all') return products
    return products.filter((product) => product.category === filter)
  }, [filter, products])

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={
          <>
            The collection,
            <br />
            <em>up close.</em>
          </>
        }
        intro="Gold and silver, water and light. A quiet look at the pieces, the finish and the studio where every order is checked by hand."
      />

      <section className="gallery">
        <div className="container">
          <div className="gallery-filters" role="group" aria-label="Filter gallery">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`shop-filter ${filter === item.id ? 'is-active' : ''}`}
                onClick={() => setFilter(item.id)}
                aria-pressed={filter === item.id}
              >
                {item.label}
              </button>
            ))}
          </div>

          {filter === 'studio' ? (
            <div className="gallery-grid gallery-grid--studio">
              {studioShots.map((shot, index) => (
                <Reveal
                  as="figure"
                  className={`gallery-item ${shot.span ? `gallery-item--${shot.span}` : ''}`.trim()}
                  delay={(index % 4) * 60}
                  key={shot.caption}
                >
                  <img src={shot.src} alt={shot.alt} loading="lazy" />
                  <figcaption>{shot.caption}</figcaption>
                </Reveal>
              ))}
            </div>
          ) : (
            <>
              <div className="gallery-grid">
                {visibleProducts.map((product, index) => (
                  <Reveal
                    as={Link}
                    to={`/piece/${product.slug}`}
                    className={`gallery-item ${
                      index % 7 === 0 ? 'gallery-item--tall' : ''
                    }`.trim()}
                    delay={(index % 4) * 50}
                    key={product.slug}
                    data-cursor="view"
                  >
                    <Picture
                      name={product.image}
                      alt={product.name}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <figcaption>
                      <span>{product.categoryLabel}</span>
                      <strong>{product.name}</strong>
                      <ArrowUpRight size={14} />
                    </figcaption>
                  </Reveal>
                ))}
              </div>

              {filter === 'all' ? (
                <div className="gallery-studio">
                  <div className="gallery-studio__head">
                    <span className="eyebrow">From the studio</span>
                    <h2>
                      A little <em>context.</em>
                    </h2>
                  </div>
                  <div className="gallery-grid gallery-grid--studio">
                    {studioShots.map((shot, index) => (
                      <Reveal
                        as="figure"
                        className={`gallery-item ${
                          shot.span ? `gallery-item--${shot.span}` : ''
                        }`.trim()}
                        delay={(index % 4) * 60}
                        key={shot.caption}
                      >
                        <img src={shot.src} alt={shot.alt} loading="lazy" />
                        <figcaption>{shot.caption}</figcaption>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}

          <Reveal className="gallery-foot" variant="fade">
            <div>
              <span className="eyebrow">Seen something you love?</span>
              <h2>
                Ask us anything on <em>Instagram.</em>
              </h2>
              <p>
                We can send more photos, confirm a size or hold a piece for you.
                Delivery is available to every Egyptian governorate.
              </p>
            </div>
            <div className="gallery-foot__actions">
              <OrderButton
                className="btn btn--dark"
                message={`Hello ${site.name}, I saw a piece in the gallery and would like more details.`}
                label="Message us on Instagram"
              />
              <Link to="/shop" className="link-underline">
                Shop the collection
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
