const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export function ArrowUpRight({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

export function ArrowRight({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M4 12h16" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  )
}

export function ArrowDown({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M12 4v16" />
      <path d="m5 13 7 7 7-7" />
    </svg>
  )
}

export function SearchIcon({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export function Heart({ size = 18, filled = false, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      {...base}
      fill={filled ? 'currentColor' : 'none'}
      {...props}
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.7 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  )
}

export function Close({ size = 20, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  )
}

export function Menu({ size = 22, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M3 7h18" />
      <path d="M3 17h18" />
    </svg>
  )
}

export function Plus({ size = 16, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  )
}

export function Minus({ size = 16, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  )
}

export function ChevronDown({ size = 16, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function Sparkle({ size = 18, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 1.5 13.9 10l8.6 2-8.6 2-1.9 8.5L10.1 14 1.5 12l8.6-2L12 1.5Z" />
    </svg>
  )
}

export function Check({ size = 16, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  )
}

export function Trash({ size = 16, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  )
}

export function WhatsApp({ size = 18, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.16 6.46 6.6 2.02 12.05 2.02c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.88 9.89m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.49 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.16 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.48-8.4" />
    </svg>
  )
}

export function Instagram({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  )
}

export function Mail({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export function MapPin({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M20 10c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

export function ChevronLeft({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  )
}

export function ChevronRight({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  )
}

export function ArrowLeft({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M20 12H4" />
      <path d="m11 5-7 7 7 7" />
    </svg>
  )
}

export function Share({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <circle cx="18" cy="5" r="2.6" />
      <circle cx="6" cy="12" r="2.6" />
      <circle cx="18" cy="19" r="2.6" />
      <path d="m8.4 10.8 7.2-4.2" />
      <path d="m8.4 13.2 7.2 4.2" />
    </svg>
  )
}

export function Copy({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <rect x="9" y="9" width="11" height="11" rx="1" />
      <path d="M15 9V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h4" />
    </svg>
  )
}

export function ZoomIn({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  )
}

export function Gift({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <rect x="3" y="8" width="18" height="4" />
      <path d="M5 12v8h14v-8" />
      <path d="M12 8v12" />
      <path d="M12 8C12 5.5 10.5 3 8 3 6.3 3 5 4.2 5 5.6 5 7.2 7 8 12 8Z" />
      <path d="M12 8c0-2.5 1.5-5 4-5 1.7 0 3 1.2 3 2.6C19 7.2 17 8 12 8Z" />
    </svg>
  )
}

export function Ruler({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <rect x="2.5" y="8.5" width="19" height="7" rx="1" />
      <path d="M7 8.5v3M11 8.5v2M15 8.5v3M19 8.5v2" />
    </svg>
  )
}

export function Clock({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  )
}

export function Calendar({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="1" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  )
}

export function Filter({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M4 7h16M7 12h10M10 17h4" />
    </svg>
  )
}

export function CheckMark({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  )
}

export function Truck({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M3 6h11v10H3z" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="18" cy="18" r="1.6" />
    </svg>
  )
}

export function Wallet({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base} {...props}>
      <path d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      <path d="M16 12h4v4h-4a2 2 0 0 1 0-4Z" />
    </svg>
  )
}
