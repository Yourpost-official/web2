
import React from 'react';
import { Handshake, Palette, Layout, UserCheck, Send, ArrowRight } from 'lucide-react';

export default function CollabPage({ navigate = () => {}, adminState }: any) {
  // adminState 및 cta 안전하게 참조 (에러 방지)
  const cta = adminState?.cta || { mainContactEmail: "biz@yourpost.co.kr" };

  return (
    <div className="animate-reveal bg-[#FCF9F5] pb-40">
      {/* SECTION 1: HERO */}
      <section className="pt-32 pb-24 px-6 text-center max-w-screen-lg mx-auto space-y-8">
        <span className="text-burgundy-500 font-black text-[10px] tracking-[0.3em] uppercase">Partnership & Creation</span>
        <h1 className="text-5xl md:text-[90px] font-black text-[#2D2D2D] tracking-tighter leading-[1.0]">
          함께 만드는<br />
          <span className="bg-gradient-to-r from-[#8B2E2E] via-[#A63A3A] to-[#631F1F] bg-clip-text text-transparent">새로운 가치.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
          유어포스트는 아티스트, 브랜드, 그리고 파트너사들과 함께<br />
          디지털 시대의 아날로그 감성을 새롭게 정의해 나갑니다.
        </p>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 space-y-24">
         {/* SECTION 2: FIELDS */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <CollabField 
              icon={<Palette/>} 
              title="작가 & 일러스트레이터" 
              desc="당신의 작품을 유어포스트의 구독 편지와 엽서에 담아 세상에 전달하세요." 
            />
            <CollabField 
              icon={<Layout/>} 
              title="브랜드 콜라보레이션" 
              desc="브랜드의 철학을 유어포스트의 정교한 지류 패키징과 레터 시스템으로 큐레이션합니다." 
            />
            <CollabField 
              icon={<UserCheck/>} 
              title="홍보 및 이벤트 파트너" 
              desc="특별한 오프라인 이벤트를 위한 물리적 메시지 마케팅 솔루션을 제안합니다." 
            />
         </div>

         {/* SECTION 3: PROCESS */}
         <section className="py-24 px-6 bg-white rounded-[60px] border border-gray-100 text-center space-y-12 shadow-sm">
            <h2 className="text-3xl font-black text-charcoal tracking-tight">협업 프로세스</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ProcessStep num="01" title="제안 접수" />
              <ProcessStep num="02" title="검토 및 미팅" />
              <ProcessStep num="03" title="샘플 기획" />
              <ProcessStep num="04" title="정식 콜라보" />
            </div>
            
            {/* SECTION 4: FINAL CTA */}
            <div className="pt-10">
              <a 
                href={`mailto:${cta.mainContactEmail}`} 
                className="inline-flex items-center gap-4 bg-charcoal text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl active:scale-95"
              >
                 제안서 보내기 <Send size={20}/>
              </a>
              <p className="mt-6 text-xs text-gray-400 font-medium">보내주신 제안은 검토 후 평일 기준 3일 이내에 답변 드립니다.</p>
            </div>
         </section>
      </div>
    </div>
  );
}

function CollabField({ icon, title, desc }: any) {
   return (
      <div className="space-y-6 text-center group">
         <div className="w-20 h-20 bg-white text-burgundy-500 rounded-[32px] flex items-center justify-center mx-auto shadow-sm group-hover:bg-burgundy-500 group-hover:text-white transition-all duration-500">
            {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { size: 36 })}
         </div>
         <div className="space-y-3 px-6">
            <h4 className="text-2xl font-black text-[#2D2D2D] tracking-tight">{title}</h4>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">{desc}</p>
         </div>
      </div>
   )
}

function ProcessStep({ num, title }: any) {
  return (
    <div className="p-8 bg-[#F8F9FA] rounded-3xl border border-gray-50 flex flex-col items-center gap-3 group hover:bg-burgundy-50 transition-colors">
       <span className="text-burgundy-500 font-black text-xl group-hover:scale-110 transition-transform">{num}</span>
       <span className="text-charcoal font-bold text-sm">{title}</span>
    </div>
  );
}
