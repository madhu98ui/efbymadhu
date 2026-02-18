import type { Photo } from '../App'
import GalleryItem from './GalleryItem'
import './Gallery.css'

type Props = {
  photos: Photo[]
  onSelect: (photo: Photo) => void
}

export default function Gallery({ photos, onSelect }: Props) {
  return (
    <section id="gallery" className="gallery">
      <div className="gallery__grid">
        {photos.map((photo) => (
          <GalleryItem
            key={photo.id}
            photo={photo}
            onClick={() => onSelect(photo)}
          />
        ))}
      </div>
    </section>
  )
}
