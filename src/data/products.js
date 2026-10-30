// Images are stored as logical keys (the source file name without extension).
// `src/data/images.js` resolves them to bundled URLs for the UI, while the
// image pipeline emits responsive derivatives from the same keys.
const goldFinish = {
  id: 'gold',
  label: '24k gold vermeil',
  swatch: 'linear-gradient(135deg, #ddc396, #a9865a)',
}
const silverFinish = {
  id: 'silver',
  label: 'Sterling silver',
  priceDelta: -12,
  swatch: 'linear-gradient(135deg, #e6e3de, #a8a49c)',
}

const shared = {
  madeToOrder: false,
  availability: 'in-stock',
  leadTime: 'Dispatches in 2–3 business days',
  stockNote: 'In stock — ready to send',
  engraving: false,
  giftWrap: true,
  care:
    'Store in the pouch provided, away from perfume, water and direct sunlight. Polish gently with a soft, dry cloth.',
}

export const products = [
  {
    ...shared,
    slug: 'solstice-hoops',
    name: 'Solstice Hoops',
    category: 'jewelry',
    categoryLabel: 'Earrings',
    price: 148,
    image: 'earrings-hoops',
    gallery: ['earrings-hoops', 'still-life', 'editorial-2'],
    badge: 'Signature',
    featured: true,
    newest: false,
    color: 'Antique gold',
    materialFamilies: ['Gold vermeil'],
    colorFamilies: ['Gold'],
    short: 'Sculptural hoops, hand-hammered so no two catch the light the same way.',
    description:
      'A study in volume and restraint. Each Solstice hoop is formed by hand, then gently hammered so the surface holds light in small, irregular flashes. Light enough to forget you are wearing them; sculptural enough to be the only thing you need.',
    details: [
      'Hand-hammered 24k gold vermeil',
      'Sold as a pair',
      '22mm outer diameter',
      'Made in small batches',
    ],
    materials: '24k gold vermeil on recycled sterling silver',
    dimensions: '22mm outer diameter · 4mm width',
    options: [
      {
        id: 'finish',
        label: 'Finish',
        values: [goldFinish, silverFinish],
      },
    ],
  },
  {
    ...shared,
    slug: 'mira-pearl-drops',
    name: 'Mira Pearl Drops',
    category: 'jewelry',
    categoryLabel: 'Earrings',
    price: 182,
    image: 'earrings-pearl',
    gallery: ['earrings-pearl', 'still-life', 'editorial'],
    badge: 'New',
    featured: false,
    newest: true,
    color: 'Pearl · Antique gold',
    materialFamilies: ['Gold vermeil', 'Pearl'],
    colorFamilies: ['Gold', 'Pearl'],
    short: 'Baroque pearls suspended from a fine gold thread.',
    description:
      'Each Mira drop is built around a single freshwater pearl, chosen for its irregular shape and soft, lived-in lustre. The gold thread is deliberately fine, so the pearl appears to float — a small, luminous interruption at the jaw.',
    details: [
      'Freshwater baroque pearls',
      '24k gold vermeil hooks',
      'Each pearl is naturally unique',
      'Made in small batches',
    ],
    materials: 'Freshwater pearls · 24k gold vermeil on recycled sterling silver',
    dimensions: 'Drop length 28–34mm · Pearl 12–16mm',
    options: [
      {
        id: 'finish',
        label: 'Hook finish',
        values: [goldFinish, silverFinish],
      },
    ],
  },
  {
    ...shared,
    slug: 'layla-layered-necklace',
    name: 'Layla Layered Necklace',
    category: 'jewelry',
    categoryLabel: 'Necklaces',
    price: 210,
    image: 'necklace',
    gallery: ['necklace', 'editorial-2', 'still-life'],
    badge: 'The Edit',
    featured: true,
    newest: false,
    color: 'Antique gold',
    materialFamilies: ['Gold vermeil', 'Pearl'],
    colorFamilies: ['Gold', 'Pearl'],
    availability: 'made-to-order',
    madeToOrder: true,
    leadTime: 'Made to order — 2–3 weeks',
    stockNote: 'Made to order in 2–3 weeks',
    engraving: true,
    sizeGuide: 'necklaces',
    short: 'Three fine chains, one quiet rhythm.',
    description:
      'Three chains of different weights — a fine trace, a curb and a whisper of pearl — designed to fall together. Wear all three as one, or separate them and build your own rhythm.',
    details: [
      'Three chains, one clasp',
      'Freshwater pearl detail',
      'Adjustable 40–46cm length',
      'Hand-finished in the studio',
    ],
    materials: '24k gold vermeil on recycled sterling silver · Freshwater pearl',
    dimensions: 'Adjustable 40–46cm · 2mm, 3mm and 4mm chains',
    options: [
      {
        id: 'length',
        label: 'Chain length',
        values: [
          { id: '40', label: '40 cm — collarbone' },
          { id: '46', label: '46 cm — upper chest' },
          { id: '50', label: '50 cm — sternum', priceDelta: 15 },
        ],
      },
      {
        id: 'finish',
        label: 'Clasp finish',
        values: [goldFinish, silverFinish],
      },
    ],
  },
  {
    ...shared,
    slug: 'nour-cuff',
    name: 'Nour Cuff',
    category: 'jewelry',
    categoryLabel: 'Bracelets',
    price: 238,
    image: 'cuff',
    gallery: ['cuff', 'still-life', 'editorial'],
    badge: 'Limited',
    featured: true,
    newest: false,
    color: 'Antique gold',
    materialFamilies: ['Gold vermeil'],
    colorFamilies: ['Gold'],
    availability: 'limited',
    leadTime: 'Limited run — dispatches in 2–3 days',
    stockNote: 'Limited run of 40',
    engraving: true,
    sizeGuide: 'bracelets',
    short: 'A wide cuff with a soft, hammered surface that follows the wrist.',
    description:
      'Weighted to be felt, shaped to be forgotten. The Nour cuff is hand-hammered across its surface, then polished just enough to keep the marks of the hammer visible. It opens gently to sit close to the wrist without a clasp.',
    details: [
      'Hand-hammered 24k gold vermeil',
      'Open cuff, adjustable fit',
      '42mm width',
      'Limited run of 40',
    ],
    materials: '24k gold vermeil on recycled sterling silver',
    dimensions: '42mm width · 58mm inner diameter · adjustable',
    options: [
      {
        id: 'finish',
        label: 'Finish',
        values: [goldFinish, silverFinish],
      },
    ],
  },
  {
    ...shared,
    slug: 'zahra-signet-ring',
    name: 'Zahra Signet Ring',
    category: 'jewelry',
    categoryLabel: 'Rings',
    price: 164,
    image: 'ring',
    gallery: ['ring', 'still-life', 'editorial-2'],
    badge: null,
    featured: false,
    newest: false,
    color: 'Pearl · Antique gold',
    materialFamilies: ['Gold vermeil', 'Pearl'],
    colorFamilies: ['Gold', 'Pearl'],
    availability: 'made-to-order',
    madeToOrder: true,
    leadTime: 'Made to order — 2–3 weeks',
    stockNote: 'Made to order in 2–3 weeks',
    engraving: true,
    sizeGuide: 'rings',
    short: 'A modern signet, set with a single baroque pearl.',
    description:
      'The Zahra takes the language of an heirloom signet and softens it — a low-profile band, a single baroque pearl, and a surface that will collect small scratches and become yours.',
    details: [
      'Freshwater baroque pearl',
      'Hand-finished 24k gold vermeil',
      'Sizes 5–9',
      'Made in small batches',
    ],
    materials: '24k gold vermeil on recycled sterling silver · Freshwater pearl',
    dimensions: 'Band 3mm · Pearl 10–13mm · Sizes 5–9',
    options: [
      {
        id: 'size',
        label: 'Ring size',
        values: ['5', '6', '7', '8', '9'].map((size) => ({
          id: size,
          label: `Size ${size}`,
        })),
      },
    ],
  },
  {
    ...shared,
    slug: 'amal-claw-clip',
    name: 'Amal Claw Clip',
    category: 'hair',
    categoryLabel: 'Hair',
    price: 68,
    image: 'hair',
    gallery: ['hair', 'still-life', 'editorial'],
    badge: null,
    featured: false,
    newest: false,
    color: 'Tortoiseshell · Gold',
    materialFamilies: ['Acetate'],
    colorFamilies: ['Tortoise'],
    short: 'A sculptural claw in warm tortoiseshell, finished with a fine gold hinge.',
    description:
      'An everyday object worth leaving on the vanity. The Amal is cut from plant-based acetate in a warm tortoiseshell, then finished with a fine gold-toned hinge and a gentle grip that holds without pulling.',
    details: [
      'Plant-based acetate',
      'Gold-toned hinge',
      '11cm length',
      'Designed for fine to medium hair',
    ],
    materials: 'Plant-based acetate · Gold-toned brass hardware',
    dimensions: '11cm × 4.5cm · 42g',
    options: [
      {
        id: 'colour',
        label: 'Colour',
        values: [
          {
            id: 'tortoiseshell',
            label: 'Warm tortoiseshell',
            swatch: 'linear-gradient(135deg, #b98a58, #5c3a22)',
          },
          {
            id: 'ivory',
            label: 'Ivory',
            swatch: 'linear-gradient(135deg, #f4ede1, #d8c7ad)',
          },
        ],
      },
    ],
  },
  {
    ...shared,
    slug: 'doha-mini-clutch',
    name: 'Doha Mini Clutch',
    category: 'bags',
    categoryLabel: 'Bags',
    price: 320,
    image: 'clutch',
    gallery: ['clutch', 'editorial', 'still-life'],
    badge: 'Signature',
    featured: true,
    newest: false,
    color: 'Espresso',
    materialFamilies: ['Leather'],
    colorFamilies: ['Espresso'],
    short: 'A compact evening clutch in espresso leather, closed with a slim gold clasp.',
    description:
      'Small enough to carry by hand, considered enough to carry everything that matters. The Doha is cut from Italian leather, lined in sand suede and closed with a slim, hand-polished clasp. Inside: a card slot, a mirror and just enough room for a phone.',
    details: [
      'Italian full-grain leather',
      'Sand suede lining',
      'Hand-polished gold clasp',
      'Detachable fine chain',
    ],
    materials: 'Italian full-grain leather · Suede lining · Gold-toned brass',
    dimensions: '22cm × 12cm × 5cm · Detachable 50cm chain',
    options: [
      {
        id: 'colour',
        label: 'Leather',
        values: [
          {
            id: 'espresso',
            label: 'Espresso',
            swatch: 'linear-gradient(135deg, #4a3527, #221a14)',
          },
          {
            id: 'sand',
            label: 'Warm sand',
            swatch: 'linear-gradient(135deg, #e6d9c6, #c9ad82)',
          },
        ],
      },
    ],
  },
  {
    ...shared,
    slug: 'rimal-sunglasses',
    name: 'Rimal Sunglasses',
    category: 'eyewear',
    categoryLabel: 'Eyewear',
    price: 195,
    image: 'sunglasses',
    gallery: ['sunglasses', 'editorial', 'still-life'],
    badge: null,
    featured: false,
    newest: false,
    color: 'Tortoiseshell · Smoke',
    materialFamilies: ['Acetate'],
    colorFamilies: ['Tortoise'],
    short: 'Oversized tortoiseshell frames with smoke lenses.',
    description:
      'A little shadow, a lot of light. Rimal is cut from plant-based acetate in a warm tortoiseshell, with smoke-brown lenses and a generous frame that flatters most faces. Comes with a soft leather case and cloth.',
    details: [
      'Plant-based acetate frame',
      'Smoke-brown CR-39 lenses',
      '100% UV protection',
      'Leather case and cloth included',
    ],
    materials: 'Plant-based acetate · CR-39 lenses',
    dimensions: 'Lens 54mm · Bridge 18mm · Temple 145mm',
    options: [
      {
        id: 'lens',
        label: 'Lens',
        values: [
          { id: 'smoke', label: 'Smoke brown' },
          { id: 'amber', label: 'Warm amber', priceDelta: 10 },
        ],
      },
    ],
  },
  {
    ...shared,
    slug: 'sirocco-silk-scarf',
    name: 'Sirocco Silk Scarf',
    category: 'silk',
    categoryLabel: 'Silk',
    price: 128,
    image: 'scarf',
    gallery: ['scarf', 'editorial-2', 'still-life'],
    badge: null,
    featured: false,
    newest: false,
    color: 'Warm sand',
    materialFamilies: ['Silk'],
    colorFamilies: ['Sand'],
    short: 'A large square of mulberry silk in warm sand, hand-rolled at the edges.',
    description:
      'Wear it at the neck, the wrist, or tied to the handle of a bag. Sirocco is printed on 16mm mulberry silk and finished with a hand-rolled edge — the kind of object that becomes a signature without trying.',
    details: [
      '16mm mulberry silk',
      'Hand-rolled edges',
      '90cm × 90cm square',
      'Printed in small runs',
    ],
    materials: '100% mulberry silk',
    dimensions: '90cm × 90cm',
    options: [
      {
        id: 'colour',
        label: 'Colour',
        values: [
          {
            id: 'sand',
            label: 'Warm sand',
            swatch: 'linear-gradient(135deg, #efe3cf, #c9ad82)',
          },
          {
            id: 'espresso',
            label: 'Espresso',
            swatch: 'linear-gradient(135deg, #6b4d39, #221a14)',
          },
        ],
      },
    ],
  },
  {
    ...shared,
    slug: 'nadia-coin-necklace',
    name: 'Nadia Coin Necklace',
    category: 'jewelry',
    categoryLabel: 'Necklaces',
    price: 176,
    image: 'editorial-2',
    gallery: ['editorial-2', 'necklace', 'still-life'],
    badge: 'New',
    featured: false,
    newest: true,
    color: 'Antique gold',
    materialFamilies: ['Gold vermeil'],
    colorFamilies: ['Gold'],
    engraving: true,
    sizeGuide: 'necklaces',
    short: 'A fine chain punctuated by a hand-stamped coin.',
    description:
      'A small, hand-stamped coin sits close to the skin on a fine gold chain. Nadia is designed to be layered with the Layla, or worn alone as a quiet point of light.',
    details: [
      'Hand-stamped coin pendant',
      '24k gold vermeil chain',
      'Adjustable 38–44cm length',
      'Made in small batches',
    ],
    materials: '24k gold vermeil on recycled sterling silver',
    dimensions: 'Adjustable 38–44cm · Coin 12mm',
    options: [
      {
        id: 'length',
        label: 'Chain length',
        values: [
          { id: '38', label: '38 cm — base of throat' },
          { id: '44', label: '44 cm — collarbone' },
          { id: '50', label: '50 cm — sternum', priceDelta: 12 },
        ],
      },
    ],
  },
]

export const sortOptions = [
  { id: 'curated', label: 'Curated' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'newest', label: 'Newest' },
  { id: 'name', label: 'Name: A–Z' },
]

export function getProduct(slug) {
  return products.find((product) => product.slug === slug)
}

export function getRelated(product, limit = 3) {
  const sameCategory = products.filter(
    (item) => item.slug !== product.slug && item.category === product.category,
  )
  const others = products.filter(
    (item) => item.slug !== product.slug && item.category !== product.category,
  )
  return [...sameCategory, ...others].slice(0, limit)
}
