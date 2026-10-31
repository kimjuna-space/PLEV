import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import frame from './web-frame.json'
import ModularSpace from './ModularSpace.jsx'
import BrandFilm from './BrandFilm.jsx'
import MotionVideo from './MotionVideo.jsx'
import './App.css'

const scaled = (value) => `${(value / frame.width) * 100}cqw`

// 각 영상 자리와 public/videos 안의 파일을 연결합니다.
const motionVideos = {
  '2903:621': { src: '/videos/motion-1.mp4', label: '왼쪽 모션 영상 1' },
  '2903:622': { src: '/videos/motion-2.mp4', label: '오른쪽 모션 영상 2' },
  '2903:623': { src: '/videos/motion-3.mp4', label: '하단 모션 영상 3' },
  '2892:1016': { src: '/videos/restore-return.mp4', label: 'RESTORE & RETURN 영상' },
}

function DesignElement({ node, sectionStart }) {
  const style = {
    '--element-left': `${(node.x / frame.width) * 100}%`,
    '--element-top': scaled(node.y - sectionStart),
    '--element-width': `${(node.w / frame.width) * 100}%`,
    '--element-height': scaled(node.h),
  }

  // Figma에서 하단 영상과 동일한 위치에 겹쳐 있던 이미지 레이어입니다.
  if (node.id === '2903:620') return null

  if (motionVideos[node.id]) {
    return (
      <MotionVideo
        {...motionVideos[node.id]}
        style={{ ...style, '--media-ratio': `${node.w} / ${node.h}` }}
        nodeId={node.id}
      />
    )
  }

  if (node.id === '2919:611') {
    return (
      <img
        className="design-element design-media design-image"
        style={{ ...style, '--media-ratio': `${node.w} / ${node.h}` }}
        data-node-id={node.id}
        src="/images/plev-identity-1.png"
        alt="PLEV 로고의 모티브가 된 PV5 사이드미러"
        loading="lazy"
        decoding="async"
      />
    )
  }

  if (node.kind === 'text') {
    return (
      <p className="design-element design-text" style={style} data-node-id={node.id}>
        {node.segments.map((segment, index) => (
          <span
            key={index}
            style={{
              fontFamily: `'${segment.font}', sans-serif`,
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

  if (node.kind === 'line') {
    return <div className="design-element design-line" style={{ ...style, borderTopWidth: scaled(node.weight) }} data-node-id={node.id} />
  }

  if (node.kind === 'rule') {
    return (
      <div
        className="design-element design-rule"
        style={{ ...style, backgroundColor: node.background }}
        data-node-id={node.id}
        aria-hidden="true"
      />
    )
  }

  if (node.kind === 'badge') {
    return <div className="design-element design-badge" style={style} data-node-id={node.id}>{node.text}</div>
  }

  // 첫 번째 영상 영역: public/videos/brand-film.mp4를 교체하면 됩니다.
  if (node.id === '2892:959') {
    return (
      <BrandFilm
        style={{ ...style, '--media-ratio': `${node.w} / ${node.h}` }}
        nodeId={node.id}
      />
    )
  }

  return (
    <div
      className="design-element design-media"
      style={{
        ...style,
        '--media-ratio': `${node.w} / ${node.h}`,
        backgroundColor: node.background,
        borderRadius: scaled(node.radius),
      }}
      data-node-id={node.id}
      role="img"
      aria-label={node.label || '이미지 들어갈 자리'}
    >
      {node.label && <span>{node.label}</span>}
    </div>
  )
}

function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      respectReducedMotion: false,
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.6,
    })

    lenisRef.current = lenis
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <main className="figma-page" aria-label={frame.name} data-node-id={frame.id}>
      {frame.sections.map((section) => (
        section.start === 26679 ? (
          <ModularSpace
            key={section.start}
            section={section}
            scaled={scaled}
            lenisRef={lenisRef}
            renderNode={(node) => <DesignElement key={node.id} node={node} sectionStart={section.start} />}
          />
        ) : (
        <section
          className="design-section"
          key={section.start}
          style={{ minHeight: scaled(section.height) }}
        >
          {section.nodes.map((node) => (
            <DesignElement key={node.id} node={node} sectionStart={section.start} />
          ))}
        </section>
        )
      ))}
    </main>
  )
}

export default App
