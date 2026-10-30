import { Link } from 'react-router-dom'
import CircularSeal from '../components/CircularSeal'
import Marquee from '../components/Marquee'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { ArrowRight, ArrowUpRight, WhatsApp } from '../components/Icons'
import { journal } from '../data/journal'
import { products } from '../data/products'
import { buildWhatsAppLink, formatPrice, site, values } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import heroImg from '../assets/images/hero.jpg'
import stillLife from '../assets/images/still-life.jpg'
import editorial from '../assets/images/editorial.jpg'
import editorial2 from '../assets/images/editorial-2.jpg'
import earringsPearl from '../assets/images/earrings-pearl.jpg'
import hair from '../assets/images/hair.jpg'
import clutch from '../assets/images/clutch.jpg'
import sunglasses from '../assets/images/sunglasses.jpg'
import scarf from '../assets/images/scarf.jpg'

const categoryTiles = [
  {
    id: 'jewelry',
    label: 'Jewelry',
    note: 'Earrings, necklaces, cuffs',
    image: earringsPearl,
  },
  { id: 'hair', label: 'Hair', note: 'Clips, claws, pins', image: hair },
  { id: 'bags', label: 'Bags', note: 'Clutches & mini bags', image: clutch },
  {
    id: 'eyewear',
    label: 'Eyewear',
    note: 'Frames & lenses',
    image: sunglasses,
  },
  { id: 'silk', label: 'Silk', note: 'Scarves & textiles', image: scarf },
]

const marqueeItems = [
  'Hand-finished',
  'Small batches',
  '24k gold vermeil',
  'Freshwater pearls',
  'Made to be kept',
]

const atelierNotes = [
  { label: 'Est.', value: '2026' },
  { label: 'Made', value: 'By hand' },
  { label: 'Shipping', value: 'Worldwide' },
]

