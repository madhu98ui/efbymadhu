import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Header.css'
import Logo from './Logo'

export default function Header() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/')
    setTimeout(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="header__logo" aria-label="Eternal Frames by Madhu - Home">
        <Logo className="header__logo-img" alt="Eternal Frames by Madhu" />
      </Link>
      <nav className="header__nav">
        <a href="/" onClick={handleHomeClick} className="nav-link">Home</a>
        <Link to="/portfolio">Portfolio</Link>
        <a href="/" onClick={handleAboutClick} className="nav-link">About</a>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  )
}
