'use client';

import React, { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';

interface PopupProps {
  title: string;
  message: string;
  position?: 'center' | 'bottom-left';
}

export default function Popup({ title, message, position = 'center' }: PopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 새로고침마다 항상 표시 (sessionStorage로 탭 내에서만 한 번)
    const sessionKey = `popup_shown_${title}`;
    const alreadyShown = sessionStorage.getItem(sessionKey);

    if (!alreadyShown) {
      setIsVisible(true);
      sessionStorage.setItem(sessionKey, 'true');
    }
  }, [title]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  // 중앙 팝업
  if (position === 'center') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* 배경 오버레이 */}
        <div
          className="absolute inset-0 bg-[#2D2620]/60 backdrop-blur-sm"
          onClick={handleDismiss}
        />

        {/* 팝업 카드 */}
        <div className="relative w-full max-w-[380px] bg-[#FFFDF9] rounded-2xl shadow-2xl overflow-hidden animate-reveal">
          {/* 상단 장식 바 */}
          <div className="h-1.5 bg-gradient-to-r from-[#8B2E2E] via-[#A63A3A] to-[#8B2E2E]" />

          {/* 닫기 버튼 */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-[#9C9183] hover:text-[#2D2620] hover:bg-[#F5EFE6] rounded-full transition-all"
            aria-label="닫기"
          >
            <X size={18} />
          </button>

          <div className="p-6 pt-5">
            {/* 헤더 */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-[#8B2E2E] rounded-lg flex items-center justify-center">
                <Bell size={16} className="text-white" />
              </div>
              <span className="text-[11px] font-bold text-[#8B2E2E] tracking-[0.08em] uppercase">공지사항</span>
            </div>

            {/* 내용 */}
            <div className="space-y-3 mb-5">
              <h4 className="text-[18px] font-bold text-[#2D2620] leading-snug break-keep">
                {title}
              </h4>
              <p className="text-[14px] text-[#6E6459] leading-relaxed break-keep">
                {message}
              </p>
            </div>

            {/* 확인 버튼 */}
            <button
              onClick={handleDismiss}
              className="w-full py-3 bg-[#2D2620] text-white text-[14px] font-semibold rounded-xl hover:bg-[#1a1815] transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 좌측 하단 팝업
  return (
    <div className="fixed bottom-5 left-5 z-[90] w-[320px] max-w-[calc(100vw-40px)] animate-reveal">
      <div className="bg-[#FFFDF9] rounded-xl shadow-lg border border-[#E5DED3] overflow-hidden">
        {/* 좌측 장식 바 */}
        <div className="flex">
          <div className="w-1 bg-[#8B2E2E] shrink-0" />

          <div className="flex-1 p-4">
            {/* 헤더 */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#8B2E2E] rounded-md flex items-center justify-center shrink-0">
                  <Bell size={13} className="text-white" />
                </div>
                <span className="text-[10px] font-bold text-[#8B2E2E] tracking-[0.05em] uppercase">공지</span>
              </div>
              <button
                onClick={handleDismiss}
                className="w-6 h-6 flex items-center justify-center text-[#9C9183] hover:text-[#2D2620] hover:bg-[#F5EFE6] rounded-full transition-all shrink-0"
                aria-label="닫기"
              >
                <X size={14} />
              </button>
            </div>

            {/* 내용 */}
            <h4 className="text-[14px] font-bold text-[#2D2620] leading-snug mb-1.5 break-keep">
              {title}
            </h4>
            <p className="text-[12px] text-[#6E6459] leading-relaxed break-keep">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
