import { useEffect, useState } from 'react'

function LoadingScreen() {
  const [leaving, setLeaving] = useState(false)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    document.body.classList.add('loading-active')
    return () => document.body.classList.remove('loading-active')
  }, [])

  const finishLoading = () => {
    setLeaving(true)
    window.setTimeout(() => {
      document.body.classList.remove('loading-active')
      setMounted(false)
    }, 500)
  }

  if (!mounted) return null

  return (
    <div className={`loading-screen${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
      <video
        className="loading-screen-video"
        src="/videos/loading-motion.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={finishLoading}
        onError={finishLoading}
      />
    </div>
  )
}

export default LoadingScreen
