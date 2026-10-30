import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    const node = ref.current
    if (!node) return undefined

    let frame = 0
    let x = 0
    let y = 0

    const paint = () => {
      frame = 0
      node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }

    const onMove = (event) => {
      x = event.clientX
      y = event.clientY
      node.classList.add('is-visible')
      if (!frame) frame = window.requestAnimationFrame(paint)
      const interactive = event.target.closest?.('[data-cursor="view"]')
      node.classList.toggle('is-view', Boolean(interactive))
    }

    const onLeave = () => node.classList.remove('is-visible')
    const onEnter = () => node.classList.add('is-visible')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerenter', onEnter)
    document.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerenter', onEnter)
      document.removeEventListener('pointerleave', onLeave)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor__label">View</span>
    </div>
  )
}
