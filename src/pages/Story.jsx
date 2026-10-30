import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import CircularSeal from '../components/CircularSeal'
import { ArrowUpRight, WhatsApp } from '../components/Icons'
import { buildWhatsAppLink, process, site, values } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import editorial from '../assets/images/editorial.jpg'
import atelier from '../assets/images/atelier.jpg'
import stillLife from '../assets/images/still-life.jpg'
import scarf from '../assets/images/scarf.jpg'

export default function Story() {
  usePageMeta(
    'Our story',
    'Bariq is a house of hand-finished jewelry and considered accessories, made in small batches between Dubai and London.',
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
          <span>Dubai, 2026</span>
        </div>
      </Reveal>

      <section className="section story-narrative">
        <div className="container story-narrative__grid">
          <Reveal className="story-narrative__label" variant="fade">
            <span className="eyebrow">The beginning</span>
          </Reveal>

          <div className="story-narrative__body">
            <Reveal as="h2" className="story-narrative__title">
              We began with a pearl
              <br />
              and an <em>imperfect shape.</em>
            </Reveal>

            <Reveal as="p" className="story-narrative__lede" delay={80}>
              <span className="dropcap">B</span>ariq started, as most small
              houses do, with a single object — a baroque pearl that was the wrong
              shape for a traditional setting, and all the more beautiful for it.
              We set it in gold, wore it, and were asked about it every time.
            </Reveal>

            <Reveal as="p" delay={140}>
              From that first pearl, a way of working emerged: begin with the
              material, remove everything that does not earn its place, and let the
              hand of the maker remain visible. A hammer mark, an uneven edge, a
              pearl that leans slightly to one side — these are not imperfections
              to be corrected. They are the record of a person making a thing.
            </Reveal>

            <Reveal as="p" delay={190}>
              Today Bariq is a small studio between Dubai and London, working with
              recycled silver, 24k gold vermeil, freshwater pearls, Italian leather
              and plant-based acetate. We make in batches small enough to inspect
              every piece by hand, and we release them slowly.
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
              alt="Hands finishing a piece of jewelry in the Bariq atelier"
              loading="lazy"
            />
            <span className="story-atelier__caption">The atelier, Dubai.</span>
          </Reveal>

          <div className="story-atelier__body">
            <Reveal className="eyebrow" variant="fade">
              <span className="eyebrow__line" aria-hidden="true" />
              In the studio
            </Reveal>
            <Reveal as="h2" className="story-atelier__title" delay={70}>
              Five hands,
              <br />
              <em>one object.</em>
            </Reveal>
            <Reveal as="p" className="story-atelier__text" delay={140}>
              A Bariq piece passes through several pairs of hands before it reaches
              you. One shapes, one hammers, one sets, one polishes, one wraps. The
              last step is always the same: a slow inspection under the window, and
              a soft cloth.
            </Reveal>
            <Reveal as="p" className="story-atelier__text" delay={190}>
              We keep the studio small on purpose. It means we know every piece by
              name, and every customer by the conversation we had about it.
            </Reveal>
            <Reveal className="story-atelier__action" delay={240}>
              <Link to="/journal/inside-the-atelier" className="link-underline">
                Inside the atelier
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
            alt="A still life of Bariq accessories on travertine"
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
            it <em>ages.</em>
          </Reveal>
          <Reveal as="p" delay={120}>
            Gold vermeil that softens with wear. Leather that darkens where you
            hold it. Silk that loses its stiffness and learns your neck. We choose
            materials that improve with time, because the pieces are meant to stay.
          </Reveal>
          <Reveal className="story-still__image" variant="mask" delay={160}>
            <img src={scarf} alt="Warm sand silk scarf" loading="lazy" />
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
            Every piece is available by private inquiry, and appointments can be
            arranged in Dubai, London or virtually, wherever you are.
          </Reveal>
          <Reveal className="concierge-cta__actions" delay={200}>
            <Link to="/collections" className="btn btn--dark">
              Explore the collection
              <ArrowUpRight size={15} />
            </Link>
            <a
              className="link-underline"
              href={buildWhatsAppLink(
                'Hello Bariq, I would like to arrange a private appointment.',
              )}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsApp size={15} />
              Arrange an appointment
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
