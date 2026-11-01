import { Link } from 'react-router-dom'
import { ArrowUpRight, Instagram } from '../components/Icons'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const content = {
  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy',
    intro:
      'We keep the amount of information we hold to a minimum, and we do not sell it. This page explains what we collect, why, and what you can ask us to do with it.',
    updated: 'Last updated 1 November 2026',
    sections: [
      {
        heading: 'What we collect',
        body: [
          'Bariq is a catalogue site. There are no accounts, no checkout and no newsletter. When you message us on Instagram, Instagram shares the details you choose to send — typically your Instagram handle, your city and the piece you are asking about. We use those details only to answer your message and arrange your order.',
          'If you place an order, we also keep the delivery address and order details needed to fulfil it.',
        ],
      },
      {
        heading: 'How we use it',
        body: [
          'We use your information to answer your inquiry, arrange and deliver your order, and provide aftercare. We do not use your information for automated decision-making or profiling, and we do not send marketing messages unless you ask us to.',
        ],
      },
      {
        heading: 'Storage on your device',
        body: [
          'The site stores your saved pieces and recently viewed pieces in your browser’s local storage so they are waiting for you when you return. This information stays on your device and is not sent to us. You can clear it at any time by removing saved pieces or clearing your browser data.',
          'The site does not use advertising cookies, tracking pixels or behavioural analytics.',
        ],
      },
      {
        heading: 'Sharing',
        body: [
          'We share information only with the people needed to complete your order — for example, the courier delivering your parcel. We do not sell, rent or trade your information.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          `You may ask us for a copy of the information we hold about you, ask us to correct or delete it, or ask us to stop contacting you. Message us on Instagram at ${site.instagramHandle} and we will respond within a reasonable period.`,
        ],
      },
      {
        heading: 'Contact',
        body: [
          `Bariq, ${site.location}. For any privacy question, message us on Instagram at ${site.instagramHandle}.`,
        ],
      },
    ],
  },
  terms: {
    eyebrow: 'Legal',
    title: 'Terms',
    intro:
      'These terms cover the use of this website and orders placed through Instagram. They are written to be read, not to be hidden behind.',
    updated: 'Last updated 1 November 2026',
    sections: [
      {
        heading: 'About this site',
        body: [
          'This website is a catalogue of the Bariq collection. Pieces are offered by Instagram DM rather than through an online checkout. Prices are shown in Egyptian pounds (EGP) and are confirmed with you before an order is placed.',
        ],
      },
      {
        heading: 'Orders',
        body: [
          'An Instagram message is an inquiry, not a binding order. An order is confirmed only when we have confirmed availability, the final price including the delivery fee for your city, and cash on delivery arrangements in writing. We may decline an inquiry at our discretion, including where a piece is no longer available.',
        ],
      },
      {
        heading: 'Pricing and payment',
        body: [
          'Prices are shown in EGP and may change without notice. The price confirmed on Instagram at the time of your order is the price that applies. Payment is cash on delivery unless we agree otherwise in writing.',
        ],
      },
      {
        heading: 'Delivery',
        body: [
          'We deliver to all Egyptian governorates. The delivery fee depends on your city and is confirmed before dispatch. In-stock pieces are usually dispatched within 1–2 business days; made-to-order pieces take 2–3 weeks. Delivery times vary by governorate and are outside our control once a parcel is with the courier.',
        ],
      },
      {
        heading: 'Returns',
        body: [
          'If something is not right, message us on Instagram before returning anything. Unworn pieces in their original packaging can usually be returned within 14 days of delivery. Made-to-order, personalised and earring pieces are final sale for hygiene and custom reasons. Return shipping is the responsibility of the customer unless the piece is faulty.',
        ],
      },
      {
        heading: 'Sold-out pieces',
        body: [
          'Sold-out pieces remain visible on the site so you can still see them and save them to your wishlist. A sold-out label does not guarantee a restock. Message us on Instagram and we will let you know if and when a piece returns.',
        ],
      },
      {
        heading: 'Care and variation',
        body: [
          'Our pieces are made from high-grade stainless steel with a PVD gold or brushed silver finish. They are designed to be worn in water, but we recommend avoiding harsh chemicals, chlorine and perfume to keep the finish looking its best. Rinse with fresh water after swimming and dry with a soft cloth.',
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
          `Questions about these terms can be sent to us on Instagram at ${site.instagramHandle}. Bariq, ${site.location}.`,
        ],
      },
    ],
  },
}

export default function Legal({ kind = 'privacy' }) {
  const page = content[kind] || content.privacy

  usePageMeta(
    page.title,
    `${page.title} for Bariq — waterproof stainless-steel jewelry in Egypt, ordered by Instagram DM with cash on delivery.`,
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
            <Link to="/contact">Ordering &amp; contact</Link>
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
            <a href={site.instagram} target="_blank" rel="noreferrer">
              <Instagram size={14} />
              {site.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
