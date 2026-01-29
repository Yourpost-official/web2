'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkConsent = async () => {
      try {
        const cmsRes = await fetch('/api/admin/cms');
        if (cmsRes.ok) {
          const cmsData = await cmsRes.json();
          const settings = cmsData.cookieSettings;
          if (settings?.enabled === false || settings?.mode === 'none') {
            setIsVisible(false);
            return;
          }
        }

        const res = await fetch('/api/consent/check');
        if (res.ok) {
          const { consented } = await res.json();
          if (!consented) setIsVisible(true);
        } else {
          setIsVisible(true);
        }
      } catch {
        setIsVisible(true);
      }
    };
    checkConsent();
  }, []);

  const handleAccept = async () => {
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'consent_agree',
          page: window.location.pathname,
          consentMarketing: true,
          consentAnalytics: true
        })
      });
    } catch {
      // 실패해도 무시
    } finally {
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:bottom-6 z-[80] animate-reveal">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 md:p-5 max-w-sm">
        {/* 헤더 */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-burgundy-50 text-burgundy-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Cookie size={16} />
            </div>
            <span className="text-xs font-bold text-gray-900">쿠키 사용 안내</span>
          </div>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1 -mt-1"
            aria-label="닫기"
          >
            <X size={18} />
          </button>
        </div>

        {/* 내용 */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          더 나은 경험을 위해 쿠키를 사용합니다.{' '}
          <Link href="/privacy" className="text-burgundy-500 hover:text-burgundy-600 underline underline-offset-2">
            자세히 보기
          </Link>
        </p>

        {/* 버튼 */}
        <button
          type="button"
          onClick={handleAccept}
          className="w-full bg-burgundy-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-burgundy-600 transition-colors"
        >
          동의합니다
        </button>
      </div>
    </div>
  );
}
