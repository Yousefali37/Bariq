import { Component } from 'react'
import { Link } from 'react-router-dom'
import { track } from '../services/analytics'
import { ArrowUpRight } from './Icons'

/**
 * Catches render errors so a single broken page never blanks the whole site.
 * In development the message is shown; in production visitors see a quiet,
 * on-brand recovery screen.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
    this.reset = this.reset.bind(this)
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    track('error', {
      message: error?.message,
      componentStack: info?.componentStack?.slice(0, 500),
    })
    if (import.meta.env.DEV) {
      console.error('[bariq] render error', error, info)
    }
  }

  reset() {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state
    const { children, compact = false } = this.props

    if (!error) return children

    return (
      <section className={`error-boundary ${compact ? 'error-boundary--compact' : ''}`.trim()}>
        <div className="container error-boundary__inner">
          <span className="eyebrow">Something went quiet</span>
          <h1>
            A small <em>interruption.</em>
          </h1>
          <p>
            This page could not be shown. Nothing is lost — refresh, or return to
            the collection and continue.
          </p>
          {import.meta.env.DEV ? (
            <pre className="error-boundary__detail">{error.message}</pre>
          ) : null}
          <div className="error-boundary__actions">
            <button type="button" className="btn btn--dark" onClick={this.reset}>
              Try again
            </button>
            <Link to="/shop" className="link-underline">
              Return to the collection
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    )
  }
}
