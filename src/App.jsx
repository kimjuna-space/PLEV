import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import './App.css'

const image = (file, x, y, w, h, fit = 'cover', position = 'center') => ({ file, x, y, w, h, fit, position })
const text = (value, x, y, w, style = {}) => ({ value, x, y, w, ...style })

const images = [
  image('plev-care-in-transit.svg', 20.7, 149, 866.547, 54.036, 'contain'),
  image('23-second-hero.webp', 20, 1720, 1880, 850), image('22-identity.webp', 20, 5328, 1880, 800),
  image('07-composite.webp', 20, 6929, 1880, 853), image('08-rear.webp', 20, 6929, 1880, 853),
  image('09-ui-detail.webp', 614, 3855, 1286, 1000),
  image('17-additional-hero.webp', 0, 17263, 1920, 817), image('15-restore-main.webp', 20, 20498, 1880, 1253),
  image('additional-service-01.webp', 0, 24845, 1920, 1134),
  image('additional-service-02.webp', 0, 25979, 1920, 1537),
]

const copy = [
  text('PROJECT', 20, 12, 440, { kind: 'meta', color: '#111' }), text('SCOPE', 495, 12, 440, { kind: 'meta', color: '#111' }), text('PLATFORMS', 970, 12, 440, { kind: 'meta', color: '#111' }), text('PERIOD', 1445, 12, 440, { kind: 'meta', color: '#111' }),
  text('UXUI Design, 3D Visualizing, Motion', 20, 40, 440, { kind: 'meta', color: '#888' }), text('CROSS-DEVICE MOBILITY EXPERIENCE', 495, 40, 440, { kind: 'meta', color: '#888' }), text('MOBILE · DESKTOP · ONBOARD DISPLAY', 970, 40, 440, { kind: 'meta', color: '#888' }), text('August - November 2026', 1445, 40, 440, { kind: 'meta', color: '#888' }),
  text('사고 이후를\n하나의 흐름으로', 20, 1075, 700, { kind: 'title-ko' }), text('PLEV는 ‘사고 이후를 하나의 흐름으로’라는 가치를 바탕으로, PV5를 통해 이륜차 사고의 현장 조치부터 정비소 이동, 정비 후 이송까지 지원하는 서비스입니다. 운전자가 단계마다 다른 업체를 찾고 개별적으로 요청해야 했던 절차를 하나의 플랫폼에서 접수하고 일관된 흐름으로 제공합니다. 이를 통해 운전자의 조율 부담을 줄이고, 사고 대응부터 정비와 복귀까지 유기적으로 연결되는 서비스 경험을 제안합니다.', 970, 1075, 930, { kind: 'body intro-body', color: '#292929' }),
  text('THE RIDE\nPAUSES.', 20, 2630, 700, { kind: 'title' }), text('사고가 발생하면 이륜차 운전자는 견인 요청부터 정비소 입고, 수리 견적 확인과 정비 후 복귀까지 서로 다른 담당자와 연락하며 절차를 진행해야 합니다. 이 과정에서 같은 정보를 반복해 전달하고 진행 상황을 직접 확인해야 하므로, 각 단계의 정보와 절차를 연결하는 서비스가 필요합니다.', 970, 2630, 930, { kind: 'body', color: '#292929' }),
  text('PV5\nHIGHROOF', 20, 3199, 570, { kind: 'title' }), text('적재와 작업을 고려한 넓은 실내 공간을 바탕으로 자유로운 커스터마이징이 가능하며, 실외 V2L 커넥터를 통해 별도의 외부 전원 없이도 현장 작업에 필요한 전원을 안정적으로 제공합니다. 이를 통해 PV5를 소형 이륜차의 점검과 이송을 지원하는 ‘이동형 서비스 거점’으로 활용합니다.', 614, 3199, 1286, { kind: 'body-semibold', color: '#292929' }),
  text('01', 20, 3855, 80, { kind: 'number' }), text('적재와 작업을 고려한 넓은 공간\n& 자유로운 차량 커스터마이징', 119, 3855, 450, { kind: 'lead' }), text('02', 20, 3983, 80, { kind: 'number' }), text('실외 V2L 커넥터를 통한\n현장 작업 전원 제공', 119, 3983, 450, { kind: 'lead' }),
  text('STANDARD, TRANSPORT\n& EMERGENCY', 20, 6188, 850, { kind: 'title' }), text('PLEV는 PV5 기반의 세 모델에 용도별 장비와 적재 환경을 갖췄습니다. STANDARD는 경미한 사고 대응과 현장 점검을 지원합니다. TRANSPORT는 완충 구조와 고정 장치로 정비소 운송과 복귀에 특화된 모델입니다. EMERGENCY는 중대 사고에 필요한 전문 장비로 이륜차 회수를 지원합니다.', 970, 6188, 930, { kind: 'body', color: '#676767' }),
  text('THE PLEV\nIDENTITY', 20, 6737, 700, { kind: 'title' }), text('PLEV의 로고는 차량의 사이드미러 형태에서 영감을 받아 제작되었습니다. 운전자의 후방 시야를 넓히고 위험을 미리 알아차리도록 돕는 사이드미러의 역할을 바탕으로, 사용자의 이동을 세심하게 살피고 안전하고 신뢰할 수 있는 운송을 지원하겠다는 PLEV의 서비스 지향점을 디자인에 담아냈습니다.', 970, 6737, 930, { kind: 'body', color: '#676767' }),
  text('END-TO-END\nCARE FLOW', 20, 10134, 740, { kind: 'title light' }), text('PLEV는 호출과 접수, 현장 지원과 운송, 정비 연계, 복귀로 이어지는 네 단계의 케어 흐름을 설계합니다. 업체와 단계마다 분리되어 있던 요청과 확인 절차를 하나의 플랫폼에서 연계해, 사고 이후의 경험을 하나의 서비스로 이어갑니다. 각 단계에서 수집한 차량 정보와 진행 상황을 다음 단계로 전달해 지원이 끊기지 않도록 연결하고, 사용자가 사고 이후의 과정을 확인하며 일상으로 복귀할 수 있도록 돕습니다.', 614, 10153, 1286, { kind: 'body end-flow-body', color: '#fff' }),
  text('CONNECT\n& ASSIST', 20, 11552, 700, { kind: 'title' }), text('01', 970, 11766, 80, { kind: 'number' }), text('호출부터 접수까지 간단히', 1207, 11766, 650, { kind: 'lead' }), text('모바일 어플리케이션으로 사용자가 등록한 모델과 호환되는 PV5를 호출합니다. 위치 기반으로 가장 가까운 차량 차고지에서 출발하며, 호출 현장까지의 도달 현황을 실시간으로 확인할 수 있습니다.', 1207, 11820, 693, { kind: 'body', color: '#676767' }), text('02', 970, 12069, 80, { kind: 'number' }), text('이동은 신속하고 안전하게', 1207, 12069, 650, { kind: 'lead' }), text('PV5 도착 후 QR 인증을 통해 차량과 연결하고 내부 장비를 이용하여 간단한 작업을 진행합니다. 조치가 필요한 경우 정비소를 선택하고, 전용 리프트와 전면 고정 장치로 손상 없이 운송합니다.', 1207, 12123, 693, { kind: 'body', color: '#676767' }),
  text('RESTORE\n& RETURN', 20, 18500, 700, { kind: 'title light' }), text('01', 970, 18714, 80, { kind: 'number light' }), text('바로 이어지는 정비 연계', 1207, 18714, 650, { kind: 'lead light' }), text('접수 과정에서 전달된 사고 정보와 차량 정보를 정비소에 미리 공유합니다.\n정비소는 차량이 도착하기 전 필요한 작업을 준비하고, 입고 이후 진단 및 정비를 보다 신속하게 진행합니다.', 1207, 18768, 693, { kind: 'body', color: '#cfcfcf' }), text('02', 970, 19017, 80, { kind: 'number light' }), text('원하는 방식으로 복귀', 1207, 19017, 650, { kind: 'lead light' }), text('정비가 완료된 후, 사용자의 일정에 따라 PV5 원격 복귀와 직접 수령 중 원하는 과정을 선택할 수 있습니다. 상황에 맞는 복귀 방식을 제공하여 정비 이후의 과정까지 자연스럽게 연결합니다.', 1207, 19071, 693, { kind: 'body', color: '#cfcfcf' }),
  text('ADDITIONAL\nSERVICES', 20, 24845, 700, { kind: 'title light' }), text('01', 20, 25077, 80, { kind: 'number light' }), text('긴급 사고 접수', 252, 25077, 650, { kind: 'lead light' }), text('위급한 사고의 처리를 위해 긴급 사고 접수 기능을 제공합니다. 결제, 차량선택과 같은 과정을 생략하며, 사용자의 위치로 즉시 출동을 진행합니다.', 252, 25131, 693, { kind: 'body', color: '#e7e7e7' }), text('02', 20, 26196, 80, { kind: 'number light' }), text('정비소 점검 예약', 1207, 26196, 650, { kind: 'lead light' }), text('검색바를 활용하여, 원하는 정비소의 점검과 운송 예약을 진행합니다.\n이동 특화 모델을 이용하여, 번거로운 이동과 픽업을 지원합니다.', 1207, 26250, 693, { kind: 'body', color: '#e7e7e7' }),
]

