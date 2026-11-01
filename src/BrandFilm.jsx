import { useEffect, useRef, useState } from 'react'

function BrandFilm({ style, nodeId }) {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    let wasVisible = false
    let meetsVideoThreshold = false

    const updatePlayback = () => {
      const metadataIds = ['199:29', '199:30', '199:31', '199:32', '199:33', '199:34', '199:35', '199:36']
      const metadataIsOffscreen = metadataIds.every((id) => {
        const element = document.querySelector(`[data-node-id="${id}"]`)
        return !element || element.getBoundingClientRect().bottom <= 0
      })
      const visible = meetsVideoThreshold && metadataIsOffscreen

      if (visible && !wasVisible) {
        video.currentTime = 0
        video.play().catch(() => {})
      } else if (!visible && wasVisible) {
        video.pause()
        video.currentTime = 0
      }

      wasVisible = visible
    }

    const observer = new IntersectionObserver(([entry]) => {
      meetsVideoThreshold = entry.isIntersecting && entry.intersectionRatio >= 0.8
      updatePlayback()
    }, { threshold: [0, 0.8] })

    observer.observe(video)
    window.addEventListener('scroll', updatePlayback, { passive: true })
    window.addEventListener('resize', updatePlayback)
    updatePlayback()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updatePlayback)
      window.removeEventListener('resize', updatePlayback)
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
        poster="/images/web-20261101/brand-film-poster.webp"
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
