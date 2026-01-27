'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * 쿠키 동의 배너 컴포넌트
 * 가독성과 사용자 경험을 개선하기 위해 버튼 가시성을 높였습니다.
 */
export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false); // 초기값 false로 변경하여 깜빡임 방지

  useEffect(() => {
    const checkConsent = async () => {
      try {
        // 1. CMS 설정 확인 (쿠키 수집 활성화 여부)
        const cmsRes = await fetch('/api/admin/cms');
        if (cmsRes.ok) {
          const cmsData = await cmsRes.json();
          const settings = cmsData.cookieSettings;
          
          // 비활성화 상태이거나 '표시 안 함' 모드면 배너 숨김
          if (settings?.enabled === false || settings?.mode === 'none') {
            setIsVisible(false);
            return;
          }
        }

        // 2. DB에서 동의 여부 확인 (IP 기준)
        const res = await fetch('/api/consent/check');
        if (res.ok) {
          const { consented } = await res.json();
          // 동의 기록이 없으면 배너 표시
          if (!consented) setIsVisible(true);
        } else {
          setIsVisible(true); // API 실패 시 안전하게 배너 표시
        }
      } catch (e) {
        setIsVisible(true);
      }
    };
    checkConsent();
  }, []);

  // 로그 수집 및 동의 처리 핸들러
  const handleAccept = async () => {
    try {
      // 쿠키 동의 정보를 DB에 저장 (공개 API 사용)
      const res = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'consent_agree',
          page: window.location.pathname,
          consentMarketing: true,
          consentAnalytics: true
        })
      });

      if (!res.ok) {
        console.warn('Cookie consent tracking failed:', res.status);
      }
    } catch (error) {
      console.error('Cookie consent tracking error:', error);
    } finally {
      // 성공 여부와 관계없이 배너 숨김 (UX 우선)
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] p-6 bg-[#1A1A1A] text-white shadow-[0_-10px_40px_rgba(0,0,0,0.4)] border-t-2 border-white/15 animate-reveal">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* 설명 텍스트: 가독성 강화 */}
        <p className="text-sm text-gray-100 text-center md:text-left leading-relaxed max-w-3xl font-medium">
          더 나은 경험을 위해 쿠키를 사용합니다.
          <Link href="/privacy" className="mx-1 underline text-burgundy-400 hover:text-burgundy-300 font-bold transition-colors decoration-2 underline-offset-4">
            개인정보처리방침
          </Link>
          을 확인해 주세요.
        </p>

        {/* 버튼 섹션: 가독성 강화 */}
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none btn-emotional-primary px-8 py-3 text-sm min-w-[120px] font-bold"
          >
            확인했습니다
          </button>
        </div>
      </div>
    </div>
  );
}
