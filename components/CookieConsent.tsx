'use client';
import React, { useEffect, useState } from 'react';

/**
 * 쿠키 동의 배너 컴포넌트
 * 가독성과 사용자 경험을 개선하기 위해 버튼 가시성을 높였습니다.
 */
export default function CookieConsent({ onAccept }: { onAccept: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // DB에서 동의 여부 확인 (IP 기준) - 로컬스토리지 대신 DB 사용
    const checkConsent = async () => {
      try {
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
      // 수집 로그 전송 (비동기로 처리하여 UX 저하 방지)
      const res = await fetch('/api/admin/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'consent_agree',
          page: window.location.pathname,
          consentMarketing: true
        })
      });

      if (!res.ok) {
        console.warn('Cookie log failed:', res.status, await res.text());
      }
    } catch (error) {
      console.error('Cookie log error:', error);
    } finally {
      // DB에 로그가 저장되었으므로 로컬스토리지 저장 로직 제거
      setIsVisible(false);
      // 로그 전송 성공 여부와 관계없이 동의 처리 진행
      onAccept();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] p-6 bg-[#1A1A1A] text-white shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border-t border-white/10 animate-reveal">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* 설명 텍스트: 가독성을 위해 폰트 크기와 색상을 조정 */}
        <p className="text-sm text-gray-200 text-center md:text-left leading-relaxed max-w-3xl">
          더 나은 경험을 위해 쿠키를 사용합니다. 
          <button className="mx-1 underline text-burgundy-400 hover:text-burgundy-300 font-bold transition-colors">
            개인정보처리방침
          </button>
          을 확인해 주세요.
        </p>
        
        {/* 버튼 섹션: 가독성을 위해 버튼 크기와 색상 대비 극대화 */}
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none btn-emotional-primary px-8 py-3 text-sm min-w-[100px]"
          >
            확인했습니다
          </button>
        </div>
      </div>
    </div>
  );
}