function AutoVideo({ src, x, y, w, h, threshold = 0.3, loop = true, resetOnExit = true, className = '' }) {
  const ref = useRef(null)
  const finished = useRef(false)
  useEffect(() => {
    const video = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= threshold && !finished.current) video.play().catch(() => {})
      else {
        video.pause()
        if (!entry.isIntersecting && resetOnExit) {
          video.currentTime = 0
          finished.current = false
        }
      }
    }, { threshold: [0, threshold] })
    observer.observe(video)
    return () => observer.disconnect()
  }, [resetOnExit, threshold])
  return <video ref={ref} className={`asset video ${className}`} style={{ left: x, top: y, width: w, height: h }} src={src} muted loop={loop} playsInline preload="metadata" onEnded={() => { finished.current = true }} />
}

function ViewportVideo({ src, className, label }) {
  const ref = useRef(null)
  useEffect(() => {
    const video = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.3) video.play().catch(() => {})
      else { video.pause(); if (!entry.isIntersecting) video.currentTime = 0 }
    }, { threshold: [0, 0.3] })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])
  return <video ref={ref} className={className} src={src} muted loop playsInline preload="metadata" aria-label={label} />
}

function BrandFilm() {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)
  const [showPoster, setShowPoster] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayback = () => {
    const video = ref.current
    if (isPlaying) {
      video.pause()
      video.currentTime = 0
      setShowPoster(true)
      setIsPlaying(false)
      return
    }

    video.currentTime = 0
    setShowPoster(false)
    video.play().then(() => setIsPlaying(true)).catch(() => setShowPoster(true))
  }

  return <>
    <video ref={ref} className="asset video brand-film" style={{ left: 20, top: 215, width: 1880, height: 800 }} src="/videos/brand-film.mp4" poster="/images/brand-film-poster.webp" muted={muted} playsInline preload="auto" onEnded={() => { ref.current.currentTime = 0; setShowPoster(true); setIsPlaying(false) }} />
    {showPoster && <img className="asset image brand-film-poster" src="/images/brand-film-poster.webp" alt="" style={{ left: 20, top: 215, width: 1880, height: 800 }} />}
    <button className="brand-sound" type="button" onClick={() => setMuted((value) => !value)}>{muted ? 'SOUND ON' : 'SOUND OFF'}</button>
    <button className="brand-play" type="button" onClick={togglePlayback}>{isPlaying ? 'OFF' : 'ON'}</button>
  </>
}

