import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import NewsletterForm from '../components/NewsletterForm'
import { ArrowUpRight } from '../components/Icons'
import { journal } from '../data/journal'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Journal() {
  usePageMeta(
    'Journal',
    'Notes from the Bariq atelier — styling, craft and the quiet life of objects.',
  )

  const [featured, ...rest] = journal

  return (
    <>
      <PageHeader
        eyebrow="The journal"
        title={
          <>
            Notes from
            <br />
            <em>the atelier.</em>
          </>
        }
        intro="Conversations about styling, material and the slow work of making. Published occasionally, and never in a hurry."
      />

      <section className="journal-page">
        <div className="container">
          <Reveal as="article" className="journal-feature">
            <Link
              to={`/journal/${featured.slug}`}
              className="journal-feature__media"
              aria-label={`Read ${featured.title}`}
              data-cursor="view"
            >
              <img src={featured.cover} alt="" fetchPriority="high" />
              <span className="journal-feature__tag">Featured</span>
            </Link>

            <div className="journal-feature__body">
              <div className="journal-card__meta">
                <span>{featured.category}</span>
                <span>{featured.displayDate}</span>
                <span>{featured.readTime}</span>
              </div>
              <h2>
                <Link to={`/journal/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p>{featured.excerpt}</p>
              <Link to={`/journal/${featured.slug}`} className="link-underline">
                Read the story
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>

          <div className="journal-page__grid">
            {rest.map((article, index) => (
              <Reveal
                as="article"
                className="journal-card journal-card--large"
                delay={index * 80}
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

            <Reveal className="journal-aside" delay={120}>
              <span className="eyebrow">From the studio</span>
              <h3>
                A little light,
                <br />
                <em>once a month.</em>
              </h3>
              <p>
                New pieces, studio notes and the occasional invitation — written by
                hand, sent rarely.
              </p>
              <NewsletterForm compact />
              <span className="journal-aside__note">
                No more than once a month. Unsubscribe whenever you like.
              </span>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
