import { config } from '../config'
import { formatMoney } from '../services/currency'

export const site = {
  name: 'Bariq',
  nameAr: 'بريق',
  tagline: 'Waterproof stainless steel jewelry.',
  description:
    'Bariq is an Egyptian jewelry house crafting waterproof stainless-steel pieces in gold and silver finishes — necklaces, rings, earrings and bracelets, delivered across Egypt.',
  url: config.siteUrl,
  instagram: config.instagramUrl,
  instagramHandle: config.instagramHandle,
  location: 'Cairo, Egypt · Delivery to all governorates',
  hours: 'Saturday – Thursday, 10:00 – 20:00 EET',
  currency: 'EGP',
  orderNote:
    'Every order is placed by Instagram DM. Send us the piece you love and we will confirm availability, delivery and cash on delivery personally.',
  paymentNote: 'Cash on delivery',
  deliveryNote:
    'Delivery to all Egyptian governorates. The shipping fee depends on your city and is confirmed before dispatch.',
  returnsNote:
    'If something is not right, message us on Instagram before returning anything and we will find a solution together.',
  shippingNote:
    'Delivery to all governorates. Shipping is calculated by city and paid in cash on delivery.',
}

export const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Our Story', to: '/story' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export const productCategories = [
  { id: 'all', label: 'All pieces', note: 'The complete collection' },
  { id: 'necklaces', label: 'Necklaces', note: 'At the collarbone' },
  { id: 'rings', label: 'Rings', note: 'For every finger' },
  { id: 'earrings', label: 'Earrings', note: 'Light at the ear' },
  { id: 'bracelets', label: 'Bracelets', note: 'On the wrist' },
]

export const values = [
  {
    number: 'I',
    title: 'Made to get wet',
    body: 'Every piece is crafted from high-grade stainless steel, so it can follow you from the shower to the sea. Waterproof, tarnish-resistant and made for real life.',
  },
  {
    number: 'II',
    title: 'Gold that stays gold',
    body: 'Our warm gold finish is applied with a durable PVD process over stainless steel. It keeps its colour through daily wear — no delicate plating to protect.',
  },
  {
    number: 'III',
    title: 'Designed for every day',
    body: 'Quiet shapes, comfortable weight and a finish that works with everything you already own. Pieces to put on and forget you are wearing.',
  },
]

export const process = [
  {
    number: '01',
    title: 'Choose',
    body: 'We begin with high-grade 316L stainless steel — chosen for its strength, its resistance to water and its ability to hold a fine polish.',
  },
  {
    number: '02',
    title: 'Finish',
    body: 'Each piece is shaped, polished and finished in gold PVD or brushed silver. The finish is bonded to the steel rather than layered on top.',
  },
  {
    number: '03',
    title: 'Check',
    body: 'Every order is inspected by hand, wrapped carefully and sent from Cairo to your door — anywhere in Egypt.',
  },
]

export const faqs = [
  {
    id: 'order',
    title: 'How do I place an order?',
    body: 'Orders are placed through Instagram DM. Open any piece, tap “Order on Instagram”, and send us the piece name and your city. We will confirm availability, the delivery fee and cash on delivery.',
  },
  {
    id: 'waterproof',
    title: 'Is the jewelry really waterproof?',
    body: 'Yes. Our pieces are made from high-grade stainless steel with a PVD gold or silver finish. They are designed to be worn in water and will not tarnish like plated brass. We still recommend avoiding harsh chemicals and perfume to keep the finish looking its best.',
  },
  {
    id: 'delivery',
    title: 'Do you deliver outside Cairo?',
    body: 'We deliver to all Egyptian governorates. The shipping fee depends on your city and is confirmed with you on Instagram before dispatch. Orders are usually delivered within 2–5 working days.',
  },
  {
    id: 'payment',
    title: 'How do I pay?',
    body: 'We offer cash on delivery. You pay the courier when your order arrives. The exact total, including the city delivery fee, is confirmed before dispatch.',
  },
  {
    id: 'sold-out',
    title: 'What does “Sold out” mean?',
    body: 'Sold-out pieces stay on the site so you can still see them and save them to your wishlist. Message us on Instagram and we will let you know when the piece is back.',
  },
  {
    id: 'sizing',
    title: 'How do I find my ring or chain size?',
    body: 'Each piece page includes a size guide with ring diameters, chain lengths and bracelet measurements. If you are between sizes, send us a message on Instagram and we will help you choose.',
  },
  {
    id: 'care',
    title: 'How should I care for my pieces?',
    body: 'Rinse with fresh water after swimming, dry with a soft cloth, and store separately to avoid scratches. Avoid perfume, chlorine and abrasive cleaners. Stainless steel is forgiving, but a little care keeps the finish bright.',
  },
  {
    id: 'returns',
    title: 'Can I return a piece?',
    body: 'If something is not right, message us on Instagram before returning anything. Unworn pieces in their original packaging can usually be returned within 14 days; made-to-order and personalised pieces are final sale.',
  },
]

