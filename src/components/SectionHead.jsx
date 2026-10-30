import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { ArrowUpRight } from './Icons'

export default function SectionHead({
  eyebrow,
  title,
  link,
  linkLabel = 'View all',
  className = '',
}) {
  return (
    <div className={`section-head ${className}`.trim()}>
      <div className="section-head__text">
        {eyebrow ? (
          <Reveal className="eyebrow section-head__eyebrow" variant="fade">
            <span className="eyebrow__line" aria-hidden="true" />
            {eyebrow}
          </Reveal>
        ) : null}
        <Reveal as="h2" className="section-head__title" delay={60}>
          {title}
        </Reveal>
      </div>
      {link ? (
        <Reveal className="section-head__action" delay={120}>
          <Link to={link.to} className="link-underline">
            {linkLabel}
            <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      ) : null}
    </div>
  )
}
