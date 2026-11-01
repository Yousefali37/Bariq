import { Link } from 'react-router-dom'
import CircularSeal from '../components/CircularSeal'
import OrderButton from '../components/OrderButton'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { ArrowUpRight } from '../components/Icons'
import { process, site, values } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import editorial from '../assets/images/editorial.jpg'
import atelier from '../assets/images/atelier.jpg'
import stillLife from '../assets/images/still-life.jpg'

export default function Story() {
  usePageMeta(
    'Our story',
    'Bariq is an Egyptian jewelry house making waterproof stainless-steel pieces in gold and silver — designed to be worn every day and delivered across Egypt.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title={
          <>
            A house built
            <br />
            on <em>light.</em>
          </>
        }
        intro="Bariq — بريق — is the Arabic word for the glint of light on a surface. It is the thing we look for in every piece: not shine, but the quiet moment when an object catches the sun."
      />

      <Reveal className="story-hero" variant="mask">
        <img
          src={editorial}
          alt="Bariq campaign portrait in warm afternoon light"
          fetchPriority="high"
        />
        <div className="story-hero__caption container">
          <span>Campaign N° 01 — First Light</span>
          <span>Cairo, 2026</span>
        </div>
      </Reveal>

      <section className="section story-narrative">
        <div className="container story-narrative__grid">
          <Reveal className="story-narrative__label" variant="fade">
            <span className="eyebrow">The beginning</span>
          </Reveal>

          <div className="story-narrative__body">
            <Reveal as="h2" className="story-narrative__title">
              We began with a question:
              <br />
              why should gold ask you to be <em>careful?</em>
            </Reveal>

            <Reveal as="p" className="story-narrative__lede" delay={80}>
              <span className="dropcap">B</span>ariq began in Cairo with a simple
              frustration. The pieces we loved were beautiful, but they came with
              rules — take them off before you wash your hands, before the gym,
              before the sea. We wanted jewelry that could stay on.
            </Reveal>

            <Reveal as="p" delay={140}>
              So we started with the material. High-grade 316L stainless steel,
              finished in warm gold PVD or brushed silver. It is strong, it does
              not tarnish like plated brass, and it is comfortable enough to forget
              you are wearing it. The finish is bonded to the steel rather than
              layered on top.
            </Reveal>

            <Reveal as="p" delay={190}>
              From there, the collection grew slowly: a fine chain at the
              collarbone, a hoop that catches the light, a signet ring, a bangle
              that stays on through everything. Quiet shapes, a comfortable weight,
              and a finish that works with what you already own.
            </Reveal>

            <Reveal className="story-narrative__signature" delay={240}>
              <span className="story-narrative__signature-mark" aria-hidden="true">
                ✦
              </span>
              <div>
                <strong>The Bariq studio</strong>
                <span>{site.location}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="story-quote">
        <div className="container story-quote__inner">
          <Reveal className="story-quote__seal" variant="fade">
            <CircularSeal />
          </Reveal>
          <Reveal as="blockquote" delay={60}>
            “Luxury is not the amount of gold. It is the amount of attention.”
          </Reveal>
          <Reveal as="span" className="story-quote__attribution" delay={140}>
            — The Bariq studio notes
          </Reveal>
        </div>
      </section>

      <section className="section values values--story">
        <div className="container">
          <SectionHead
            eyebrow="What we believe"
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

      <section className="section story-process">
        <div className="container">
          <SectionHead
            eyebrow="How it is made"
            title={
              <>
                From material
                <br />
                to <em>object.</em>
              </>
            }
          />

          <div className="process">
            {process.map((step, index) => (
              <Reveal className="process__step" delay={index * 80} key={step.number}>
                <div className="process__head">
                  <span className="process__number">{step.number}</span>
                  <span className="process__line" aria-hidden="true" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section story-atelier">
        <div className="container story-atelier__grid">
          <Reveal className="story-atelier__media" variant="mask">
            <img
              src={atelier}
              alt="Hands finishing a piece of jewelry in the Bariq studio"
              loading="lazy"
            />
            <span className="story-atelier__caption">The studio, Cairo.</span>
          </Reveal>

          <div className="story-atelier__body">
            <Reveal className="eyebrow" variant="fade">
              <span className="eyebrow__line" aria-hidden="true" />
              In the studio
            </Reveal>
            <Reveal as="h2" className="story-atelier__title" delay={70}>
              Small on purpose,
              <br />
              <em>personal by design.</em>
            </Reveal>
            <Reveal as="p" className="story-atelier__text" delay={140}>
              We keep the studio small so every piece can be checked by hand before
              it is wrapped. A Bariq order is not packed by a system — it is packed
              by someone who knows the piece by name.
            </Reveal>
            <Reveal as="p" className="story-atelier__text" delay={190}>
              It also means we can answer you properly. Every order begins with an
              Instagram message, and every message is read by a person. Tell us your
              city, ask about a size, or send us a piece you have in mind.
            </Reveal>
            <Reveal className="story-atelier__action" delay={240}>
              <Link to="/shop" className="link-underline">
                Explore the collection
                <ArrowUpRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="story-still">
        <Reveal className="story-still__media" variant="mask">
          <img
            src={stillLife}
            alt="A still life of gold jewelry on a warm studio table"
            loading="lazy"
          />
        </Reveal>
        <div className="story-still__aside">
          <Reveal className="eyebrow eyebrow--gold" variant="fade">
            The material
          </Reveal>
          <Reveal as="h2" delay={60}>
            Chosen for how
            <br />
            it <em>lives.</em>
          </Reveal>
          <Reveal as="p" delay={120}>
            Stainless steel is forgiving in the best way. It does not mind water,
            it holds its shape, and it keeps a fine polish. Our gold PVD finish adds
            warmth without the delicacy of plating. Rinse with fresh water after
            swimming, dry with a soft cloth, and it will keep its colour.
          </Reveal>
          <Reveal className="story-still__image" variant="mask" delay={160}>
            <img
              src={editorial}
              alt="Warm gold jewelry worn in afternoon light"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <section className="concierge-cta concierge-cta--story">
        <div className="container concierge-cta__inner">
          <Reveal className="eyebrow" variant="fade">
            <span className="eyebrow__line" aria-hidden="true" />
            The next chapter
          </Reveal>
          <Reveal as="h2" className="concierge-cta__title" delay={70}>
            Come and see
            <br />
            <em>the collection.</em>
          </Reveal>
          <Reveal as="p" className="concierge-cta__text" delay={140}>
            Twenty-one pieces to begin with, and more on the way. Every order is
            placed by Instagram DM, with delivery across Egypt and cash on delivery.
          </Reveal>
          <Reveal className="concierge-cta__actions" delay={200}>
            <Link to="/shop" className="btn btn--dark">
              Explore the collection
              <ArrowUpRight size={15} />
            </Link>
            <OrderButton
              className="link-underline"
              message={`Hello ${site.name}, I would like to know more about the collection.`}
              label="Message us on Instagram"
              copiedLabel="Copied — opening Instagram"
              iconSize={15}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
