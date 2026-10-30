import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  buildWhatsAppLink,
  navLinks,
  productCategories,
  site,
} from '../data/site'
import { ArrowUpRight, Close, Instagram, WhatsApp } from './Icons'

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div
      className={`mobile-menu ${open ? 'is-open' : ''}`}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="mobile-menu__top container">
        <Link to="/" className="wordmark" onClick={onClose} aria-label="Bariq — home">
          <span className="wordmark__ar" lang="ar" dir="rtl">
            {site.nameAr}
          </span>
          <span className="wordmark__en">{site.name}</span>
        </Link>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close menu">
          <Close size={22} />
        </button>
      </div>

      <div className="mobile-menu__body container">
        <nav className="mobile-menu__primary" aria-label="Mobile primary">
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              style={{ '--index': index }}
            >
              <span className="mobile-menu__index">0{index + 1}</span>
              {link.label}
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </nav>

        <div className="mobile-menu__sub">
          <div className="mobile-menu__group">
            <span className="eyebrow">Collections</span>
            {productCategories
              .filter((category) => category.id !== 'all')
              .map((category) => (
                <Link
                  key={category.id}
                  to={`/collections?category=${category.id}`}
                  onClick={onClose}
                >
                  {category.label}
                </Link>
              ))}
          </div>
          <div className="mobile-menu__group">
            <span className="eyebrow">Concierge</span>
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
            <Link to="/contact" onClick={onClose}>
              Private appointments
            </Link>
          </div>
        </div>
      </div>

      <div className="mobile-menu__foot container">
        <span>{site.location}</span>
        <div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Bariq on Instagram"
          >
            <Instagram size={17} />
          </a>
          <a
            href={buildWhatsAppLink('Hello Bariq, I have a question.')}
            target="_blank"
            rel="noreferrer"
            aria-label="Bariq on WhatsApp"
          >
            <WhatsApp size={17} />
          </a>
        </div>
      </div>
    </div>
  )
}
