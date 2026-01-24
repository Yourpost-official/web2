
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { ChevronDown } from 'lucide-react';

export default function Header({ navigate = () => {}, currentPage = 'home' }: any) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string) => {
    navigate(page);
    setIsServiceOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`sticky top-0 w-full z-[100] h-20 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-screen-xl mx-auto px-6 h-full flex items-center justify-between">
        <button onClick={() => handleNav('home')} className="outline-none" aria-label="홈으로 이동">
          <Logo />
        </button>
        
        <div className="hidden md:flex items-center gap-10 text-[13px] font-bold text-gray-500 tracking-tight">
          <NavBtn active={currentPage === 'home'} onClick={() => handleNav('home')}>홈</NavBtn>
          
          {/* 서비스 드롭다운 (Hover) */}
          <div 
            className="relative h-20 flex items-center"
            onMouseEnter={() => setIsServiceOpen(true)}
            onMouseLeave={() => setIsServiceOpen(false)}
          >
            <button className={`flex items-center gap-1 transition-all ${currentPage.includes('service') || isServiceOpen ? 'text-burgundy-500' : 'hover:text-charcoal'}`}>
              서비스 <ChevronDown size={14} className={`transition-transform duration-300 ${isServiceOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`absolute top-[70px] left-1/2 -translate-x-1/2 w-[520px] bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 transition-all duration-300 origin-top ${isServiceOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}>
              <div className="grid grid-cols-2 gap-2">
                <ServiceItem 
                  title="하루편지" 
                  desc="매달 도착하는 정기구독 편지 서비스" 
                  onClick={() => handleNav('haru')} 
                />
                <ServiceItem 
                  title="하트센드" 
                  desc="서툰 진심을 정교하게 대신 전하는 레터" 
                  onClick={() => handleNav('heartsend')} 
                />
                <ServiceItem 
                  title="B2B 프로그램" 
                  desc="기업 고객과 크리에이터를 위한 솔루션" 
                  onClick={() => handleNav('b2b')} 
                />
                <ServiceItem 
                  title="브랜드 협업" 
                  desc="파트너와 함께 만드는 아날로그 가치" 
                  onClick={() => handleNav('collab')} 
                />
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-center">
                 <button onClick={() => handleNav('services-overview')} className="text-[10px] text-gray-400 hover:text-burgundy-500 transition-colors font-black uppercase tracking-widest">전체 서비스 보기</button>
              </div>
            </div>
          </div>

          <NavBtn active={currentPage === 'b2b'} onClick={() => handleNav('b2b')}>B2B</NavBtn>
          <NavBtn active={currentPage === 'collab'} onClick={() => handleNav('collab')}>협업</NavBtn>
          <NavBtn active={currentPage === 'about'} onClick={() => handleNav('about')}>회사소개</NavBtn>
        </div>

        <div className="w-[100px] hidden md:block"></div> 
      </div>
    </nav>
  );
}

function NavBtn({ active, onClick, children }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`transition-all relative py-2 px-1 ${active ? 'text-burgundy-500' : 'hover:text-charcoal'}`}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-burgundy-500 rounded-full animate-reveal" />
      )}
    </button>
  );
}

function ServiceItem({ title, desc, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="text-left p-5 rounded-2xl hover:bg-burgundy-50 transition-colors group"
    >
      <h4 className="text-sm font-black text-charcoal group-hover:text-burgundy-500 mb-1">{title}</h4>
      <p className="text-[11px] text-gray-400 font-medium leading-relaxed group-hover:text-burgundy-600/70">{desc}</p>
    </button>
  );
}
