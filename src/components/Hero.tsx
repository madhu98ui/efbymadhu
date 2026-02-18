import './Hero.css'
import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Hero() {
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
        <Link to="/portfolio" className="hero__cta">View gallery</Link>
      </div>
    </section>
  )
}
