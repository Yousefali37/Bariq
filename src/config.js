// Runtime configuration comes from Vite environment variables so the same
// build can be pointed at a different studio number, inbox or domain.
// See `.env.example` for the full list.
const env = import.meta.env ?? {}

const cleanUrl = (value) => value.replace(/\/+$/, '')

export const config = Object.freeze({
  siteUrl: cleanUrl(env.VITE_SITE_URL || 'https://bariq.studio'),
  whatsapp: (env.VITE_WHATSAPP_NUMBER || '971501234567').replace(/[^\d]/g, ''),
  whatsappDisplay: env.VITE_WHATSAPP_DISPLAY || '+971 50 123 4567',
  email: env.VITE_CONTACT_EMAIL || 'concierge@bariq.studio',
  instagramUrl: env.VITE_INSTAGRAM_URL || 'https://instagram.com/bariq.studio',
  instagramHandle: env.VITE_INSTAGRAM_HANDLE || '@bariq.studio',
  defaultCurrency: (env.VITE_DEFAULT_CURRENCY || 'USD').toUpperCase(),
  analyticsEnabled: env.VITE_ANALYTICS_ENABLED !== 'false',
})

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  return `${config.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}
