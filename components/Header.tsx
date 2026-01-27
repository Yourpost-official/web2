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

export default function Header({ adminState }: HeaderProps) {
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

  // 모바일 메뉴 열릴 때 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
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
      <nav className={`sticky top-0 w-full z-[100] h-16 md:h-20 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)] shadow-[0_1px_8px_rgba(0,0,0,0.04)]' : 'bg-white/70 backdrop-blur-xl border-b border-[rgba(0,0,0,0.05)]'}`}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="outline-none z-50" aria-label="홈으로 이동" onClick={closeMenu}>
            <Logo />
          </Link>

          {/* 데스크탑 메뉴 - 애플 스타일 */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-semibold text-[#6E6E73] tracking-[-0.006em]">
            <NavBtn active={isActive('/')} href="/">홈</NavBtn>

            {/* 서비스 드롭다운 */}
            <div
              className="relative h-20 flex items-center"
              onMouseEnter={() => setIsServiceOpen(true)}
              onMouseLeave={() => setIsServiceOpen(false)}
            >
              <button type="button" className={`flex items-center gap-1.5 transition-all font-semibold text-sm tracking-[-0.006em] ${pathname?.includes('service') || isServiceOpen ? 'text-burgundy-500' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}>
                서비스 <ChevronDown size={16} className={`transition-transform duration-300 ${isServiceOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-[70px] left-1/2 -translate-x-1/2 w-[540px] bg-white/95 backdrop-blur-2xl rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-[rgba(0,0,0,0.06)] p-8 transition-all duration-300 origin-top ${isServiceOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}>
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
              </div>
            </div>

            <NavBtn active={isActive('/b2b')} href="/b2b">B2B</NavBtn>
            <NavBtn active={isActive('/collab')} href="/collab">협업</NavBtn>
            <NavBtn active={isActive('/about')} href="/about">회사소개</NavBtn>
          </div>

          {/* 모바일 햄버거 버튼 */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-50 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-charcoal" />
            ) : (
              <Menu size={24} className="text-charcoal" />
            )}
          </button>

          <div className="w-[100px] hidden md:block"></div>
        </div>
      </nav>

      {/* 모바일 메뉴 오버레이 */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
      />

      {/* 모바일 메뉴 슬라이드 패널 - 애플 스타일 */}
      <div className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white/95 backdrop-blur-2xl z-[95] shadow-[0_0_60px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-20 pb-8 px-6 overflow-y-auto">
          {/* 모바일 메뉴 아이템 */}
          <div className="space-y-2">
            <MobileNavBtn active={isActive('/')} href="/" onClick={closeMenu}>
              홈
            </MobileNavBtn>

            {/* 서비스 아코디언 */}
            <div className="border-b border-gray-100 pb-2">
              <button
                type="button"
                onClick={() => setIsMobileServiceOpen(!isMobileServiceOpen)}
                className={`w-full flex items-center justify-between py-4 px-4 rounded-xl text-left font-bold text-base transition-colors ${isMobileServiceOpen ? 'bg-burgundy-50 text-burgundy-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                서비스
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${isMobileServiceOpen ? 'rotate-180 text-burgundy-600' : 'text-gray-400'}`}
                />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${isMobileServiceOpen ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-1 pl-2 py-2">
                  <MobileServiceItem
                    title="하루편지"
                    desc="정기구독 편지 서비스"
                    href="/ondaypost"
                    onClick={closeMenu}
                  />
                  <MobileServiceItem
                    title="하트센드"
                    desc="편지 대필 서비스"
                    href="/heartsend"
                    onClick={closeMenu}
                  />
                  <MobileServiceItem
                    title="B2B 프로그램"
                    desc="기업 솔루션"
                    href="/b2b"
                    onClick={closeMenu}
                  />
                  <MobileServiceItem
                    title="브랜드 협업"
                    desc="파트너십 프로그램"
                    href="/collab"
                    onClick={closeMenu}
                  />
                </div>
              </div>
            </div>

            <MobileNavBtn active={isActive('/b2b')} href="/b2b" onClick={closeMenu}>
              B2B
            </MobileNavBtn>
            <MobileNavBtn active={isActive('/collab')} href="/collab" onClick={closeMenu}>
              협업 문의
            </MobileNavBtn>
            <MobileNavBtn active={isActive('/about')} href="/about" onClick={closeMenu}>
              회사소개
            </MobileNavBtn>
            <MobileNavBtn active={isActive('/press')} href="/press" onClick={closeMenu}>
              뉴스룸
            </MobileNavBtn>
            <MobileNavBtn active={isActive('/careers')} href="/careers" onClick={closeMenu}>
              채용정보
            </MobileNavBtn>
          </div>

          {/* 하단 보조 링크 */}
          <div className="mt-auto pt-6 border-t border-gray-100 space-y-3">
            <Link
              href="/privacy"
              onClick={closeMenu}
              className="block text-sm text-gray-500 hover:text-burgundy-500 transition-colors font-medium"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/terms"
              onClick={closeMenu}
              className="block text-sm text-gray-500 hover:text-burgundy-500 transition-colors font-medium"
            >
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// 데스크탑 네비게이션 버튼 - 애플 스타일
function NavBtn({ active, href, children }: { active: boolean; href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`transition-all relative py-2 px-2 font-semibold text-sm tracking-[-0.006em] ${active ? 'text-burgundy-500' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-burgundy-500 rounded-full" />
      )}
    </Link>
  );
}

// 데스크탑 서비스 아이템 - 애플 스타일
function ServiceItem({ title, desc, href, onClick }: { title: string; desc: string; href: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-left p-5 rounded-2xl hover:bg-burgundy-50/50 transition-all duration-300 group block backdrop-blur-sm"
    >
      <h4 className="text-sm font-semibold text-[#1D1D1F] group-hover:text-burgundy-500 mb-2 tracking-[-0.006em]">{title}</h4>
      <p className="text-xs text-[#86868B] font-normal leading-relaxed group-hover:text-burgundy-600/90">{desc}</p>
    </Link>
  );
}

// 모바일 네비게이션 버튼 - 애플 스타일
function MobileNavBtn({ active, href, onClick, children }: { active: boolean; href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block py-4 px-5 rounded-2xl text-base font-semibold transition-all duration-300 tracking-[-0.006em] ${
        active
          ? 'bg-burgundy-500 text-white shadow-[0_4px_16px_rgba(139,46,46,0.25)]'
          : 'text-[#1D1D1F] hover:bg-[rgba(0,0,0,0.04)]'
      }`}
    >
      {children}
    </Link>
  );
}

// 모바일 서비스 아이템 - 애플 스타일
function MobileServiceItem({ title, desc, href, onClick }: { title: string; desc: string; href: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block p-4 rounded-2xl hover:bg-burgundy-50/60 transition-all duration-300 group backdrop-blur-sm"
    >
      <h4 className="text-sm font-semibold text-[#1D1D1F] group-hover:text-burgundy-500 mb-1 tracking-[-0.006em]">{title}</h4>
      <p className="text-xs text-[#86868B] font-normal group-hover:text-burgundy-600/90">{desc}</p>
    </Link>
  );
}
