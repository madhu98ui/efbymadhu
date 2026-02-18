import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import SilkBackground from './components/SilkBackground'
import BackgroundVideo from './components/BackgroundVideo'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import PortfolioPage from './pages/PortfolioPage'
import ReviewsPage from './pages/ReviewsPage'
import { photos } from './data/photos'

export type Photo = {
  id: string
  src: string
  alt: string
  title?: string
  category: string
  width: number
  height: number
}

function App() {
  const [reviews, setReviews] = useState<Array<{ id: number; name: string; text: string; rating: number }>>([])

  const handleAddReview = (newReview: { name: string; text: string; rating: number }) => {
    setReviews((prev) => [
      {
        id: Date.now(),
        ...newReview,
      },
      ...prev,
    ])
  }

  return (
    <Router>
      <SilkBackground />
      <BackgroundVideo />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage photos={photos} reviews={reviews} />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/reviews" element={<ReviewsPage reviews={reviews} onAddReview={handleAddReview} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
