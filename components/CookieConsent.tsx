
import React from 'react';

export default function CookieConsent({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 w-full z-[60] p-4 md:p-6 bg-charcoal text-white animate-fade-in">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs md:text-sm text-gray-400 text-center md:text-left leading-relaxed">
          유어포스트는 최적의 서비스 경험을 위해 쿠키를 사용합니다. 
          귀하가 사이트를 계속 이용하면 당사의 <button className="underline hover:text-white">개인정보처리방침</button>에 동의하는 것으로 간주됩니다.
        </p>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={onAccept}
            className="flex-1 md:flex-none bg-white text-charcoal px-8 py-3 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors"
          >
            동의함
          </button>
        </div>
      </div>
    </div>
  );
}
