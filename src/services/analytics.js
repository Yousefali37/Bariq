import { config } from '../config'

// A deliberately tiny analytics facade. Nothing is sent anywhere today: events
// are pushed to `window.dataLayer` (the Google Tag Manager convention) and
// announced on a DOM event, so any provider can be attached later without
// touching component code. Swap `deliver` for your vendor call.
function deliver(payload) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
  window.dispatchEvent(new CustomEvent('bariq:analytics', { detail: payload }))
  if (import.meta.env.DEV) {
    // Helpful while building; silent in production.
    console.debug('[bariq:analytics]', payload)
  }
}

export function track(event, properties = {}) {
  if (!config.analyticsEnabled) return
  deliver({
    event,
    ...properties,
    page_path:
      typeof window === 'undefined'
        ? undefined
        : `${window.location.pathname}${window.location.search}`,
    ts: Date.now(),
  })
}

export function trackPageView(path) {
  track('page_view', { path })
}

export const analytics = { track, trackPageView }
