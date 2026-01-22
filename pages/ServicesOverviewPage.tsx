
import React from 'react';
import { Mail, Send, Building2, ArrowRight, Sparkles } from 'lucide-react';

export default function ServicesOverviewPage({ navigate }: any) {
  return (
    <div className="animate-reveal pb-40">
      <section className="pt-32 pb-24 px-6 text-center max-w-screen-lg mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-burgundy-50 text-burgundy-500 text-[10px] font-black tracking-widest rounded-full uppercase">
          Service Lineup
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-charcoal tracking-tighter">
          진심을 전하는<br />
          <span className="bg-gradient-to-r from-[#8B2E2E] via-[#A63A3A] to-[#631F1F] bg-clip-text text-transparent">모든 방법.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
          개인의 소박한 안부부터 기업의 대규모 프로젝트까지,<br />
          유어포스트의 정교한 물류 인프라로 완벽하게 전달합니다.
        </p>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <ServiceCard 
          icon={<Mail size={32}/>} 
          title="하루편지" 
          sub="Personal Subscription"
          desc="매달 도착하는 나만을 위한 다정한 편지 정기구독 서비스입니다."
          onClick={() => navigate('haru')}
        />
        <ServiceCard 
          icon={<Send size={32}/>} 
          title="하트센드" 
          sub="On-Demand Letter"
          desc="말하기 힘든 고백, 사과, 감사를 전문가의 문장으로 정교하게 전합니다."
          onClick={() => navigate('heartsend')}
        />
        <ServiceCard 
          icon={<Building2 size={32}/>} 
          title="B2B 솔루션" 
          sub="Enterprise Rewards"
          desc="기업 맞춤 편지, 크리에이터 및 구독자 리워드 프로그램을 지원합니다."
          onClick={() => navigate('b2b')}
        />
      </div>

      <section className="mt-40 max-w-screen-xl mx-auto px-6 bg-charcoal rounded-[60px] p-20 text-white overflow-hidden relative shadow-2xl">
         <div className="absolute top-0 right-0 p-10 opacity-10">
            <Sparkles size={300} />
         </div>
         <div className="max-w-2xl space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">어떤 서비스를<br />선택해야 할까요?</h2>
            <p className="text-gray-400 font-medium text-lg leading-relaxed">
               유어포스트의 모든 서비스는 동일한 정교함으로 제작됩니다.<br />
               대량 발송이나 특수한 협업이 필요하시다면 지금 바로 문의주세요.
            </p>
            <button onClick={() => navigate('collab')} className="bg-white text-charcoal px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform flex items-center gap-3">
               1:1 맞춤 상담하기 <ArrowRight />
            </button>
         </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, sub, desc, onClick }: any) {
  return (
    <div className="bg-white border border-gray-100 p-12 rounded-[48px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col justify-between items-start space-y-8">
       <div className="space-y-6">
          <div className="w-16 h-16 bg-burgundy-50 text-burgundy-500 rounded-3xl flex items-center justify-center transition-colors group-hover:bg-burgundy-500 group-hover:text-white">
             {icon}
          </div>
          <div className="space-y-2">
             <span className="text-[10px] font-black uppercase tracking-widest text-burgundy-500">{sub}</span>
             <h3 className="text-3xl font-black text-charcoal">{title}</h3>
             <p className="text-sm text-gray-500 leading-relaxed font-medium">{desc}</p>
          </div>
       </div>
       <button onClick={onClick} className="text-charcoal font-black text-sm flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest border-b-2 border-charcoal pb-1">
          Learn More <ArrowRight size={16}/>
       </button>
    </div>
  );
}
