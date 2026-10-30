import Reveal from './Reveal'

export default function PageHeader({
  eyebrow,
  title,
  intro,
  children,
  className = '',
}) {
  return (
    <header className={`page-header ${className}`.trim()}>
      {eyebrow ? (
        <Reveal className="page-header__eyebrow eyebrow" variant="fade">
          <span className="eyebrow__line" aria-hidden="true" />
          {eyebrow}
        </Reveal>
      ) : null}
      <Reveal as="h1" className="page-header__title" delay={80}>
        {title}
      </Reveal>
      {intro ? (
        <Reveal as="p" className="page-header__intro" delay={160}>
          {intro}
        </Reveal>
      ) : null}
      {children ? (
        <Reveal className="page-header__extra" delay={220}>
          {children}
        </Reveal>
      ) : null}
    </header>
  )
}
