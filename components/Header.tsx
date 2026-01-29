'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AdminState } from '@/types/admin';

interface HeaderProps {
  adminState?: AdminState;
}

export default function Header(_props: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServiceOpen, setIsMobileServiceOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  const closeMenu = () => {
    setIsServiceOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileServiceOpen(false);
  };

  return (
    <>
      <nav className={`sticky top-0 w-full z-[100] h-16 md:h-18 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm' : 'bg-[#FCF9F5]/90 backdrop-blur-lg'}`}>
        <div className="layout-container h-full flex items-center justify-between">
          <Link href="/" className="outline-none z-50" aria-label="홈으로 이동" onClick={closeMenu}>
            <Logo />
          </Link>

          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <NavBtn active={isActive('/')} href="/">홈</NavBtn>

            {/* 서비스 드롭다운 */}
            <div className="relative h-16 flex items-center" onMouseEnter={() => setIsServiceOpen(true)} onMouseLeave={() => setIsServiceOpen(false)}>
              <button type="button" className={`flex items-center gap-1 transition-colors ${isServiceOpen ? 'text-burgundy-500' : 'hover:text-[#1D1D1F]'}`}>
                서비스 <ChevronDown size={16} className={`transition-transform duration-200 ${isServiceOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-14 left-1/2 -translate-x-1/2 w-72 bg-white rounded-2xl shadow-lg border border-gray-100 p-3 transition-all duration-200 ${isServiceOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <ServiceItem title="하루편지" desc="월간 구독 편지" href="/ondaypost" onClick={closeMenu} />
                <ServiceItem title="하트센드" desc="맞춤 편지 서비스" href="/heartsend" onClick={closeMenu} />
                <ServiceItem title="B2B" desc="기업 서비스" href="/b2b" onClick={closeMenu} />
                <ServiceItem title="협업" desc="파트너십" href="/collab" onClick={closeMenu} />
              </div>
            </div>

            <NavBtn active={isActive('/about')} href="/about">회사소개</NavBtn>
            <NavBtn active={isActive('/b2b')} href="/b2b">B2B</NavBtn>
          </div>

          {/* 모바일 햄버거 */}
          <button type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden z-50 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" aria-label="메뉴">
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="w-16 hidden md:block"></div>
        </div>
      </nav>

      {/* 모바일 오버레이 */}
      <div className={`fixed inset-0 bg-black/30 z-[90] transition-opacity duration-200 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMenu} />

      {/* 모바일 메뉴 */}
      <div className={`fixed top-0 right-0 h-full w-[80vw] max-w-xs bg-white z-[95] shadow-xl transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-20 pb-6 px-5 overflow-y-auto">
          <div className="space-y-1">
            <MobileNavBtn active={isActive('/')} href="/" onClick={closeMenu}>홈</MobileNavBtn>

            <div>
              <button type="button" onClick={() => setIsMobileServiceOpen(!isMobileServiceOpen)} className={`w-full flex items-center justify-between py-3 px-4 rounded-xl font-medium transition-colors ${isMobileServiceOpen ? 'bg-burgundy-50 text-burgundy-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                서비스 <ChevronDown size={18} className={`transition-transform duration-200 ${isMobileServiceOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${isMobileServiceOpen ? 'max-h-60 mt-1' : 'max-h-0'}`}>
                <div className="space-y-1 pl-3">
                  <MobileServiceItem title="하루편지" href="/ondaypost" onClick={closeMenu} />
                  <MobileServiceItem title="하트센드" href="/heartsend" onClick={closeMenu} />
                  <MobileServiceItem title="B2B" href="/b2b" onClick={closeMenu} />
                  <MobileServiceItem title="협업" href="/collab" onClick={closeMenu} />
                </div>
              </div>
            </div>

            <MobileNavBtn active={isActive('/about')} href="/about" onClick={closeMenu}>회사소개</MobileNavBtn>
            <MobileNavBtn active={isActive('/careers')} href="/careers" onClick={closeMenu}>채용</MobileNavBtn>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 space-y-2">
            <Link href="/privacy" onClick={closeMenu} className="block text-sm text-gray-500 py-2">개인정보처리방침</Link>
            <Link href="/terms" onClick={closeMenu} className="block text-sm text-gray-500 py-2">이용약관</Link>
          </div>
        </div>
      </div>
    </>
  );
}

function NavBtn({ active, href, children }: { active: boolean; href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={`transition-colors py-1 ${active ? 'text-burgundy-500 font-semibold' : 'hover:text-[#1D1D1F]'}`}>
      {children}
    </Link>
  );
}

function ServiceItem({ title, desc, href, onClick }: { title: string; desc: string; href: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block p-3 rounded-xl hover:bg-burgundy-50 transition-colors">
      <p className="font-medium text-[#1D1D1F] text-sm">{title}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </Link>
  );
}

function MobileNavBtn({ active, href, onClick, children }: { active: boolean; href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className={`block py-3 px-4 rounded-xl font-medium transition-colors ${active ? 'bg-burgundy-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
      {children}
    </Link>
  );
}

function MobileServiceItem({ title, href, onClick }: { title: string; href: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block py-2.5 px-4 rounded-lg text-sm text-gray-600 hover:text-burgundy-500 hover:bg-burgundy-50 transition-colors">
      {title}
    </Link>
  );
}
