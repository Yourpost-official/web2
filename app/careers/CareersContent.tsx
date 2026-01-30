'use client';

import React, { useState } from 'react';
import { UserPlus, ArrowRight, Mail, Briefcase, Palette, Send, ChevronDown } from 'lucide-react';
import { AdminState, ContentItem } from '@/types/admin';

interface CareersContentProps {
  adminState: AdminState;
}

export default function CareersContent({ adminState }: CareersContentProps) {
  const careers = adminState?.content?.careers || [];
  const mainEmail = adminState?.cta?.mainContactEmail || "contact@yourpost.co.kr";
  
  const [visibleCount, setVisibleCount] = useState(4);
  
  const sortedCareers = [...careers].sort((a, b) => (b.id || 0) - (a.id || 0));
  const pagedCareers = sortedCareers.slice(0, visibleCount);

  return (
    <div className="animate-reveal bg-white pb-40 min-h-screen">
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-screen-lg mx-auto space-y-8 pt-20">
        <span className="text-burgundy-600 font-black text-[10px] tracking-[0.3em] uppercase">Join Our Team</span>
        <h1 className="text-4xl md:text-8xl font-black text-[#2D2D2D] tracking-tighter leading-tight break-keep">
          함께 마음을<br />
          <span className="text-burgundy-600">설계할 동료.</span>
        </h1>
        <p className="text-base md:text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed break-keep">
          유어포스트는 정교한 시스템과 따뜻한 감성으로<br />
          아날로그의 미래를 만들어갈 인재와 파트너를 찾습니다.
        </p>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 gap-6">
          {pagedCareers.length > 0 ? (
            pagedCareers.map((job: ContentItem) => (
              <div 
                key={job.id} 
                className="bg-[#F8F9FA] p-8 rounded-[32px] border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-white hover:shadow-lg transition-all group"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto">
                  <div className="w-14 h-14 bg-white text-burgundy-600 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    {job.title.includes('작가') ? <Palette size={28} /> : <Briefcase size={28} />}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-charcoal tracking-tight group-hover:text-burgundy-600 transition-colors break-keep">
                      {job.title}
                    </h4>
                    <p className="text-gray-500 font-medium break-keep">
                      {job.text}
                    </p>
                  </div>
                </div>
                <a 
                  href={job.link || `mailto:${mainEmail}`} 
                  className="bg-charcoal text-white px-10 py-5 rounded-2xl font-black text-sm hover:bg-black transition-all flex items-center justify-center gap-3 whitespace-nowrap shadow-lg w-full md:w-auto"
                >
                  {job.buttonText || '지원서 제출하기'} <ArrowRight size={18} />
                </a>
              </div>
            ))
          ) : (
            <div className="py-40 text-center text-gray-300 font-black text-2xl uppercase tracking-widest border-2 border-dashed border-gray-200 rounded-[60px]">
              No Openings at the Moment
            </div>
          )}
        </div>

        {sortedCareers.length > visibleCount && (
          <div className="flex justify-center pt-10">
            <button 
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="flex items-center gap-3 bg-white border border-gray-100 text-charcoal px-10 py-4 rounded-2xl font-black text-xs hover:bg-gray-50 transition-all shadow-md group animate-reveal"
            >
              과거 공고 더보기 (+{sortedCareers.length - visibleCount}) 
              <ChevronDown size={16} className="text-burgundy-600 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}

        <section className="bg-charcoal text-white rounded-[32px] p-10 md:p-16 text-center space-y-10 relative overflow-hidden shadow-xl">
           <div className="absolute top-0 right-0 p-20 opacity-5">
              <UserPlus size={400}/>
           </div>
           <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter">오픈된 포지션이 없나요?</h3>
              <p className="text-gray-400 font-medium text-lg leading-relaxed">
                 자유 형식의 포트폴리오나 협업 제안서를 보내주세요.
              </p>
              <div className="pt-6">
                 <a href={`mailto:${mainEmail}`} className="inline-flex items-center gap-3 bg-burgundy-600 text-white px-12 py-6 rounded-[32px] font-black text-xl hover:bg-burgundy-600 transition-all shadow-xl active:scale-95">
                    자유 지원 / 협업 문의 <Send size={24}/>
                 </a>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}