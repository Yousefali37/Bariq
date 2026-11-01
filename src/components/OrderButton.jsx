import { useState } from 'react'
import { buildInstagramLink } from '../data/site'
import { copyText } from '../services/clipboard'
import { Instagram } from './Icons'

/**
 * Instagram is the only order channel. Instagram cannot reliably prefill a DM,
 * so we open the inbox and copy the piece details for the customer to paste.
 */
export default function OrderButton({
  message = '',
  label = 'Order on Instagram',
  copiedLabel = 'Copied — opening Instagram',
  className = 'btn btn--dark',
  iconSize = 17,
}) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    window.open(buildInstagramLink(), '_blank', 'noopener,noreferrer')
    if (!message) return
    copyText(message).then((ok) => {
      if (!ok) return
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2600)
    })
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      <Instagram size={iconSize} />
      {copied ? copiedLabel : label}
    </button>
  )
}