export default function Home() {
  usePageMeta(
    null,
    'Bariq is a house of hand-finished jewelry and considered accessories — objects made to catch the light and be kept.',
  )

  const featured = products.filter((product) => product.featured).slice(0, 4)
  const latest = products.filter((product) => product.newest).slice(0, 1)[0]

  return (
    <>
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div className="home-hero__copy">
            <Reveal className="home-hero__eyebrow eyebrow" variant="fade">
              <span className="eyebrow__line" aria-hidden="true" />
              Hand-finished · Dubai · Worldwide
            </Reveal>

            <Reveal as="h1" className="home-hero__title" delay={80}>
              Objects of
              <br />
              <em>quiet light.</em>
            </Reveal>

            <Reveal as="p" className="home-hero__lede" delay={170}>
              Jewelry, silk and small objects made by hand in small batches —
              designed to catch the light, and to be kept.
            </Reveal>

            <Reveal className="home-hero__actions" delay={250}>
              <Link to="/collections" className="btn btn--dark">
                Explore the collection
                <ArrowUpRight size={15} />
              </Link>
              <Link to="/story" className="link-underline">
                The house of Bariq
                <ArrowRight size={14} />
              </Link>
            </Reveal>

            {latest ? (
              <Reveal className="home-hero__note" delay={330}>
                <span className="home-hero__note-label">Now in the studio</span>
                <Link to={`/piece/${latest.slug}`}>
                  {latest.name} — {formatPrice(latest.price)}
                  <ArrowRight size={13} />
                </Link>
              </Reveal>
            ) : null}
          </div>

          <div className="home-hero__media">
            <Reveal className="home-hero__frame" variant="mask">
              <img
                src={heroImg}
                alt="A woman wearing sculptural gold earrings in warm afternoon light"
                fetchPriority="high"
              />
            </Reveal>

            <div className="home-hero__seal" aria-hidden="true">
              <CircularSeal />
            </div>

            <Reveal className="home-hero__caption" variant="fade" delay={240}>
              <span>Campaign N° 01</span>
              <span>First Light</span>
            </Reveal>
          </div>
        </div>

        <div className="container home-hero__foot">
          <span className="home-hero__scroll">
            <span className="home-hero__scroll-line" aria-hidden="true" />
            Scroll to explore
          </span>
          <span className="home-hero__location">{site.location}</span>
        </div>
      </section>

      <Marquee items={marqueeItems} />

      <section className="section manifesto">
        <div className="container manifesto__grid">
          <Reveal className="manifesto__media" variant="mask">
            <img
              src={stillLife}
              alt="An arrangement of gold jewelry, silk and leather accessories"
              loading="lazy"
            />
            <span className="manifesto__media-caption">
              The studio table, late afternoon.
            </span>
          </Reveal>

          <div className="manifesto__body">
            <Reveal className="eyebrow" variant="fade">
              <span className="eyebrow__line" aria-hidden="true" />
              The house
            </Reveal>

            <Reveal as="h2" className="manifesto__title" delay={70}>
              Made slowly,
              <br />
              <em>worn always.</em>
            </Reveal>

            <Reveal as="p" className="manifesto__lede" delay={140}>
              Bariq began with a simple idea: that the objects we wear closest to
              the skin should be made with the same care as the ones we keep for
              generations.
            </Reveal>

            <Reveal as="p" className="manifesto__text" delay={190}>
              We work in small batches, by hand, in a studio that prefers natural
              light. Nothing is designed for a season. Every piece is meant to sit
              easily with what you already own — and to grow more personal each
              time you wear it.
            </Reveal>

            <Reveal className="manifesto__stats" delay={240}>
              {atelierNotes.map((note) => (
                <div className="manifesto__stat" key={note.label}>
                  <span className="manifesto__stat-label">{note.label}</span>
                  <span className="manifesto__stat-value">{note.value}</span>
                </div>
              ))}
            </Reveal>

            <Reveal className="manifesto__action" delay={280}>
              <Link to="/story" className="link-underline">
                Read our story
                <ArrowUpRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section categories">
        <div className="container">
          <SectionHead
            eyebrow="Explore"
            title="Five small worlds."
            link={{ to: '/collections' }}
            linkLabel="All pieces"
          />

          <div className="category-grid">
            {categoryTiles.map((tile, index) => {
              const count = products.filter(
                (product) => product.category === tile.id,
              ).length

              return (
                <Reveal
                  as={Link}
                  to={`/collections?category=${tile.id}`}
                  className="category-card"
                  delay={index * 60}
                  key={tile.id}
                  data-cursor="view"
                >
                  <div className="category-card__media">
                    <img src={tile.image} alt={tile.label} loading="lazy" />
                    <span className="category-card__index">
                      0{index + 1}
                    </span>
                    <span className="category-card__arrow">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <div className="category-card__meta">
                    <div>
                      <h3>{tile.label}</h3>
                      <span>{tile.note}</span>
                    </div>
                    <span className="category-card__count">
                      {count} {count === 1 ? 'piece' : 'pieces'}
                    </span>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section featured">
        <div className="container">
          <SectionHead
            eyebrow="The edit"
            title={
              <>
                Pieces to <em>live in.</em>
              </>
            }
            link={{ to: '/collections' }}
            linkLabel="View the collection"
          />

          <div className="product-grid">
            {featured.map((product, index) => (
              <Stagger key={product.slug} index={index}>
                <ProductCard product={product} />
              </Stagger>
            ))}
          </div>

          <Reveal className="featured__note" variant="fade">
            <span className="featured__note-line" aria-hidden="true" />
            Every piece is available by private inquiry — no cart, no hurry.
            <Link to="/contact">Speak with the concierge</Link>
          </Reveal>
        </div>
      </section>

      <section className="campaign">
        <div className="container campaign__grid">
          <Reveal className="campaign__media" variant="mask">
            <img
              src={editorial2}
              alt="Editorial portrait in warm gold light"
              loading="lazy"
            />
            <span className="campaign__media-label">Campaign — First Light</span>
          </Reveal>

          <div className="campaign__panel">
            <span className="campaign__index" aria-hidden="true">
              N° 01
            </span>
            <Reveal className="eyebrow eyebrow--gold" variant="fade">
              The winter campaign
            </Reveal>
            <Reveal as="h2" className="campaign__title" delay={70}>
              Warm gold,
              <br />
              <em>low sun.</em>
            </Reveal>
            <Reveal as="p" className="campaign__text" delay={140}>
              A study in the hour before evening — hammered gold, bare skin, and
              the particular quiet of a room at the end of the day.
            </Reveal>
            <Reveal className="campaign__actions" delay={200}>
              <Link to="/collections" className="btn btn--light">
                Shop the campaign
                <ArrowUpRight size={15} />
              </Link>
              <Link to="/journal/a-study-in-warm-light" className="link-underline link-underline--light">
                Read the journal
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section values">
        <div className="container">
          <SectionHead
            eyebrow="Our approach"
            title={
              <>
                Three quiet <em>promises.</em>
              </>
            }
          />

          <div className="values__grid">
            {values.map((value, index) => (
              <Reveal className="value" delay={index * 80} key={value.number}>
                <span className="value__number">{value.number}</span>
                <h3 className="value__title">{value.title}</h3>
                <p className="value__body">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section journal-preview">
        <div className="container">
          <SectionHead
            eyebrow="The journal"
            title={
              <>
                Notes from <em>the atelier.</em>
              </>
            }
            link={{ to: '/journal' }}
            linkLabel="All stories"
          />

          <div className="journal-grid">
            {journal.map((article, index) => (
              <Reveal
                as="article"
                className="journal-card"
                delay={index * 70}
                key={article.slug}
              >
                <Link
                  to={`/journal/${article.slug}`}
                  className="journal-card__media"
                  aria-label={`Read ${article.title}`}
                  data-cursor="view"
                >
                  <img src={article.cover} alt="" loading="lazy" />
                </Link>
                <div className="journal-card__meta">
                  <span>{article.category}</span>
                  <span>{article.displayDate}</span>
                </div>
                <h3 className="journal-card__title">
                  <Link to={`/journal/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="journal-card__excerpt">{article.excerpt}</p>
                <span className="journal-card__read">{article.readTime}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="concierge-cta">
        <div className="container concierge-cta__inner">
          <Reveal className="concierge-cta__seal" variant="fade">
            <CircularSeal />
          </Reveal>
          <Reveal as="span" className="eyebrow" variant="fade">
            <span className="eyebrow__line" aria-hidden="true" />
            The concierge
          </Reveal>
          <Reveal as="h2" className="concierge-cta__title" delay={70}>
            A piece, chosen
            <br />
            <em>with care.</em>
          </Reveal>
          <Reveal as="p" className="concierge-cta__text" delay={140}>
            Tell us what you are looking for — a gift, a wedding, a first piece of
            gold. We will help you find it, and arrange delivery wherever you are.
          </Reveal>
          <Reveal className="concierge-cta__actions" delay={200}>
            <a
              className="btn btn--dark"
              href={buildWhatsAppLink(
                'Hello Bariq, I would like help choosing a piece.',
              )}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsApp size={17} />
              Inquire on WhatsApp
            </a>
            <Link to="/contact" className="link-underline">
              Or write to us
              <ArrowUpRight size={14} />
            </Link>
          </Reveal>
          <Reveal className="concierge-cta__aside" variant="fade" delay={260}>
            <img src={editorial} alt="" loading="lazy" />
            <span>Private appointments · Dubai · London · Worldwide</span>
          </Reveal>
        </div>
      </section>
    </>
  )
}

/* A small wrapper so featured cards stagger without extra markup noise. */
function Stagger({ children, index }) {
  return (
    <Reveal className="product-grid__item" delay={index * 70}>
      {children}
    </Reveal>
  )
}
