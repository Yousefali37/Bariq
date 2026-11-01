import { absoluteUrl } from '../config'
import { site } from '../data/site'

const schema = 'https://schema.org'

const availabilityMap = {
  'in-stock': `${schema}/InStock`,
  limited: `${schema}/LimitedAvailability`,
  'made-to-order': `${schema}/PreOrder`,
  'sold-out': `${schema}/SoldOut`,
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
    areaServed: {
      '@type': 'Country',
      name: 'Egypt',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cairo',
      addressCountry: 'EG',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        url: site.instagram,
        availableLanguage: ['English', 'Arabic'],
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
    inLanguage: 'en',
    publisher: { '@id': `${site.url}/#organization` },
  }
}

export function productJsonLd(product) {
  const image = product.image ? [absoluteUrl(product.image)] : undefined

  return {
    '@type': 'Product',
    '@id': `${site.url}/piece/${product.slug}#product`,
    name: product.name,
    description: product.description || product.short,
    image,
    sku: product.slug,
    category: product.categoryLabel,
    material: product.materials,
    brand: { '@id': `${site.url}/#organization` },
    offers: {
      '@type': 'Offer',
      url: `${site.url}/piece/${product.slug}`,
      price: product.price,
      priceCurrency: site.currency,
      availability:
        availabilityMap[product.availability] || `${schema}/InStock`,
      itemCondition: `${schema}/NewCondition`,
      seller: { '@id': `${site.url}/#organization` },
    },
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

export function collectionJsonLd(name, description, items, path = '/shop') {
  return {
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: 'en',
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
