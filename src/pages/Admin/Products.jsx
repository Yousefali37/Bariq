import { useMemo, useState } from 'react'
import { products as staticProducts } from '../../data/products'
import { resolveImage } from '../../data/images'
import { useCatalog } from '../../hooks/useCatalog'
import { hasSupabase, supabase } from '../../lib/supabase'
import { formatMoney } from '../../services/currency'
import {
  AVAILABILITY_OPTIONS,
  CATEGORY_LABELS,
  SIZE_GUIDES,
  emptyProduct,
  normaliseProduct,
  slugify,
  toDbProduct,
} from '../../services/productMapper'

function toForm(product) {
  const item = normaliseProduct(product)
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    category: item.category,
    price: item.price,
    image: item.image,
    availability: item.availability,
    stockNote: item.stockNote,
    leadTime: item.leadTime,
    badge: item.badge,
    color: item.color,
    short: item.short,
    description: item.description,
    sizeGuide: item.sizeGuide,
    featured: item.featured,
    newest: item.newest,
    detailsText: (item.details || []).join('\n'),
    galleryText: (item.gallery || []).join('\n'),
    materialsText: (item.materials || []).join(', '),
    materialFamiliesText: (item.materialFamilies || []).join(', '),
    colorFamiliesText: (item.colorFamilies || []).join(', '),
    optionsText: JSON.stringify(item.options || [], null, 2),
  }
}

