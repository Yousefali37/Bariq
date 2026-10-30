export default function Marquee({ items, duration = 42 }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div
        className="marquee__track"
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {items.map((item) => (
              <span className="marquee__item" key={`${copy}-${item}`}>
                {item}
                <i className="marquee__mark">✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
