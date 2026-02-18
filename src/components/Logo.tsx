import { useState, useEffect } from 'react'

type Props = {
  className?: string
  alt: string
  src?: string
}

export default function Logo({ className, alt, src: imageSrc = '/logo.png' }: Props) {
  const [src, setSrc] = useState<string>(imageSrc)

  useEffect(() => {
    setSrc(imageSrc)
  }, [imageSrc])

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ width: 'auto', display: 'block' }}
      tabIndex={-1}
    />
  )
}
