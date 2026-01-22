
import React, { useState } from 'react';
import { Mail, Heart, Send, Sparkles, ArrowRight, PenTool, MessageSquare, HelpCircle, CheckCircle } from 'lucide-react';

export default function HomePage({ navigate = () => {}, adminState }: any) {
  // adminState 안전하게 처리
  const cta = adminState?.cta || { mainContactEmail: "biz@yourpost.co.kr", additionalInquiryLink: "#" };
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const handleActionClick = (type: 'email' | 'form') => {
    if (type === 'email') {
      setActiveToast('메일 클라이언트가 호출되었습니다.');
      window.location.href = `mailto:${cta.mainContactEmail}`;
    } else {
      setActiveToast('문의 폼이 활성화되었습니다.');
      window.open(cta.additionalInquiryLink, '_blank');
    }
    setTimeout(() => setActiveToast(null), 3000);
  };

  return (
    <div className="animate-reveal space-y-24 md:space-y-44 pb-44 bg-[#FCF9F5] relative">
      {/* ACTION TOAST */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 ${activeToast ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-charcoal text-white px-8 py-3 rounded-full flex items-center gap-3 shadow-2xl">
          <CheckCircle size={16} className="text-burgundy-500" />
          <span className="text-xs font-bold">{activeToast}</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="pt-24 md:pt-40 px-6 text-center max-w-screen-xl mx-auto space-y-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-burgundy-50 text-burgundy-500 text-[10px] font-black tracking-[0.2em] rounded-full uppercase">
          <Sparkles size={12}/> Emotional Connection Platform
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tighter leading-[1.05] text-charcoal">
          <span className="block mb-2 text-gray-400">당신의 진심을 위한</span>
          <span className="bg-gradient-to-r from-[#8B2E2E] via-[#A63A3A] to-[#631F1F] bg-clip-text text-transparent">
            가장 정교한 소통 솔루션
          </span>
        </h1>
        <p className="text-base md:text-xl text-gray-500 leading-relaxed font-medium max-w-2xl mx-auto tracking-tight">
          유어포스트는 단순한 전달을 넘어, 당신의 소중한 마음을 물리적 레터로 <br className="hidden md:block" />
          정교하게 변환하여 연결하는 감성 소통 플랫폼입니다.
        </p>
        <div className="pt-10 flex flex-col md:flex-row justify-center gap-5">
          <button onClick={() => navigate('services-overview')} className="bg-charcoal text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl active:scale-95">
            전체 서비스 보기
          </button>
          <button onClick={() => navigate('b2b')} className="bg-white border border-gray-200 text-charcoal px-12 py-5 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all active:scale-95">
            비즈니스 도입 상담
          </button>
        </div>
      </section>

      {/* CORE VALUE SECTION */}
      <section className="px-6 max-w-screen-xl mx-auto space-y-20">
         <div className="text-center space-y-4">
            <h2 className="text-[10px] font-black text-burgundy-500 uppercase tracking-widest">Brand Standard</h2>
            <p className="text-4xl md:text-5xl font-black text-charcoal tracking-tight">
              유어포스트가 증명하는 <span className="bg-gradient-to-r from-[#8B2E2E] via-[#A63A3A] to-[#631F1F] bg-clip-text text-transparent">진정성</span>의 힘
            </p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard icon={<MessageSquare size={28}/>} title="정교한 문장 대행" desc="당신의 서툰 진심을 전문 작가의 정제된 문장으로 다듬어 품격 있게 전달합니다." />
            <ValueCard icon={<PenTool size={28}/>} title="하이엔드 지류" desc="손끝에 닿는 종이의 질감부터 봉투의 마감까지, 최상의 아날로그 경험을 설계합니다." />
            <ValueCard icon={<Heart size={28}/>} title="독보적인 고객 경험" desc="우편함에서 발견하는 실물 편지의 감동은 디지털 알림과는 비교할 수 없는 깊이를 선사합니다." />
         </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="bg-charcoal py-32 rounded-[60px] mx-6 text-white overflow-hidden relative shadow-2xl">
         <div className="max-w-screen-xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
               <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                  <span className="bg-gradient-to-r from-[#8B2E2E] via-[#A63A3A] to-[#631F1F] bg-clip-text text-transparent">아날로그 가치</span>를<br />현대적인 시스템으로.
               </h2>
               <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-lg opacity-80">
                  전통적인 편지의 번거로움을 혁신했습니다. 유어포스트만의 감성 시스템은 모든 제작 공정을 정교하게 관리하며 소중한 메시지의 가치를 극대화합니다.
               </p>
               <button onClick={() => navigate('about')} className="bg-burgundy-500 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-burgundy-600 transition-all flex items-center gap-3">
                  브랜드 이야기 확인하기 <ArrowRight />
               </button>
            </div>
            <div className="bg-white/5 rounded-[48px] p-16 border border-white/10 flex items-center justify-center">
               <Heart className="text-burgundy-500 animate-pulse" size={160} />
            </div>
         </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 text-center max-w-screen-md mx-auto space-y-12 pb-20">
         <h2 className="text-4xl md:text-5xl font-black text-charcoal tracking-tighter leading-tight">
            가장 진정성 있는 소통,<br />
            <span className="bg-gradient-to-r from-[#8B2E2E] via-[#A63A3A] to-[#631F1F] bg-clip-text text-transparent italic">Your Post</span>와 함께하세요.
         </h2>
         <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
               onClick={() => handleActionClick('email')}
               className="bg-burgundy-500 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-burgundy-600 transition-all shadow-xl flex items-center justify-center gap-3"
            >
               <Mail size={20} /> 제안서 제출하기
            </button>
            <button 
               onClick={() => handleActionClick('form')}
               className="bg-white border border-charcoal text-charcoal px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all shadow-md flex items-center justify-center gap-3"
            >
               <HelpCircle size={20} /> 1:1 온라인 문의
            </button>
         </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, desc }: any) {
  return (
    <div className="p-10 bg-white rounded-[32px] shadow-sm border border-gray-100 space-y-6 hover:shadow-xl transition-all group text-center md:text-left">
       <div className="w-14 h-14 bg-burgundy-50 text-burgundy-500 rounded-2xl flex items-center justify-center group-hover:bg-burgundy-500 group-hover:text-white transition-colors duration-500 mx-auto md:mx-0">
          {icon}
       </div>
       <h4 className="text-2xl font-black text-charcoal tracking-tight">{title}</h4>
       <p className="text-sm text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}
