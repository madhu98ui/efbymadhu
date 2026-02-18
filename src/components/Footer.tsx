import './Footer.css'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo className="footer__logo-img" alt="Eternal Frames by Madhu" />
          <p className="footer__tagline">Relive Moments</p>
        </div>
        <div className="footer__links">
          <a href="mailto:eternalframesbymadhu@gmail.com">Mail</a>
          <a href="https://instagram.com/eternalframesbymadhu" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.efbymadhu.com" target="_blank" rel="noopener noreferrer">www.efbymadhu.com</a>
        </div>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} Eternal Frames by Madhu. All rights reserved.</p>
    </footer>
  )
}
