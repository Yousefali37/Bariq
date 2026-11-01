// Runtime configuration comes from Vite environment variables so the same
// build can be pointed at a different Instagram account or domain.
const env = import.meta.env ?? {}

const cleanUrl = (value) => (value || '').replace(/\/+$/, '')

export const config = Object.freeze({
  // Replace with the live domain before launch.
  siteUrl: cleanUrl(env.VITE_SITE_URL || 'https://bariq.studio'),
  // Orders are handled through Instagram DM only.
  instagramUrl: env.VITE_INSTAGRAM_URL || 'https://instagram.com/bariq.studio',
  instagramHandle: env.VITE_INSTAGRAM_HANDLE || '@bariq.studio',
  // The catalogue is priced in Egyptian pounds only.
  defaultCurrency: (env.VITE_DEFAULT_CURRENCY || 'EGP').toUpperCase(),
  // No advertising or behavioural tracking is used on this site.
  analyticsEnabled: env.VITE_ANALYTICS_ENABLED === 'true',
  supabaseUrl: env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: env.VITE_SUPABASE_ANON_KEY || '',
})

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  return `${config.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}
