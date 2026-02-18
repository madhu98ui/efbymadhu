import type { Photo } from '../App'
import './GalleryItem.css'

type Props = {
  photo: Photo
  onClick: () => void
}

export default function GalleryItem({ photo, onClick }: Props) {
  return (
    <article className="gallery-item" onClick={onClick}>
      <div className="gallery-item__frame">
        <img
          src={photo.src}
          alt={photo.alt}
          className="gallery-item__img"
          loading="lazy"
          width={photo.width}
          height={photo.height}
        />
        <div className="gallery-item__overlay">
          <span className="gallery-item__title">{photo.title ?? photo.alt}</span>
          <span className="gallery-item__category">{photo.category}</span>
        </div>
      </div>
    </article>
  )
}
