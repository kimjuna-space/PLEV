import { useEffect, useRef, useState } from 'react'

const backgrounds = ['#000000', '#000000', '#000000', '#000000']

// 두 번째부터 네 번째 항목의 제목·설명과 이미지는 이 배열에서 교체합니다.
const extraSlides = [
  { title: 'TEXTTEXT 02', description: 'texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext' },
  { title: 'TEXTTEXT 03', description: 'texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext' },
  { title: 'TEXTTEXT 04', description: 'texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext' },
]

function ModularSpace({ section, renderNode, scaled, lenisRef }) {
  const hoverRef = useRef(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const media = section.nodes.find((node) => node.id === '2892:1037')
  const heading = section.nodes.find((node) => node.id === '2892:1041')
  const description = section.nodes.find((node) => node.id === '2892:1042')
  const progressLine = section.nodes.find((node) => node.id === '2892:1039')
  const changingIds = [media.id, heading.id, description.id, progressLine.id]

  useEffect(() => {
    const target = hoverRef.current
    let lastChange = -Infinity
    let delta = 0

    const wheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return

      // 활성 이미지·제목·설명의 실제 화면 경계 안에서만 휠을 사용합니다.
      const slide = target.querySelector('.modular-slide.is-active')
      const insideContent = [...slide.querySelectorAll('.design-media, .design-text')].some((element) => {
        const rect = element.getBoundingClientRect()
        return event.clientX >= rect.left && event.clientX <= rect.right
          && event.clientY >= rect.top && event.clientY <= rect.bottom
      })
      if (!insideContent) return

      const now = performance.now()
      const coolingDown = now - lastChange < 380
      const direction = Math.sign(event.deltaY)
      const next = activeRef.current + direction

      // 처음/마지막 이미지의 바깥 방향으로 스크롤하면 페이지로 이어집니다.
      if (!coolingDown && (next < 0 || next >= backgrounds.length)) return

      event.preventDefault()
      event.stopPropagation()
      const lenis = lenisRef.current
      if (lenis) lenis.scrollTo(lenis.animatedScroll, { immediate: true })
      if (coolingDown) return

      const amount = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1)
      delta = Math.sign(delta) !== direction ? amount : delta + amount
      if (Math.abs(delta) < 35) return

      activeRef.current = next
      setActive(next)
      lastChange = now
      delta = 0
    }

    target.addEventListener('wheel', wheel, { passive: false })
    return () => target.removeEventListener('wheel', wheel)
  }, [lenisRef])

  return (
    <section
      ref={hoverRef}
      className="modular-track"
      aria-label="MODULAR SPACE 스크롤 갤러리"
      style={{ '--original-height': scaled(section.height) }}
    >
      <div className="modular-pin" data-active-slide={active + 1}>
        {section.nodes.filter((node) => !changingIds.includes(node.id)).map(renderNode)}
        <div className="modular-image-background" aria-hidden="true" />

        {backgrounds.map((background, index) => {
          const copy = extraSlides[index - 1]
          const slideHeading = copy
            ? { ...heading, segments: heading.segments.map((segment) => ({ ...segment, text: copy.title })) }
            : heading
          const slideDescription = copy
            ? { ...description, segments: description.segments.map((segment) => ({ ...segment, text: copy.description })) }
            : description

          return (
            <div
              key={index}
              className={`modular-slide${active === index ? ' is-active' : ''}`}
              aria-hidden={active !== index}
            >
              {renderNode({ ...media, id: `${media.id}-slide-${index + 1}`, background: 'transparent', label: `이미지${index + 1}` })}
              {renderNode({ ...slideHeading, id: `${heading.id}-slide-${index + 1}` })}
              {renderNode({ ...slideDescription, id: `${description.id}-slide-${index + 1}` })}
            </div>
          )
        })}

        {renderNode({ ...progressLine, w: media.w * ((active + 1) / 4) })}
      </div>
    </section>
  )
}

export default ModularSpace
