import { useEffect, useRef } from 'react'

function MotionVideo({ src, style, nodeId, label, poster }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    let wasVisible = false
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= 0.8
      if (visible && !wasVisible) {
        video.currentTime = 0
        video.play().catch(() => {})
      } else if (!visible && wasVisible) {
        video.pause()
        video.currentTime = 0
      }
      wasVisible = visible
    }, { threshold: [0, 0.8] })

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      className="design-element design-media motion-video"
      style={style}
      data-node-id={nodeId}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    />
  )
}

export default MotionVideo
