import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import frame from './web-frame.json'
import BrandFilm from './BrandFilm.jsx'
import MotionVideo from './MotionVideo.jsx'
import './App.css'

// 1920px 원본 좌표를 화면 너비에 비례하는 단위로 변환합니다.
const scaled = (value) => `${(value / frame.width) * 100}cqw`

const motionVideos = {
  '194:234': { src: '/videos/motion-1.mp4', label: 'PLEV 차량 모션 1' },
  '194:233': { src: '/videos/motion-2.mp4', label: 'PLEV 차량 모션 2' },
  '194:235': { src: '/videos/motion-3.mp4', label: 'PLEV 차량 모션 3' },
  '194:219': { src: '/videos/restore-return.mp4', label: 'RESTORE & RETURN 영상' },
}

function DesignElement({ node, sectionStart }) {
  const style = {
    '--element-left': `${(node.x / frame.width) * 100}%`,
    '--element-top': scaled(node.y - sectionStart),
    '--element-width': `${(node.w / frame.width) * 100}%`,
    '--element-height': scaled(node.h),
    '--media-ratio': `${node.w} / ${node.h}`,
    '--mobile-order': Math.round(node.y * 2000 + node.x),
    borderRadius: scaled(node.radius || 0),
  }

  if (node.id === '194:163') {
    return <BrandFilm style={style} nodeId={node.id} />
  }

  if (motionVideos[node.id]) {
    return <MotionVideo {...motionVideos[node.id]} style={style} nodeId={node.id} />
  }

  if (node.kind === 'text') {
    return (
      <p
        className="design-element design-text"
        style={{ ...style, textAlign: node.align }}
        data-node-id={node.id}
      >
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
        className={`design-element design-media design-image${node.id === '194:173' ? ' design-wordmark' : ''}`}
        style={style}
        data-node-id={node.id}
        src={node.src}
        alt={node.name}
        width={Math.round(node.w)}
        height={Math.round(node.h)}
        loading="lazy"
        decoding="async"
      />
    )
  }

  if (node.kind === 'badge') {
    return (
      <div className="design-element design-badge" style={style} data-node-id={node.id}>
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

function App() {
  useEffect(() => {
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
      {frame.sections.map((section) => (
        <section
          className={`design-section${section.start === 0 ? ' design-intro' : ''}${section.start === 10217 ? ' design-values' : ''}`}
          key={section.start}
          style={{ minHeight: scaled(section.height) }}
          aria-label={section.name}
        >
          {section.nodes.map((node) => (
            <DesignElement key={node.id} node={node} sectionStart={section.start} />
          ))}
          {section.start === 10217 && (
            <div className="values-mobile">
              {[0, 1, 2].map((index) => (
                <article className="value-card" key={index} style={{ backgroundPosition: `${index * 50}% center` }}>
                  {[283 + index, 286 + index].map((id) => {
                    const node = section.nodes.find((item) => item.id === `194:${id}`)
                    return <DesignElement key={id} node={node} sectionStart={section.start} />
                  })}
                </article>
              ))}
            </div>
          )}
        </section>
      ))}
    </main>
  )
}

export default App
