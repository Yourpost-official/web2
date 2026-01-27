'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Gift, Calendar, Stars, Sparkles, ChevronDown } from 'lucide-react';
import { AdminState, ContentItem } from '@/types/admin';

interface EventContentProps {
  adminState: AdminState;
}

export default function EventContent({ adminState }: EventContentProps) {
  const events = adminState?.content?.events || [];
  const cta = adminState?.cta || { contactPartner: "파트너십 문의하기" };
  const b2bEmail = adminState?.prices?.b2b?.email || "biz@yourpost.co.kr";
  
  // 더보기 상태 관리
  const [eventLimit, setEventLimit] = useState(4);
  
  // 최신순 정렬 및 페이지네이션
  const sortedEvents = [...events].sort((a, b) => (b.id || 0) - (a.id || 0));
  const pagedEvents = sortedEvents.slice(0, eventLimit);

  return (
    <div className="animate-reveal pb-40 bg-white">
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-screen-lg mx-auto space-y-6 pt-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black tracking-widest rounded-full uppercase">
          <Gift size={12}/> Seasonal Benefit
        </div>
        <h1 className="text-4xl md:text-8xl font-black text-charcoal tracking-tighter break-keep">
          유어포스트<br /><span className="text-burgundy-500">진행중인 혜택.</span>
        </h1>
        <p className="text-base md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed break-keep">
          유어포스트가 제안하는 다정한 감성을 <br />더 특별한 혜택으로 만나보세요.
        </p>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 space-y-20">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pagedEvents.length > 0 ? (
               pagedEvents.map((event: ContentItem) => (
                  <EventItem 
                     key={event.id}
                     status="진행중" 
                     title={event.title} 
                     date={event.date}
                     image={event.image || "https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?auto=format&fit=crop&q=80&w=800"}
                     link={event.link}
                  />
               ))
            ) : (
               <div className="col-span-full py-40 text-center text-gray-300 font-black text-2xl uppercase tracking-widest border-2 border-dashed border-gray-100 rounded-[48px]">
                  Upcoming Benefits
               </div>
            )}
         </div>

         {sortedEvents.length > eventLimit && (
            <div className="flex justify-center">
               <button 
                  onClick={() => setEventLimit(prev => prev + 4)} 
                  className="flex items-center gap-3 bg-white border border-gray-100 text-charcoal px-10 py-4 rounded-2xl font-black text-xs hover:bg-gray-50 transition-all shadow-md group animate-reveal"
               >
                  이전 이벤트 더보기 (+{sortedEvents.length - eventLimit}건) 
                  <ChevronDown size={16} className="text-burgundy-500 group-hover:translate-y-1 transition-transform" />
               </button>
            </div>
         )}
         
         <div className="bg-[#FEF9F0] rounded-[32px] p-10 md:p-16 text-center space-y-10 border border-amber-100 relative overflow-hidden shadow-sm">
            <Sparkles className="absolute top-10 right-10 text-amber-500 opacity-20" size={120} />
            <Stars className="mx-auto text-amber-500" size={48} />
            <h3 className="text-3xl md:text-5xl font-black text-charcoal tracking-tight">협업 제안을 기다립니다.</h3>
            <p className="text-gray-500 font-medium max-w-xl mx-auto leading-relaxed text-lg">
               브랜드 콜라보레이션, 아티스트 협업 등 <br />유어포스트와 함께 가치를 만들 파트너의 문의를 환영합니다.
            </p>
            <a href={`mailto:${b2bEmail}`} className="inline-block bg-charcoal text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl">
               {cta.contactPartner}
            </a>
         </div>
      </div>
    </div>
  );
}

function EventItem({ status, title, date, image, link }: any) {
  return (
    <div className="group cursor-pointer space-y-6 animate-reveal" onClick={() => link && window.open(link)}>
       <div className="aspect-[16/10] bg-gray-100 rounded-[32px] overflow-hidden relative border border-gray-100 shadow-sm transition-all group-hover:shadow-xl group-hover:scale-[1.01]">
          <Image 
            src={image} 
            alt={title} 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-8 left-8">
             <span className="bg-burgundy-500 text-white px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg">
                {status}
             </span>
          </div>
       </div>
       <div className="px-6 space-y-2">
          <h4 className="text-2xl md:text-3xl font-black text-charcoal group-hover:text-burgundy-500 transition-colors leading-tight tracking-tighter">{title}</h4>
          <p className="text-sm text-gray-400 font-bold flex items-center gap-2 uppercase tracking-widest"><Calendar size={14} className="text-burgundy-500"/> {date}</p>
       </div>
    </div>
  );
}