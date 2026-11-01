import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSaved } from '../hooks/useSaved'
import Cursor from './Cursor'
import Footer from './Footer'
import Header from './Header'
import MobileMenu from './MobileMenu'
import SavedDrawer from './SavedDrawer'
import ScrollProgress from './ScrollProgress'
import SearchOverlay from './SearchOverlay'

export default function Layout() {
  const location = useLocation()
  const { isOpen: savedOpen, closeDrawer } = useSaved()
  const routeKey = `${location.pathname}${location.search}`
  // Overlays remember the route they were opened on, so navigating anywhere
  // (including back/forward) closes them without a state-syncing effect.
  const [menuRoute, setMenuRoute] = useState(null)
  const [searchRoute, setSearchRoute] = useState(null)
  const menuOpen = menuRoute === routeKey
  const searchOpen = searchRoute === routeKey

  useEffect(() => {
    closeDrawer()
  }, [routeKey, closeDrawer])

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const timeout = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
      return () => window.clearTimeout(timeout)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    return undefined
  }, [location.pathname, location.hash])

  const anyOverlay = menuOpen || searchOpen || savedOpen

  useEffect(() => {
    document.body.classList.toggle('no-scroll', anyOverlay)
    return () => document.body.classList.remove('no-scroll')
  }, [anyOverlay])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Cursor />

      <Header
        onOpenMenu={() => setMenuRoute(routeKey)}
        onOpenSearch={() => setSearchRoute(routeKey)}
      />

      <main id="main" className="page" key={routeKey}>
        <Outlet />
      </main>

      <Footer />

      <MobileMenu open={menuOpen} onClose={() => setMenuRoute(null)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchRoute(null)} />
      <SavedDrawer />
    </>
  )
}
