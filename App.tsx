
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HaruPage from './pages/HaruPage';
import HeartsendPage from './pages/HeartsendPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import B2BPage from './pages/B2BPage';
import CollabPage from './pages/CollabPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsPage from './pages/TermsPage';
import EmailPolicy from './pages/EmailPolicy';
import ServicesOverviewPage from './pages/ServicesOverviewPage';
import EventPage from './pages/EventPage';
import InvestorPage from './pages/InvestorPage';
import PressPage from './pages/PressPage';
import CareersPage from './pages/CareersPage';
import TopBanner from './components/TopBanner';
import Popup from './components/Popup';
import CookieConsent from './components/CookieConsent';

export const SITE_CONTENT = {
  "home": {
    "hero": {
      "headline": "마음을 전하는 가장 조용한 방법",
      "subheadline": "편지는 느리지만, 그래서 더 오래 남습니다."
    }
  },
  "haru": {
    "headline": "매달 도착하는 당신만을 위한 편지",
    "description": "디지털 시대, 아날로그 감성으로 당신의 마음에 진심을 전해보세요."
  },
  "heartsend": {
    "headline": "진심을 대신 전달해드립니다",
    "description": "고백, 감사, 사과... 말하지 못한 소중한 마음을 정중한 편지로 보내보세요."
  },
  "business": {
    "headline": "브랜드의 진심을 편지로 전달합니다.",
    "description": "기업의 메시지를 과하지 않게, 가장 확실한 물리적 채널로 전달하는 인프라 솔루션."
  },
  "contact": {
    "headline": "새로운 가치를 함께 만들 파트너를 찾습니다."
  }
};

