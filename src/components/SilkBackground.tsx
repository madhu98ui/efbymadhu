import { useEffect, useRef } from 'react'
import './SilkBackground.css'

const MOUSE_STRENGTH = 20

export default function SilkBackground() {
  const elRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const onMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth
      const h = window.innerHeight
      mouseRef.current = {
        x: (e.clientX / w - 0.5) * 2,
        y: (e.clientY / h - 0.5) * 2,
      }
    }

    const update = () => {
      const { x, y } = mouseRef.current
      const targetX = x * MOUSE_STRENGTH
      const targetY = y * MOUSE_STRENGTH

      currentRef.current.x += (targetX - currentRef.current.x) * 0.08
      currentRef.current.y += (targetY - currentRef.current.y) * 0.08

      el.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px)`
      rafRef.current = requestAnimationFrame(update)
    }
    rafRef.current = requestAnimationFrame(update)

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <div ref={elRef} className="silk-bg" aria-hidden="true" />
}
