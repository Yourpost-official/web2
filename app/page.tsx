
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

const SITE_CONTENT = {
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
    top: { type: 'cs', message: '유어포스트 프로덕션: 새로운 B2B 인프라와 하루편지 시즌2를 확인하세요.' },
    popup: { title: 'B2B 서비스 정식 오픈', message: '기업용 대량 발송 및 스테이셔너리 커스텀 서비스를 시작합니다.' }
  },
  content: {
    brandStory: [{ id: 1, title: '디지털 너머의 진심', text: '화면 너머에 존재하는 물리적인 감동을 설계합니다.', order: 0 }],
    press: [{ id: 101, title: '유어포스트 대한민국 브랜드 대상 수상', date: '2026.02', order: 0 }],
    ir: [{ id: 201, title: '2025 연간 성과 보고서', date: '2026.01', order: 0 }],
    careers: [{ id: 301, title: '백엔드 엔지니어 (경력)', text: '물류 자동화 시스템 구축 전문가 모집', order: 0 }],
    events: [{ id: 401, title: '왁스실링 에디션 런칭', date: '2026.09.01 - 09.30', order: 0 }]
  },
  cookieLogs: []
};

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home');
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);
  const [userIp, setUserIp] = useState<string>('Detecting...');
  
  const [adminState, setAdminState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('yourpost_prod_v3');
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_STATE;
    }
    return INITIAL_ADMIN_STATE;
  });

  useEffect(() => {
    localStorage.setItem('yourpost_prod_v3', JSON.stringify(adminState));
  }, [adminState]);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIp(data.ip))
      .catch(() => setUserIp('Unknown'));
  }, []);

  const captureLog = useCallback((action: string, page: string) => {
    if (!adminState.isLoggingEnabled && action !== '쿠키 승인') return;
    const now = new Date();
    const newLog = {
      id: Date.now(),
      date: now.toLocaleString('ko-KR'),
      timestamp: now.getTime(),
      action, page,
      ip: userIp,
      deviceType: typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      consent: hasAcceptedCookies ? '동의' : '미동의'
    };
    setAdminState((prev: any) => ({
      ...prev,
      cookieLogs: [newLog, ...(prev.cookieLogs || [])].slice(0, 5000)
    }));
  }, [adminState.isLoggingEnabled, hasAcceptedCookies, userIp]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    captureLog('페이지 진입', currentPage);
  }, [currentPage, captureLog]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FCF9F5]">
      {adminState.banner.showTop && <TopBanner type={adminState.banner.top.type} message={adminState.banner.top.message} />}
      <Header navigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow">
        {currentPage === 'home' && <HomePage navigate={setCurrentPage} adminState={adminState} />}
        {currentPage === 'haru' && <HaruPage adminState={adminState} navigate={setCurrentPage} contentData={SITE_CONTENT} />}
        {currentPage === 'heartsend' && <HeartsendPage adminState={adminState} contentData={SITE_CONTENT} />}
        {currentPage === 'about' && <AboutPage adminState={adminState} navigate={setCurrentPage} />}
        {currentPage === 'press' && <PressPage adminState={adminState} />}
        {currentPage === 'careers' && <CareersPage adminState={adminState} />}
        {currentPage === 'investor' && <InvestorPage adminState={adminState} />}
        {currentPage === 'admin' && <AdminPage adminState={adminState} setAdminState={setAdminState} />}
        {currentPage === 'event' && <EventPage navigate={setCurrentPage} adminState={adminState} />}
        {currentPage === 'b2b' && <B2BPage adminState={adminState} contentData={SITE_CONTENT} />}
        {currentPage === 'services-overview' && <ServicesOverviewPage navigate={setCurrentPage} />}
        {currentPage === 'collab' && <CollabPage navigate={setCurrentPage} adminState={adminState} />}
        {currentPage === 'privacy' && <PrivacyPolicy />}
        {currentPage === 'terms' && <TermsPage />}
        {currentPage === 'email-policy' && <EmailPolicy />}
      </main>
      {adminState.banner.showPopup && <Popup title={adminState.banner.popup.title} message={adminState.banner.popup.message} />}
      {!hasAcceptedCookies && <CookieConsent onAccept={() => {setHasAcceptedCookies(true); captureLog('쿠키 승인', currentPage);}} />}
      {currentPage !== 'admin' && <Footer navigate={setCurrentPage} adminState={adminState} />}
    </div>
  );
}
