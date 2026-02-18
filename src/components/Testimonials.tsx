import { Link } from 'react-router-dom'
import './Testimonials.css'

interface TestimonialsProps {
  reviews: Array<{ id: number; name: string; text: string; rating: number }>
}

export default function Testimonials({ reviews }: TestimonialsProps) {
  return (
    <section className="testimonials">
      <div className="testimonials__inner">
        <span className="testimonials__label">Client Reviews</span>
        <h2 className="testimonials__title">What Clients Say</h2>

        {reviews.length > 0 ? (
          <div className="testimonials__grid">
            {reviews.map((review) => (
              <div key={review.id} className="testimonials__card">
                <div className="testimonials__stars">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="testimonials__star">★</span>
                  ))}
                </div>
                <p className="testimonials__text">"{review.text}"</p>
                <p className="testimonials__name">— {review.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="testimonials__empty">No reviews yet. Be the first to share your experience!</p>
        )}

        <div className="testimonials__cta">
          <Link to="/reviews" className="testimonials__button">Drop a Review</Link>
        </div>
      </div>
    </section>
  )
}
