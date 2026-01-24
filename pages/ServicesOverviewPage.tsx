
import React from 'react';
import Image from 'next/image';
import { Mail, Send, Building2, ArrowRight, Sparkles, LayoutGrid, Gift } from 'lucide-react';

interface ServicesOverviewPageProps {
  navigate: (path: string) => void;
}

export default function ServicesOverviewPage({ navigate }: ServicesOverviewPageProps) {
  return (
    <div className="animate-reveal pb-40">
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-screen-lg mx-auto space-y-8 pt-20">
        <div className="tag-pill">
          <LayoutGrid size={14}/> Our Services
        </div>
        <h1 className="heading-hero break-keep">
          마음을 전하는<br />
          <span className="text-burgundy-gradient">조용한 방법들.</span>
        </h1>
        <p className="text-body-large max-w-2xl mx-auto break-keep">
          가끔은 말보다 글이 더 깊이 닿을 때가 있습니다.<br />
          당신의 마음이 온전히 전해지도록 돕겠습니다.
        </p>
      </section>

      <div className="layout-container grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceCard 
          icon={<Mail size={32}/>} 
          title="하루편지" 
          sub="Personal Subscription"
          desc="매달, 당신을 찾아가는 다정한 안부."
          onClick={() => navigate('haru')}
          bgImage="https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&q=80&w=800"
        />
        <ServiceCard 
          icon={<Send size={32}/>} 
          title="하트센드" 
          sub="On-Demand Letter"
          desc="전하지 못한 진심을 대신 전해드립니다."
          onClick={() => navigate('heartsend')}
          bgImage="https://images.unsplash.com/photo-1516589178581-a7870abd98aa?auto=format&fit=crop&q=80&w=800"
        />
        <ServiceCard 
          icon={<Building2 size={32}/>} 
          title="기업 제휴" 
          sub="Partnership"
          desc="브랜드의 이야기를 가장 따뜻한 온도로."
          onClick={() => navigate('b2b')}
          bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
        />
        <ServiceCard 
          icon={<Gift size={32}/>} 
          title="이벤트 & 혜택" 
          sub="Seasonal Benefits"
          desc="유어포스트가 준비한 다정한 선물들."
          onClick={() => navigate('event')}
          bgImage="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800"
        />
      </div>

      <section className="mt-24 layout-container bg-[#2D2D2D] rounded-[24px] md:rounded-[32px] p-8 md:p-16 text-white overflow-hidden relative shadow-xl">
         <div className="absolute top-0 right-0 p-10 opacity-10">
            <Sparkles size={300} />
         </div>
         <div className="max-w-2xl space-y-6 relative z-10">
            <h2 className="heading-hero text-white">어떤 마음을<br />전하고 싶으신가요?</h2>
            <p className="text-gray-300 font-normal text-base leading-loose break-keep">
               망설이지 말고 편하게 말씀해 주세요.<br />
               당신의 상황에 맞는 가장 좋은 방법을 함께 고민하겠습니다.
            </p>
            <button onClick={() => navigate('collab')} className="btn-emotional bg-white text-charcoal hover:bg-gray-100 flex items-center gap-3">
               문의하기 <ArrowRight size={18} />
            </button>
         </div>
      </section>
    </div>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  sub: string;
  desc: string;
  onClick: () => void;
  bgImage?: string;
}

function ServiceCard({ icon, title, sub, desc, onClick, bgImage }: ServiceCardProps) {
  return (
    <div className="card-emotional group flex flex-col justify-between items-start space-y-6 hover:-translate-y-1 relative overflow-hidden p-6 md:p-8 rounded-[24px] md:rounded-[32px]">
       {/* Background Image Layer */}
       {bgImage && (
         <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none grayscale group-hover:grayscale-0">
           <Image 
             src={bgImage} 
             alt="" 
             fill 
             className="object-cover"
             sizes="(max-width: 768px) 100vw, 50vw"
           />
         </div>
       )}
       <div className="space-y-6 relative z-10">
          <div className="w-14 h-14 bg-burgundy-100 text-burgundy-600 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-burgundy-500 group-hover:text-white">
             {icon}
          </div>
          <div className="space-y-2">
             <span className="text-[10px] font-bold uppercase tracking-widest text-burgundy-500">{sub}</span>
             <h3 className="heading-title">{title}</h3>
             <p className="text-body-medium break-keep">{desc}</p>
          </div>
       </div>
       <button onClick={onClick} className="text-charcoal font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-widest border-b border-charcoal pb-1 relative z-10">
          더 알아보기 <ArrowRight size={14}/>
       </button>
    </div>
  );
}