function CareFlow() {
  const stages = [
    { number: '01', x: 614, labelX: 693.57, detailX: 682, label: 'CONNECT', detail: '호출부터 접수와 배차까지', badgeX: 735.64, badgeW: 30.75 },
    { number: '02', x: 950.22, labelX: 1048.14, detailX: 1005, label: 'ASSIST', detail: '현장 지원부터 안전한 운송까지', badgeX: 1070.49, badgeW: 33.49 },
    { number: '03', x: 1286.43, labelX: 1372.11, detailX: 1347, label: 'RESTORE', detail: '정보 공유부터 정비 연계까지', badgeX: 1406.71, badgeW: 33.49 },
    { number: '04', x: 1622.65, labelX: 1713.11, detailX: 1669, label: 'RETURN', detail: '정비 후 복귀부터 서비스 완료까지', badgeX: 1742.24, badgeW: 34.85 },
  ]

  return <div className="care-flow" aria-label="End-to-end care flow">
    <div className="care-flow-line" />
    {[886, 1223, 1559].map((x) => <img key={x} className="care-arrow" src="/images/care-arrow.svg" alt="" style={{ left: x }} />)}
    {stages.map((stage) => <div key={stage.number}>
      <div className="care-circle" style={{ left: stage.x }} />
      <span className="care-badge" style={{ left: stage.badgeX, width: stage.badgeW }}>{stage.number}</span>
      <p className="care-label" style={{ left: stage.labelX }}>{stage.label}</p>
      <p className="care-detail" style={{ left: stage.detailX }}>{stage.detail}</p>
    </div>)}
    <div className="care-devices">
      <figure><img src="/images/device-desktop.svg" alt="" /><figcaption>desktop</figcaption></figure>
      <figure><img src="/images/device-mobile.svg" alt="" /><figcaption>mobile</figcaption></figure>
      <figure><img src="/images/device-tablet.svg" alt="" /><figcaption>tablet</figcaption></figure>
    </div>
  </div>
}

