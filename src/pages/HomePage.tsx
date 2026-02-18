import { useState } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'
import Lightbox from '../components/Lightbox'
import { Photo } from '../App'

interface HomePageProps {
  photos: Photo[]
  reviews: Array<{ id: number; name: string; text: string; rating: number }>
}

export default function HomePage({ photos, reviews }: HomePageProps) {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null)

  return (
    <>
      <Hero />
      <About />
      <Testimonials reviews={reviews} />
      <CallToAction />
      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
          allPhotos={photos}
          currentIndex={photos.findIndex((p) => p.id === lightboxPhoto.id)}
          onNavigate={(index) => setLightboxPhoto(photos[index])}
        />
      )}
    </>
  )
}
