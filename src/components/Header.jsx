import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks, site } from '../data/site'
import { useSaved } from '../hooks/useSaved'
import { Heart, Menu, SearchIcon } from './Icons'
import OrderButton from './OrderButton'

export default function Header({ onOpenMenu, onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false)
  const { count, openDrawer } = useSaved()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header__inner container">
        <div className="header__left">
          <button
            type="button"
            className="header__menu-button"
            onClick={onOpenMenu}
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>
          <nav className="header__nav" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? 'is-active' : undefined)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <Link to="/" className="wordmark" aria-label="Bariq — home">
          <span className="wordmark__ar" lang="ar" dir="rtl">
            {site.nameAr}
          </span>
          <span className="wordmark__en">{site.name}</span>
        </Link>

        <div className="header__actions">
          <button
            type="button"
            className="header__action header__search"
            onClick={onOpenSearch}
            aria-label="Search pieces"
          >
            <SearchIcon size={16} />
            <span>Search</span>
          </button>
          <button
            type="button"
            className="header__action header__saved"
            onClick={openDrawer}
            aria-label={`Open saved pieces (${count})`}
          >
            <Heart size={15} />
            <span>Saved</span>
            <span className="header__count">({count})</span>
          </button>
          <OrderButton
            className="btn btn--dark btn--small header__cta"
            label="Order"
            copiedLabel="Opening Instagram"
            iconSize={14}
          />
        </div>
      </div>
    </header>
  )
}
