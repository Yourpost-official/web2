
import React from 'react';
import { Stars, Sparkles, Smile, Coffee, Heart, ArrowRight, CheckCircle2, Mail, Layout, PackageCheck, Bookmark } from 'lucide-react';

interface HaruPageProps {
  adminState: any; // AdminState 인터페이스를 공유하거나 여기서 정의 필요
  navigate: (path: string) => void;
  contentData: any;
}

export default function HaruPage({ adminState, navigate, contentData }: HaruPageProps) {
  const { haru } = adminState?.prices || { haru: { available: false, price: '0', link: '' } };
  const { haru: haruContent } = contentData || { haru: { headline: '', description: '' } };

  return (
    <div className="animate-reveal bg-[#FCF9F5] pb-40">
      {/* SECTION 1: HERO */}
      <section className="hero-spacing px-6 text-center max-w-screen-lg mx-auto space-y-8">
        <div className="space-y-4">
          <div className="tag-pill">
            <Stars size={14}/> Daily Emotional Record
          </div>
          <h1 className="heading-hero">
            {haruContent.headline}
          </h1>
        </div>
        <p className="text-body-large max-w-2xl mx-auto">
          {haruContent.description}
        </p>
        <div className="pt-8">
           {haru.available ? (
             <div className="flex flex-col md:flex-row items-center justify-center gap-6">
               <a href={haru.link} target="_blank" rel="noopener noreferrer" className="btn-emotional-primary">
                 천천히 둘러보기
               </a>
               <p className="text-xs font-medium text-gray-400 mt-2">한 달에 한 번, 당신에게 찾아갑니다.</p>
             </div>
           ) : (
             <div className="inline-block bg-gray-50 text-gray-400 px-10 py-4 rounded-full font-bold text-lg cursor-not-allowed">
               잠시 쉬어가는 중입니다
             </div>
           )}
        </div>
      </section>

      {/* SECTION 2: EXPERIENCE SLIDES */}
      <section className="section-spacing layout-container grid grid-cols-1 md:grid-cols-3 gap-8">
         <ExpCard icon={<Smile size={28}/>} title="마음에 닿는 문장" desc="지친 하루 끝에, 조용히 건네는 작가의 위로를 만나보세요." />
         <ExpCard icon={<Coffee size={28}/>} title="느리게 걷는 시간" desc="빠른 디지털 세상에서 잠시 벗어나, 기다림의 설렘을 선물합니다." />
         <ExpCard icon={<Bookmark size={28}/>} title="소중한 기억의 조각" desc="매달 도착하는 편지들이 모여 당신만의 이야기가 됩니다." />
      </section>

      {/* SECTION 3: PACKAGE DETAIL */}
      <section className="section-spacing layout-container grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
         <div className="aspect-square bg-white border border-gray-100 rounded-[60px] flex items-center justify-center p-16 shadow-sm relative overflow-hidden group">
            <PackageCheck size={200} className="text-burgundy-500 opacity-10 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-burgundy-50/30 opacity-0 group-hover:opacity-100 transition-opacity" />
         </div>
         <div className="space-y-12">
            <h2 className="heading-hero">손끝에 전해지는<br />따뜻한 온기.</h2>
            <div className="space-y-8">
               <BenefitItem title="계절을 담은 그림" desc="그 계절의 공기를 담은 한정판 일러스트와 엽서를 보내드립니다." />
               <BenefitItem title="섬세한 종이의 질감" desc="손끝에 닿는 느낌까지 생각하여, 가장 편안한 종이를 골랐습니다." />
               <BenefitItem title="창작을 돕는 마음" desc="당신의 구독은 신진 작가들의 소중한 창작 활동을 지원합니다." />
            </div>
         </div>
      </section>

      {/* SECTION 6: FINAL CONVERSION */}
      <section className="section-spacing px-6 text-center max-w-screen-md mx-auto space-y-10">
         <div className="w-24 h-24 bg-burgundy-100 text-burgundy-600 rounded-[40px] flex items-center justify-center mx-auto shadow-sm">
            <Sparkles size={40} />
         </div>
         <h2 className="heading-hero">
            당신의 일상에<br />작은 설렘을 더하세요.
         </h2>
         <a 
           href={haru.link} 
           target="_blank" 
           rel="noopener noreferrer"
           className="btn-emotional-dark"
         >
            부담 없이 시작하기
         </a>
      </section>
    </div>
  );
}

function ExpCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="card-emotional text-center space-y-6 group">
       <div className="w-20 h-20 bg-burgundy-100 text-burgundy-600 rounded-[32px] flex items-center justify-center mx-auto group-hover:bg-burgundy-500 group-hover:text-white transition-colors duration-500">
          {icon}
       </div>
       <div className="space-y-4">
          <h4 className="heading-title">{title}</h4>
          <p className="text-body-medium">{desc}</p>
       </div>
    </div>
  );
}

function BenefitItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-5">
       <CheckCircle2 className="text-burgundy-500 shrink-0" size={28} />
       <div className="space-y-2">
          <h4 className="heading-title text-xl md:text-2xl">{title}</h4>
          <p className="text-body-medium">{desc}</p>
       </div>
    </div>
  );
}