function ServiceCards() {
  return <section className="service-cards" aria-label="서비스 화면 예시">
    <article className="service-card service-card-map"><ViewportVideo className="service-card-video" src="/videos/ui-card-motion.mp4" label="PV5 호출 모바일 화면" /></article>
    <article className="service-card service-card-garage">
      <img className="garage-background" src="/images/12-card-right.webp" alt="" />
      <img className="garage-floating" src="/images/13-card-floating.png" alt="KP 모토라드 강남, 4km" />
    </article>
    <div className="service-motion-placeholder">
      <img src="/images/service-motion-control.webp" alt="TRANSPORT CONTROL 화면" />
    </div>
  </section>
}

function RestoreCards() {
  return <section className="restore-cards" aria-label="복귀 서비스 화면 예시">
    <article className="restore-card restore-card-tail">
      <img src="/images/18-restore-card-placeholder.webp" alt="" />
      <img className="restore-rear" src="/images/18-additional-transparent.webp" alt="PV5 후면" />
    </article>
    <article className="restore-card restore-card-phone"><img src="/images/14-restore-card.webp" alt="PV5 복귀 모바일 화면" /></article>
  </section>
}

function LoadingScreen({ onComplete }) {
  const [isLeaving, setIsLeaving] = useState(false)
  const finish = () => setIsLeaving(true)

  return <div className={`loading-screen${isLeaving ? ' is-leaving' : ''}`} role="status" aria-label="PLEV 로딩 중" onAnimationEnd={() => isLeaving && onComplete()}>
    <video className="loading-motion" src="/videos/loading-motion.mp4" autoPlay muted playsInline preload="auto" onEnded={finish} onError={finish} />
  </div>
}

const sectionStops = [0, 1772, 2764, 3825, 5353, 6707, 7782, 9908, 11340, 12472, 13667, 14893, 16223, 18323, 19400, 20498, 21851, 23046, 24800, 26006, 27743]

