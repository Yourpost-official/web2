
import React from 'react';
import { Stars, Sparkles, Smile, Coffee, Heart, ArrowRight, CheckCircle2, Mail, Layout, PackageCheck, Bookmark } from 'lucide-react';

export default function HaruPage({ adminState, navigate, contentData }: any) {
  const { haru } = adminState.prices;
  const { haru: haruContent } = contentData;

  return (
    <div className="animate-reveal bg-[#FCF9F5] pb-40">
      {/* SECTION 1: HERO */}
      <section className="pt-24 md:pt-32 pb-20 px-6 text-center max-w-screen-lg mx-auto space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-burgundy-50 text-burgundy-500 text-[10px] font-black tracking-widest rounded-full uppercase">
            <Stars size={14}/> Emotional Subscription Service
          </div>
          <h1 className="text-5xl md:text-[90px] font-black tracking-tighter leading-[1.0] text-[#2D2D2D]">
            {haruContent.headline}
          </h1>
        </div>
        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto">
          {haruContent.description}
        </p>
        <div className="pt-8">
           {haru.available ? (
             <div className="flex flex-col md:flex-row items-center justify-center gap-6">
               <a href={haru.link} target="_blank" className="inline-block bg-burgundy-500 text-white px-14 py-6 rounded-[40px] font-black text-2xl shadow-xl hover:translate-y-[-4px] transition-all">
                 지금 구독하기 (월 {haru.price}원)
               </a>
               <p className="text-xs font-bold text-gray-400">매달 첫 주에 당신의 우편함으로 배달됩니다.</p>
             </div>
           ) : (
             <div className="inline-block bg-gray-100 text-gray-400 px-14 py-6 rounded-[40px] font-black text-2xl cursor-not-allowed">
               다음 구독 시즌 준비 중입니다
             </div>
           )}
        </div>
      </section>

      {/* SECTION 2: EXPERIENCE SLIDES */}
      <section className="py-32 md:py-40 px-6 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
         <ExpCard icon={<Smile size={32}/>} title="위로의 문장" desc="지친 하루를 어루만져 줄 정제된 작가의 문장을 보냅니다." />
         <ExpCard icon={<Coffee size={32}/>} title="기다림의 미학" desc="디지털 시대, 조금은 느려도 더 깊은 진심을 우편함에서 만나보세요." />
         <ExpCard icon={<Bookmark size={32}/>} title="나만의 아카이브" desc="매달 모아가는 프리미엄 지류와 레터는 당신의 소중한 기록이 됩니다." />
      </section>

      {/* SECTION 3: PACKAGE DETAIL */}
      <section className="py-32 md:py-40 px-6 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
         <div className="aspect-square bg-white border border-gray-100 rounded-[60px] flex items-center justify-center p-16 shadow-sm relative overflow-hidden group">
            <PackageCheck size={220} className="text-burgundy-500 opacity-10 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-burgundy-50/30 opacity-0 group-hover:opacity-100 transition-opacity" />
         </div>
         <div className="space-y-12">
            <h2 className="text-4xl md:text-6xl font-black text-[#2D2D2D] tracking-tighter leading-tight">진심을 담은<br />물리적 패키지.</h2>
            <div className="space-y-8">
               <BenefitItem title="시즌별 한정 아트워크" desc="매달 해당 계절에만 발행되는 한정판 일러스트와 엽서가 동봉됩니다." />
               <BenefitItem title="프리미엄 지류 마감" desc="손끝에 닿는 촉감까지 고려하여 엄선된 수입 고급 지류만을 사용합니다." />
               <BenefitItem title="작가 후원 프로그램" desc="구독료의 일부는 신진 작가들의 창작 활동을 지원하는 데 사용됩니다." />
            </div>
         </div>
      </section>

      {/* SECTION 6: FINAL CONVERSION */}
      <section className="py-32 md:py-40 px-6 text-center max-w-screen-md mx-auto space-y-12">
         <div className="w-24 h-24 bg-burgundy-50 text-burgundy-500 rounded-[40px] flex items-center justify-center mx-auto shadow-sm">
            <Sparkles size={48} />
         </div>
         <h2 className="text-4xl md:text-[64px] font-black text-[#2D2D2D] tracking-tighter leading-tight">
            당신의 우편함을<br />다정함으로 채우세요.
         </h2>
         <button onClick={() => window.open(haru.link)} className="bg-charcoal text-white px-16 py-6 rounded-[40px] font-black text-2xl hover:bg-black transition-all shadow-xl active:scale-95">
            지금 시작하기
         </button>
      </section>
    </div>
  );
}

function ExpCard({ icon, title, desc }: any) {
  return (
    <div className="p-12 bg-white rounded-[48px] shadow-sm border border-gray-100 text-center space-y-8 hover:shadow-xl transition-all group">
       <div className="w-20 h-20 bg-burgundy-50 text-burgundy-500 rounded-[32px] flex items-center justify-center mx-auto group-hover:bg-burgundy-500 group-hover:text-white transition-colors duration-500">
          {icon}
       </div>
       <div className="space-y-4">
          <h4 className="text-2xl font-black text-[#2D2D2D]">{title}</h4>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">{desc}</p>
       </div>
    </div>
  );
}

function BenefitItem({ title, desc }: any) {
  return (
    <div className="flex gap-5">
       <CheckCircle2 className="text-burgundy-500 shrink-0" size={32} />
       <div className="space-y-2">
          <h4 className="text-2xl font-black text-[#2D2D2D] tracking-tight">{title}</h4>
          <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
       </div>
    </div>
  );
}
