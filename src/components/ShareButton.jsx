import { useEffect, useRef, useState } from 'react'
import { shareLink } from '../services/share'
import { track } from '../services/analytics'
import { Share } from './Icons'

export default function ShareButton({
  title,
  text,
  path,
  url,
  label = 'Share',
  compact = false,
  className = '',
  onStatus,
}) {
  const [status, setStatus] = useState('idle')
  const timeout = useRef(null)

  useEffect(
    () => () => {
      if (timeout.current) window.clearTimeout(timeout.current)
    },
    [],
  )

  const handleClick = async () => {
    const result = await shareLink({ title, text, path, url })
    setStatus(result)
    onStatus?.(result)
    track('share', { content: title || path || url, method: result })
    if (timeout.current) window.clearTimeout(timeout.current)
    timeout.current = window.setTimeout(() => setStatus('idle'), 3200)
  }

  const message =
    status === 'copied'
      ? 'Link copied'
      : status === 'shared'
        ? 'Shared'
        : status === 'cancelled'
          ? label
          : status === 'error'
            ? 'Could not copy'
            : label

  return (
    <button
      type="button"
      className={`share-button ${compact ? 'share-button--compact' : ''} ${className}`.trim()}
      onClick={handleClick}
      aria-label={title ? `Share ${title}` : label}
    >
      <Share size={15} />
      {compact ? null : <span aria-live="polite">{message}</span>}
    </button>
  )
}
