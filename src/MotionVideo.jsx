import { useEffect, useRef } from 'react'

function MotionVideo({ src, style, nodeId, label }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    let wasVisible = false
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting
      if (visible && !wasVisible) {
        video.currentTime = 0
        video.play().catch(() => {})
      } else if (!visible) {
        video.pause()
      }
      wasVisible = visible
    }, { threshold: 0.1 })

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
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    />
  )
}

export default MotionVideo
