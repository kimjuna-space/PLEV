import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import frame from './web-frame.json'
import './App.css'

const scaled = (value) => `${(value / frame.width) * 100}cqw`

function DesignElement({ node, sectionStart }) {
  const style = {
    '--element-left': `${(node.x / frame.width) * 100}%`,
    '--element-top': scaled(node.y - sectionStart),
    '--element-width': `${(node.w / frame.width) * 100}%`,
    '--element-height': scaled(node.h),
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

  if (node.kind === 'badge') {
    return <div className="design-element design-badge" style={style} data-node-id={node.id}>{node.text}</div>
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
      aria-label={node.label}
    >
      <span>{node.label}</span>
    </div>
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
    <main className="figma-page" aria-label={frame.name} data-node-id={frame.id}>
      {frame.sections.map((section) => (
        <section
          className="design-section"
          key={section.start}
          style={{ minHeight: scaled(section.height) }}
        >
          {section.nodes.map((node) => (
            <DesignElement key={node.id} node={node} sectionStart={section.start} />
          ))}
        </section>
      ))}
    </main>
  )
}

export default App
