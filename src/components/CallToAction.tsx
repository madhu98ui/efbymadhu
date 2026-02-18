import { Link } from 'react-router-dom'
import './CallToAction.css'

export default function CallToAction() {
  return (
    <section className="cta">
      <div className="cta__inner">
        <div className="cta__content">
          <span className="cta__label">Book Your Session</span>
          <h2 className="cta__title">Let's Create Magic Together</h2>
          <p className="cta__text">
            See how we capture unforgettable moments. Watch our latest wedding highlights and travel adventures.
          </p>
          <div className="cta__buttons">
            <Link to="/contact" className="cta__button cta__button--primary">
              Book Now
            </Link>
            <a href="https://instagram.com/eternalframesbymadhu" target="_blank" rel="noopener noreferrer" className="cta__button cta__button--secondary">
              Follow on Instagram
            </a>
          </div>
        </div>
        <div className="cta__media">
          <div className="cta__video-placeholder">
            <div className="cta__play-btn">▶</div>
            <p className="cta__video-text">Most Recent Reel</p>
          </div>
        </div>
      </div>
    </section>
  )
}
