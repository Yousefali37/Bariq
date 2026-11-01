import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import '../../styles/admin.css'

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/media', label: 'Media' },
]

export default function AdminLayout() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(supabase))
  const navigate = useNavigate()

  useEffect(() => {
    if (!supabase) {
      navigate('/admin/login', { replace: true })
      return undefined
    }

    let active = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return
      setUser(session?.user ?? null)
      setLoading(false)
      if (!session) navigate('/admin/login', { replace: true })
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session) navigate('/admin/login', { replace: true })
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [navigate])

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut()
    navigate('/admin/login')
  }

  if (loading) {
    return <div className="admin-login">Loading the admin panel…</div>
  }

  if (!user) return null

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/admin" className="admin-brand">
          <strong>Bariq</strong>
          <span>Content studio</span>
        </Link>

        <nav className="admin-nav" aria-label="Admin">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__foot">
          <Link to="/" target="_blank" rel="noreferrer">
            View the site ↗
          </Link>
          <button type="button" className="admin-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
