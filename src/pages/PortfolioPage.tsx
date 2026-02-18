import { useState } from 'react'
import '../pages/Portfolio.css'
import Lightbox from '../components/Lightbox'
import { Photo } from '../App'

// List your actual image filenames here for each category
const weddingFilenames: string[] = [
  // Add your wedding image filenames here, e.g. 'wedding1.jpg', 'wedding2.jpg'
];
const travelFilenames: string[] = [
  'travelimage1.jpg','travelimage2.jpg','travelimage3.jpg','travelimage4.jpg','travelimage5.jpg','travelimage6.jpg','travelimage7.jpg','travelimage8.jpg','travelimage9.jpg','travelimage10.jpg','travelimage11.jpg','travelimage12.jpg','travelimage13.jpg','travelimage14.png','travelimage15.jpg','travelimage16.jpg','travelimage17.jpg','travelimage19.jpg','travelimage20.jpg','travelimage21.jpg','travelimage22.jpg',
];
const wallpaperFilenames: string[] = [
  'wallpaperimage1.jpg','wallpaperimage2.jpg','wallpaperimage3.jpg','wallpaperimage4.jpg','wallpaperimage5.jpg','wallpaperimage6.jpg','wallpaperimage7.png','wallpaperimage8.jpg','wallpaperimage9.jpg','wallpaperimage10.jpg','wallpaperimage11.jpg','wallpaperimage12.jpg','wallpaperimage13.jpg','wallpaperimage14.jpg',
];

function makePhotoArray(filenames: string[], category: string): Photo[] {
  return filenames.map((filename, idx) => ({
    id: `${category}${idx+1}`,
    src: `/images/${category}/${filename}`,
    alt: `${category.charAt(0).toUpperCase() + category.slice(1)} ${idx+1}`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} ${idx+1}`,
    category: category === 'wallpaper' ? 'wallpapers' : category === 'wedding' ? 'weddings' : category,
    width: 600,
    height: 400,
  }));
}

const portfolioPhotos: Photo[] = [
  ...makePhotoArray(weddingFilenames, 'wedding'),
  ...makePhotoArray(travelFilenames, 'travel'),
  ...makePhotoArray(wallpaperFilenames, 'wallpaper'),
];

export default function PortfolioPage() {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('weddings')
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
