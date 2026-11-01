import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { hasSupabase, supabase } from '../../lib/supabase'
import '../../styles/admin.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    if (!supabase) {
      setError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.')
      return
    }

    setLoading(true)
    setError('')
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleLogin}>
        <div>
          <h1>Bariq Admin</h1>
          <p>Sign in to manage the catalogue, pages and media.</p>
        </div>

        {!hasSupabase ? (
          <div className="admin-alert admin-alert--error">
            Supabase is not configured. Add <code>VITE_SUPABASE_URL</code> and{' '}
            <code>VITE_SUPABASE_ANON_KEY</code> to <code>.env.local</code>, then
            restart the dev server.
          </div>
        ) : null}

        {error ? (
          <div className="admin-alert admin-alert--error">{error}</div>
        ) : null}

        <div className="admin-field">
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="admin-field">
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <button
          type="submit"
          className="admin-btn admin-btn--primary"
          disabled={loading || !hasSupabase}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <Link to="/" className="admin-muted">
          ← Back to the site
        </Link>
      </form>
    </div>
  )
}
