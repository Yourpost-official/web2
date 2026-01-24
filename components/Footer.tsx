import React from 'react';
import Image from 'next/image';
import logoImg from '../app/images/YourPost Logo.png';

interface FooterProps {
  navigate: (path: string) => void;
  adminState: any;
}

/**
 * 하단 푸터 컴포넌트
 * 가독성을 최우선으로 하여 텍스트 대비와 레이아웃을 조정했습니다.
 */
export default function Footer({ navigate = () => {}, adminState }: FooterProps) {
  // adminState 안전하게 참조
  const cta = adminState?.cta || { additionalInquiryLink: "#" };
  
  // 회사 정보 데이터
  const companyInfo = {
    name: adminState?.companyInfo?.name || "유어포스트",
    representative: adminState?.companyInfo?.representative || "윤세연",
    regNumber: adminState?.companyInfo?.regNumber || "414-01-72641",
    email: adminState?.companyInfo?.email || "contact@yourpost.co.kr",
    motto: adminState?.companyInfo?.motto || "마음과 마음 사이",
    subMotto: adminState?.companyInfo?.subMotto || "마음을 전하는 다양한 방법을 제공합니다"
  };

  return (
    <footer className="bg-[#1A1A1A] text-white section-spacing px-6 mt-auto border-t border-white/5">
      <div className="layout-container space-y-20">
        
        {/* 상단 섹션: 브랜드 및 링크 메뉴 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
          
          {/* 브랜드 컬럼: 로고 및 회사 모토 */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 md:w-10 md:h-10">
                  <Image 
                    src={logoImg}
                    alt="YourPost Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl md:text-2xl font-black tracking-tighter text-white">YOURPOST</span>
              </div>
              <div className="space-y-3">
                <p className="text-lg md:text-xl font-bold tracking-tight text-burgundy-500">
                  {companyInfo.motto}
                </p>
                <p className="text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-xs">
                  {companyInfo.subMotto}
                </p>
              </div>
            </div>
            
            {/* 회사 상세 정보: 가독성을 위해 텍스트 색상을 약간 더 밝게 조정 */}
            <div className="pt-8 border-t border-white/10 space-y-4">
              <div className="flex flex-col gap-2 text-xs text-gray-400 font-normal">
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  <span>상호: <strong className="text-gray-300">{companyInfo.name}</strong></span>
                  <span>대표자: <strong className="text-gray-300">{companyInfo.representative}</strong></span>
                </div>
                <span>사업자등록번호: <strong className="text-gray-300">{companyInfo.regNumber}</strong></span>
                <span>이메일: <strong className="text-gray-300">{companyInfo.email}</strong></span>
              </div>
            </div>
          </div>
          
          {/* 서비스 링크 컬럼 */}
          <div className="space-y-6 hidden md:block">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-burgundy-500">Services</h4>
            <div className="flex flex-col gap-4 text-sm font-medium text-gray-400">
              <FooterLink onClick={() => navigate('haru')}>하루편지</FooterLink>
              <FooterLink onClick={() => navigate('heartsend')}>하트센드</FooterLink>
              <FooterLink onClick={() => navigate('event')}>이벤트</FooterLink>
              <FooterLink onClick={() => navigate('collab')}>콜라보</FooterLink>
              <FooterLink onClick={() => navigate('b2b')}>B2B</FooterLink>
            </div>
          </div>

          {/* 회사 링크 컬럼 */}
          <div className="space-y-6 hidden md:block">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-burgundy-500">Company</h4>
            <div className="flex flex-col gap-4 text-sm font-medium text-gray-400">
              <FooterLink onClick={() => navigate('about')}>회사 소개</FooterLink>
              <FooterLink onClick={() => navigate('press')}>뉴스룸</FooterLink>
              <FooterLink onClick={() => navigate('careers')}>채용 및 협업</FooterLink>
              <FooterLink onClick={() => navigate('investor')} className="text-burgundy-400">IR / 투자 정보</FooterLink>
              <FooterLink onClick={() => window.open(cta.additionalInquiryLink, '_blank')}>말 걸기</FooterLink>
            </div>
          </div>

          {/* 법적 및 파트너 컬럼 */}
          <div className="space-y-12 hidden md:block">
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-burgundy-500">Legal</h4>
              <div className="flex flex-col gap-4 text-sm font-medium text-gray-400">
                <FooterLink onClick={() => navigate('privacy')}>개인정보처리방침</FooterLink>
                <FooterLink onClick={() => navigate('terms')}>이용약관</FooterLink>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Partners</h4>
              <div className="flex gap-6 text-xs font-black text-gray-500 italic">
                <span className="hover:text-gray-300 transition-colors">IMPACT</span>
                <span className="hover:text-gray-300 transition-colors">PNK</span>
              </div>
            </div>
          </div>

          {/* 모바일 전용 간편 링크 (Mobile Only) */}
          <div className="md:hidden col-span-1 space-y-6">
            <div className="flex flex-wrap gap-x-4 gap-y-3 text-xs font-bold text-gray-400">
              <FooterLink onClick={() => navigate('about')}>회사 소개</FooterLink>
              <FooterLink onClick={() => navigate('privacy')}>개인정보처리방침</FooterLink>
              <FooterLink onClick={() => navigate('terms')}>이용약관</FooterLink>
              <FooterLink onClick={() => window.open(cta.additionalInquiryLink, '_blank')}>문의하기</FooterLink>
            </div>
          </div>
        </div>

        {/* 하단 저작권 섹션 */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-xs text-gray-500 font-bold uppercase tracking-widest pt-10 border-t border-white/10">
          <p>© 2026 Yourpost. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <span className="italic opacity-60">ANALOG MAIL Survice</span>
            {/* 관리자 접근 버튼: 평소에는 눈에 띄지 않지만 가독성은 확보 */}
            <button 
              onClick={() => navigate('admin')}
              className="opacity-30 hover:opacity-100 transition-all hover:text-burgundy-500 px-2 py-1 border border-white/10 rounded"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * 푸터 전용 링크 버튼 컴포넌트 (내부 최적화)
 */
interface FooterLinkProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

function FooterLink({ children, onClick, className = "" }: FooterLinkProps) {
  return (
    <button 
      onClick={onClick} 
      className={`text-left hover:text-white transition-all duration-200 hover:translate-x-1 text-gray-400 hover:font-bold ${className}`}
    >
      {children}
    </button>
  );
}
