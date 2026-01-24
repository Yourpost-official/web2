'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
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

function MobileMenuItem({ label, page, onClick }: { label: string; page: string; onClick: (page: string) => void }) {
  return (
    <button 
      onClick={() => onClick(page)}
      className="w-full text-left px-6 py-4 rounded-2xl hover:bg-gray-50 transition-colors flex items-center justify-between group"
    >
      <span className="text-lg font-bold text-charcoal">{label}</span>
      <ChevronRight size={20} className="text-gray-300 group-hover:text-burgundy-500 transition-colors" />
    </button>
  );
}

function MainContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
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
          if (parsed && parsed.auth) { 
            setAdminState(parsed);
          } else {
            setAdminState(INITIAL_ADMIN_STATE);
          }
        } catch (e) {
          console.error('State parse error:', e);
          setAdminState(INITIAL_ADMIN_STATE);
        }
      }
      
      fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => setUserIp(data.ip))
        .catch(() => setUserIp('Unknown'));
        
      fetch('/api/admin/cms')
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) throw new TypeError("Oops, we haven't got JSON!");
          return res.json();
        })
        .then(data => {
          if (data && Object.keys(data).length > 0) setAdminState(prev => ({ ...prev, ...data }));
        })
        .catch(() => {});
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam && pageParam !== currentPage) {
      setCurrentPage(pageParam);
    } else if (!pageParam && currentPage !== 'home') {
      setCurrentPage('home');
    }
  }, [searchParams, currentPage]);

  const handleMobileNav = (page: string) => {
    handleNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    const newPath = page === 'home' ? pathname : `${pathname}?page=${page}`;
    router.push(newPath, { scroll: false });
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream text-charcoal selection:bg-burgundy-500 selection:text-white">
      <div className={`fixed top-6 right-6 z-[60] md:hidden transition-all duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-20'}`}>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-100 text-charcoal"
          aria-label="메뉴 열기"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className={`fixed inset-0 z-[100] bg-white transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col`}>
        <div className="p-6 flex justify-end">
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-charcoal" aria-label="메뉴 닫기">
            <X size={32} />
          </button>
        </div>
        <div className="flex-1 px-8 overflow-y-auto pb-20">
          <div className="space-y-2">
            <p className="text-xs font-black text-burgundy-500 tracking-widest uppercase mb-6">Menu</p>
            <MobileMenuItem label="홈" page="home" onClick={handleMobileNav} />
            <MobileMenuItem label="서비스 소개" page="services-overview" onClick={handleMobileNav} />
            <MobileMenuItem label="하루편지" page="haru" onClick={handleMobileNav} />
            <MobileMenuItem label="하트센드" page="heartsend" onClick={handleMobileNav} />
            <MobileMenuItem label="기업 제휴 (B2B)" page="b2b" onClick={handleMobileNav} />
            <MobileMenuItem label="브랜드 스토리" page="about" onClick={handleMobileNav} />
            <MobileMenuItem label="이벤트" page="event" onClick={handleMobileNav} />
            <MobileMenuItem label="채용" page="careers" onClick={handleMobileNav} />
          </div>
          <div className="mt-12 space-y-4">
             <button onClick={() => { handleNavigate('collab'); setMobileMenuOpen(false); }} className="w-full py-4 bg-charcoal text-white rounded-2xl font-bold text-lg">협업 문의</button>
          </div>
        </div>
      </div>

      <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        {adminState.banner.showTop && adminState.banner.top && (
          <TopBanner type={adminState.banner.top.type as any} message={adminState.banner.top.message} />
        )}
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
      {adminState.banner.showPopup && adminState.banner.popup && isMounted && (
        <Popup title={adminState.banner.popup.title} message={adminState.banner.popup.message} />
      )}
      {!hasAcceptedCookies && isMounted && (
        <CookieConsent onAccept={() => {setHasAcceptedCookies(true); captureLog('쿠키 승인', currentPage);}} />
      )}
      {currentPage !== 'admin' && <Footer navigate={handleNavigate} adminState={adminState} />}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FCF9F5]" />}>
      <MainContent />
    </Suspense>
  );
}