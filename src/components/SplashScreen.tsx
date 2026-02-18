import { useEffect, useState } from 'react'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 300) // Wait for fade out animation
    }, 2000) // Show splash screen for 2 seconds

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={`splash-screen ${isVisible ? 'splash-screen--visible' : 'splash-screen--hidden'}`}>
      <div className="splash-screen__overlay" />
      <div className="splash-screen__content">
        <div className="splash-screen__logo-wrap">
          <img
            src="/efgoldsmall@3x.png"
            alt="Eternal Frames by Madhu"
            className="splash-screen__logo"
          />
        </div>
      </div>
    </div>
  )
}
