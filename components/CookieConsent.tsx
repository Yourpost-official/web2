import React from 'react';

/**
 * 쿠키 동의 배너 컴포넌트
 * 가독성과 사용자 경험을 개선하기 위해 버튼 가시성을 높였습니다.
 */
export default function CookieConsent({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] p-6 bg-[#1A1A1A] text-white shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border-t border-white/10 animate-reveal">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* 설명 텍스트: 가독성을 위해 폰트 크기와 색상을 조정 */}
        <p className="text-[13px] md:text-[14px] text-gray-200 text-center md:text-left leading-relaxed max-w-3xl">
          유어포스트는 사용자에게 최적화된 경험을 제공하기 위해 쿠키를 사용합니다. 
          사이트를 계속 이용함으로써 귀하는 당사의 
          <button className="mx-1 underline text-burgundy-400 hover:text-burgundy-300 font-bold transition-colors">
            개인정보처리방침
          </button>
          에 동의하게 됩니다.
        </p>
        
        {/* 버튼 섹션: 가독성을 위해 버튼 크기와 색상 대비 극대화 */}
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={onAccept}
            className="flex-1 md:flex-none bg-burgundy-500 text-white px-10 py-4 rounded-2xl text-[14px] font-black hover:bg-burgundy-600 transition-all shadow-lg active:scale-95 flex items-center justify-center min-w-[120px]"
          >
            확인 및 동의함
          </button>
        </div>
      </div>
    </div>
  );
}
