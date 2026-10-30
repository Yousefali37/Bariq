import { useId } from 'react'

export default function CircularSeal({ className = '' }) {
  const rawId = useId()
  const pathId = `seal-${rawId.replace(/:/g, '')}`

  return (
    <svg
      className={`circular-seal ${className}`.trim()}
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <path
          id={pathId}
          d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
        />
      </defs>
      <g className="circular-seal__ring">
        <text>
          <textPath href={`#${pathId}`} startOffset="0">
            HAND-FINISHED · SMALL BATCHES · BARIQ ·
          </textPath>
        </text>
      </g>
      <path
        className="circular-seal__star"
        d="M60 47.5 62.4 57.6 72.5 60 62.4 62.4 60 72.5 57.6 62.4 47.5 60 57.6 57.6 60 47.5Z"
      />
    </svg>
  )
}
