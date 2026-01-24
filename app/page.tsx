'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Menu, X, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopBanner from '../components/TopBanner';
import Popup from '../components/Popup';
import CookieConsent from '../components/CookieConsent';
import { SITE_CONTENT } from '../lib/content';
import INITIAL_ADMIN_STATE from '../adminState.json';

const HomePage = dynamic(() => import('../pages/HomePage'));
const HaruPage = dynamic(() => import('../pages/HaruPage'));
const HeartsendPage = dynamic(() => import('../pages/HeartsendPage'));
const AboutPage = dynamic(() => import('../pages/AboutPage'));
const AdminPage = dynamic(() => import('../pages/AdminPage'));
const B2BPage = dynamic(() => import('../pages/B2BPage'));
const CollabPage = dynamic(() => import('../pages/CollabPage'));
const PrivacyPolicy = dynamic(() => import('../pages/PrivacyPolicy'));
const TermsPage = dynamic(() => import('../pages/TermsPage'));
const EmailPolicy = dynamic(() => import('../pages/EmailPolicy'));
const ServicesOverviewPage = dynamic(() => import('../pages/ServicesOverviewPage'));
const EventPage = dynamic(() => import('../pages/EventPage'));
const InvestorPage = dynamic(() => import('../pages/InvestorPage'));
const PressPage = dynamic(() => import('../pages/PressPage'));
const CareersPage = dynamic(() => import('../pages/CareersPage'));

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home');
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);
  const [userIp, setUserIp] = useState<string>('Detecting...');
  const [isMounted, setIsMounted] = useState(false);
  const [adminState, setAdminState] = useState(INITIAL_ADMIN_STATE);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = React.useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('yourpost_prod_v5');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Simple validation to check if the stored state is likely valid
          if (parsed && parsed.auth) { 
            setAdminState(parsed);
          } else {
            // Stored state is invalid, fall back to initial state
            setAdminState(INITIAL_ADMIN_STATE);
          }
        } catch (e) {
          console.error('State parse error:', e);
          setAdminState(INITIAL_ADMIN_STATE); // Fallback on parsing error
        }
      }
      
      fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => setUserIp(data.ip))
        .catch(() => setUserIp('Unknown'));
        
      // CMS 데이터 최신화 (배포 환경 대응)
      fetch('/api/admin/cms')
        .then(res => {
          // 응답이 성공적이고 JSON 타입인지 확인
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) throw new TypeError("Oops, we haven't got JSON!");
          return res.json();
        })
        .then(data => {
          // 서버 데이터가 유효하면 병합
          if (data && Object.keys(data).length > 0) setAdminState(prev => ({ ...prev, ...data }));
        })
        .catch(() => {
          // 조용히 실패 (기본값 사용) - 콘솔 에러 제거하여 사용자 경험 유지
        });
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

  // Scroll Logic for Sticky Header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowHeader(false); // Scroll Down -> Hide
      } else {
        setShowHeader(true); // Scroll Up -> Show
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 모바일 메뉴 열림 시 스크롤 잠금
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleNavigate = (page: string) => setCurrentPage(page);

  // 모바일 메뉴 아이템 컴포넌트
  const MobileMenuItem = ({ label, page }: { label: string, page: string }) => (
    <button 
      onClick={() => { handleNavigate(page); setMobileMenuOpen(false); }}
      className="w-full text-left py-4 text-2xl font-bold text-charcoal border-b border-gray-100 flex justify-between items-center active:text-burgundy-500"
    >
      {label} <ChevronRight size={20} className="text-gray-300" />
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen bg-cream text-charcoal selection:bg-burgundy-500 selection:text-white">
      {/* Mobile Hamburger Button (Fixed) */}
      <div className={`fixed top-6 right-6 z-[60] md:hidden transition-all duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-20'}`}>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-100 text-charcoal"
          aria-label="메뉴 열기"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] bg-white transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col`}>
        <div className="p-6 flex justify-end">
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-charcoal" aria-label="메뉴 닫기">
            <X size={32} />
          </button>
        </div>
        <div className="flex-1 px-8 overflow-y-auto pb-20">
          <div className="space-y-2">
            <p className="text-xs font-black text-burgundy-500 tracking-widest uppercase mb-6">Menu</p>
            <MobileMenuItem label="홈" page="home" />
            <MobileMenuItem label="서비스 소개" page="services-overview" />
            <MobileMenuItem label="하루편지" page="haru" />
            <MobileMenuItem label="하트센드" page="heartsend" />
            <MobileMenuItem label="기업 제휴 (B2B)" page="b2b" />
            <MobileMenuItem label="브랜드 스토리" page="about" />
            <MobileMenuItem label="이벤트" page="event" />
            <MobileMenuItem label="채용" page="careers" />
          </div>
          <div className="mt-12 space-y-4">
             <button onClick={() => { handleNavigate('collab'); setMobileMenuOpen(false); }} className="w-full py-4 bg-charcoal text-white rounded-2xl font-bold text-lg">협업 문의</button>
          </div>
        </div>
      </div>

      <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        {adminState.banner.showTop && (
          <TopBanner type={adminState.banner.top.type as any} message={adminState.banner.top.message} />
        )}
        {/* Desktop Header (Hidden on Mobile to avoid duplication if needed, or kept if it just has logo) */}
        <div className="hidden md:block"><Header navigate={handleNavigate} currentPage={currentPage} /></div>
      </div>
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
