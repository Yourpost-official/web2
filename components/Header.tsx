'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { ChevronDown } from 'lucide-react';
import { AdminState } from '@/types/admin';

interface HeaderProps {
  adminState?: AdminState;
}

export default function Header({ adminState }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 현재 경로가 해당 페이지인지 확인하는 헬퍼
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  const closeMenu = () => setIsServiceOpen(false);

  return (
    <nav className={`sticky top-0 w-full z-[100] h-20 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-screen-xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="outline-none" aria-label="홈으로 이동" onClick={closeMenu}>
          <Logo />
        </Link>
        
        <div className="hidden md:flex items-center gap-10 text-[13px] font-bold text-gray-500 tracking-tight">
          <NavBtn active={isActive('/')} href="/">홈</NavBtn>
          
          {/* 서비스 드롭다운 (Hover) */}
          <div 
            className="relative h-20 flex items-center"
            onMouseEnter={() => setIsServiceOpen(true)}
            onMouseLeave={() => setIsServiceOpen(false)}
          >
            <button className={`flex items-center gap-1 transition-all ${pathname?.includes('service') || isServiceOpen ? 'text-burgundy-500' : 'hover:text-charcoal'}`}>
              서비스 <ChevronDown size={14} className={`transition-transform duration-300 ${isServiceOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`absolute top-[70px] left-1/2 -translate-x-1/2 w-[520px] bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 transition-all duration-300 origin-top ${isServiceOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}>
              <div className="grid grid-cols-2 gap-2">
                <ServiceItem 
                  title="하루편지" 
                  desc="매달 도착하는 정기구독 편지 서비스" 
                  href="/ondaypost"
                  onClick={closeMenu}
                />
                <ServiceItem 
                  title="하트센드" 
                  desc="서툰 진심을 정교하게 대신 전하는 레터" 
                  href="/heartsend"
                  onClick={closeMenu}
                />
                <ServiceItem 
                  title="B2B 프로그램" 
                  desc="기업 고객과 크리에이터를 위한 솔루션" 
                  href="/b2b"
                  onClick={closeMenu}
                />
                <ServiceItem 
                  title="브랜드 협업" 
                  desc="파트너와 함께 만드는 아날로그 가치" 
                  href="/collab"
                  onClick={closeMenu}
                />
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-center">
                 <Link href="/services" onClick={closeMenu} className="text-[10px] text-gray-400 hover:text-burgundy-500 transition-colors font-black uppercase tracking-widest">전체 서비스 보기</Link>
              </div>
            </div>
          </div>

          <NavBtn active={isActive('/b2b')} href="/b2b">B2B</NavBtn>
          <NavBtn active={isActive('/collab')} href="/collab">협업</NavBtn>
          <NavBtn active={isActive('/about')} href="/about">회사소개</NavBtn>
        </div>

        <div className="w-[100px] hidden md:block"></div> 
      </div>
    </nav>
  );
}

function NavBtn({ active, href, children }: { active: boolean; href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className={`transition-all relative py-2 px-1 ${active ? 'text-burgundy-500' : 'hover:text-charcoal'}`}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-burgundy-500 rounded-full animate-reveal" />
      )}
    </Link>
  );
}

function ServiceItem({ title, desc, href, onClick }: { title: string; desc: string; href: string; onClick: () => void }) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className="text-left p-5 rounded-2xl hover:bg-burgundy-50 transition-colors group block"
    >
      <h4 className="text-sm font-black text-charcoal group-hover:text-burgundy-500 mb-1">{title}</h4>
      <p className="text-[11px] text-gray-400 font-medium leading-relaxed group-hover:text-burgundy-600/70">{desc}</p>
    </Link>
  );
}
