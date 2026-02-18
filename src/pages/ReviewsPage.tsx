import { useState } from 'react'
import './Reviews.css'

interface ReviewsPageProps {
  reviews: Array<{ id: number; name: string; text: string; rating: number }>
  onAddReview: (review: { name: string; text: string; rating: number }) => void
}

export default function ReviewsPage({ reviews, onAddReview }: ReviewsPageProps) {
  const [formData, setFormData] = useState({ name: '', text: '', rating: 5 })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.text) {
      onAddReview({
        name: formData.name,
        text: formData.text,
        rating: formData.rating ? parseInt(formData.rating) : 5,
      })
      setFormData({ name: '', text: '', rating: 5 })
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="reviews-page">
      <div className="reviews-page__inner">
        <span className="reviews-page__label">Share Your Experience</span>
        <h1 className="reviews-page__title">Drop a Review</h1>
        <p className="reviews-page__subtitle">We'd love to hear about your experience with Eternal Frames</p>

        <div className="reviews-page__content">
          <form className="reviews-page__form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="reviews-page__input"
            />

            <select name="rating" value={formData.rating} onChange={handleChange} className="reviews-page__select">
              <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
              <option value={4}>⭐⭐⭐⭐ Very Good</option>
              <option value={3}>⭐⭐⭐ Good</option>
              <option value={2}>⭐⭐ Fair</option>
              <option value={1}>⭐ Poor</option>
            </select>

            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              placeholder="Tell us about your experience..."
              rows={5}
              required
              className="reviews-page__textarea"
            ></textarea>

            <button type="submit" className="reviews-page__submit">Submit Review</button>
            {submitted && <p className="reviews-page__success">✓ Thank you! Your review has been submitted.</p>}
          </form>

          {reviews.length > 0 && (
            <div className="reviews-page__list">
              <h2 className="reviews-page__list-title">Recent Reviews</h2>
              <div className="reviews-page__grid">
                {reviews.map((review) => (
                  <div key={review.id} className="reviews-page__card">
                    <div className="reviews-page__stars">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <span key={i} className="reviews-page__star">★</span>
                      ))}
                    </div>
                    <p className="reviews-page__text">"{review.text}"</p>
                    <p className="reviews-page__name">— {review.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
