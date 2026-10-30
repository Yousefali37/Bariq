import { Link } from 'react-router-dom'
import { ArrowUpRight } from '../components/Icons'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const content = {
  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy',
    intro:
      'We keep the amount of information we hold to a minimum, and we do not sell it. This page explains what we collect, why, and what you can ask us to do with it.',
    updated: 'Last updated 1 October 2026',
    sections: [
      {
        heading: 'What we collect',
        body: [
          'When you contact us by WhatsApp, email or the concierge form, we receive the details you choose to share — typically your name, email address, phone number and the content of your message. If you place an order, we also keep the delivery address and order details needed to fulfil it.',
          'If you subscribe to our notes, we store your email address and the date you subscribed. We do not use tracking pixels or advertising cookies on this site.',
        ],
      },
      {
        heading: 'How we use it',
        body: [
          'We use your information to answer your inquiry, arrange and deliver your order, provide aftercare, and — only if you have asked — send occasional studio notes. We do not use your information for automated decision-making or profiling.',
        ],
      },
      {
        heading: 'Storage on your device',
        body: [
          'The site stores your saved pieces in your browser’s local storage so that they are waiting for you when you return. This information stays on your device and is not sent to us. You can clear it at any time by removing the saved pieces or clearing your browser data.',
        ],
      },
      {
        heading: 'Sharing',
        body: [
          'We share information only with the people needed to complete your order — for example, a courier or a payment provider. We do not sell, rent or trade your information. Where a service provider handles data on our behalf, they are required to protect it and use it only for the agreed purpose.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          `You may ask us for a copy of the information we hold about you, ask us to correct or delete it, or ask us to stop sending you notes. Write to ${site.email} and we will respond within a reasonable period.`,
        ],
      },
      {
        heading: 'Contact',
        body: [
          `Bariq, ${site.location}. For any privacy question, write to ${site.email}.`,
        ],
      },
    ],
  },
  terms: {
    eyebrow: 'Legal',
    title: 'Terms',
    intro:
      'These terms cover the use of this website and inquiries made through it. They are written to be read, not to be hidden behind.',
    updated: 'Last updated 1 October 2026',
    sections: [
      {
        heading: 'About this site',
        body: [
          'This website is a showcase of the Bariq collection. Pieces are offered by private inquiry rather than through an online checkout. Prices are shown in US dollars and are indicative until confirmed by the concierge.',
        ],
      },
      {
        heading: 'Inquiries and orders',
        body: [
          'An inquiry does not create a binding order. An order is confirmed only when we have confirmed availability, the final price including shipping and duties where applicable, and payment arrangements in writing. We may decline an inquiry at our discretion, including where a piece is no longer available.',
        ],
      },
      {
        heading: 'Pricing and payment',
        body: [
          'Prices may change without notice. The price confirmed by the concierge at the time of your order is the price that applies. Duties, taxes and any import fees are quoted separately and are the responsibility of the customer unless stated otherwise.',
        ],
      },
      {
        heading: 'Shipping',
        body: [
          'We ship worldwide with tracked, insured delivery. In-stock pieces are usually dispatched within 2–3 business days. Made-to-order and personalised pieces take longer; we will confirm the expected timing before you commit. Delivery times vary by destination and are outside our control once a parcel is with the courier.',
        ],
      },
      {
        heading: 'Returns',
        body: [
          'Unworn pieces in their original packaging may be returned within 14 days of delivery, after contacting the concierge. Made-to-order, personalised and earring pieces are final sale for hygiene and custom reasons. Return shipping is the responsibility of the customer unless the piece is faulty.',
        ],
      },
      {
        heading: 'Care and variation',
        body: [
          'Because pieces are made by hand and many materials are natural, slight variations in shape, colour and surface are expected and are part of the character of the piece. Follow the care guidance provided with your order. Damage caused by misuse, perfume, water or improper storage is not covered.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'The Bariq name, wordmark, photography, text and designs on this site are our property or used with permission. They may not be reproduced or used commercially without our written consent.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          `Questions about these terms can be sent to ${site.email}. Bariq, ${site.location}.`,
        ],
      },
    ],
  },
}

export default function Legal({ kind = 'privacy' }) {
  const page = content[kind] || content.privacy

  usePageMeta(
    page.title,
    `${page.title} for Bariq — the house of hand-finished jewelry and considered accessories.`,
  )

  return (
    <section className="legal">
      <div className="container legal__grid">
        <aside className="legal__aside">
          <span className="eyebrow">{page.eyebrow}</span>
          <h1>{page.title}</h1>
          <span className="legal__updated">{page.updated}</span>
          <nav className="legal__nav" aria-label="Legal pages">
            <Link
              to="/privacy"
              className={kind === 'privacy' ? 'is-active' : undefined}
            >
              Privacy
            </Link>
            <Link to="/terms" className={kind === 'terms' ? 'is-active' : undefined}>
              Terms
            </Link>
            <Link to="/contact">Concierge</Link>
          </nav>
          <Link to="/" className="link-underline legal__back">
            Back to Bariq
            <ArrowUpRight size={13} />
          </Link>
        </aside>

        <div className="legal__body">
          <p className="legal__intro">{page.intro}</p>

          {page.sections.map((section) => (
            <div className="legal__section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}

          <div className="legal__foot">
            <span>© {new Date().getFullYear()} {site.name}</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
