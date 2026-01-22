
import React from 'react';
import { Target, ArrowRight, Heart, Mail, Building2, Sparkles } from 'lucide-react';

export default function AboutPage({ adminState, navigate = () => {} }: any) {
  // adminState 및 cta 안전하게 참조 (에러 방지)
  const cta = adminState?.cta || { mainContactEmail: "contact@yourpost.co.kr" };

  return (
    <div className="animate-reveal pb-40 bg-white">
      {/* SECTION 1: HERO */}
      <section className="pt-24 md:pt-40 pb-20 px-6 border-b border-gray-50">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-8 text-center lg:text-left">
              <span className="text-burgundy-500 font-black text-[10px] tracking-[0.3em] uppercase">Corporate Identity</span>
              <h1 className="text-5xl md:text-8xl font-black text-[#2D2D2D] tracking-tighter leading-[0.95]">
                진심을 설계하는<br />
                <span className="bg-gradient-to-r from-[#8B2E2E] via-[#A63A3A] to-[#631F1F] bg-clip-text text-transparent">감성 플랫폼.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                유어포스트는 2025년 설립된 프리미엄 감성 소통 전문 기업입니다.<br />
                디지털 시대, 역설적으로 더 강력해진 아날로그의 힘을 현대적인 방식으로 재해석합니다.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-10 pt-8 border-t border-gray-100 mt-10">
                 <Metric label="설립" value="2025. 10" />
                 <Metric label="창업 체제" value="3인 공동" />
                 <Metric label="슬로건" value="편지로 전하는 마음" />
              </div>
           </div>
           <div className="bg-surface p-12 rounded-[40px] border border-gray-100 space-y-10 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-10 opacity-5">
                 <Heart size={300} className="text-burgundy-500" />
              </div>
              <div className="relative z-10 space-y-8">
                 <h4 className="text-2xl font-black flex items-center gap-3 text-charcoal">
                   <Target className="text-burgundy-500" size={28}/> Our Foundation
                 </h4>
                 <div className="space-y-6">
                    <p className="text-sm text-gray-500 font-medium border-l-4 border-burgundy-500 pl-4 py-1">디지털 노이즈를 뚫고 전달되는 실물 편지의 정교한 감동 설계</p>
                    <p className="text-sm text-gray-400 font-medium border-l-4 border-gray-200 pl-4 py-1">주문형(하트센드) 및 구독형(하루편지) 기반의 개인화 메시지 서비스</p>
                    <p className="text-sm text-gray-300 font-medium border-l-4 border-gray-100 pl-4 py-1">브랜드 파트너십을 통한 대규모 감성 소통 솔루션 구축</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* SECTION 2: BRAND STORY */}
      <section className="py-24 md:py-40 px-6 max-w-screen-md mx-auto space-y-16">
        <div className="space-y-8 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-charcoal tracking-tighter">
            디지털의 속도보다<br />
            <span className="text-burgundy-500">진심의 깊이</span>에 집중합니다.
          </h2>
          <div className="space-y-8 text-base md:text-lg text-gray-600 leading-relaxed font-medium">
            <p>
              모든 것이 즉각적으로 전송되는 시대, 유어포스트는 기다림이 주는 특별한 가치를 믿습니다. 
              우리가 전하는 한 통의 편지는 단순한 종이 뭉치가 아닙니다. 보내는 이의 고민과 받는 이의 설렘이 교차하는 
              가장 정교하고도 따뜻한 소통의 매개체입니다.
            </p>
            <p>
              2025년 10월, 세 명의 창업자가 모여 시작한 유어포스트는 '진정성, 연결, 지속성'이라는 
              세 가지 핵심 가치를 바탕으로 아날로그 소통의 현대적 기준을 제시합니다. 
              우리는 서툰 문장을 정제된 예술로 바꾸고, 흩어지는 메시지를 영구적인 기록으로 변환합니다.
            </p>
            <p>
              개인의 소박한 안부부터 기업의 철학을 담은 캠페인까지, 유어포스트는 마음이 닿는 
              모든 경로를 가장 아름답고 확실하게 설계하는 감성 인프라 파트너가 되겠습니다.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: FOUNDERS */}
      <section className="py-24 bg-[#F8F9FA] px-6">
        <div className="max-w-screen-xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-[10px] font-black text-burgundy-500 uppercase tracking-widest">Leadership</h2>
            <h3 className="text-4xl font-black text-charcoal tracking-tight">유어포스트를 만드는 사람들</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FounderCard name="윤세연" role="CEO / 대표이사" desc="유어포스트의 비전과 전체 비즈니스를 총괄하며 아날로그의 새로운 시장 가치를 창출합니다." />
            <FounderCard name="성두현" role="COO / 운영 및 CS" desc="최상의 고객 경험을 위해 배송 인프라와 서비스 품질 관리 시스템을 고도화합니다." />
            <FounderCard name="조선형" role="CMO / 디자인 및 마케팅" desc="유어포스트만의 독보적인 감성 아이덴티티를 지류와 디지털 경험 전반에 녹여냅니다." />
          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICE PORTFOLIO */}
      <section className="py-24 bg-charcoal text-white rounded-[60px] mx-6 px-10">
        <div className="max-w-screen-xl mx-auto space-y-20 py-20">
          <div className="max-w-2xl space-y-4">
             <h2 className="text-burgundy-500 font-black text-xs uppercase tracking-widest">Service Pillars</h2>
             <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">진심을 전하는 네 가지 방법.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServicePillar icon={<Mail/>} title="하루편지" sub="Ondaypost" desc="1020 세대를 위한 정기 구독 편지 서비스. 월 12회 랜덤 배송으로 일상의 다정함을 전합니다." />
            <ServicePillar icon={<Heart/>} title="하트센드" sub="HeartSend" desc="고백, 감사, 사과 등 말하기 어려운 마음을 전문 작가의 대필과 수작업 패키지로 전합니다." />
            <ServicePillar icon={<Sparkles/>} title="시즌 & 굿즈" sub="Special Edition" desc="크리스마스, 수능 등 특별한 시즌을 위한 한정판 엽서와 감성 굿즈 구독 서비스를 제공합니다." />
            <ServicePillar icon={<Building2/>} title="B2B 솔루션" sub="Enterprise" desc="기업 맞춤형 고객 감사 메시지 및 임직원 복지 리워드 프로그램을 위한 통합 인프라를 지원합니다." />
          </div>
        </div>
      </section>

      {/* FINAL CONTACT */}
      <section className="py-32 px-6 text-center max-w-screen-md mx-auto space-y-12">
         <h2 className="text-4xl font-black text-charcoal tracking-tighter leading-tight">
            유어포스트와 함께<br />진심을 설계하세요.
         </h2>
         <div className="flex flex-col md:flex-row justify-center gap-6 pt-6">
            <button onClick={() => navigate('investor')} className="bg-charcoal text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-black transition-all flex items-center justify-center gap-4">
               IR 및 투자 정보 보기 <ArrowRight />
            </button>
            <a href={`mailto:contact@yourpost.co.kr`} className="bg-burgundy-500 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-burgundy-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-4">
               공식 제안 및 문의 <Mail size={20} />
            </a>
         </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: any) {
  return (
    <div className="space-y-1 text-left lg:text-left">
       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
       <p className="text-2xl md:text-3xl font-black text-charcoal tracking-tighter">{value}</p>
    </div>
  );
}

function FounderCard({ name, role, desc }: any) {
  return (
    <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-4 hover:shadow-xl transition-all">
      <div className="space-y-1">
        <p className="text-[10px] font-black text-burgundy-500 uppercase tracking-widest">{role}</p>
        <h4 className="text-2xl font-black text-charcoal">{name}</h4>
      </div>
      <p className="text-sm text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function ServicePillar({ icon, title, sub, desc }: any) {
  return (
    <div className="space-y-6 group">
      <div className="w-14 h-14 bg-white/5 text-burgundy-500 rounded-2xl flex items-center justify-center group-hover:bg-burgundy-500 group-hover:text-white transition-all duration-500 border border-white/10">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
      </div>
      <div className="space-y-2">
        <p className="text-[10px] font-black text-burgundy-500 uppercase tracking-widest">{sub}</p>
        <h4 className="text-xl font-black text-white tracking-tight">{title}</h4>
        <p className="text-sm text-gray-400 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
