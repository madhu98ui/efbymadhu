import { useAppDispatch } from '../redux/hooks'
import { openLightbox } from '../redux/slices/gallerySlice'
import type { Photo } from '../App'
import GalleryItem from './GalleryItem'
import './Gallery.css'

type Props = {
  photos: Photo[]
  onSelect: (photo: Photo) => void
}

export default function Gallery({ photos, onSelect }: Props) {
  const dispatch = useAppDispatch()

  const handleSelectPhoto = (photo: Photo, index: number) => {
    dispatch(openLightbox(index))
    onSelect(photo)
  }

  return (
    <section id="gallery" className="gallery">
      <div className="gallery__grid">
        {photos.map((photo, index) => (
          <GalleryItem
            key={photo.id}
            photo={photo}
            onClick={() => handleSelectPhoto(photo, index)}
          />
        ))}
      </div>
    </section>
  )
}
