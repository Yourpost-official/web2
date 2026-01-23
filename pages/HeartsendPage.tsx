
import React from 'react';
import { Award, Feather, ShieldCheck, Crown, ArrowRight, MessageCircle, Send, Star, Heart, Fingerprint, Lock } from 'lucide-react';

export default function HeartsendPage({ adminState, contentData }: any) {
  const { heartsend } = adminState?.prices || { heartsend: { available: false, price: '0', link: '' } };
  const { heartsend: heartsendContent } = contentData || { heartsend: { headline: '', description: '' } };

  return (
    <div className="flex flex-col w-full animate-reveal bg-white pb-40">
      {/* SECTION 1: PREMIUM HERO */}
      <section className="pt-24 md:pt-32 pb-24 px-6 text-center max-w-screen-lg mx-auto space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D2D2D] text-white text-[10px] font-black tracking-widest rounded-full uppercase">
            <Crown size={14} className="text-burgundy-500"/> Private Emotional Concierge
          </div>
          <h1 className="text-5xl md:text-[88px] font-black tracking-tighter leading-[1.0] text-[#2D2D2D]">
            {heartsendContent.headline}
          </h1>
        </div>
        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto">
          {heartsendContent.description}
        </p>
        <div className="pt-8">
           {heartsend.available ? (
             <div className="space-y-6">
               <a href={heartsend.link} target="_blank" className="inline-block bg-burgundy-500 text-white px-12 py-6 rounded-[40px] font-black text-xl shadow-2xl hover:bg-burgundy-600 transition-all active:scale-95">
                 프리미엄 레터 신청하기
               </a>
               <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">Secret & Sincere Service</p>
             </div>
           ) : (
             <div className="inline-block bg-gray-100 text-gray-400 px-12 py-6 rounded-[40px] font-black text-xl cursor-not-allowed">
               현재 대기 신청만 가능합니다
             </div>
           )}
        </div>
      </section>

      {/* SECTION 2: CORE VALUES */}
      <section className="py-24 px-6 bg-[#F8F9FA]">
         <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <PremiumCard icon={<Feather size={32}/>} title="전문 작가 문장 대행" desc="당신의 서툰 진심을 격조 있고 품격 있는 문장으로 대신 다듬어 드립니다." />
            <PremiumCard icon={<Fingerprint size={32}/>} title="럭셔리 수작업 마감" desc="수입 프리미엄 지류와 수작업 왁스 실링으로 편지의 무게감을 더합니다." />
            <PremiumCard icon={<Lock size={32}/>} title="1:1 비밀 보장" desc="당신의 사적인 이야기는 상담부터 제작까지 철저히 기밀로 유지됩니다." />
         </div>
      </section>

      {/* SECTION 3: SCENARIOS */}
      <section className="py-32 md:py-40 px-6 max-w-screen-xl mx-auto space-y-24">
         <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-charcoal tracking-tighter uppercase opacity-10">Use Cases</h2>
            <p className="text-4xl font-black text-[#2D2D2D] tracking-tighter leading-tight">진심이 필요한 모든 순간</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ScenarioBox title="정중한 사과" desc="사소한 오해로 멀어진 관계를 회복하고 싶을 때" icon={<MessageCircle/>} />
            <ScenarioBox title="깊은 고백" desc="가벼운 메시지가 아닌, 평생 남을 진심을 전하고 싶을 때" icon={<Heart/>} />
            <ScenarioBox title="감사의 표현" desc="은사님, VIP 고객에게 잊지 못할 감동을 선물할 때" icon={<Star/>} />
            <ScenarioBox title="정중한 의사 표현" desc="관계를 해치지 않으면서 명확한 의사를 전해야 할 때" icon={<Send/>} />
         </div>
      </section>

      {/* SECTION 6: FINAL CONVERSION */}
      <section className="py-24 bg-white border-y border-gray-100">
         <div className="max-w-screen-md mx-auto text-center space-y-10">
            <h2 className="text-3xl md:text-5xl font-black text-[#2D2D2D] tracking-tighter leading-tight">
               한 통의 편지가<br />당신의 인생을 바꿀 수 있습니다.
            </h2>
            <button onClick={() => window.open(heartsend.link)} className="bg-charcoal text-white px-12 py-5 rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-3 mx-auto shadow-lg">
               비밀 상담 예약하기 <ArrowRight />
            </button>
         </div>
      </section>
    </div>
  );
}

function PremiumCard({ icon, title, desc }: any) {
  return (
    <div className="p-12 bg-white border border-gray-100 rounded-[48px] shadow-sm space-y-8 hover:shadow-2xl transition-all group">
      <div className="w-16 h-16 bg-burgundy-50 text-burgundy-500 rounded-3xl flex items-center justify-center group-hover:bg-burgundy-500 group-hover:text-white transition-colors duration-500">
        {icon}
      </div>
      <div className="space-y-4">
        <h4 className="text-2xl font-black tracking-tighter text-[#2D2D2D]">{title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}

function ScenarioBox({ title, desc, icon }: any) {
   return (
      <div className="flex items-center gap-8 p-10 bg-[#F8F9FA] rounded-[40px] border border-gray-100 hover:border-burgundy-200 transition-colors group">
         <div className="w-16 h-16 bg-white text-burgundy-500 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            {React.cloneElement(icon, { size: 28 })}
         </div>
         <div className="space-y-2">
            <h4 className="text-xl font-black text-[#2D2D2D]">{title}</h4>
            <p className="text-sm text-gray-500 font-medium">{desc}</p>
         </div>
      </div>
   )
}
