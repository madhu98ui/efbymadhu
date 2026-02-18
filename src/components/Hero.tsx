import './Hero.css'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

export default function Hero() {
  const navigate = useNavigate()
  
  const handleGalleryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked!', e)
    navigate('/portfolio')
  }

  return (
    <section className="hero">
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="hero__logo-wrap">
          <Logo
            src="/logo-full.png"
            alt="Eternal Frames by Madhu"
            className="hero__logo"
          />
        </div>
        <p className="hero__tagline">
          Moments captured. Timeless frames.
        </p>
        <button 
          className="hero__cta" 
          onClick={handleGalleryClick}
          type="button"
        >
          View gallery
        </button>
      </div>
    </section>
  )
}
