import { absoluteUrl } from '../config'

function legacyCopy(text) {
  try {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const copied = document.execCommand('copy')
    document.body.removeChild(area)
    return copied
  } catch {
    return false
  }
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return legacyCopy(text)
  }
}

/**
 * Share a link with the native sheet when available, otherwise copy it.
 * Returns 'shared' | 'copied' | 'cancelled' | 'error'.
 */
export async function shareLink({ title, text, url, path }) {
  const link = url || absoluteUrl(path || '/')
  const payload = { title, text, url: link }

  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      const canShare =
        typeof navigator.canShare !== 'function' || navigator.canShare(payload)
      if (canShare) {
        await navigator.share(payload)
        return 'shared'
      }
    } catch (error) {
      if (error?.name === 'AbortError') return 'cancelled'
      // Fall through to the clipboard when the sheet is unavailable.
    }
  }

  return (await copy(link)) ? 'copied' : 'error'
}

export async function copyLink(path) {
  return (await copy(absoluteUrl(path))) ? 'copied' : 'error'
}
