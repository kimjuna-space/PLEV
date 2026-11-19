import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import './App.css'

const image = (file, x, y, w, h, fit = 'cover') => ({ file, x, y, w, h, fit })
const text = (value, x, y, w, kind, color) => ({ value, x, y, w, kind, color })
const images = [
  image('plev-care-in-transit.svg', 20.7, 181, 866.547, 54.036, 'contain'),
  image('web-sw/pv5-highroof.png', 614, 2429, 1286, 1000),
  image('web-sw/models-hero.png', 20, 3869, 1880, 800),
  image('web-sw/vehicle-composite.png', 20, 5457, 1880, 853),
  image('web-sw/transition-hero.png', 0, 16211, 1920, 817),
  image('web-sw/restore-main.png', 20, 19466, 1880, 1253),
  image('web-sw/service-card-right.png', 970, 13371, 930, 1200),
  image('web-sw/transport-control.png', 20, 14591, 1880, 1600),
  image('web-sw/frame-2087331269.png', 0, 25814, 1920, 1080),
]
const copy = [
  text('PROJECT',20,12,440,'meta','#111'),text('SCOPE',495,12,440,'meta','#111'),text('PLATFORMS',970,12,440,'meta','#111'),text('PERIOD',1445,12,440,'meta','#111'),
  text('UXUI DESIGN, 3D VISUALIZING, MOTION',20,37,440,'meta meta-value','#888'),text('CROSS-DEVICE MOBILITY EXPERIENCE',495,37,440,'meta meta-value','#888'),text('MOBILE · DESKTOP · ONBOARD DISPLAY',970,37,440,'meta meta-value','#888'),text('AUGUST – NOVEMBER 2026',1445,37,440,'meta meta-value','#888'),
  text('사고 이후를\n하나의 흐름으로',20,1100,700,'title-ko','#111'),
  text('PLEV는 ‘사고 이후를 하나의 흐름으로’라는 가치를 바탕으로, PV5를 통해 이륜차 사고의 현장 조치부터 정비소 이동, 정비 후 이송까지 지원하는 서비스입니다. 운전자가 단계마다 다른 업체를 찾고 개별적으로 요청해야 했던 절차를 하나의 플랫폼에서 접수하고 일관된 흐름으로 제공합니다. 이를 통해 운전자의 조율 부담을 줄이고, 사고 대응부터 정비와 복귀까지 유기적으로 연결되는 서비스 경험을 제안합니다.',970,1100,930,'body intro-body','#292929'),
  text('PV5\nHIGHROOF',20,1716,570,'title','#111'),
  text(<><strong>①</strong> 적재와 작업을 고려한 넓은 실내 공간을 바탕으로 자유로운 커스터마이징이 가능하며, <strong>②</strong> 실외 V2L 커넥터를 통해 별도의 외부 전원 없이도 현장 작업에 필요한 전원을 안정적으로 제공합니다.<br />이를 통해 PV5를 소형 이륜차의 점검과 이송을 지원하는 ‘이동형 서비스 거점’으로 활용합니다.</>,614,1716,1286,'body-semibold','#292929'),
  text('①',20,2429,80,'number','#111'),text('적재와 작업을 고려한 넓은 공간\n& 자유로운 차량 커스터마이징',119,2429,450,'lead','#111'),
  text('②',20,2557,80,'number','#111'),text('실외 V2L 커넥터를 통한\n현장 작업 전원 제공',119,2557,450,'lead','#111'),
  text('STANDARD, EMERGENCY\n& TRANSPORT',20,4709,850,'title','#111'),
  text('PLEV는 PV5 기반의 세 모델에 용도별 장비와 적재 환경을 갖췄습니다. STANDARD는 경미한 사고 대응과 현장 점검을 지원합니다. TRANSPORT는 완충 구조와 고정 장치로 정비소 운송과 복귀에 특화된 모델입니다. EMERGENCY는 중대 사고에 필요한 전문 장비로 이륜차 회수를 지원합니다.',970,4709,930,'body','#676767'),
  text('THE PLEV\nIDENTITY',20,5285,700,'title','#111'),
  text('PLEV의 로고는 차량의 사이드미러 형태에서 영감을 받아 제작되었습니다. 운전자의 후방 시야를 넓히고 위험을 미리 알아차리도록 돕는 사이드미러의 역할을 바탕으로, 사용자의 이동을 세심하게 살피고 안전하고 신뢰할 수 있는 운송을 지원하겠다는 PLEV의 서비스 지향점을 디자인에 담아냈습니다.',970,5285,930,'body','#676767'),
  text('END-TO-END\nCARE FLOW',20,8662,740,'title light','#e7e7e7'),
  text('PLEV는 호출과 접수, 현장 지원과 운송, 정비 연계, 복귀로 이어지는 네 단계의 케어 흐름을 설계합니다. 업체와 단계마다 분리되어 있던 요청과 확인 절차를 하나의 플랫폼에서 연계해, 사고 이후의 경험을 하나의 서비스로 이어갑니다. 각 단계에서 수집한 차량 정보와 진행 상황을 다음 단계로 전달해 지원이 끊기지 않도록 연결하고, 사용자가 사고 이후의 과정을 확인하며 일상으로 복귀할 수 있도록 돕습니다.',614,8681,1286,'body end-flow-body','#fff'),
  text('CONNECT\n& ASSIST',20,10100,700,'title','#111'),
  text('01',975,10314,80,'number','#111'),text('호출부터 접수까지 간단히',1207,10314,650,'lead','#111'),text('모바일 어플리케이션으로 사용자가 등록한 모델과 호환되는 PV5를 호출합니다. 위치 기반으로 가장 가까운 차량 차고지에서 출발하며, 호출 현장까지의 도달 현황을 실시간으로 확인할 수 있습니다.',1207,10368,693,'body','#676767'),
  text('02',975,10617,80,'number','#111'),text('이동은 신속하고 안전하게',1207,10617,650,'lead','#111'),text('PV5 도착 후 QR 인증을 통해 차량과 연결하고 내부 장비를 이용하여 간단한 작업을 진행합니다. 조치가 필요한 경우 정비소를 선택하고, 전용 리프트와 전면 고정 장치로 손상 없이 운송합니다.',1207,10671,693,'body','#676767'),
  text('RESTORE\n& RETURN',20,17468,700,'title light','#e7e7e7'),
  text('01',975,17682,80,'number light','#e7e7e7'),text('바로 이어지는 정비 연계',1207,17682,650,'lead light','#e7e7e7'),text('접수 과정에서 전달된 사고 정보와 차량 정보를 정비소에 미리 공유합니다. 정비소는 차량이 도착하기 전 필요한 작업을 준비하고, 입고 이후 진단 및 정비를 보다 신속하게 진행합니다.',1207,17736,693,'body','#cfcfcf'),
  text('02',975,17985,80,'number light','#e7e7e7'),text('원하는 방식으로 복귀',1207,17985,650,'lead light','#e7e7e7'),text('정비가 완료된 후, 사용자의 일정에 따라 PV5 원격 복귀와 직접 수령 중 원하는 과정을 선택할 수 있습니다. 상황에 맞는 복귀 방식을 제공하여 정비 이후의 과정까지 자연스럽게 연결합니다.',1207,18039,693,'body','#cfcfcf'),
  text('ADDITIONAL\nSERVICES',20,23621,700,'title light','#e7e7e7'),
  text('① 웨어러블 디바이스가 심한 충격을 감지하면 별도 접수 없이 이머전시 모델을 자동 출동시킵니다. 기기에서 도착 예정 시간 확인과 호출 취소가 가능합니다. ② 정비소의 위치와 영업시간, 입고 가능 여부를 확인하고 평점과 리뷰를 참고해 정비를 예약할 수 있으며, PV5가 운송 과정을 지원합니다.',614,23621,1286,'body-semibold light','#e7e7e7'),
]

