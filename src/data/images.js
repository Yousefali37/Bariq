// Resolve logical image keys (the source file name without extension) to the
// URLs Vite emits for the bundled assets. Data modules only store the key, so
// they can also be imported by Node scripts (sitemap, validation).
const modules = import.meta.glob('../assets/images/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
})

const registry = Object.fromEntries(
  Object.entries(modules).map(([filePath, url]) => [
    filePath.split('/').pop().replace(/\.(jpe?g|png)$/i, ''),
    url,
  ]),
)

export function resolveImage(name) {
  if (!name) return ''
  // Already a URL or an imported asset path.
  if (/^(https?:|data:|\/|blob:)/.test(name)) return name
  return registry[name] || name
}

export function imageExists(name) {
  return Boolean(registry[name])
}

export function imageKeys() {
  return Object.keys(registry)
}
