import { config } from '../config'
import { formatMoney } from '../services/currency'

export const site = {
  name: 'Bariq',
  nameAr: 'بريق',
  tagline: 'Objects of quiet light.',
  description:
    'Bariq is a house of hand-finished jewelry and considered accessories — objects made to catch the light and be kept.',
  url: config.siteUrl,
  whatsapp: config.whatsapp,
  whatsappDisplay: config.whatsappDisplay,
  email: config.email,
  instagram: config.instagramUrl,
  instagramHandle: config.instagramHandle,
  location: 'Dubai · London · Worldwide',
  hours: 'Sunday – Thursday, 10:00 – 18:00 GST',
  appointment:
    'Private appointments are available in Dubai and London, and virtually worldwide.',
  currency: 'USD',
  shippingNote:
    'Complimentary worldwide shipping over $250. Duties and taxes are quoted with your order.',
}

export const navLinks = [
  { label: 'Collections', to: '/collections' },
  { label: 'Edits', to: '/edits' },
  { label: 'Journal', to: '/journal' },
  { label: 'Our Story', to: '/story' },
]

export const announcement =
  'Complimentary worldwide shipping over $250 · Private appointments · Hand-finished in small batches'

export const productCategories = [
  { id: 'all', label: 'All pieces' },
  { id: 'jewelry', label: 'Jewelry' },
  { id: 'hair', label: 'Hair' },
  { id: 'bags', label: 'Bags' },
  { id: 'eyewear', label: 'Eyewear' },
  { id: 'silk', label: 'Silk' },
]

export const values = [
  {
    number: 'I',
    title: 'Hand-finished',
    body: 'Every piece is shaped, polished and assembled by hand in small batches. The slight irregularities are not flaws — they are the signature of the maker.',
  },
  {
    number: 'II',
    title: 'Considered materials',
    body: 'Recycled sterling silver, 24k gold vermeil, freshwater pearls, Italian leather and plant-based acetate. Chosen for how they age, not how they photograph.',
  },
  {
    number: 'III',
    title: 'Made to be kept',
    body: 'We design against the season. Pieces that sit easily with what you already own, and grow more personal with every wear.',
  },
]

export const process = [
  {
    number: '01',
    title: 'Source',
    body: 'We begin with material — a baroque pearl with an imperfect silhouette, a hide with a soft hand, a length of mulberry silk. The object follows the material.',
  },
  {
    number: '02',
    title: 'Shape',
    body: 'Forms are drawn by hand, then refined until they feel inevitable. We remove everything that does not earn its place.',
  },
  {
    number: '03',
    title: 'Finish',
    body: 'Each piece is polished, inspected and wrapped in the studio. No two catch the light in exactly the same way.',
  },
]

export const faqs = [
  {
    id: 'order',
    title: 'How do I place an order?',
    body: 'Every piece is available by private inquiry. Use the WhatsApp button on any product page or write to our concierge. We will confirm availability, shipping and payment personally.',
  },
  {
    id: 'shipping',
    title: 'Do you ship worldwide?',
    body: 'Yes. Orders are shipped worldwide with tracked, insured delivery. Shipping is complimentary on orders over $250. Duties and taxes are quoted with your order.',
  },
  {
    id: 'lead-time',
    title: 'How long will my piece take?',
    body: 'In-stock pieces are dispatched within 2–3 business days. Made-to-order and personalized pieces take 2–3 weeks, and we will keep you updated at every stage.',
  },
  {
    id: 'appointments',
    title: 'Can I request a private appointment?',
    body: 'Absolutely. We offer private appointments in Dubai and London, and virtual appointments worldwide. Tell us what you are looking for and we will arrange a time.',
  },
  {
    id: 'care',
    title: 'How should I care for my pieces?',
    body: 'Store gold vermeil and pearls in the pouch provided, away from perfume, water and direct sunlight. Polish gently with a soft, dry cloth. We are happy to advise on care for any piece.',
  },
  {
    id: 'returns',
    title: 'What is your return policy?',
    body: 'Unworn pieces in their original packaging may be returned within 14 days of delivery. Made-to-order and personalized pieces are final sale. Please contact the concierge before returning anything.',
  },
  {
    id: 'engraving',
    title: 'Can a piece be engraved or gift-wrapped?',
    body: 'Gift wrapping is complimentary on every order. Hand engraving is available on selected gold pieces for $25 and adds 3–5 days. Choose your options on the piece page and we will confirm the wording with you before work begins.',
  },
  {
    id: 'sizing',
    title: 'How do I find my ring or chain size?',
    body: 'Each piece page includes a size guide with ring diameters, chain lengths and bracelet measurements. If you are between sizes, the concierge can advise — or arrange a virtual fitting.',
  },
]

