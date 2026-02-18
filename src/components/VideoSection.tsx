import './VideoSection.css'

// Add your video file to public/reel.mp4, or set a YouTube/Vimeo embed URL below
const VIDEO_SRC = '/reel.mp4'
const VIDEO_POSTER = '' // optional: e.g. '/reel-poster.jpg' for thumbnail before play

export default function VideoSection() {
  return (
    <section id="video" className="video-section">
      <div className="video-section__inner">
        <span className="video-section__label">Watch</span>
        <h2 className="video-section__title">Reel</h2>
        <div className="video-section__player">
          <video
            className="video-section__video"
            src={VIDEO_SRC}
            poster={VIDEO_POSTER || undefined}
            controls
            playsInline
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}
