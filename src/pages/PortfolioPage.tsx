import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../pages/Portfolio.css'
import Lightbox from '../components/Lightbox'
import {
  loadPhotos,
  downloadImage,
  setActiveCategory,
  toggleLike,
  setLightboxPhoto,
  closeLightbox,
  clearError,
} from '../redux/slices/portfolioSlice'
import {
  selectFilteredPhotos,
  selectActiveCategory,
  selectLikedPhotos,
  selectLightboxPhoto,
  selectPortfolioLoading,
  selectPortfolioError,
  selectLightboxIndex,
} from '../redux/selectors/portfolioSelectors'
import type { AppDispatch } from '../redux/store'

export default function PortfolioPage() {
  const dispatch = useDispatch<AppDispatch>()
  
  // Select state from Redux
  const filteredPhotos = useSelector(selectFilteredPhotos)
  const activeCategory = useSelector(selectActiveCategory)
  const likedPhotos = useSelector(selectLikedPhotos)
  const lightboxPhoto = useSelector(selectLightboxPhoto)
  const loading = useSelector(selectPortfolioLoading)
  const error = useSelector(selectPortfolioError)
  const lightboxIndex = useSelector(selectLightboxIndex)

  // Load photos on mount
  useEffect(() => {
    dispatch(loadPhotos())
  }, [dispatch])

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [error, dispatch])

  const handleCategoryChange = (category: string) => {
    dispatch(setActiveCategory(category))
  }

  const handleToggleLike = (photoId: string) => {
    dispatch(toggleLike(photoId))
  }

  const handleOpenLightbox = (photo: any) => {
    dispatch(setLightboxPhoto(photo))
  }

  const handleCloseLightbox = () => {
    dispatch(closeLightbox())
  }

  const handleNavigateLightbox = (index: number) => {
    if (filteredPhotos[index]) {
      dispatch(setLightboxPhoto(filteredPhotos[index]))
    }
  }

  const handleDownloadImage = (photo: any) => {
    dispatch(downloadImage(photo))
  }

  if (loading) {
    return (
      <section className="portfolio">
        <div className="portfolio__inner">
          <span className="gallery__label">Portfolio</span>
          <h2 className="gallery__title">Loading...</h2>
        </div>
      </section>
    )
  }

  return (
    <section className="portfolio">
      <div className="portfolio__inner">
        <span className="gallery__label">Portfolio</span>
        <h2 className="gallery__title">Our Work</h2>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#ef4444',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '14px',
          }}>
            {error}
          </div>
        )}

        {/* Category Tabs */}
        <div className="portfolio__tabs">
          {['weddings', 'travel', 'wallpapers'].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`portfolio__tab ${activeCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery__grid">
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="gallery__item"
                onClick={() => handleOpenLightbox(photo)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                />
                <div className="gallery__item-overlay">
                  <button
                    className={`gallery__like-btn ${likedPhotos.includes(photo.id) ? 'liked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggleLike(photo.id)
                    }}
                    title="Like this photo"
                  >
                    ❤️
                  </button>
                  <button
                    className="gallery__download-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownloadImage(photo)
                    }}
                    title="Download this photo"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="gallery__coming-soon">
              <h3>Exciting Work Coming Soon!</h3>
              <p>We're curating the best {activeCategory} moments for you. Check back soon.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={handleCloseLightbox}
          allPhotos={filteredPhotos}
          currentIndex={lightboxIndex}
          onNavigate={handleNavigateLightbox}
          likedPhotos={new Set(likedPhotos)}
          onToggleLike={handleToggleLike}
          onDownload={handleDownloadImage}
        />
      )}
    </section>
  )
}