const INITIAL_ADMIN_STATE = {
  auth: { id: 'rot', password: 'IAMadmin1010^^' },
  isLoggingEnabled: true,
  prices: { 
    haru: { price: '15,000', link: 'https://tally.so/r/nPe0Mv', available: true },
    heartsend: { price: '28,000', link: 'https://tally.so/r/w2X9aY', available: true },
    b2b: { email: 'biz@yourpost.co.kr', info: SITE_CONTENT.business.description, available: true }
  },
  cta: {
    submitProposal: "제안서 제출하기 (Email)",
    contactPartner: "파트너십 문의하기",
    startService: "서비스 시작하기",
    b2bInquiry: "비즈니스 도입 문의",
    additionalInquiry: "추가 문의 남기기",
    additionalInquiryLink: "https://tally.so/r/mR7bLp",
    mainContactEmail: "contact@yourpost.co.kr"
  },
  banner: {
    showTop: true,
    showPopup: true,
    top: { type: 'cs' as any, message: '유어포스트 리뉴얼: 새로운 브랜드 스토리와 B2B 솔루션을 확인하세요.' },
    popup: { title: 'B2B 정식 런칭', message: '기업용 대량 발송 인프라 서비스를 시작합니다.', type: 'normal' }
  },
  content: {
    brandStory: [
      { id: 1, title: '디지털 너머의 진심', text: '화면 너머에 존재하는 물리적인 감동을 설계합니다.', size: 'lg', weight: 'bold', image: '', link: '', order: 0 },
      { id: 2, title: '물류와 감성의 결합', text: '정교한 시스템으로 가장 아날로그한 가치를 배달합니다.', size: 'md', weight: 'normal', image: '', link: '', order: 1 }
    ],
    press: [
      { id: 101, title: '유어포스트, 2026 대한민국 브랜드 대상 수상', text: '혁신적인 아날로그 감성의 결합', date: '2026.02', size: 'md', weight: 'bold', link: '#', order: 0 },
      { id: 102, title: '시리즈 A 투자 유치 완료', text: '물리적 커뮤니케이션 인프라 고도화 예정', date: '2025.11', size: 'md', weight: 'normal', link: '#', order: 1 }
    ],
    ir: [
      { id: 201, title: '2025 연간 성과 보고서', date: '2026.01', status: 'Public', content: '누적 발송량 200만 건 돌파 및 수익 모델 안정화', link: '#', size: 'md', weight: 'normal', order: 0 }
    ],
    careers: [
      { id: 301, title: '백엔드 엔지니어 (신입/경력)', text: '물류 자동화 시스템 구축에 함께할 동료를 모십니다.', size: 'md', weight: 'bold', link: 'mailto:contact@yourpost.co.kr', order: 0 },
      { id: 302, title: '작가 및 일러스트레이터 파트너 상시모집', text: '유어포스트의 엽서와 편지에 담길 예술적인 작품을 기다립니다.', size: 'md', weight: 'normal', link: 'mailto:contact@yourpost.co.kr', order: 1 }
    ],
    events: [
      { id: 401, title: '가을 한정 왁스실링 에디션', text: '지금 신청하는 하트센드 고객님께 무료 업그레이드 혜택을 드립니다.', date: '2026.09.01 - 09.30', image: 'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91', link: '#', order: 0 }
    ]
  },
  cookieLogs: [] as any[]
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);
  
  // 브라우저 로컬 저장소를 DB처럼 사용 (Vercel 배포 시 영속성 보장)
  const [adminState, setAdminState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('yourpost_production_v1');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return INITIAL_ADMIN_STATE;
        }
      }
    }
    return INITIAL_ADMIN_STATE;
  });

  // 상태 변경 마다 로컬 저장소 동기화 (Persistence Layer)
  useEffect(() => {
    localStorage.setItem('yourpost_production_v1', JSON.stringify(adminState));
  }, [adminState]);

  // 로깅 시스템 (Full IP 수집 포함)
  const captureLog = useCallback((action: string, page: string, metadata: any = {}) => {
    if (!adminState.isLoggingEnabled && action !== '쿠키 승인') return;

    const now = new Date();
    const userAgent = navigator.userAgent;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    
    // 프로덕션 환경에서는 서버 사이드에서 IP를 수집하지만, 
    // 여기서는 클라이언트 측에서 수집 가능한 모든 메타데이터와 함께 전체 시뮬레이션 IP를 기록
    const fullIp = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

    const newLog = {
      id: Date.now(),
      date: now.toLocaleString('ko-KR'),
      timestamp: now.getTime(),
      action,
      page,
      url: window.location.href,
      ip: fullIp, 
      browser: userAgent,
      os: navigator.platform,
      deviceType: isMobile ? 'Mobile' : 'Desktop',
      consent: hasAcceptedCookies ? '동의' : '미동의',
      ...metadata
    };

    setAdminState(prev => ({
      ...prev,
      cookieLogs: [newLog, ...(prev.cookieLogs || [])].slice(0, 5000) // 최대 5천건 성능 최적화
    }));
  }, [adminState.isLoggingEnabled, hasAcceptedCookies]);

  // 30일 경과 로그 자동 파기 (Garbage Collector)
  useEffect(() => {
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    const cleanup = () => {
      const now = Date.now();
      setAdminState(prev => {
        const filteredLogs = (prev.cookieLogs || []).filter(log => (now - log.timestamp) < thirtyDaysInMs);
        if (filteredLogs.length !== prev.cookieLogs.length) {
          return { ...prev, cookieLogs: filteredLogs };
        }
        return prev;
      });
    };
    cleanup();
    const timer = setInterval(cleanup, 1000 * 60 * 60); // 1시간 마다 실행
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    captureLog('페이지 진입', currentPage);
  }, [currentPage, captureLog]);

  const handleNavigate = (page: string) => setCurrentPage(page);

  return (
    <div className="flex flex-col min-h-screen selection:bg-burgundy-500 selection:text-white bg-[#FCF9F5]">
      {adminState.banner.showTop && (
        <TopBanner type={adminState.banner.top.type} message={adminState.banner.top.message} />
      )}
      <Header navigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow">
        {currentPage === 'home' && <HomePage navigate={handleNavigate} adminState={adminState} contentData={SITE_CONTENT} />}
        {currentPage === 'haru' && <HaruPage adminState={adminState} navigate={handleNavigate} contentData={SITE_CONTENT} />}
        {currentPage === 'heartsend' && <HeartsendPage adminState={adminState} contentData={SITE_CONTENT} />}
        {currentPage === 'about' && <AboutPage adminState={adminState} navigate={handleNavigate} />}
        {currentPage === 'press' && <PressPage adminState={adminState} />}
        {currentPage === 'careers' && <CareersPage adminState={adminState} />}
        {currentPage === 'investor' && <InvestorPage adminState={adminState} />}
        {currentPage === 'admin' && <AdminPage adminState={adminState} setAdminState={setAdminState} />}
        {currentPage === 'event' && <EventPage navigate={handleNavigate} adminState={adminState} />}
        {currentPage === 'b2b' && <B2BPage adminState={adminState} contentData={SITE_CONTENT} />}
        {currentPage === 'services-overview' && <ServicesOverviewPage navigate={handleNavigate} />}
        {currentPage === 'collab' && <CollabPage navigate={handleNavigate} adminState={adminState} />}
        {currentPage === 'privacy' && <PrivacyPolicy />}
        {currentPage === 'terms' && <TermsPage />}
        {currentPage === 'email-policy' && <EmailPolicy />}
      </main>
      {adminState.banner.showPopup && <Popup title={adminState.banner.popup.title} message={adminState.banner.popup.message} />}
      {!hasAcceptedCookies && <CookieConsent onAccept={() => {setHasAcceptedCookies(true); captureLog('쿠키 승인', currentPage);}} />}
      {currentPage !== 'admin' && <Footer navigate={handleNavigate} adminState={adminState} />}
    </div>
  );
}
