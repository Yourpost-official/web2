
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
    <div className={`${style.bg} ${style.text} w-full py-3.5 px-6 flex items-center justify-between text-center text-[11px] font-bold z-[60] shadow-sm animate-reveal relative transition-colors duration-500`}>
      <div className="flex-1 flex items-center justify-center gap-3">
        <div className="opacity-70 animate-pulse">{style.icon}</div>
        <span className="whitespace-pre-wrap tracking-tight">{message}</span>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="opacity-40 hover:opacity-100 transition-opacity p-2 shrink-0 bg-white/10 rounded-full"
        aria-label="배너 닫기"
      >
        <X size={12} />
      </button>
    </div>
  );
}