export const testimonials = [
  {
    quote:
      'The cuff arrived wrapped like something from an archive. It has not left my wrist since.',
    name: 'Mira',
    place: 'Dubai',
    piece: 'Nour Cuff',
  },
  {
    quote:
      'I asked for a pearl that leaned a little to the left. They found one. That is the whole house, really.',
    name: 'Lena',
    place: 'London',
    piece: 'Mira Pearl Drops',
  },
  {
    quote:
      'A quiet, personal service — and a clutch that survived a wedding, a flight and a very long evening.',
    name: 'Sara',
    place: 'New York',
    piece: 'Doha Mini Clutch',
  },
]

export const sizeGuides = {
  rings: {
    title: 'Ring sizes',
    intro:
      'Measure the inner diameter of a ring that fits you, or wrap a strip of paper around your finger and measure its length. If you are between sizes, choose the larger — or ask us.',
    columns: ['Bariq size', 'Inner diameter', 'Circumference', 'UK', 'US'],
    rows: [
      ['5', '15.7 mm', '49.3 mm', 'J½', '5'],
      ['6', '16.5 mm', '51.9 mm', 'L½', '6'],
      ['7', '17.3 mm', '54.4 mm', 'N½', '7'],
      ['8', '18.1 mm', '57.0 mm', 'P½', '8'],
      ['9', '18.9 mm', '59.5 mm', 'R½', '9'],
    ],
    note: 'Hand-finished bands may vary by up to 0.3 mm. Complimentary resizing is offered once within 30 days on selected rings.',
  },
  necklaces: {
    title: 'Chain lengths',
    intro:
      'Chain lengths are measured end to end, including the clasp. The illustration below shows where each length tends to fall.',
    columns: ['Length', 'Falls at', 'Best with'],
    rows: [
      ['38 cm', 'Base of the throat', 'A high neckline, alone'],
      ['40 cm', 'Collarbone', 'Fine pendants, layering'],
      ['46 cm', 'Upper chest', 'A single coin or pearl'],
      ['50 cm', 'Sternum', 'Over knitwear and silk'],
    ],
    note: 'Most chains include a 4–6 cm extender. Tell us your preferred fit and we will set the clasp before dispatch.',
  },
  bracelets: {
    title: 'Bracelets & cuffs',
    intro:
      'Measure the circumference of your wrist just below the wrist bone, then add 1–1.5 cm for a comfortable fit. Cuffs are open and gently adjustable.',
    columns: ['Bariq size', 'Wrist circumference', 'Fit'],
    rows: [
      ['S', '14–15 cm', 'Close'],
      ['M', '15–17 cm', 'Classic'],
      ['L', '17–19 cm', 'Relaxed'],
    ],
    note: 'To adjust an open cuff, apply gentle pressure with both thumbs and never bend the metal back and forth repeatedly.',
  },
}

export const appointmentCities = ['Dubai', 'London', 'Virtual']

export function buildWhatsAppLink(message) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export function buildEmailLink(subject, body) {
  return `mailto:${site.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
}

// Kept for non-component helpers. Components read the active currency from
// CurrencyContext instead, so visitors see their chosen currency everywhere.
export function formatPrice(value) {
  return formatMoney(value, site.currency)
}

export function formatPriceIn(value, code) {
  return formatMoney(value, code)
}
