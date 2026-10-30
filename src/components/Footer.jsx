import { Link } from 'react-router-dom'
import {
  buildWhatsAppLink,
  navLinks,
  productCategories,
  site,
} from '../data/site'
import NewsletterForm from './NewsletterForm'
import { ArrowUpRight, Instagram, Mail, WhatsApp } from './Icons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__newsletter">
            <span className="eyebrow eyebrow--gold">Notes from the atelier</span>
            <h2>
              A little light,
              <br />
              <em>once a month.</em>
            </h2>
            <NewsletterForm />
          </div>

          <div className="footer__columns">
            <div className="footer__column">
              <h3 className="footer__heading">Explore</h3>
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer__column">
              <h3 className="footer__heading">Collections</h3>
              {productCategories
                .filter((category) => category.id !== 'all')
                .map((category) => (
                  <Link
                    key={category.id}
                    to={`/collections?category=${category.id}`}
                  >
                    {category.label}
                  </Link>
                ))}
            </div>
            <div className="footer__column">
              <h3 className="footer__heading">Concierge</h3>
              <a
                href={buildWhatsAppLink(
                  'Hello Bariq, I would like to speak with the concierge.',
                )}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a href={`mailto:${site.email}`}>Email</a>
              <a href={site.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <Link to="/contact">Appointments</Link>
            </div>
          </div>
        </div>

        <div className="footer__brand">
          <Link to="/" aria-label="Bariq — home">
            <span className="footer__wordmark">{site.name}</span>
            <span className="footer__arabic" lang="ar" dir="rtl">
              {site.nameAr}
            </span>
          </Link>
          <p>{site.tagline}</p>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
            <span>
              © {year} {site.name}. All rights reserved.
            </span>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
          <div className="footer__social">
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Bariq on Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href={buildWhatsAppLink('Hello Bariq, I have a question.')}
              target="_blank"
              rel="noreferrer"
              aria-label="Bariq on WhatsApp"
            >
              <WhatsApp size={16} />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email Bariq">
              <Mail size={16} />
            </a>
            <button
              type="button"
              className="footer__top-link"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to top
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
