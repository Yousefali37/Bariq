import { Link } from 'react-router-dom'
import CircularSeal from '../components/CircularSeal'
import Marquee from '../components/Marquee'
import OrderButton from '../components/OrderButton'
import Picture from '../components/Picture'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import Testimonials from '../components/Testimonials'
import { ArrowRight, ArrowUpRight } from '../components/Icons'
import { productCategories, site, values } from '../data/site'
import { useCatalog } from '../hooks/useCatalog'
import { useCurrency } from '../hooks/useCurrency'
import { usePageMeta } from '../hooks/usePageMeta'
import { graph, organizationJsonLd, websiteJsonLd } from '../services/seo'
import heroImg from '../assets/images/hero.jpg'
import stillLife from '../assets/images/still-life.jpg'
import editorial from '../assets/images/editorial.jpg'
import editorial2 from '../assets/images/editorial-2.jpg'

const categoryImages = {
  necklaces: 'product-3',
  rings: 'product-8',
  earrings: 'product-1',
  bracelets: 'product-15',
}

const marqueeItems = [
  'Waterproof stainless steel',
  '18k gold PVD',
  'Cash on delivery',
  'Delivery across Egypt',
  'Made to be worn',
]

export default function Home() {
  const { products } = useCatalog()
  const { format } = useCurrency()

  usePageMeta(
    null,
    'Bariq — waterproof stainless-steel jewelry in Egypt. Gold and silver necklaces, rings, earrings and bracelets, delivered to every governorate with cash on delivery.',
    {
      jsonLd: graph(organizationJsonLd(), websiteJsonLd()),
      jsonLdId: 'home',
    },
  )

  const featured = products.filter((product) => product.featured).slice(0, 4)
  const latest = products.find((product) => product.newest) || products[0]
  const categories = productCategories.filter((category) => category.id !== 'all')

  return (
    <>
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div className="home-hero__copy">
            <Reveal className="home-hero__eyebrow eyebrow" variant="fade">
              <span className="eyebrow__line" aria-hidden="true" />
              Waterproof stainless steel · Cairo
            </Reveal>

            <Reveal as="h1" className="home-hero__title" delay={80}>
              Gold you can
              <br />
              <em>live in.</em>
            </Reveal>

            <Reveal as="p" className="home-hero__lede" delay={170}>
              Waterproof stainless-steel jewelry in warm gold and quiet silver —
              made to be worn in the shower, at the sea, and every day in between.
            </Reveal>

            <Reveal className="home-hero__actions" delay={250}>
              <Link to="/shop" className="btn btn--dark">
                Shop the collection
                <ArrowUpRight size={15} />
              </Link>
              <Link to="/story" className="link-underline">
                The house of Bariq
                <ArrowRight size={14} />
              </Link>
            </Reveal>

            {latest ? (
              <Reveal className="home-hero__note" delay={330}>
                <span className="home-hero__note-label">New in the studio</span>
                <Link to={`/piece/${latest.slug}`}>
                  {latest.name} — {format(latest.price)}
                  <ArrowRight size={13} />
                </Link>
              </Reveal>
            ) : null}
          </div>

          <div className="home-hero__media">
            <Reveal className="home-hero__frame" variant="mask">
              <img
                src={heroImg}
                alt="A woman wearing sculptural gold jewelry in warm afternoon light"
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
              alt="An arrangement of gold jewelry on a warm studio table"
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
              Made to get wet,
              <br />
              <em>made to stay.</em>
            </Reveal>

            <Reveal as="p" className="manifesto__lede" delay={140}>
              Bariq began with a simple idea: jewelry should not ask you to be
              careful. Our pieces are made from high-grade stainless steel,
              finished in gold or silver, and designed for real life.
            </Reveal>

            <Reveal as="p" className="manifesto__text" delay={190}>
              We choose quiet shapes and a comfortable weight — pieces that sit
              easily with what you already own and grow more personal each time
              you wear them. No delicate plating, no taking it off before you
              wash your hands.
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

      <section className="section categories" id="shop">
        <div className="container">
          <SectionHead
            eyebrow="Shop"
            title="Four small worlds."
            link={{ to: '/shop' }}
            linkLabel="All pieces"
          />

          <div className="category-grid">
            {categories.map((tile, index) => {
              const count = products.filter(
                (product) => product.category === tile.id,
              ).length

              return (
                <Reveal
                  as={Link}
                  to={`/shop?category=${tile.id}`}
                  className="category-card"
                  delay={index * 60}
                  key={tile.id}
                  data-cursor="view"
                >
                  <div className="category-card__media">
                    <Picture
                      name={categoryImages[tile.id]}
                      alt={tile.label}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
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
            link={{ to: '/shop' }}
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
            Every order is placed by Instagram DM — no cart, no checkout.
            <Link to="/contact">How ordering works</Link>
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
              The everyday edit
            </Reveal>
            <Reveal as="h2" className="campaign__title" delay={70}>
              Warm gold,
              <br />
              <em>cool water.</em>
            </Reveal>
            <Reveal as="p" className="campaign__text" delay={140}>
              A study in the pieces you never take off — a fine chain at the
              collarbone, a hoop that catches the light, a bangle that stays on
              through everything.
            </Reveal>
            <Reveal className="campaign__actions" delay={200}>
              <Link to="/shop" className="btn btn--light">
                Shop the edit
                <ArrowUpRight size={15} />
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

      <Testimonials />

      <section className="concierge-cta">
        <div className="container concierge-cta__inner">
          <Reveal className="concierge-cta__seal" variant="fade">
            <CircularSeal />
          </Reveal>
          <Reveal as="span" className="eyebrow" variant="fade">
            <span className="eyebrow__line" aria-hidden="true" />
            Ordering
          </Reveal>
          <Reveal as="h2" className="concierge-cta__title" delay={70}>
            A piece, chosen
            <br />
            <em>in one message.</em>
          </Reveal>
          <Reveal as="p" className="concierge-cta__text" delay={140}>
            Send us the piece you love and your city on Instagram. We will confirm
            availability, the delivery fee and cash on delivery personally.
          </Reveal>
          <Reveal className="concierge-cta__actions" delay={200}>
            <OrderButton
              className="btn btn--dark"
              message={`Hello ${site.name}, I would like help choosing a piece.`}
              label="Message us on Instagram"
            />
            <Link to="/contact" className="link-underline">
              Delivery &amp; payment
              <ArrowUpRight size={14} />
            </Link>
          </Reveal>
          <Reveal className="concierge-cta__aside" variant="fade" delay={260}>
            <img src={editorial} alt="" loading="lazy" />
            <span>Delivery to all governorates · Cash on delivery</span>
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
