import { Link, useParams } from 'react-router-dom'
import NewsletterForm from '../components/NewsletterForm'
import Reveal from '../components/Reveal'
import { ArrowUpRight } from '../components/Icons'
import { getArticle, getNextArticle } from '../data/journal'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Article() {
  const { slug } = useParams()
  const article = getArticle(slug)
  const next = article ? getNextArticle(article.slug) : null

  usePageMeta(
    article ? article.title : 'Story not found',
    article ? article.excerpt : 'This story could not be found.',
  )

  if (!article) {
    return (
      <section className="missing section">
        <div className="container missing__inner">
          <span className="eyebrow">Not found</span>
          <h1>This story has gone quiet.</h1>
          <p>The journal is still here, with plenty to read.</p>
          <Link to="/journal" className="btn btn--dark">
            Return to the journal
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <article className="article">
      <header className="article__header container">
        <Link to="/journal" className="article__back">
          <span aria-hidden="true">←</span>
          The journal
        </Link>

        <div className="article__meta">
          <span>{article.category}</span>
          <span className="article__meta-dot" aria-hidden="true" />
          <span>{article.date}</span>
          <span className="article__meta-dot" aria-hidden="true" />
          <span>{article.readTime}</span>
        </div>

        <Reveal as="h1" className="article__title">
          {article.title}
        </Reveal>

        <Reveal as="p" className="article__excerpt" delay={80}>
          {article.excerpt}
        </Reveal>
      </header>

      <Reveal className="article__cover" variant="mask">
        <img src={article.cover} alt="" fetchPriority="high" />
      </Reveal>

      <div className="article__body">
        {article.body.map((block, index) => {
          if (block.type === 'h2') {
            return (
              <Reveal as="h2" delay={40} key={index}>
                {block.text}
              </Reveal>
            )
          }
          if (block.type === 'quote') {
            return (
              <Reveal as="blockquote" delay={40} key={index}>
                “{block.text}”
              </Reveal>
            )
          }
          return (
            <Reveal as="p" delay={30} key={index}>
              {block.text}
            </Reveal>
          )
        })}

        <div className="article__signoff">
          <span className="article__signoff-mark" aria-hidden="true">
            ✦
          </span>
          <span>The Bariq studio · {article.displayDate}</span>
        </div>
      </div>

      {next ? (
        <aside className="article__next">
          <div className="container article__next-grid">
            <div className="article__next-text">
              <span className="eyebrow">Next in the journal</span>
              <h2>
                <Link to={`/journal/${next.slug}`}>{next.title}</Link>
              </h2>
              <Link to={`/journal/${next.slug}`} className="link-underline">
                Read the story
                <ArrowUpRight size={14} />
              </Link>
            </div>
            <Link
              to={`/journal/${next.slug}`}
              className="article__next-media"
              aria-hidden="true"
              tabIndex={-1}
            >
              <img src={next.cover} alt="" loading="lazy" />
            </Link>
          </div>
        </aside>
      ) : null}

      <div className="article__newsletter container">
        <span className="eyebrow">Notes from the atelier</span>
        <h2>
          A little light,
          <br />
          <em>once a month.</em>
        </h2>
        <NewsletterForm compact />
      </div>
    </article>
  )
}
