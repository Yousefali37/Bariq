import { Link } from 'react-router-dom'
import { navLinks, productCategories, site } from '../data/site'
import { ArrowUpRight, Instagram } from './Icons'
import OrderButton from './OrderButton'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__newsletter">
            <span className="eyebrow eyebrow--gold">Order on Instagram</span>
            <h2>
              One message,
              <br />
              <em>then it is yours.</em>
            </h2>
            <p className="footer__note">
              Send us the piece you love and your city. We will confirm
              availability, the delivery fee and cash on delivery personally.
            </p>
            <OrderButton
              className="btn btn--light"
              label="Open Instagram DM"
              copiedLabel="Copied — opening Instagram"
            />
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
              <h3 className="footer__heading">Shop</h3>
              {productCategories
                .filter((category) => category.id !== 'all')
                .map((category) => (
                  <Link key={category.id} to={`/shop?category=${category.id}`}>
                    {category.label}
                  </Link>
                ))}
            </div>
            <div className="footer__column">
              <h3 className="footer__heading">Ordering</h3>
              <a href={site.instagram} target="_blank" rel="noreferrer">
                {site.instagramHandle}
              </a>
              <Link to="/contact">Delivery &amp; payment</Link>
              <Link to="/terms">Returns</Link>
              <Link to="/privacy">Privacy</Link>
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
            <span className="footer__delivery">{site.location}</span>
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