export const testimonials = [
  {
    quote:
      'I wear the gold necklace in the shower, at the gym and to the sea. It still looks new.',
    name: 'Mariam',
    place: 'Cairo',
    piece: 'Nadia Coin Necklace',
  },
  {
    quote:
      'The earrings are light enough for all day and the gold is exactly the warm tone I wanted.',
    name: 'Nour',
    place: 'Alexandria',
    piece: 'Nour Drop Earrings',
  },
  {
    quote:
      'Ordering on Instagram was simple, and the delivery to Assiut was faster than I expected.',
    name: 'Salma',
    place: 'Assiut',
    piece: 'Aya Bangle',
  },
]

export const sizeGuides = {
  rings: {
    title: 'Ring sizes',
    intro:
      'Measure the inner diameter of a ring that fits you, or wrap a strip of paper around your finger and measure its length. If you are between sizes, choose the larger — or ask us on Instagram.',
    columns: ['Bariq size', 'Inner diameter', 'Circumference', 'UK', 'US'],
    rows: [
      ['5', '15.7 mm', '49.3 mm', 'J½', '5'],
      ['6', '16.5 mm', '51.9 mm', 'L½', '6'],
      ['7', '17.3 mm', '54.4 mm', 'N½', '7'],
      ['8', '18.1 mm', '57.0 mm', 'P½', '8'],
      ['9', '18.9 mm', '59.5 mm', 'R½', '9'],
    ],
    note: 'Stainless-steel bands are strong and hold their shape. If you are unsure, message us and we will help you choose.',
  },
  necklaces: {
    title: 'Chain lengths',
    intro:
      'Chain lengths are measured end to end, including the clasp. The guide below shows where each length tends to fall.',
    columns: ['Length', 'Falls at', 'Best with'],
    rows: [
      ['38 cm', 'Base of the throat', 'A high neckline, alone'],
      ['40 cm', 'Collarbone', 'Fine pendants, layering'],
      ['45 cm', 'Upper chest', 'A single coin or pearl'],
      ['50 cm', 'Sternum', 'Over knitwear and silk'],
    ],
    note: 'Most chains include a short extender. Tell us your preferred fit on Instagram and we will set the clasp before dispatch.',
  },
  bracelets: {
    title: 'Bracelets & bangles',
    intro:
      'Measure the circumference of your wrist just below the wrist bone, then add 1–1.5 cm for a comfortable fit.',
    columns: ['Bariq size', 'Wrist circumference', 'Fit'],
    rows: [
      ['S', '14–15 cm', 'Close'],
      ['M', '15–17 cm', 'Classic'],
      ['L', '17–19 cm', 'Relaxed'],
    ],
    note: 'If you are between sizes, choose the larger size for a relaxed fit or message us for advice.',
  },
}

export const appointmentCities = ['Cairo', 'Alexandria', 'Online']

function instagramUsername() {
  return site.instagramHandle.replace(/^@/, '')
}

/**
 * Instagram DM deep link. Instagram does not support reliably prefilling a DM,
 * so the site also offers a “copy order details” action beside this link.
 */
export function buildInstagramLink() {
  return `https://ig.me/m/${instagramUsername()}`
}

export function buildInstagramProfileLink() {
  return site.instagram
}

// Kept for non-component helpers. Components read the active currency from
// CurrencyContext instead.
export function formatPrice(value) {
  return formatMoney(value, site.currency)
}

export function formatPriceIn(value, code) {
  return formatMoney(value, code)
}
