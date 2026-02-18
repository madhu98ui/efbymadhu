import { useState } from 'react'
import '../pages/Updates.css'
import Lightbox from '../components/Lightbox'
import { Photo } from '../App'

// Wallpaper Wednesday filenames - Add new ones here every Wednesday!
const wednesdayWallpaperFilenames: string[] = [
  'IMG_8402.jpg',
  // Add new images here each Wednesday like:
  // 'IMG_8403.jpg',
  // 'IMG_8404.jpg',
];

function makeWednesdayPhotos(filenames: string[]): Photo[] {
  return filenames.map((filename, idx) => ({
    id: `wednesday${idx+1}`,
    src: `/websiteimages/wednesdaywall/${filename}`,
    alt: `Wallpaper Wednesday ${idx+1}`,
    title: `Wallpaper Wednesday ${idx+1}`,
    category: 'wallpaper',
    width: 600,
    height: 400,
  }));
}

const wednesdayPhotos = makeWednesdayPhotos(wednesdayWallpaperFilenames);

export default function UpdatesPage() {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null)
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set())

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
      const extension = photo.src.split('.').pop()?.toLowerCase() || 'jpg'
      const filename = `${photo.title || 'wallpaper'}.${extension}`
      
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

  const latestPhoto = wednesdayPhotos[wednesdayPhotos.length - 1]

  return (
    <section className="updates">
      <div className="updates__inner">
        <span className="gallery__label">Updates</span>
        <h2 className="gallery__title">Wallpaper Wednesday</h2>
        
        {/* Latest Wallpaper Wednesday */}
        {latestPhoto && (
          <div className="updates__featured">
            <div className="updates__featured-image">
              <img 
                src={latestPhoto.src} 
                alt={latestPhoto.alt}
                onClick={() => setLightboxPhoto(latestPhoto)}
              />
              <p className="updates__featured-text">This Week's Wallpaper</p>
            </div>
            <div className="updates__featured-info">
              <h3>Download This Week's Wallpaper</h3>
              <p>Every Wednesday, we share a new beautiful wallpaper for your devices.</p>
              <button 
                className="updates__download-btn"
                onClick={() => downloadImage(latestPhoto)}
              >
                Download Wallpaper
              </button>
            </div>
          </div>
        )}

        {/* All Wallpaper Wednesdays */}
        <div className="updates__section">
          <h3 className="updates__subtitle">Previous Wallpapers</h3>
          <div className="gallery__grid">
            {wednesdayPhotos.map((photo) => (
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
                    title="Like this wallpaper"
                  >
                    ❤️
                  </button>
                  <button
                    className="gallery__download-btn"
                    onClick={() => downloadImage(photo)}
                    title="Download"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
          allPhotos={wednesdayPhotos}
          currentIndex={wednesdayPhotos.findIndex((p) => p.id === lightboxPhoto.id)}
          onNavigate={(index) => setLightboxPhoto(wednesdayPhotos[index])}
          likedPhotos={likedPhotos}
          onToggleLike={(photoId) => toggleLike(photoId)}
          onDownload={downloadImage}
        />
      )}
    </section>
  )
}
