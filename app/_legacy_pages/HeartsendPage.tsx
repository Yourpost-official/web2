
import React from 'react';
import { Award, Feather, ShieldCheck, Crown, ArrowRight, MessageCircle, Send, Star, Heart, Fingerprint, Lock, ChevronDown } from 'lucide-react';

export default function HeartsendPage({ adminState, contentData }: any) {
  const { heartsend } = adminState?.prices || { heartsend: { available: false, price: '0', link: '' } };
  const { heartsend: heartsendContent } = contentData || { heartsend: { headline: '', description: '' } };

  return (
    <div className="flex flex-col w-full animate-reveal bg-white pb-40">
      {/* SECTION 1: PREMIUM HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-screen-lg mx-auto space-y-8 pt-20">
        <div className="space-y-4">
          <div className="tag-pill bg-[#2D2D2D] text-white">
            <Crown size={14} className="text-burgundy-500"/> Private Emotional Concierge
          </div>
          <h1 className="heading-hero break-keep">
            {heartsendContent.headline}
          </h1>
        </div>
        <p className="text-body-large max-w-2xl mx-auto break-keep">
          {heartsendContent.description}
        </p>
        <div className="pt-8">
           {heartsend.available ? (
             <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
               <button 
                 onClick={() => document.getElementById('heartsend-content')?.scrollIntoView({ behavior: 'smooth' })}
                 className="btn-emotional bg-white text-charcoal border border-gray-200 hover:bg-gray-50 text-lg shadow-sm"
               >
                 자세히 알아보기 <ChevronDown size={18} />
               </button>
               <a href={heartsend.link} target="_blank" className="btn-emotional-primary text-lg shadow-2xl">
                 프리미엄 레터 신청하기
               </a>
             </div>
           ) : (
             <div className="inline-block bg-gray-100 text-gray-400 px-10 py-4 rounded-full font-bold text-lg cursor-not-allowed">
               현재 대기 신청만 가능합니다
             </div>
           )}
           {heartsend.available && <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">Secret & Sincere Service</p>}
        </div>
      </section>

      {/* SECTION 2: CORE VALUES */}
      <section id="heartsend-content" className="py-24 px-6 bg-[#F8F9FA]">
         <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <PremiumCard icon={<Feather size={32}/>} title="편지 작성 지원 서비스 옵션" desc="당신의 서툰 진심을 격조 있고 품격 있는 문장으로 대신 다듬어 드립니다." />
            <PremiumCard icon={<Fingerprint size={32}/>} title="빠른 제작-발송" desc="당신의 진심을 빠르고 정확하게 전달합니다." />
            <PremiumCard icon={<Lock size={32}/>} title="1:1 비밀 보장" desc="당신의 사적인 이야기는 상담부터 제작까지 철저히 기밀로 유지됩니다." />
         </div>
      </section>

      {/* SECTION 3: SCENARIOS */}
      <section className="section-spacing layout-container space-y-24">
         <div className="text-center space-y-4">
            <h2 className="heading-hero opacity-10 uppercase">Use Cases</h2>
            <p className="heading-title text-3xl md:text-4xl">진심이 필요한 모든 순간</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScenarioBox title="정중한 사과" desc="사소한 오해로 멀어진 관계를 회복하고 싶을 때" icon={<MessageCircle/>} />
            <ScenarioBox title="깊은 고백" desc="가벼운 메시지가 아닌, 평생 남을 진심을 전하고 싶을 때" icon={<Heart/>} />
            <ScenarioBox title="감사의 표현" desc="은사님, VIP 고객에게 잊지 못할 감동을 선물할 때" icon={<Star/>} />
            <ScenarioBox title="정중한 의사 표현" desc="관계를 해치지 않으면서 명확한 의사를 전해야 할 때" icon={<Send/>} />
         </div>
      </section>

      {/* SECTION 6: FINAL CONVERSION */}
      <section className="section-spacing bg-white border-y border-gray-100">
         <div className="max-w-screen-md mx-auto text-center space-y-10">
            <h2 className="heading-hero">
               한 통의 편지가<br />당신의 인생을 바꿀 수 있습니다.
            </h2>
            <button onClick={() => window.open(heartsend.link)} className="btn-emotional-dark flex items-center justify-center gap-3 mx-auto shadow-lg">
               비밀 상담 예약하기 <ArrowRight />
            </button>
         </div>
      </section>
    </div>
  );
}

function PremiumCard({ icon, title, desc }: any) {
  return (
    <div className="card-emotional space-y-6 hover:shadow-xl group p-8 rounded-[32px]">
      <div className="w-14 h-14 bg-burgundy-50 text-burgundy-500 rounded-2xl flex items-center justify-center group-hover:bg-burgundy-500 group-hover:text-white transition-colors duration-500">
        {icon}
      </div>
      <div className="space-y-4">
        <h4 className="heading-title">{title}</h4>
        <p className="text-body-medium break-keep">{desc}</p>
      </div>
    </div>
  );
}

function ScenarioBox({ title, desc, icon }: any) {
   return (
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-8 bg-[#F8F9FA] rounded-[32px] border border-gray-100 hover:border-burgundy-200 transition-colors group">
         <div className="w-14 h-14 bg-white text-burgundy-500 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform shrink-0 mb-2 md:mb-0">
            {React.cloneElement(icon, { size: 28 })}
         </div>
         <div className="space-y-2">
            <h4 className="heading-title text-xl">{title}</h4>
            <p className="text-body-medium break-keep">{desc}</p>
         </div>
      </div>
   )
}
