'use client';

import React, { useState, useEffect } from 'react';
import { X, Megaphone } from 'lucide-react';

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
      // 닫았더라도 500px 이상 스크롤하면 재노출 (기존 요구사항 반영)
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
    <div className="fixed z-[70] inset-0 flex items-center justify-center md:inset-auto md:bottom-8 md:left-8 md:block">
      {/* Mobile Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm md:hidden transition-opacity duration-300"
        onClick={() => setIsVisible(false)}
        aria-hidden="true"
      />
      
      {/* Popup Content */}
      <div className="relative w-[calc(100%-40px)] max-w-sm md:w-80 bg-white border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] rounded-[32px] p-8 overflow-hidden group animate-reveal">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-burgundy-500" />
        
        <button 
          onClick={() => setIsVisible(false)} 
          className="absolute top-4 right-4 text-gray-300 hover:text-charcoal transition-colors p-3 rounded-full hover:bg-gray-50 active:scale-95 z-10"
          aria-label="팝업 닫기"
        >
          <X size={20} />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-burgundy-50 text-burgundy-500 rounded-xl flex items-center justify-center">
              <Megaphone size={14} />
            </div>
            <span className="text-burgundy-500 font-black text-[10px] uppercase tracking-widest">Notification</span>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-black text-xl text-charcoal tracking-tight leading-tight break-keep">
              {title}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium break-keep">
              {message}
            </p>
          </div>

          <button 
            onClick={() => setIsVisible(false)}
            className="w-full bg-charcoal text-white py-3.5 rounded-2xl text-[11px] font-bold hover:bg-black transition-all shadow-lg shadow-charcoal/10"
          >
            확인하였습니다
          </button>
        </div>
      </div>
    </div>
  );
}
