import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import frame from './web-frame.json'
import BrandFilm from './BrandFilm.jsx'
import MotionVideo from './MotionVideo.jsx'
import './App.css'

// 기준 화면 1980 × 1020. 콘텐츠는 화면 너비에 맞춰 비례 조정합니다.
const scaled = (value) => `${(value / frame.width) * 100}cqw`

const motionVideos = {
  '199:67': {
    src: '/videos/connect-assist.mp4',
    poster: '/images/web-20261101/connect-assist-poster.webp',
    label: '1 영상',
  },
  '199:74': { src: '/videos/motion-1.mp4', label: 'PLEV 차량 모션 1' },
  '199:73': { src: '/videos/motion-2.mp4', label: 'PLEV 차량 모션 2' },
  '199:75': { src: '/videos/motion-3.mp4', label: 'PLEV 차량 모션 3' },
  '199:164': {
    src: '/videos/restore-return.mp4',
    poster: '/images/web-20261101/restore-return-poster.webp',
    label: '2 영상',
  },
}

function DesignElement({ node, sectionStart = 0 }) {
  const style = {
    '--element-left': `${(node.x / frame.width) * 100}%`,
    '--element-top': scaled(node.y - sectionStart),
    '--element-width': `${(node.w / frame.width) * 100}%`,
    '--element-height': scaled(node.h),
    '--media-ratio': `${node.w} / ${node.h}`,
    '--mobile-order': Math.round(node.y * 2000 + node.x),
    opacity: node.opacity ?? 1,
    borderRadius: scaled(node.radius || 0),
  }

  if (node.id === '199:27') {
    return <BrandFilm style={style} nodeId={node.id} poster={node.src} />
  }

  if (motionVideos[node.id]) {
    return <MotionVideo
      {...motionVideos[node.id]}
      style={style}
      nodeId={node.id}
      poster={motionVideos[node.id].poster ?? node.src}
    />
  }

  if (node.kind === 'text') {
    return (
      <p className="design-element design-text" style={{ ...style, textAlign: node.align }} data-node-id={node.id}>
        {node.segments.map((segment, index) => (
          <span
            key={index}
            style={{
              fontFamily: `'${segment.font}', 'SUIT', sans-serif`,
              fontWeight: segment.weight,
              fontSize: scaled(segment.size),
              letterSpacing: `${segment.spacing}em`,
              lineHeight: segment.line,
              color: segment.color,
              textTransform: segment.uppercase ? 'uppercase' : 'none',
              '--mobile-font-size': `${segment.size / 24}rem`,
            }}
          >
            {segment.text.replaceAll('\u2028', '\n')}
          </span>
        ))}
      </p>
    )
  }

  if (node.kind === 'image') {
    return (
      <img
        className={`design-element design-media design-image${node.id === '199:37' ? ' design-wordmark' : ''}${node.id === '199:185' ? ' design-footer-logo' : ''}`}
        style={style}
        data-node-id={node.id}
        src={node.src}
        srcSet={node.srcSet || undefined}
        sizes={node.srcSet ? node.sizes : undefined}
        alt={node.id === '199:37' ? 'PLEV : CARE IN TRANSIT' : node.name}
        width={Math.round(node.w)}
        height={Math.round(node.h)}
        loading={node.id === '199:37' ? 'eager' : 'lazy'}
        decoding="async"
      />
    )
  }

  if (node.kind === 'badge') {
    return (
      <div
        className="design-element design-badge"
        style={{
          ...style,
          background: node.background,
          color: node.badgeColor,
          fontFamily: `'${node.badgeFont}', 'SUIT', sans-serif`,
          fontSize: scaled(node.badgeSize),
          fontWeight: node.badgeWeight,
        }}
        data-node-id={node.id}
      >
        {node.text}
      </div>
    )
  }

  return (
    <div
      className={`design-element ${node.kind === 'rule' ? 'design-rule' : 'design-media'}`}
      style={{ ...style, background: node.background }}
      data-node-id={node.id}
      aria-hidden="true"
    />
  )
}

function MobileCareFlow({ section }) {
  const get = (id) => section.nodes.find((node) => node.id === `199:${id}`)
  const stages = [
    { number: 132, title: 123, description: 118 },
    { number: 134, title: 124, description: 119 },
    { number: 136, title: 125, description: 131 },
    { number: 138, title: 126, description: 120 },
  ]

  return (
    <div className="care-flow-mobile">
      <DesignElement node={get(121)} />
      <DesignElement node={get(140)} />
      <div className="care-devices">
        {[99, 104, 108].map((id, index) => (
          <div key={id}>
            <DesignElement node={get(id)} />
            <DesignElement node={get(112 + index)} />
          </div>
        ))}
      </div>
      <div className="care-stages">
        {stages.map((stage) => (
          <article className="care-stage" key={stage.number}>
            <img src={get(127).src} alt="" className="care-stage-circle" loading="lazy" />
            <DesignElement node={get(stage.number)} />
            <DesignElement node={get(stage.title)} />
            <DesignElement node={get(stage.description)} />
          </article>
        ))}
      </div>
    </div>
  )
}

function App() {
  useEffect(() => {
    // 기존 관성 스크롤 설정을 유지합니다.
    const lenis = new Lenis({
      autoRaf: true,
      respectReducedMotion: false,
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.6,
    })
    return () => lenis.destroy()
  }, [])

  return (
    <main className="figma-page" aria-label="PLEV — CARE IN TRANSIT" data-node-id={frame.id}>
      {frame.backgrounds.map((node) => (
        <div
          className="page-background"
          key={node.id}
          style={{ top: scaled(node.y), height: scaled(node.h), background: node.background }}
          aria-hidden="true"
        />
      ))}
      {frame.sections.map((section) => (
        <section
          className={`design-section${(section.sourceStart ?? section.start) === 0 ? ' design-intro' : ''}${section.dark ? ' design-dark' : ''}${(section.sourceStart ?? section.start) === 9702 ? ' design-care-flow' : ''}${(section.sourceStart ?? section.start) === 28424 ? ' design-footer' : ''}`}
          key={section.start}
          style={{ minHeight: scaled(section.height) }}
          aria-label={section.name}
        >
          {section.nodes.map((node) => <DesignElement key={node.id} node={node} sectionStart={section.start} />)}
          {(section.sourceStart ?? section.start) === 9702 && <MobileCareFlow section={section} />}
        </section>
      ))}
    </main>
  )
}

export default App
