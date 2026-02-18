import { useEffect } from 'react'
import type { Photo } from '../App'
import './Lightbox.css'

type Props = {
  photo: Photo
  onClose: () => void
  allPhotos: Photo[]
  currentIndex: number
  onNavigate: (index: number) => void
  likedPhotos?: Set<string>
  onToggleLike?: (photoId: string) => void
  onDownload?: (photo: Photo) => void
}

export default function Lightbox({ 
  photo, 
  onClose, 
  allPhotos, 
  currentIndex, 
  onNavigate,
  likedPhotos = new Set(),
  onToggleLike,
  onDownload
}: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') {
        const prev = currentIndex > 0 ? currentIndex - 1 : allPhotos.length - 1
        onNavigate(prev)
      }
      if (e.key === 'ArrowRight') {
        const next = currentIndex < allPhotos.length - 1 ? currentIndex + 1 : 0
        onNavigate(next)
      }
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [currentIndex, allPhotos.length, onClose, onNavigate])

  const goPrev = () => {
    const prev = currentIndex > 0 ? currentIndex - 1 : allPhotos.length - 1
    onNavigate(prev)
  }
  const goNext = () => {
    const next = currentIndex < allPhotos.length - 1 ? currentIndex + 1 : 0
    onNavigate(next)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleLike?.(photo.id)
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDownload?.(photo)
  }

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <button
        className="lightbox__nav lightbox__nav--prev"
        onClick={(e) => { e.stopPropagation(); goPrev() }}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        className="lightbox__nav lightbox__nav--next"
        onClick={(e) => { e.stopPropagation(); goNext() }}
        aria-label="Next"
      >
        ›
      </button>
      <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
        <img
          src={photo.src.replace('w=800', 'w=1200')}
          alt={photo.alt}
          className="lightbox__img"
        />
        <div className="lightbox__caption">
          <span className="lightbox__title">{photo.title ?? photo.alt}</span>
          <span className="lightbox__meta">{photo.category} · {currentIndex + 1} / {allPhotos.length}</span>
        </div>
        <div className="lightbox__actions">
          <button
            className={`lightbox__btn lightbox__like ${likedPhotos.has(photo.id) ? 'liked' : ''}`}
            onClick={handleLike}
            title="Like this photo"
          >
            ❤️
          </button>
          <button
            className="lightbox__btn lightbox__download"
            onClick={handleDownload}
            title="Download this photo"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
