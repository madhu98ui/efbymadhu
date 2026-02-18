import { useState, useEffect } from 'react'

type Props = {
  className?: string
  alt: string
  src?: string
}

export default function Logo({ className, alt, src: imageSrc = '/logo.png' }: Props) {
  const [src, setSrc] = useState<string>(imageSrc)

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        const threshold = 50
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          if (r < threshold && g < threshold && b < threshold) {
            data[i + 3] = 0
          }
        }
        ctx.putImageData(imageData, 0, 0)
        setSrc(canvas.toDataURL('image/png'))
      } catch {
        // keep original if canvas fails
      }
    }
    img.src = imageSrc
  }, [imageSrc])

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ width: 'auto', display: 'block' }}
    />
  )
}
