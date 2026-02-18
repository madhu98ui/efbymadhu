import { useRef, useEffect, useState } from 'react'
import './BackgroundVideo.css'

// Add your video file to public/ (e.g. background.mp4). Until then, the silk background shows.
const VIDEO_SRC = '/background.mp4'

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().then(() => setVideoReady(true)).catch(() => setVideoFailed(true))
  }, [])

  return (
    <div
      className="background-video"
      aria-hidden="true"
      style={{ opacity: videoFailed ? 0 : 1, pointerEvents: videoFailed ? 'none' : 'auto' }}
    >
      <video
        ref={videoRef}
        className="background-video__video"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={() => setVideoFailed(true)}
        onCanPlay={() => setVideoReady(true)}
      />
    </div>
  )
}
