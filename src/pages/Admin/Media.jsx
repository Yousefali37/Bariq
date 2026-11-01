import { useCallback, useEffect, useState } from 'react'
import { hasSupabase, supabase } from '../../lib/supabase'
import { copyText } from '../../services/clipboard'
import { slugify } from '../../services/productMapper'

function listMediaFiles() {
  return supabase.storage.from('media').list('', {
    limit: 200,
    sortBy: { column: 'created_at', order: 'desc' },
  })
}

export default function AdminMedia() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(Boolean(supabase))
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState('')

  const fetchFiles = useCallback(async () => {
    if (!supabase) return

    const { data, error: listError } = await listMediaFiles()

    if (listError) {
      setError(listError.message)
    } else {
      setFiles(
        (data || []).filter((file) => file.name && !file.name.endsWith('/')),
      )
      setError('')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!supabase) return undefined
    let active = true

    listMediaFiles().then(({ data, error: listError }) => {
      if (!active) return
      if (listError) {
        setError(listError.message)
      } else {
        setFiles(
          (data || []).filter((file) => file.name && !file.name.endsWith('/')),
        )
        setError('')
      }
      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [])

  const uploadFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!supabase) {
      setError('Supabase is not configured.')
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('Choose an image file.')
      return
    }

    setUploading(true)
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'image'
    const fileName = `${Date.now()}-${base}.${extension}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, file, { cacheControl: '3600', upsert: false })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    setUploading(false)
    setError('')
    await fetchFiles()
  }

  const getUrl = (name) => {
    if (!supabase) return ''
    const { data } = supabase.storage.from('media').getPublicUrl(name)
    return data.publicUrl
  }

  const copyUrl = async (name) => {
    const ok = await copyText(getUrl(name))
    if (!ok) return
    setCopied(name)
    window.setTimeout(() => setCopied(''), 2200)
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h1 className="admin-title">Media</h1>
          <p className="admin-subtitle">
            Upload product photography here, or directly from a product. Copy a
            public URL and paste it into the product’s image field.
          </p>
        </div>
        <div className="admin-actions">
          <button
            type="button"
            className="admin-btn"
            onClick={fetchFiles}
            disabled={loading || !hasSupabase}
          >
            Refresh
          </button>
          <label className="admin-btn admin-btn--primary">
            {uploading ? 'Uploading…' : 'Upload image'}
            <input
              type="file"
              accept="image/*"
              onChange={uploadFile}
              disabled={uploading || !hasSupabase}
              hidden
            />
          </label>
        </div>
      </header>

      {!hasSupabase ? (
        <div className="admin-alert admin-alert--error">
          Supabase is not configured. Add the environment variables to
          <code> .env.local</code> to use the media library.
        </div>
      ) : null}

      {error ? (
        <div className="admin-alert admin-alert--error">{error}</div>
      ) : null}

      {loading ? (
        <div className="admin-empty">Loading media…</div>
      ) : files.length ? (
        <div className="admin-media-grid">
          {files.map((file) => (
            <div className="admin-media-item" key={file.name}>
              <img src={getUrl(file.name)} alt="" loading="lazy" />
              <span>{file.name}</span>
              <button
                type="button"
                className="admin-btn"
                onClick={() => copyUrl(file.name)}
              >
                {copied === file.name ? 'Copied' : 'Copy URL'}
              </button>
              <input
                value={getUrl(file.name)}
                readOnly
                onClick={(event) => event.target.select()}
                aria-label={`Public URL for ${file.name}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-empty">
          <h2>No media yet</h2>
          <p>Upload the first image, or import the starter catalogue first.</p>
        </div>
      )}
    </div>
  )
}
