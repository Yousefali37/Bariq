import { Link } from 'react-router-dom'
import { useCatalog } from '../../hooks/useCatalog'
import { CATEGORY_LABELS } from '../../services/productMapper'
import { hasSupabase } from '../../lib/supabase'

export default function AdminDashboard() {
  const { products, loading } = useCatalog()
  const soldOut = products.filter(
    (product) => product.availability === 'sold-out',
  ).length
  const live = products.filter((product) => product.id).length

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h1 className="admin-title">Dashboard</h1>
          <p className="admin-subtitle">
            Manage the Bariq catalogue and the details customers see on the site.
            Products are priced in EGP and ordered through Instagram DM.
          </p>
        </div>
        <div className="admin-actions">
          <Link to="/admin/products" className="admin-btn admin-btn--primary">
            Manage products
          </Link>
          <Link to="/" className="admin-btn" target="_blank" rel="noreferrer">
            View site ↗
          </Link>
        </div>
      </header>

      {!hasSupabase ? (
        <div className="admin-alert admin-alert--error">
          Supabase is not configured. The public site will keep using the built-in
          starter catalogue, and admin changes cannot be saved.
        </div>
      ) : null}

      <div className="admin-stats">
        <div className="admin-stat">
          <strong>{loading ? '…' : products.length}</strong>
          <span>Pieces in the catalogue</span>
        </div>
        <div className="admin-stat">
          <strong>{loading ? '…' : live}</strong>
          <span>Pieces stored in Supabase</span>
        </div>
        <div className="admin-stat">
          <strong>{loading ? '…' : soldOut}</strong>
          <span>Sold-out pieces (still visible)</span>
        </div>
        <div className="admin-stat">
          <strong>{Object.keys(CATEGORY_LABELS).length}</strong>
          <span>Categories</span>
        </div>
      </div>

      <div className="admin-quick-links">
        <Link to="/admin/products" className="admin-quick-link">
          <strong>Products</strong>
          <span>
            Add a piece, change a price, mark something sold out or upload a new
            photo.
          </span>
        </Link>
        <Link to="/admin/media" className="admin-quick-link">
          <strong>Media</strong>
          <span>
            Upload and copy image URLs from the media library. Product photos can
            also be uploaded directly from the product editor.
          </span>
        </Link>
        <a
          href="https://instagram.com/bariq.studio"
          className="admin-quick-link"
          target="_blank"
          rel="noreferrer"
        >
          <strong>Instagram orders</strong>
          <span>
            Orders are confirmed in Instagram DM. The site’s order buttons open
            the inbox and copy the piece details for the customer.
          </span>
        </a>
      </div>

      <div className="admin-card">
        <h2 className="admin-title" style={{ fontSize: '1.25rem' }}>
          How the catalogue works
        </h2>
        <p className="admin-subtitle">
          The public site reads products from Supabase. Until the starter
          catalogue is imported, it uses the 21 built-in pieces so the shop is
          never empty. Use <strong>Import starter catalogue</strong> on the
          Products page once, then edit freely. Sold-out pieces stay visible with a
          “Sold out” label.
        </p>
      </div>
    </div>
  )
}