function SectionNavigator({ lenisRef }) {
  const destinationIndex = useRef(null)

  const move = (direction) => {
    const scale = window.innerWidth / 1920
    const current = window.scrollY / scale
    const tolerance = 12
    const currentIndex = direction === 'down'
      ? sectionStops.findIndex((stop) => stop > current + tolerance)
      : sectionStops.findLastIndex((stop) => stop < current - tolerance)
    const baseIndex = destinationIndex.current ?? (currentIndex < 0 ? (direction === 'down' ? sectionStops.length - 1 : 0) : currentIndex)
    const nextIndex = Math.max(0, Math.min(sectionStops.length - 1, baseIndex + (direction === 'down' && destinationIndex.current !== null ? 1 : direction === 'up' && destinationIndex.current !== null ? -1 : 0)))
    const targetIndex = destinationIndex.current === null ? baseIndex : nextIndex
    const next = sectionStops[targetIndex]
    destinationIndex.current = targetIndex

    const target = next * scale
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: 1.2,
        easing: (time) => 1 - Math.pow(1 - time, 4),
        onComplete: () => {
          if (destinationIndex.current === targetIndex) destinationIndex.current = null
        },
      })
      return
    }
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return <nav className="section-navigator" aria-label="섹션 이동">
    <button type="button" aria-label="이전 섹션" onClick={() => move('up')}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
    </button>
    <button type="button" aria-label="다음 섹션" onClick={() => move('down')}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m6-6-6 6-6-6" /></svg>
    </button>
  </nav>
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      respectReducedMotion: false,
    })

    lenisRef.current = lenis
    return () => { lenis.destroy(); lenisRef.current = null }
  }, [])
  useEffect(() => {
    document.body.classList.toggle('is-loading', isLoading)
    return () => document.body.classList.remove('is-loading')
  }, [isLoading])

  return <>{isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
    <main className="site"><div className="stage"><div className="dark-band care-band" /><div className="dark-band restore-band" /><div className="additional-band" />
      {images.map((item) => <img key={item.file} className={`asset image${item.file === 'plev-care-in-transit.svg' ? ' brand-wordmark' : ''}${item.file === '20-additional-card.webp' ? ' additional-card-source' : ''}`} src={`/images/${item.file}`} alt="" loading={item.file === 'plev-care-in-transit.svg' ? 'eager' : 'lazy'} style={{ left: item.x, top: item.y, width: item.w, height: item.h, objectFit: item.fit, objectPosition: item.position }} />)}
    <BrandFilm /><AutoVideo src="/videos/motion-1-pingpong.mp4" x={20} y={7802} w={930} h={930} className="logo-one-video" /><AutoVideo src="/videos/motion-2-pingpong.mp4" x={970} y={7802} w={930} h={930} /><AutoVideo src="/videos/motion-3.mp4" x={20} y={8752} w={1880} h={930} className="logo-three-video" /><AutoVideo src="/videos/video-1.mp4" x={20} y={12472} w={1880} h={1058} className="video-one" /><AutoVideo src="/videos/ui-main-motion.mp4" x={20} y={13550} w={1880} h={1253} className="ui-main-motion" /><AutoVideo src="/videos/video-2.mp4" x={20} y={19420} w={1880} h={1058} /><AutoVideo src="/videos/ui-wide-motion.mp4" x={20} y={22991} w={1880} h={1200} className="restore-wide-motion" /><AutoVideo src="/videos/plev-footer.mp4" x={0} y={27971} w={1920} h={1020} threshold={0.2} loop={false} className="footer-video" />
    <div className="rule rule-connect" /><div className="rule rule-restore" /><div className="rule rule-additional" /><CareFlow /><ServiceCards /><RestoreCards />
    {copy.filter((item) => item.y < 24785).map((item, index) => <p key={index} className={`copy ${item.kind}`} style={{ left: item.x, top: item.y, width: item.w, color: item.color }}>{item.value}</p>)}
  </div></main><SectionNavigator lenisRef={lenisRef} /></>
}
export default App
