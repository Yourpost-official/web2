'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
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
    <div className="flex flex-col min-h-screen bg-cream text-charcoal selection:bg-burgundy-500 selection:text-white">
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
