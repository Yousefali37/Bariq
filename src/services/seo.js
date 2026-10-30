import { absoluteUrl } from '../config'
import { site } from '../data/site'

const schema = 'https://schema.org'

const availabilityMap = {
  'in-stock': `${schema}/InStock`,
  limited: `${schema}/LimitedAvailability`,
  'made-to-order': `${schema}/PreOrder`,
}

export function graph(...nodes) {
  return {
    '@context': schema,
    '@graph': nodes.filter(Boolean),
  }
}

export function organizationJsonLd() {
  return {
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    alternateName: site.nameAr,
    url: site.url,
    description: site.description,
    logo: absoluteUrl('/favicon.svg'),
    image: absoluteUrl('/og-image.jpg'),
    sameAs: [site.instagram],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: `+${site.whatsapp}`,
        email: site.email,
        availableLanguage: ['English'],
      },
    ],
  }
}

export function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { '@id': `${site.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function productJsonLd(product) {
  return {
    '@type': 'Product',
    '@id': `${site.url}/piece/${product.slug}#product`,
    name: product.name,
    description: product.description || product.short,
    image: [absoluteUrl(product.image)],
    sku: product.slug,
    category: product.categoryLabel,
    material: product.materials,
    brand: { '@id': `${site.url}/#organization` },
    offers: {
      '@type': 'Offer',
      url: `${site.url}/piece/${product.slug}`,
      price: product.price,
      priceCurrency: 'USD',
      availability:
        availabilityMap[product.availability] || `${schema}/InStock`,
      itemCondition: `${schema}/NewCondition`,
      seller: { '@id': `${site.url}/#organization` },
    },
  }
}

export function articleJsonLd(article) {
  const [day, month, year] = article.displayDate.split('.')
  const datePublished = `20${year}-${month}-${day}`
  return {
    '@type': 'BlogPosting',
    '@id': `${site.url}/journal/${article.slug}#article`,
    headline: article.title,
    description: article.excerpt,
    image: [absoluteUrl(article.cover)],
    datePublished,
    dateModified: datePublished,
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}/journal/${article.slug}`,
    keywords: article.tags?.join(', '),
    articleSection: article.category,
  }
}

export function faqJsonLd(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.body,
      },
    })),
  }
}

export function breadcrumbJsonLd(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function collectionJsonLd(name, description, items) {
  return {
    '@type': 'CollectionPage',
    name,
    description,
    url: site.url,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${site.url}/piece/${item.slug}`,
        name: item.name,
      })),
    },
  }
}
