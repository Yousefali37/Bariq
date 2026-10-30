import Reveal from './Reveal'
import SectionHead from './SectionHead'
import { testimonials } from '../data/site'

export default function Testimonials({ className = '' }) {
  return (
    <section className={`section testimonials ${className}`.trim()}>
      <div className="container">
        <SectionHead
          eyebrow="In their words"
          title={
            <>
              Kind words, <em>quietly.</em>
            </>
          }
          link={{ to: '/contact' }}
          linkLabel="Speak with us"
        />

        <div className="testimonial-grid">
          {testimonials.map((item, index) => (
            <Reveal
              as="figure"
              className="testimonial"
              delay={index * 80}
              key={`${item.name}-${item.place}`}
            >
              <span className="testimonial__mark" aria-hidden="true">
                “
              </span>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                <span>
                  {item.place} · {item.piece}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
