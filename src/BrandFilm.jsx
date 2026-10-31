import { useEffect, useRef, useState } from 'react'

function BrandFilm({ style, nodeId }) {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    let wasVisible = false

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio > 0

      if (visible && !wasVisible) {
        video.currentTime = 0
        video.play().catch(() => {})
      } else if (!visible) {
        video.pause()
      }

      wasVisible = visible
    }, { threshold: [0, 0.01] })

    observer.observe(video)
    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <div className="design-element design-media brand-film-frame" style={style} data-node-id={nodeId}>
      <video
        ref={videoRef}
        className="brand-film"
        src="/videos/brand-film.mp4?v=20261027-142248"
        loop
        muted={muted}
        playsInline
        preload="auto"
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        aria-label="PLEV 브랜드 필름"
      />
      <button
        className="brand-film-sound"
        type="button"
        onClick={toggleSound}
        aria-label={muted ? '브랜드 필름 소리 켜기' : '브랜드 필름 소리 끄기'}
        aria-pressed={!muted}
      >
        SOUND {muted ? 'OFF' : 'ON'}
      </button>
    </div>
  )
}

export default BrandFilm
