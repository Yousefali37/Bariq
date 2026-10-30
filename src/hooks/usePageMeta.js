import { useEffect } from 'react'
import { absoluteUrl, config } from '../config'
import { site } from '../data/site'

const DEFAULT_TITLE = `${site.name} — ${site.tagline}`
const DEFAULT_DESCRIPTION = site.description
const DEFAULT_IMAGE = absoluteUrl('/og-image.jpg')

function upsertMeta(attribute, key, content) {
  if (content === undefined || content === null) return
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function upsertJsonLd(id, json) {
  const scriptId = `bariq-jsonld-${id}`
  const existing = document.getElementById(scriptId)
  if (!json) {
    existing?.remove()
    return
  }
  const script = existing || document.createElement('script')
  script.id = scriptId
  script.type = 'application/ld+json'
  script.textContent = json
  if (!existing) document.head.appendChild(script)
}

/**
 * Manage document title, description, canonical, Open Graph and an optional
 * JSON-LD block. Backwards compatible with the original (title, description)
 * signature used across the site.
 */
export function usePageMeta(title, description = DEFAULT_DESCRIPTION, options = {}) {
  const {
    image = DEFAULT_IMAGE,
    imageAlt = site.tagline,
    type = 'website',
    url,
    noindex = false,
    jsonLd,
    jsonLdId = 'page',
  } = options

  const json = jsonLd ? JSON.stringify(jsonLd) : null

  useEffect(() => {
    const nextTitle = title ? `${title} — ${site.name}` : DEFAULT_TITLE
    const path =
      url || (typeof window === 'undefined' ? '/' : window.location.pathname)
    const canonical = absoluteUrl(path)
    const absoluteImage = absoluteUrl(image)

    document.title = nextTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    upsertMeta('property', 'og:title', nextTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', absoluteImage)
    upsertMeta('property', 'og:image:alt', imageAlt)
    upsertMeta('property', 'og:site_name', site.name)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', nextTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', absoluteImage)
    upsertLink('canonical', canonical)

    upsertJsonLd(jsonLdId, json)

    return () => {
      document.title = DEFAULT_TITLE
      upsertMeta('name', 'description', DEFAULT_DESCRIPTION)
      upsertMeta('name', 'robots', 'index, follow')
      upsertMeta('property', 'og:title', DEFAULT_TITLE)
      upsertMeta('property', 'og:description', DEFAULT_DESCRIPTION)
      upsertMeta('property', 'og:type', 'website')
      upsertMeta('property', 'og:url', config.siteUrl)
      upsertMeta('property', 'og:image', DEFAULT_IMAGE)
      upsertLink('canonical', config.siteUrl)
      upsertJsonLd(jsonLdId, null)
    }
  }, [
    title,
    description,
    image,
    imageAlt,
    type,
    url,
    noindex,
    jsonLdId,
    json,
  ])
}

export { DEFAULT_TITLE, DEFAULT_DESCRIPTION }