function splitLines(value = '') {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function splitList(value = '') {
  return value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function availabilityLabel(product) {
  if (product.availability === 'sold-out') return 'Sold out'
  return (
    AVAILABILITY_OPTIONS.find((option) => option.id === product.availability)
      ?.label || product.availability
  )
}

export default function AdminProducts() {
  const { products, loading, refresh } = useCatalog()
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [importing, setImporting] = useState(false)
  const [optionsError, setOptionsError] = useState('')
  const [feedback, setFeedback] = useState(null)

  const hasLiveRows = useMemo(
    () => products.some((product) => Boolean(product.id)),
    [products],
  )

  const update = (field, value) => {
    setForm((current) => (current ? { ...current, [field]: value } : current))
  }

  const openEditor = (product) => {
    setFeedback(null)
    setOptionsError('')
    setForm(toForm(product || emptyProduct()))
  }

  const closeEditor = () => {
    if (saving || uploading) return
    setForm(null)
    setOptionsError('')
  }

  const buildDraft = () => {
    let options
    try {
      options = JSON.parse(form.optionsText || '[]')
    } catch {
      setOptionsError('Options must be valid JSON. Use the starter example or leave it as [].')
      return null
    }
    if (!Array.isArray(options)) {
      setOptionsError('Options must be a JSON array.')
      return null
    }

    const name = form.name.trim()
    const slug = form.slug.trim() || slugify(name)

    if (!name) {
      setFeedback({ type: 'error', text: 'Give the piece a name before saving.' })
      return null
    }
    if (!slug) {
      setFeedback({
        type: 'error',
        text: 'Add a slug (for example nour-drop-earrings).',
      })
      return null
    }
    if (!Number(form.price) || Number(form.price) <= 0) {
      setFeedback({ type: 'error', text: 'The price must be greater than zero.' })
      return null
    }

    return {
      id: form.id,
      name,
      slug,
      category: form.category,
      categoryLabel: CATEGORY_LABELS[form.category] || form.category,
      price: Number(form.price),
      image: form.image.trim(),
      gallery: splitLines(form.galleryText),
      availability: form.availability,
      stockNote: form.stockNote.trim(),
      leadTime: form.leadTime.trim(),
      materialFamilies: splitList(form.materialFamiliesText),
      colorFamilies: splitList(form.colorFamiliesText),
      materials: splitList(form.materialsText),
      color: form.color.trim(),
      short: form.short.trim(),
      description: form.description.trim(),
      details: splitLines(form.detailsText),
      options,
      sizeGuide: form.sizeGuide,
      badge: form.badge.trim(),
      featured: Boolean(form.featured),
      newest: Boolean(form.newest),
    }
  }

  const saveProduct = async () => {
    if (!supabase) {
      setFeedback({
        type: 'error',
        text: 'Supabase is not configured, so changes cannot be saved. Add the environment variables and restart.',
      })
      return
    }

    const draft = buildDraft()
    if (!draft) return

    setSaving(true)
    setFeedback(null)
    const row = toDbProduct(draft)

    let error

    if (draft.id) {
      const result = await supabase
        .from('products')
        .update(row)
        .eq('id', draft.id)
      error = result.error
    } else if (!hasLiveRows) {
      // The public site is still using the built-in starter catalogue. Seed all
      // 21 pieces first so adding or editing one piece does not hide the rest.
      const seed = staticProducts
        .map(toDbProduct)
        .filter((item) => item.slug !== row.slug)
      const result = await supabase
        .from('products')
        .upsert([...seed, row], { onConflict: 'slug' })
      error = result.error
    } else {
      const result = await supabase.from('products').insert([row])
      error = result.error
    }

    if (error) {
      setFeedback({ type: 'error', text: `Could not save: ${error.message}` })
      setSaving(false)
      return
    }

    await refresh()
    setSaving(false)
    setForm(null)
    setFeedback({
      type: 'success',
      text: `${row.name} was saved. The site reads the live catalogue on its next load.`,
    })
  }

  const importStarter = async () => {
    if (!supabase) {
      setFeedback({
        type: 'error',
        text: 'Supabase is not configured, so the starter catalogue cannot be imported.',
      })
      return
    }

    const confirmed = window.confirm(
      `Import the ${staticProducts.length} starter pieces into Supabase?\n\nPieces that already exist with the same slug are kept unchanged.`,
    )
    if (!confirmed) return

    setImporting(true)
    setFeedback(null)
    const rows = staticProducts.map(toDbProduct)
    const { error } = await supabase
      .from('products')
      .upsert(rows, { onConflict: 'slug', ignoreDuplicates: true })

    if (error) {
      setFeedback({ type: 'error', text: `Import failed: ${error.message}` })
      setImporting(false)
      return
    }

    await refresh()
    setImporting(false)
    setFeedback({
      type: 'success',
      text: `Starter catalogue imported. Existing pieces were left unchanged.`,
    })
  }

  const deleteProduct = async (product) => {
    if (!supabase) {
      setFeedback({
        type: 'error',
        text: 'Supabase is not configured, so products cannot be deleted.',
      })
      return
    }

    if (!product.id) {
      setFeedback({
        type: 'info',
        text: 'This piece is part of the built-in starter catalogue. Import the starter catalogue first, then delete the live copy.',
      })
      return
    }

    const confirmed = window.confirm(
      `Delete “${product.name}”?\n\nThis removes it from the live catalogue. To hide it temporarily, mark it “Sold out” instead.`,
    )
    if (!confirmed) return

    setSaving(true)
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', product.id)

    if (error) {
      setFeedback({ type: 'error', text: `Could not delete: ${error.message}` })
      setSaving(false)
      return
    }

    await refresh()
    setSaving(false)
    setForm(null)
    setFeedback({ type: 'success', text: `${product.name} was deleted.` })
  }

  const uploadImage = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!supabase) {
      setFeedback({
        type: 'error',
        text: 'Supabase is not configured, so images cannot be uploaded.',
      })
      return
    }

    if (!file.type.startsWith('image/')) {
      setFeedback({ type: 'error', text: 'Choose an image file.' })
      return
    }

    setUploading(true)
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'product'
    const fileName = `products/${Date.now()}-${base}.${extension}`

    const { error } = await supabase.storage
      .from('media')
      .upload(fileName, file, { cacheControl: '3600', upsert: false })

    if (error) {
      setFeedback({ type: 'error', text: `Upload failed: ${error.message}` })
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('media').getPublicUrl(fileName)
    update('image', data.publicUrl)
    setUploading(false)
    setFeedback({ type: 'success', text: 'Image uploaded. Save the product to keep it.' })
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h1 className="admin-title">Products</h1>
          <p className="admin-subtitle">
            Every piece in the shop. Prices are in EGP. Sold-out pieces stay
            visible with a “Sold out” label. Orders are placed on Instagram, so
            there is no stock checkout here.
          </p>
        </div>
        <div className="admin-actions">
          <button
            type="button"
            className="admin-btn"
            onClick={importStarter}
            disabled={importing || !hasSupabase}
          >
            {importing ? 'Importing…' : 'Import starter catalogue'}
          </button>
          <button
            type="button"
            className="admin-btn"
            onClick={refresh}
            disabled={loading}
          >
            Refresh
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--primary"
            onClick={() => openEditor(null)}
            disabled={loading}
          >
            Add product
          </button>
        </div>
      </header>

      {!hasSupabase ? (
        <div className="admin-alert admin-alert--error">
          Supabase is not configured. The site is using the built-in starter
          catalogue; saving, importing and uploading are disabled.
        </div>
      ) : null}

      {!loading && !hasLiveRows ? (
        <div className="admin-alert admin-alert--info">
          The live catalogue is still using the built-in starter catalogue. Use{' '}
          <strong>Import starter catalogue</strong> once, or save any product and
          the 21 starter pieces will be imported automatically so nothing
          disappears from the shop.
        </div>
      ) : null}

      {feedback ? (
        <div className={`admin-alert admin-alert--${feedback.type}`}>
          {feedback.text}
        </div>
      ) : null}

      {loading ? (
        <div className="admin-empty">Loading the catalogue…</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Piece</th>
                <th>Category</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Source</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id || product.slug}>
                  <td>
                    {product.image ? (
                      <img
                        className="admin-thumb"
                        src={resolveImage(product.image)}
                        alt=""
                      />
                    ) : (
                      <div className="admin-thumb admin-thumb--empty">
                        No image
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="admin-product-name">
                      <strong>{product.name}</strong>
                      <span>{product.slug}</span>
                    </div>
                  </td>
                  <td>{product.categoryLabel}</td>
                  <td>{formatMoney(product.price)}</td>
                  <td>
                    <span
                      className={`admin-badge ${
                        product.availability === 'sold-out'
                          ? 'admin-badge--sold'
                          : ''
                      }`.trim()}
                    >
                      {availabilityLabel(product)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`admin-badge ${
                        product.id
                          ? 'admin-badge--live'
                          : 'admin-badge--starter'
                      }`}
                    >
                      {product.id ? 'Live' : 'Starter'}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-btn"
                      onClick={() => openEditor(product)}
                    >
                      Edit
                    </button>{' '}
                    <button
                      type="button"
                      className="admin-btn admin-btn--danger"
                      onClick={() => deleteProduct(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {form ? (
        <div
          className="admin-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-editor-title"
        >
          <div className="admin-modal__panel">
            <div className="admin-modal__head">
              <div>
                <h2 id="product-editor-title">
                  {form.id ? 'Edit product' : 'Add product'}
                </h2>
                <p className="admin-subtitle">
                  Fields marked with an asterisk are required. Image, copy and
                  price are shown on the product page.
                </p>
              </div>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={closeEditor}
              >
                Close
              </button>
            </div>

            <form
              className="admin-form"
              onSubmit={(event) => {
                event.preventDefault()
                saveProduct()
              }}
            >
              <div className="admin-form__grid">
                <div className="admin-field">
                  <label htmlFor="product-name">Name *</label>
                  <input
                    id="product-name"
                    value={form.name}
                    onChange={(event) => update('name', event.target.value)}
                    placeholder="Nour Drop Earrings"
                    required
                  />
                </div>

                <div className="admin-field">
                  <label htmlFor="product-slug">Slug</label>
                  <input
                    id="product-slug"
                    value={form.slug}
                    onChange={(event) => update('slug', event.target.value)}
                    placeholder="nour-drop-earrings"
                  />
                  <span className="admin-field__hint">
                    Leave blank to create it from the name. Changing it changes
                    the product URL.
                  </span>
                </div>

                <div className="admin-field">
                  <label htmlFor="product-category">Category *</label>
                  <select
                    id="product-category"
                    value={form.category}
                    onChange={(event) => update('category', event.target.value)}
                  >
                    {Object.entries(CATEGORY_LABELS).map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-field">
                  <label htmlFor="product-price">Price (EGP) *</label>
                  <input
                    id="product-price"
                    type="number"
                    min="1"
                    step="1"
                    value={form.price}
                    onChange={(event) => update('price', event.target.value)}
                    required
                  />
                </div>

                <div className="admin-field">
                  <label htmlFor="product-availability">Availability</label>
                  <select
                    id="product-availability"
                    value={form.availability}
                    onChange={(event) =>
                      update('availability', event.target.value)
                    }
                  >
                    {AVAILABILITY_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <span className="admin-field__hint">
                    Choose “Sold out” to keep the piece visible with a sold-out
                    label.
                  </span>
                </div>

                <div className="admin-field">
                  <label htmlFor="product-size-guide">Size guide</label>
                  <select
                    id="product-size-guide"
                    value={form.sizeGuide}
                    onChange={(event) =>
                      update('sizeGuide', event.target.value)
                    }
                  >
                    {SIZE_GUIDES.map((guide) => (
                      <option key={guide.id || 'none'} value={guide.id}>
                        {guide.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-field">
                  <label htmlFor="product-stock-note">Stock note</label>
                  <input
                    id="product-stock-note"
                    value={form.stockNote}
                    onChange={(event) =>
                      update('stockNote', event.target.value)
                    }
                    placeholder="In stock"
                  />
                </div>

                <div className="admin-field">
                  <label htmlFor="product-lead-time">Dispatch / lead time</label>
                  <input
                    id="product-lead-time"
                    value={form.leadTime}
                    onChange={(event) => update('leadTime', event.target.value)}
                    placeholder="Dispatches in 1–2 business days"
                  />
                </div>

                <div className="admin-field">
                  <label htmlFor="product-color">Finish</label>
                  <input
                    id="product-color"
                    value={form.color}
                    onChange={(event) => update('color', event.target.value)}
                    placeholder="Gold"
                  />
                </div>

                <div className="admin-field">
                  <label htmlFor="product-badge">Badge</label>
                  <input
                    id="product-badge"
                    value={form.badge}
                    onChange={(event) => update('badge', event.target.value)}
                    placeholder="Bestseller / New / Last pieces"
                  />
                </div>

                <div className="admin-field">
                  <label htmlFor="product-material-families">
                    Material filters
                  </label>
                  <input
                    id="product-material-families"
                    value={form.materialFamiliesText}
                    onChange={(event) =>
                      update('materialFamiliesText', event.target.value)
                    }
                    placeholder="Stainless steel"
                  />
                  <span className="admin-field__hint">
                    Comma separated. Used by the shop filters.
                  </span>
                </div>

                <div className="admin-field">
                  <label htmlFor="product-color-families">Finish filters</label>
                  <input
                    id="product-color-families"
                    value={form.colorFamiliesText}
                    onChange={(event) =>
                      update('colorFamiliesText', event.target.value)
                    }
                    placeholder="Gold, Silver"
                  />
                  <span className="admin-field__hint">
                    Comma separated. Used by the shop filters.
                  </span>
                </div>

                <div className="admin-field admin-field--full">
                  <label htmlFor="product-materials">Materials</label>
                  <input
                    id="product-materials"
                    value={form.materialsText}
                    onChange={(event) =>
                      update('materialsText', event.target.value)
                    }
                    placeholder="Waterproof 316L stainless steel, 18k gold PVD finish"
                  />
                  <span className="admin-field__hint">
                    Comma separated. Used in search and structured data.
                  </span>
                </div>

                <div className="admin-field admin-field--full">
                  <label htmlFor="product-short">Short description</label>
                  <textarea
                    id="product-short"
                    value={form.short}
                    onChange={(event) => update('short', event.target.value)}
                    placeholder="A fine gold drop that catches the light with every turn."
                  />
                </div>

                <div className="admin-field admin-field--full">
                  <label htmlFor="product-description">Full description</label>
                  <textarea
                    id="product-description"
                    value={form.description}
                    onChange={(event) =>
                      update('description', event.target.value)
                    }
                    placeholder="Tell the story of the piece, how it feels and how to wear it."
                  />
                </div>

                <div className="admin-field admin-field--full">
                  <label htmlFor="product-details">Details (one per line)</label>
                  <textarea
                    id="product-details"
                    value={form.detailsText}
                    onChange={(event) =>
                      update('detailsText', event.target.value)
                    }
                    placeholder={'Waterproof 316L stainless steel\n18k gold PVD finish'}
                  />
                </div>

                <div className="admin-field admin-field--full">
                  <label htmlFor="product-gallery">
                    Gallery image keys or URLs (one per line)
                  </label>
                  <textarea
                    id="product-gallery"
                    value={form.galleryText}
                    onChange={(event) =>
                      update('galleryText', event.target.value)
                    }
                    placeholder={'product-1\nhttps://…'}
                  />
                  <span className="admin-field__hint">
                    Optional. The main image is used when this is empty.
                  </span>
                </div>

                <div className="admin-field admin-field--full">
                  <label htmlFor="product-image">Main image</label>
                  <div className="admin-upload">
                    <label className="admin-upload__label">
                      {uploading ? 'Uploading…' : 'Choose & upload image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={uploadImage}
                        disabled={uploading}
                        hidden
                      />
                    </label>
                    {form.image ? (
                      <img
                        className="admin-upload__preview"
                        src={resolveImage(form.image)}
                        alt=""
                      />
                    ) : null}
                  </div>
                  <input
                    id="product-image"
                    value={form.image}
                    onChange={(event) => update('image', event.target.value)}
                    placeholder="product-1 or https://…"
                    style={{ marginTop: '0.5rem' }}
                  />
                  <span className="admin-field__hint">
                    Use a starter key such as product-1, a media URL, or upload a
                    new photo.
                  </span>
                </div>

                <div className="admin-field admin-field--full">
                  <label htmlFor="product-options">
                    Options (advanced JSON)
                  </label>
                  <textarea
                    id="product-options"
                    value={form.optionsText}
                    onChange={(event) =>
                      update('optionsText', event.target.value)
                    }
                    spellCheck="false"
                    style={{ fontFamily: 'monospace', minHeight: '140px' }}
                  />
                  <span className="admin-field__hint">
                    Leave as [] when the piece has no size or length choice.
                    Existing options are preserved when you edit a starter piece.
                  </span>
                  {optionsError ? (
                    <span className="admin-alert admin-alert--error">
                      {optionsError}
                    </span>
                  ) : null}
                </div>

                <div className="admin-field admin-field--full">
                  <label>Placement</label>
                  <div className="admin-actions">
                    <label className="admin-check">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(event) =>
                          update('featured', event.target.checked)
                        }
                      />
                      Featured on the home page
                    </label>
                    <label className="admin-check">
                      <input
                        type="checkbox"
                        checked={form.newest}
                        onChange={(event) =>
                          update('newest', event.target.checked)
                        }
                      />
                      Newest piece
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-form__actions">
                <button
                  type="submit"
                  className="admin-btn admin-btn--primary"
                  disabled={saving || uploading}
                >
                  {saving ? 'Saving…' : 'Save product'}
                </button>
                <button
                  type="button"
                  className="admin-btn"
                  onClick={closeEditor}
                  disabled={saving || uploading}
                >
                  Cancel
                </button>
                {form.id ? (
                  <button
                    type="button"
                    className="admin-btn admin-btn--danger"
                    onClick={() => deleteProduct(form)}
                    disabled={saving || uploading}
                  >
                    Delete this piece
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
