import { useId } from 'react'
import { useCurrency } from '../hooks/useCurrency'
import { Check, Gift, Sparkle } from './Icons'

export const ENGRAVING_PRICE = 25
const MAX_ENGRAVING = 12

export default function ProductExtras({
  product,
  giftWrap,
  onGiftWrap,
  engraving,
  onEngraving,
  engravingText,
  onEngravingText,
}) {
  const id = useId()
  const { format } = useCurrency()

  return (
    <div className="product-extras">
      <label className="addon" htmlFor={`${id}-gift`}>
        <input
          id={`${id}-gift`}
          type="checkbox"
          checked={giftWrap}
          onChange={(event) => onGiftWrap(event.target.checked)}
        />
        <span className="addon__box" aria-hidden="true">
          {giftWrap ? <Check size={12} /> : null}
        </span>
        <Gift size={16} />
        <span className="addon__text">
          <strong>Complimentary gift wrap</strong>
          <span>Ivory paper, gold thread, a handwritten note if you wish.</span>
        </span>
      </label>

      {product.engraving ? (
        <div className={`addon addon--engraving ${engraving ? 'is-active' : ''}`}>
          <label className="addon__row" htmlFor={`${id}-engraving`}>
            <input
              id={`${id}-engraving`}
              type="checkbox"
              checked={engraving}
              onChange={(event) => onEngraving(event.target.checked)}
            />
            <span className="addon__box" aria-hidden="true">
              {engraving ? <Check size={12} /> : null}
            </span>
            <Sparkle size={16} />
            <span className="addon__text">
              <strong>Hand engraving — {format(ENGRAVING_PRICE)}</strong>
              <span>Up to 12 characters, adds 3–5 days. We confirm the wording first.</span>
            </span>
          </label>

          {engraving ? (
            <div className="engraving-field">
              <label htmlFor={`${id}-engraving-text`} className="visually-hidden">
                Engraving text
              </label>
              <input
                id={`${id}-engraving-text`}
                type="text"
                maxLength={MAX_ENGRAVING}
                value={engravingText}
                onChange={(event) => onEngravingText(event.target.value)}
                placeholder="e.g. M. 12.10.26"
                autoComplete="off"
              />
              <span className="engraving-field__count">
                {engravingText.length}/{MAX_ENGRAVING}
              </span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
