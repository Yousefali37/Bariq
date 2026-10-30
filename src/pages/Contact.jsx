import { useState } from 'react'
import Accordion from '../components/Accordion'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import {
  ArrowUpRight,
  Instagram,
  Mail,
  MapPin,
  WhatsApp,
} from '../components/Icons'
import { buildWhatsAppLink, faqs, site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const subjects = [
  'A piece from the collection',
  'A private appointment',
  'A gift or commission',
  'Care and repairs',
  'Something else',
]

const initialForm = {
  name: '',
  email: '',
  subject: subjects[0],
  message: '',
}

export default function Contact() {
  usePageMeta(
    'Concierge',
    'Speak with the Bariq concierge about a piece, a gift, a private appointment or an order. Available by WhatsApp, email and appointment.',
  )

  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    if (status !== 'idle') setStatus('idle')
  }

  const message = `Hello Bariq,\n\n${form.message}\n\n— ${form.name}${
    form.email ? ` (${form.email})` : ''
  }\nSubject: ${form.subject}`

  const submit = (event) => {
    event.preventDefault()
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())

    if (!form.name.trim() || !validEmail || !form.message.trim()) {
      setStatus('error')
      return
    }

    setStatus('success')
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer')
  }

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Bariq inquiry — ${form.subject}`,
  )}&body=${encodeURIComponent(message)}`

  return (
    <>
      <PageHeader
        eyebrow="The concierge"
        title={
          <>
            Tell us what
            <br />
            you are <em>looking for.</em>
          </>
        }
        intro="A question about a piece, a gift, a private appointment — write to us and a person, not a system, will answer. Usually within one working day."
      />

      <section className="contact">
        <div className="container contact__grid">
          <div className="contact__form-wrap">
            <Reveal className="contact__form-head">
              <span className="eyebrow">Send a note</span>
              <h2>We read every message.</h2>
            </Reveal>

            <Reveal as="form" className="contact-form" onSubmit={submit} noValidate delay={80}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={update('name')}
                    aria-invalid={status === 'error' && !form.name.trim()}
                  />
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={update('email')}
                    aria-invalid={status === 'error' && !form.email.trim()}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="contact-subject">What is this about?</label>
                <div className="field__select">
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={update('subject')}
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us a little about what you have in mind…"
                  value={form.message}
                  onChange={update('message')}
                  aria-invalid={status === 'error' && !form.message.trim()}
                />
              </div>

              <div className="contact-form__actions">
                <button type="submit" className="btn btn--dark">
                  <WhatsApp size={17} />
                  Send via WhatsApp
                </button>
                <a href={mailto} className="link-underline">
                  Send by email instead
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <p
                className={`contact-form__note ${
                  status === 'error' ? 'is-error' : ''
                } ${status === 'success' ? 'is-success' : ''}`}
                aria-live="polite"
              >
                {status === 'error'
                  ? 'Please add your name, a valid email and a short message.'
                  : status === 'success'
                    ? 'Your message is ready in WhatsApp — press send there and we will reply personally.'
                    : 'Your note opens in WhatsApp. Prefer email? Use the link beside the button.'}
              </p>
            </Reveal>
          </div>

          <aside className="contact__aside">
            <Reveal className="contact-card contact-card--dark" variant="fade">
              <span className="eyebrow eyebrow--gold">Fastest</span>
              <h3>WhatsApp the studio</h3>
              <p>
                The quickest way to ask about availability, shipping or a piece you
                have seen.
              </p>
              <a
                className="btn btn--light btn--small"
                href={buildWhatsAppLink(
                  'Hello Bariq, I would like to speak with the concierge.',
                )}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsApp size={16} />
                Open WhatsApp
              </a>
              <span className="contact-card__detail">{site.whatsappDisplay}</span>
            </Reveal>

            <Reveal className="contact-card" delay={80}>
              <div className="contact-card__row">
                <Mail size={16} />
                <div>
                  <span className="contact-card__label">Email</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </div>
              <div className="contact-card__row">
                <Instagram size={16} />
                <div>
                  <span className="contact-card__label">Instagram</span>
                  <a href={site.instagram} target="_blank" rel="noreferrer">
                    {site.instagramHandle}
                  </a>
                </div>
              </div>
              <div className="contact-card__row">
                <MapPin size={16} />
                <div>
                  <span className="contact-card__label">The studio</span>
                  <span>{site.location}</span>
                </div>
              </div>
              <div className="contact-card__hours">
                <span className="contact-card__label">Hours</span>
                <span>{site.hours}</span>
              </div>
            </Reveal>

            <Reveal className="contact-appointment" delay={140}>
              <span className="eyebrow">By appointment</span>
              <h3>Private viewings</h3>
              <p>{site.appointment}</p>
              <a
                className="link-underline"
                href={buildWhatsAppLink(
                  'Hello Bariq, I would like to arrange a private appointment.',
                )}
                target="_blank"
                rel="noreferrer"
              >
                Request a time
                <ArrowUpRight size={14} />
              </a>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="section contact-faq">
        <div className="container contact-faq__grid">
          <div className="contact-faq__head">
            <Reveal className="eyebrow" variant="fade">
              <span className="eyebrow__line" aria-hidden="true" />
              Good to know
            </Reveal>
            <Reveal as="h2" delay={60}>
              Questions,
              <br />
              <em>answered.</em>
            </Reveal>
            <Reveal as="p" delay={120}>
              A few things people ask us most. If yours is not here, the concierge
              is one message away.
            </Reveal>
          </div>

          <Reveal className="contact-faq__accordion" delay={80}>
            <Accordion
              items={faqs.map((faq) => ({
                title: faq.title,
                content: faq.body,
              }))}
              defaultOpen={0}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
