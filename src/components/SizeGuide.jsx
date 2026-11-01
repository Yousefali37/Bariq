import { useEffect, useRef } from 'react'
import { buildInstagramLink, sizeGuides } from '../data/site'
import { Close, Ruler } from './Icons'

export default function SizeGuide({ kind, onClose }) {
  const closeRef = useRef(null)
  const guide = kind ? sizeGuides[kind] : null

  useEffect(() => {
    if (!kind) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    const timer = window.setTimeout(() => closeRef.current?.focus(), 80)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
      window.clearTimeout(timer)
    }
  }, [kind, onClose])

  if (!guide) return null

  return (
    <div className="modal modal--size is-open" role="presentation">
      <button
        type="button"
        className="overlay-scrim"
        onClick={onClose}
        aria-label="Close size guide"
        tabIndex={-1}
      />
      <div
        className="size-guide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
      >
        <div className="size-guide__head">
          <div>
            <span className="eyebrow">
              <Ruler size={14} />
              Size guide
            </span>
            <h2 id="size-guide-title">{guide.title}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close size guide"
          >
            <Close size={20} />
          </button>
        </div>

        <p className="size-guide__intro">{guide.intro}</p>

        <div className="size-guide__table-wrap">
          <table className="size-guide__table">
            <thead>
              <tr>
                {guide.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={cell} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={`${row[0]}-${cell}`}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="size-guide__note">{guide.note}</p>

        <a
          className="link-underline"
          href={buildInstagramLink()}
          target="_blank"
          rel="noreferrer"
        >
          Ask us for sizing help on Instagram
        </a>
      </div>
    </div>
  )
}
