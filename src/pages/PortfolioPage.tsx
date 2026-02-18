import { useState } from 'react'
import '../pages/Portfolio.css'
import Lightbox from '../components/Lightbox'
import { Photo } from '../App'

// Image filenames for each category
const travelFilenames: string[] = [
  'travel3.jpg','travel4.jpg','travel6.jpg','travel7.jpg','travel16.jpg','travel17.jpg','travel20.jpg','travel22.jpg',
];

const wallpaperFilenames: string[] = [
  'wallpaper2.jpg','wallpaper3.jpg','wallpaper4.jpg','wallpaper5.jpg','wallpaper6.jpg',
  'wallpaper8.jpg','wallpaper9.jpg','wallpaper10.jpg','wallpaper11.jpg','wallpaper12.jpg','wallpaper13.jpg','wallpaper14.jpg',
];

const weddingFilenames: string[] = [];

function makePhotoArray(filenames: string[], category: string): Photo[] {
  return filenames.map((filename, idx) => ({
    id: `${category}${idx+1}`,
    src: `/websiteimages/web${category}/${filename}`,
    alt: `${category.charAt(0).toUpperCase() + category.slice(1)} ${idx+1}`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} ${idx+1}`,
    category: category === 'wallpaper' ? 'wallpapers' : category === 'wedding' ? 'weddings' : category,
    width: 600,
    height: 400,
  }));
}

const portfolioPhotos: Photo[] = [
  ...makePhotoArray(travelFilenames, 'travel'),
  ...makePhotoArray(wallpaperFilenames, 'wallpaper'),
  ...makePhotoArray(weddingFilenames, 'wedding'),
];

export default function PortfolioPage() {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('travel')
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set())

  const filteredPhotos = portfolioPhotos.filter((photo) => photo.category === activeCategory)

  const toggleLike = (photoId: string) => {
    setLikedPhotos((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(photoId)) {
        newSet.delete(photoId)
      } else {
        newSet.add(photoId)
      }
      return newSet
    })
  }

  const downloadImage = (photo: Photo) => {
    try {
      // Get the file extension from the image source
      const extension = photo.src.split('.').pop()?.toLowerCase() || 'jpg'
      const filename = `${photo.title || 'image'}.${extension}`
      
      const link = document.createElement('a')
      link.href = photo.src
      link.download = filename
      link.setAttribute('crossorigin', 'anonymous')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('Download failed:', err)
    }
  }

  return (
    <section className="portfolio">
      <div className="portfolio__inner">
        <span className="gallery__label">Portfolio</span>
        <h2 className="gallery__title">Our Work</h2>

        {/* Category Tabs */}
        <div className="portfolio__tabs">
          {['weddings', 'travel', 'wallpapers'].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
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
                onClick={() => setLightboxPhoto(photo)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                />
                <div className="gallery__item-overlay">
                  <button
                    className={`gallery__like-btn ${likedPhotos.has(photo.id) ? 'liked' : ''}`}
                    onClick={() => toggleLike(photo.id)}
                    title="Like this photo"
                  >
                    ❤️
                  </button>
                  <button
                    className="gallery__download-btn"
                    onClick={() => downloadImage(photo)}
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
          onClose={() => setLightboxPhoto(null)}
          allPhotos={filteredPhotos}
          currentIndex={filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id)}
          onNavigate={(index) => setLightboxPhoto(filteredPhotos[index])}
          likedPhotos={likedPhotos}
          onToggleLike={(photoId) => toggleLike(photoId)}
          onDownload={downloadImage}
        />
      )}
    </section>
  )
}