function AutoVideo({ src, x, y, w, h, className = '' }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }, { threshold: 0.1 })

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return <video ref={videoRef} className={`asset video ${className}`} style={{ left: x, top: y, width: w, height: h }} src={src} muted loop playsInline preload="auto" />
}
function BrandFilm() {
  return <video className="asset video brand-film" style={{ left: 20, top: 260, width: 1880, height: 800 }} src="/videos/brand-film.mp4" poster="/images/brand-film-poster.webp" autoPlay muted loop playsInline preload="auto" />
}
function CareFlow() {
  const stages = [
    { number: '01', circleX: 614, badgeX: 735.64, labelX: 693.57, detailX: 682, label: 'CONNECT', detail: '호출부터 접수와 배차까지' },
    { number: '02', circleX: 950.22, badgeX: 1070.49, labelX: 1048.14, detailX: 1005, label: 'ASSIST', detail: '현장 지원부터 안전한 운송까지' },
    { number: '03', circleX: 1286.43, badgeX: 1406.71, labelX: 1372.11, detailX: 1347, label: 'RESTORE', detail: '정보 공유부터 정비 연계까지' },
    { number: '04', circleX: 1622.65, badgeX: 1742.24, labelX: 1713.11, detailX: 1669, label: 'RETURN', detail: '정비 후 복귀부터 서비스 완료까지' },
  ]
  return <section className="care-flow" aria-label="End-to-end care flow">
    <div className="care-flow-line" />
    <div className="care-devices">
      <img className="device-desktop" src="/images/web-sw/care-desktop.svg" alt="" />
      <img className="device-mobile" src="/images/web-sw/care-mobile.svg" alt="" />
      <img className="device-tablet" src="/images/web-sw/care-tablet.svg" alt="" />
      <span className="device-label device-label-desktop">DESKTOP</span>
      <span className="device-label device-label-mobile">MOBILE</span>
      <span className="device-label device-label-tablet">TABLET</span>
    </div>
    {[885.98, 1222.88, 1559.1].map((x) => <img key={x} className="care-arrow" src="/images/web-sw/care-arrow.svg" alt="" style={{ left: x }} />)}
    {stages.map((stage) => <div key={stage.number}>
      <img className="care-circle" src="/images/web-sw/care-circle.svg" alt="" style={{ left: stage.circleX }} />
      <strong className="care-badge" style={{ left: stage.badgeX }}>{stage.number}</strong>
      <b className="care-label" style={{ left: stage.labelX }}>{stage.label}</b>
      <span className="care-detail" style={{ left: stage.detailX }}>{stage.detail}</span>
    </div>)}
  </section>
}
function RestoreCards() {
  return <section className="restore-cards" aria-label="복귀 서비스 화면">
    <article className="restore-card restore-card-left"><img src="/images/web-sw/restore-card-left.png" alt="" /></article>
    <article className="restore-card restore-card-right"><img src="/images/web-sw/restore-card-right.png" alt="PV5 복귀 모바일 화면" /></article>
  </section>
}
function LoadingScreen({ onComplete }) {
  const [isLeaving, setIsLeaving] = useState(false)
  return <div className={`loading-screen${isLeaving ? ' is-leaving' : ''}`} role="status" aria-label="PLEV 로딩 중" onAnimationEnd={() => isLeaving && onComplete()}><video className="loading-motion" src="/videos/loading-motion.mp4" autoPlay muted playsInline preload="auto" onEnded={() => setIsLeaving(true)} onError={() => setIsLeaving(true)} /></div>
}
const sectionStops = [0,238,1308,2409,3849,5250,6310,7150,8405,9897,11009,12185,13431,14851,17268,18377,19518,20799,22019,23200,24339,25829,27289]
function SectionNavigator({ lenisRef }) {
  const queued = useRef(null)
  const move = (direction) => {
    const scale = window.innerWidth / 1920
    const current = window.scrollY / scale
    const fallback = direction === 'down' ? sectionStops.findIndex((point) => point > current + 12) : sectionStops.findLastIndex((point) => point < current - 12)
    const index = queued.current ?? Math.max(0, fallback)
    const targetIndex = Math.max(0, Math.min(sectionStops.length - 1, queued.current === null ? index : index + (direction === 'down' ? 1 : -1)))
    queued.current = targetIndex
    lenisRef.current?.scrollTo(sectionStops[targetIndex] * scale, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4), onComplete: () => { queued.current = null } })
  }
  return <nav className="section-navigator" aria-label="섹션 이동"><button type="button" aria-label="이전 섹션" onClick={() => move('up')}><img src="/images/nav-arrow-up.png" alt="" /></button><button type="button" aria-label="다음 섹션" onClick={() => move('down')}><img src="/images/nav-arrow-down.png" alt="" /></button></nav>
}
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const lenisRef = useRef(null)
  useEffect(() => { const lenis = new Lenis({ autoRaf: true, lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9, respectReducedMotion: false }); lenisRef.current = lenis; return () => lenis.destroy() }, [])
  useEffect(() => { document.body.classList.toggle('is-loading', isLoading); return () => document.body.classList.remove('is-loading') }, [isLoading])
  useEffect(() => {
    if (isLoading) return undefined

    let inactivityTimer
    const returnToTopAfterInactivity = () => {
      window.clearTimeout(inactivityTimer)
      inactivityTimer = window.setTimeout(() => {
        lenisRef.current?.scrollTo(0, {
          duration: 1.2,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        })
      }, 30000)
    }

    const activityEvents = ['keydown', 'wheel', 'pointermove', 'pointerdown', 'touchstart']
    activityEvents.forEach((eventName) => window.addEventListener(eventName, returnToTopAfterInactivity, { passive: true }))
    returnToTopAfterInactivity()

    return () => {
      window.clearTimeout(inactivityTimer)
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, returnToTopAfterInactivity))
    }
  }, [isLoading])
  return <>{isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}<main className="site"><div className="stage"><div className="dark-band care-band" /><div className="dark-band restore-band" />{images.map((item) => <img key={item.file} className={`asset image${item.file === 'plev-care-in-transit.svg' ? ' brand-wordmark' : ''}`} src={`/images/${item.file}`} alt="" loading={item.file === 'plev-care-in-transit.svg' ? 'eager' : 'lazy'} style={{ left: item.x, top: item.y, width: item.w, height: item.h, objectFit: item.fit }} />)}<BrandFilm /><AutoVideo src="/videos/motion-1-pingpong.mp4" x={20} y={6330} w={930} h={930} /><AutoVideo src="/videos/motion-2-pingpong.mp4" x={970} y={6330} w={930} h={930} /><AutoVideo src="/videos/motion-3.mp4" x={20} y={7280} w={1880} h={930} /><AutoVideo src="/videos/video-1.mp4" x={20} y={11020} w={1880} h={1058} /><AutoVideo src="/videos/ui-main-motion.mp4" x={20} y={12098} w={1880} h={1253} /><AutoVideo src="/videos/ui-card-motion.mp4" x={20} y={13371} w={930} h={1200} /><AutoVideo src="/videos/video-2.mp4" x={20} y={18388} w={1880} h={1058} /><RestoreCards /><AutoVideo src="/videos/ui-wide-motion.mp4" x={20} y={21959} w={1880} h={1200} /><AutoVideo src="/videos/additional-bottom-motion.mp4" x={0} y={24389} w={1920} h={1005} /><AutoVideo src="/videos/plev-footer.mp4" x={0} y={27334} w={1920} h={1020} className="footer-video" /><div className="rule rule-connect" /><div className="rule rule-restore" /><div className="rule rule-additional" /><CareFlow />{copy.map((item, index) => <p key={index} className={`copy ${item.kind}`} style={{ left: item.x, top: item.y, width: item.w, color: item.color }}>{item.value}</p>)}</div></main><SectionNavigator lenisRef={lenisRef} /></>
}
export default App
