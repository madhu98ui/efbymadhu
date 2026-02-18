import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
  updateFormData,
  setSubmitting,
  setSubmitSuccess,
  setSubmitError,
  resetForm,
  setSubmittedAt,
} from '../redux/slices/contactSlice'
import './Contact.css'

export default function Contact() {
  const dispatch = useAppDispatch()
  const { formData, isSubmitting, submitSuccess, submitError } = useAppSelector(
    (state) => state.contact
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }))
    dispatch(setSubmitError(null))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setSubmitting(true))
    dispatch(setSubmitError(null))

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      dispatch(setSubmitSuccess(true))
      dispatch(setSubmittedAt(new Date().toISOString()))
      dispatch(resetForm())

      // Reset success message after 5 seconds
      setTimeout(() => {
        dispatch(setSubmitSuccess(false))
        dispatch(setSubmittedAt(null))
      }, 5000)
    } catch (err) {
      dispatch(setSubmitError('Failed to send message. Please try again or email directly.'))
      console.error('Error:', err)
    } finally {
      dispatch(setSubmitting(false))
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <span className="contact__label">Get in touch</span>
        <h2 className="contact__title">Contact</h2>

        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact__card">
              <p className="contact__name">Madhu Bendrum</p>
              <p className="contact__role">Founder / Photographer</p>
              <p className="contact__heading">For bookings</p>
              <ul className="contact__list">
                <li>
                  <a href="mailto:eternalframesbymadhu@gmail.com">eternalframesbymadhu@gmail.com</a>
                </li>
                <li>
                  <a href="tel:+16823403495">682-340-3495</a>
                </li>
                <li>
                  <a href="https://instagram.com/eternalframesbymadhu" target="_blank" rel="noopener noreferrer">
                    instagram.com/eternalframesbymadhu
                  </a>
                </li>
              </ul>
              <p className="contact__site">
                <a href="https://www.efbymadhu.com" target="_blank" rel="noopener noreferrer">
                  www.efbymadhu.com
                </a>
              </p>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <label className="contact__field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </label>
            <label className="contact__field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </label>
            <label className="contact__field">
              <span>Phone <em>(optional)</em></span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(xxx) xxx-xxxx"
              />
            </label>
            <label className="contact__field">
              <span>Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Tell us about your project or booking..."
              />
            </label>
            <button type="submit" className="contact__submit" disabled={submitSuccess || isSubmitting}>
              {isSubmitting ? 'Sending...' : submitSuccess ? 'Message sent' : 'Send message'}
            </button>
            {submitError && <p className="contact__error">{submitError}</p>}
            {submitSuccess && (
              <p className="contact__thanks">
                Thanks for reaching out. We'll get back to you soon.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
