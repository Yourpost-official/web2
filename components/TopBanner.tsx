
import React, { useState } from 'react';
import { Megaphone, Info, AlertCircle, Clock, X } from 'lucide-react';

interface TopBannerProps {
  type: 'none' | 'normal' | 'trip' | 'cs' | 'temp';
  message: string;
}

export default function TopBanner({ type, message }: TopBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (type === 'none' || !isVisible) return null;

  const config = {
    normal: { icon: <Megaphone size={14} />, bg: 'bg-charcoal', text: 'text-white' },
    trip: { icon: <Clock size={14} />, bg: 'bg-amber-100', text: 'text-amber-900' },
    cs: { icon: <Info size={14} />, bg: 'bg-burgundy-50', text: 'text-burgundy-500' },
    temp: { icon: <AlertCircle size={14} />, bg: 'bg-blue-600', text: 'text-white' }
  };

  const style = config[type as keyof typeof config] || config.normal;

  return (
    <div className={`${style.bg} ${style.text} w-full py-3 px-4 md:px-6 flex items-center justify-between text-center text-[11px] font-bold z-[60] shadow-sm animate-reveal relative transition-colors duration-500 min-h-[48px]`}>
      {/* 모바일: 닫기 버튼 왼쪽 배치 (햄버거 메뉴와 겹침 방지) */}
      <button 
        onClick={() => setIsVisible(false)}
        className="md:order-last opacity-60 hover:opacity-100 transition-opacity p-3 -ml-2 md:ml-0 md:-mr-2 shrink-0 rounded-full hover:bg-black/5 active:scale-95"
        aria-label="배너 닫기"
      >
        <X size={16} />
      </button>

      <div className="flex-1 flex items-center justify-center gap-2 px-2">
        <div className="opacity-70 animate-pulse hidden md:block">{style.icon}</div>
        <span className="whitespace-pre-wrap tracking-tight break-keep leading-relaxed">{message}</span>
      </div>
      
      {/* 모바일 레이아웃 균형을 위한 더미 요소 */}
      <div className="w-8 md:hidden"></div>
    </div>
  );
}
