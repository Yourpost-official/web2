
import React from 'react';
import Logo from './Logo';

export default function Footer({ navigate = () => {}, adminState }: any) {
  // adminState가 없을 경우를 대비한 기본값 설정
  const cta = adminState?.cta || { additionalInquiryLink: "#" };
  
  const companyInfo = {
    name: "유어포스트",
    representative: "윤세연",
    regNumber: "414-01-72641",
    email: "contact@yourpost.co.kr",
    motto: "더 멀리, 더 가까이",
    subMotto: "마음을 전하는 다양한 방법을 제공합니다"
  };

  return (
    <footer className="bg-[#1A1A1A] text-white py-24 px-6 mt-auto">
      <div className="max-w-screen-xl mx-auto space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <Logo className="brightness-0 invert opacity-90" />
              <div className="space-y-3">
                <p className="text-2xl font-black tracking-tighter text-burgundy-500">{companyInfo.motto}</p>
                <p className="text-sm text-gray-300 font-medium leading-relaxed max-w-xs opacity-80">
                  {companyInfo.subMotto}
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-white/5 space-y-2">
              <div className="flex flex-col gap-1 text-[11px] text-gray-500 font-medium">
                <div className="flex gap-4">
                  <span>상호: {companyInfo.name}</span>
                  <span>대표자: {companyInfo.representative}</span>
                </div>
                <span>사업자등록번호: {companyInfo.regNumber}</span>
              </div>
              <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest pt-2">Contact: {companyInfo.email}</p>
            </div>
          </div>
          
          {/* Services Column */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-burgundy-500">Services</h4>
            <div className="flex flex-col gap-4 text-[13px] font-medium text-gray-400">
              <button onClick={() => navigate('haru')} className="text-left hover:text-white transition-colors">하루편지</button>
              <button onClick={() => navigate('heartsend')} className="text-left hover:text-white transition-colors">HeartSend</button>
              <button onClick={() => navigate('services-overview')} className="text-left hover:text-white transition-colors">전체 서비스</button>
            </div>
          </div>

          {/* Company Column */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-burgundy-500">Company</h4>
            <div className="flex flex-col gap-3 text-[13px] font-medium text-gray-400">
              <button onClick={() => navigate('about')} className="text-left hover:text-white transition-colors">회사 소개</button>
              <button onClick={() => navigate('press')} className="text-left hover:text-white transition-colors">뉴스룸</button>
              <button onClick={() => navigate('careers')} className="text-left hover:text-white transition-colors">채용 및 협업</button>
              <button onClick={() => navigate('investor')} className="text-left hover:text-white transition-colors font-bold text-burgundy-500">IR / 투자 정보</button>
              <button onClick={() => window.open(cta.additionalInquiryLink)} className="text-left hover:text-white transition-colors">문의하기</button>
            </div>
          </div>

          {/* Legal & Partners Column */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-burgundy-500">Legal</h4>
              <div className="flex flex-col gap-4 text-[13px] font-medium text-gray-400">
                <button onClick={() => navigate('privacy')} className="text-left hover:text-white transition-colors">개인정보처리방침</button>
                <button onClick={() => navigate('terms')} className="text-left hover:text-white transition-colors">이용약관</button>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-600">Partners</h4>
              <div className="flex gap-6 text-[11px] font-black text-gray-500 italic">
                <span>IMPACT</span>
                <span>PNK</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-gray-600 font-medium uppercase tracking-widest pt-10 border-t border-white/5">
          <p>© 2026 Yourpost. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <span className="italic opacity-50">Analog Communication Platform</span>
            <button 
              onClick={() => navigate('admin')}
              className="ml-4 opacity-20 hover:opacity-100 transition-opacity hover:text-burgundy-500 cursor-pointer"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
