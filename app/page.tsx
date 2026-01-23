'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import HaruPage from '../pages/HaruPage';
import HeartsendPage from '../pages/HeartsendPage';
import AboutPage from '../pages/AboutPage';
import AdminPage from '../pages/AdminPage';
import B2BPage from '../pages/B2BPage';
import CollabPage from '../pages/CollabPage';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsPage from '../pages/TermsPage';
import EmailPolicy from '../pages/EmailPolicy';
import ServicesOverviewPage from '../pages/ServicesOverviewPage';
import EventPage from '../pages/EventPage';
import InvestorPage from '../pages/InvestorPage';
import PressPage from '../pages/PressPage';
import CareersPage from '../pages/CareersPage';
import TopBanner from '../components/TopBanner';
import Popup from '../components/Popup';
import CookieConsent from '../components/CookieConsent';

export const SITE_CONTENT = {
  "home": { "hero": { "headline": "마음을 전하는 가장 조용한 방법", "subheadline": "편지는 느리지만, 그래서 더 오래 남습니다." } },
  "haru": { "headline": "매달 도착하는 당신만을 위한 편지", "description": "디지털 시대, 아날로그 감성으로 당신의 마음에 진심을 전해보세요." },
  "heartsend": { "headline": "진심을 대신 전달해드립니다", "description": "고백, 감사, 사과... 말하지 못한 소중한 마음을 정중한 편지로 보내보세요." },
  "business": { "headline": "브랜드의 진심을 편지로 전달합니다.", "description": "기업의 메시지를 과하지 않게, 가장 확실한 물리적 채널로 전달하는 인프라 솔루션." },
  "contact": { "headline": "새로운 가치를 함께 만들 파트너를 찾습니다." }
};

const INITIAL_ADMIN_STATE = {
  auth: { id: 'rot', password: 'IAMadmin1010^^' },
  isLoggingEnabled: true,
  prices: { 
    haru: { price: '15,000', link: 'https://tally.so/r/nPe0Mv', available: true },
    heartsend: { price: '28,000', link: 'https://tally.so/r/w2X9aY', available: true },
    b2b: { email: 'biz@yourpost.co.kr', info: SITE_CONTENT.business.description, available: true }
  },
  assets: { proposalLink: "https://yourpost.co.kr/proposal.pdf", brandKit: "https://yourpost.co.kr/brandkit.zip" },
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
    showTop: true, showPopup: true,
    top: { type: 'cs' as any, message: '유어포스트 프로덕션 런칭: 새로운 B2B 인프라와 하루편지 시즌2를 확인하세요.' },
    popup: { title: 'B2B 서비스 정식 오픈', message: '기업용 대량 발송 및 스테이셔너리 커스텀 서비스를 시작합니다.', type: 'normal' }
  },
  content: {
    brandStory: [
      { id: 1, title: '디지털 너머의 진심', text: '화면 너머에 존재하는 물리적인 감동을 설계합니다.', size: 'lg', weight: 'bold', image: '', link: '', order: 0 },
      { id: 2, title: '물류와 감성의 결합', text: '정교한 시스템으로 가장 아날로그한 가치를 배달합니다.', size: 'md', weight: 'normal', image: '', link: '', order: 1 }
    ],
    press: [
      { id: 101, title: '유어포스트, 2026 대한민국 브랜드 대상 수상', text: '혁신적인 아날로그 감성의 결합', date: '2026.02', size: 'md', weight: 'bold', link: '#', order: 0 }
    ],
    ir: [
      { id: 201, title: '2025 연간 성과 보고서', date: '2026.01', status: 'Public', content: '누적 발송량 200만 건 돌파 및 수익 모델 안정화', link: '#', size: 'md', weight: 'normal', order: 0 }
    ],
    careers: [
      { id: 301, title: '백엔드 엔지니어 (경력)', text: '물류 자동화 시스템 구축에 함께할 동료를 모십니다.', size: 'md', weight: 'bold', link: 'mailto:contact@yourpost.co.kr', order: 0 }
    ],
    events: [
      { id: 401, title: '가을 한정 왁스실링 에디션', text: '지금 신청하는 하트센드 고객님께 무료 업그레이드 혜택을 드립니다.', date: '2026.09.01 - 09.30', image: 'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91', link: '#', order: 0 }
    ]
  },
  cookieLogs: [] as any[]
};

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home');
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);
  const [userIp, setUserIp] = useState<string>('Detecting...');
  const [isMounted, setIsMounted] = useState(false);
  const [adminState, setAdminState] = useState(INITIAL_ADMIN_STATE);

  useEffect(() => {
    setIsMounted(true);
    
    // ✅ 클라이언트 환경에서만 localStorage 접근하여 하이드레이션 오류 방지
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('yourpost_prod_v5');
      if (saved) {
        try {
          setAdminState(JSON.parse(saved));
        } catch (e) {
          console.error('State parse error:', e);
        }
      }
      
      fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => setUserIp(data.ip))
        .catch(() => setUserIp('Unknown'));
    }
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      localStorage.setItem('yourpost_prod_v5', JSON.stringify(adminState));
    }
  }, [adminState, isMounted]);

  const captureLog = useCallback((action: string, page: string) => {
    if (!isMounted || !adminState.isLoggingEnabled) return;
    const now = new Date();
    const newLog = {
      id: Date.now(),
      date: now.toLocaleString('ko-KR'),
      timestamp: now.getTime(),
      action, page, ip: userIp,
      deviceType: typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      consent: hasAcceptedCookies ? '동의' : '미동의'
    };
    setAdminState((prev: any) => ({
      ...prev,
      cookieLogs: [newLog, ...(prev.cookieLogs || [])].slice(0, 5000)
    }));
  }, [isMounted, adminState.isLoggingEnabled, hasAcceptedCookies, userIp]);

  useEffect(() => {
    if (isMounted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      captureLog('페이지 진입', currentPage);
    }
  }, [currentPage, captureLog, isMounted]);

  const handleNavigate = (page: string) => setCurrentPage(page);

  return (
    <div className="flex flex-col min-h-screen bg-[#FCF9F5] selection:bg-burgundy-500 selection:text-white">
      {adminState.banner.showTop && (
        <TopBanner type={adminState.banner.top.type as any} message={adminState.banner.top.message} />
      )}
      <Header navigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow animate-reveal">
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
      {adminState.banner.showPopup && isMounted && (
        <Popup title={adminState.banner.popup.title} message={adminState.banner.popup.message} />
      )}
      {!hasAcceptedCookies && isMounted && (
        <CookieConsent onAccept={() => {setHasAcceptedCookies(true); captureLog('쿠키 승인', currentPage);}} />
      )}
      {currentPage !== 'admin' && <Footer navigate={handleNavigate} adminState={adminState} />}
    </div>
  );
}
