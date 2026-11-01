import Accordion from '../components/Accordion'
import OrderButton from '../components/OrderButton'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { ArrowUpRight, Instagram, MapPin, Truck, Wallet } from '../components/Icons'
import { faqs, site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const steps = [
  {
    number: '01',
    title: 'Choose your piece',
    body: 'Browse the collection and save anything you love to your wishlist. Sold-out pieces stay visible so you can still save them.',
  },
  {
    number: '02',
    title: 'Message us on Instagram',
    body: 'Tap “Order on Instagram”. The site copies the piece name, price and options for you — paste them into the DM and add your city.',
  },
  {
    number: '03',
    title: 'Confirm and receive',
    body: 'We confirm availability, the delivery fee for your city and cash on delivery. Your order is then packed by hand and sent.',
  },
]

export default function Contact() {
  usePageMeta(
    'Contact & ordering',
    'How to order Bariq jewelry in Egypt: Instagram DM, cash on delivery, delivery to all governorates, and answers to common questions about sizing, sold-out pieces and returns.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Ordering & contact"
        title={
          <>
            One message,
            <br />
            then it is <em>yours.</em>
          </>
        }
        intro="Bariq is a catalogue, not a checkout. Every order is placed by Instagram DM so we can confirm availability, the delivery fee for your city and cash on delivery personally."
      />

      <section className="contact">
        <div className="container contact__grid">
          <div className="contact__form-wrap">
            <Reveal className="contact__form-head">
              <span className="eyebrow">How it works</span>
              <h2>Three quiet steps.</h2>
            </Reveal>

            <div className="contact-steps">
              {steps.map((step, index) => (
                <Reveal className="contact-step" delay={index * 80} key={step.number}>
                  <span className="contact-step__number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="contact-order" delay={240}>
              <OrderButton
                className="btn btn--dark"
                message={`Hello ${site.name}, I would like to place an order.\n\nThe piece: \nMy city: \nPlease confirm availability, the delivery fee and cash on delivery.`}
                label="Open Instagram DM"
                copiedLabel="Copied — opening Instagram"
              />
              <p>
                Instagram cannot prefill a message, so we copy your details to the
                clipboard first. Paste them into the DM and press send.
              </p>
            </Reveal>
          </div>

          <aside className="contact__aside">
            <Reveal className="contact-card contact-card--dark" variant="fade">
              <span className="eyebrow eyebrow--gold">The fastest way</span>
              <h3>Instagram DM</h3>
              <p>
                The only place orders are taken. Ask about a piece, a size, a
                restock or the delivery fee for your city.
              </p>
              <a
                className="btn btn--light btn--small"
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={16} />
                {site.instagramHandle}
              </a>
              <span className="contact-card__detail">
                Orders · Sizing · Restocks
              </span>
            </Reveal>

            <Reveal className="contact-card" delay={80}>
              <div className="contact-card__row">
                <Truck size={16} />
                <div>
                  <span className="contact-card__label">Delivery</span>
                  <span>All Egyptian governorates</span>
                </div>
              </div>
              <div className="contact-card__row">
                <Wallet size={16} />
                <div>
                  <span className="contact-card__label">Payment</span>
                  <span>Cash on delivery</span>
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
              <span className="eyebrow">Good to know</span>
              <h3>Delivery fees</h3>
              <p>
                Shipping is calculated by city and confirmed before dispatch. The
                exact total — piece plus delivery — is agreed on Instagram before
                your order is sent.
              </p>
              <a
                className="link-underline"
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Ask for your city
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
              A few things people ask us most. If yours is not here, send us a
              message on Instagram — a person will answer.
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
