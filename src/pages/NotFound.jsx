import { Link } from 'react-router-dom'
import CircularSeal from '../components/CircularSeal'
import { ArrowUpRight } from '../components/Icons'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta(
    'Page not found',
    'The page you were looking for could not be found. Return to the Bariq shop.',
  )

  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <div className="not-found__seal" aria-hidden="true">
          <CircularSeal />
        </div>
        <span className="eyebrow">Error 404</span>
        <h1>
          A little
          <br />
          <em>lost.</em>
        </h1>
        <p>
          The page you were looking for has moved, sold, or never existed. The
          collection is still here.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--dark">
            Return home
            <ArrowUpRight size={15} />
          </Link>
          <Link to="/shop" className="link-underline">
            Explore the collection
          </Link>
        </div>
      </div>
    </section>
  )
}
