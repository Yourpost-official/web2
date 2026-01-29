'use client';

import React, { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';

interface PopupProps {
  title: string;
  message: string;
}

export default function Popup({ title, message }: PopupProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!isVisible && Math.abs(currentScrollY - lastScrollY) > 500) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, lastScrollY]);

  if (!isVisible) return null;

  return (
    <div className="fixed z-[70] inset-0 flex items-center justify-center md:inset-auto md:bottom-6 md:left-6 md:block">
      {/* Mobile Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 md:hidden"
        onClick={() => setIsVisible(false)}
        aria-hidden="true"
      />

      {/* Popup Content - 심플하고 깔끔한 디자인 */}
      <div className="relative w-[calc(100%-32px)] max-w-sm md:w-72 bg-white rounded-2xl shadow-2xl overflow-hidden animate-reveal">
        {/* 상단 컬러 바 */}
        <div className="h-1 bg-burgundy-500" />

        <div className="p-5">
          {/* 헤더 */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-burgundy-50 text-burgundy-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bell size={16} />
              </div>
              <span className="text-xs font-bold text-burgundy-500 uppercase tracking-wide">공지</span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1 -mt-1"
              aria-label="닫기"
            >
              <X size={18} />
            </button>
          </div>

          {/* 내용 */}
          <div className="space-y-2 mb-4">
            <h4 className="font-bold text-base text-[#1D1D1F] leading-snug break-keep">
              {title}
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed break-keep">
              {message}
            </p>
          </div>

          {/* 버튼 */}
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="w-full bg-[#1D1D1F] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-black transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
