// Edit imagery is stored as a logical image key and resolved at render time.

/**
 * Curated edits. `hotspots` are percentage positions on the edit image and
 * point at a product slug, powering the shop-the-look interaction.
 */
export const edits = [
  {
    slug: 'first-light',
    title: 'First Light',
    kicker: 'Campaign N° 01',
    description:
      'The hour before evening, held in hammered gold and bare skin. Four pieces that were made to be worn together — and to be noticed only when the light moves.',
    image: 'editorial-2',
    imageAlt:
      'Editorial portrait in warm afternoon light wearing gold jewelry and a clutch',
    tags: ['Evening', 'Gold', 'Layering'],
    products: [
      'solstice-hoops',
      'layla-layered-necklace',
      'nour-cuff',
      'doha-mini-clutch',
    ],
    hotspots: [
      { slug: 'solstice-hoops', x: 57, y: 27, label: 'At the ear' },
      { slug: 'layla-layered-necklace', x: 48, y: 47, label: 'At the collarbone' },
      { slug: 'nour-cuff', x: 63, y: 63, label: 'At the wrist' },
      { slug: 'doha-mini-clutch', x: 35, y: 74, label: 'In hand' },
    ],
    featured: true,
  },
  {
    slug: 'everyday-gold',
    title: 'Everyday Gold',
    kicker: 'The everyday edit',
    description:
      'Pieces that ask nothing of you: a pearl at the jaw, a signet on the hand, a claw clip left on the vanity. Gold that becomes part of the morning.',
    image: 'still-life',
    imageAlt:
      'A still life of gold jewelry, pearls, silk and leather accessories on travertine',
    tags: ['Everyday', 'Pearl', 'Gifting'],
    products: [
      'mira-pearl-drops',
      'zahra-signet-ring',
      'amal-claw-clip',
      'nadia-coin-necklace',
    ],
    hotspots: [
      { slug: 'mira-pearl-drops', x: 24, y: 38, label: 'Pearl drops' },
      { slug: 'zahra-signet-ring', x: 42, y: 66, label: 'Signet ring' },
      { slug: 'amal-claw-clip', x: 68, y: 32, label: 'Claw clip' },
      { slug: 'nadia-coin-necklace', x: 78, y: 58, label: 'Coin necklace' },
    ],
    featured: false,
  },
  {
    slug: 'the-evening-edit',
    title: 'The Evening Edit',
    kicker: 'After six',
    description:
      'A clutch, a dark lens, a square of silk. The pieces that carry an evening without asking to be the whole story.',
    image: 'editorial',
    imageAlt: 'Portrait in low evening light with a silk scarf and sunglasses',
    tags: ['Evening', 'Travel', 'Silk'],
    products: [
      'doha-mini-clutch',
      'rimal-sunglasses',
      'sirocco-silk-scarf',
      'nour-cuff',
    ],
    hotspots: [
      { slug: 'rimal-sunglasses', x: 52, y: 25, label: 'Rimal frames' },
      { slug: 'sirocco-silk-scarf', x: 40, y: 58, label: 'Sirocco silk' },
      { slug: 'doha-mini-clutch', x: 69, y: 70, label: 'Doha clutch' },
      { slug: 'nour-cuff', x: 30, y: 76, label: 'Nour cuff' },
    ],
    featured: false,
  },
  {
    slug: 'from-the-bench',
    title: 'From the Bench',
    kicker: 'In the studio',
    description:
      'The pieces we reach for while working: a cuff pushed up the forearm, a chain tucked under a shirt, a ring that carries the marks of the day.',
    image: 'atelier',
    imageAlt: 'Hands finishing a piece of jewelry at the Bariq atelier bench',
    tags: ['Craft', 'Gold', 'Everyday'],
    products: ['nour-cuff', 'layla-layered-necklace', 'zahra-signet-ring'],
    hotspots: [
      { slug: 'nour-cuff', x: 44, y: 56, label: 'Nour cuff' },
      { slug: 'layla-layered-necklace', x: 63, y: 39, label: 'Layla necklace' },
      { slug: 'zahra-signet-ring', x: 31, y: 68, label: 'Zahra ring' },
    ],
    featured: false,
  },
]

export function getEdit(slug) {
  return edits.find((edit) => edit.slug === slug)
}

export function getFeaturedEdit() {
  return edits.find((edit) => edit.featured) || edits[0]
}

export function getRelatedEdits(slug, limit = 2) {
  const current = getEdit(slug)
  if (!current) return edits.slice(0, limit)
  return edits
    .filter((edit) => edit.slug !== slug)
    .sort((a, b) => {
      const aScore = a.tags.filter((tag) => current.tags.includes(tag)).length
      const bScore = b.tags.filter((tag) => current.tags.includes(tag)).length
      return bScore - aScore
    })
    .slice(0, limit)
}
