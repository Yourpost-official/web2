
import React, { useState } from 'react';
import { Newspaper, ArrowUpRight, Calendar, ChevronDown } from 'lucide-react';

export default function PressPage({ adminState }: any) {
  const pressItems = adminState?.content?.press || [];
  
  // 더보기 상태 관리
  const [visibleCount, setVisibleCount] = useState(6);
  
  // 최신순 정렬 및 페이지네이션
  const sortedPress = [...pressItems].sort((a, b) => b.id - a.id);
  const pagedPress = sortedPress.slice(0, visibleCount);

  return (
    <div className="animate-reveal bg-[#FCF9F5] pb-40 min-h-screen">
      <section className="pt-32 pb-20 px-6 text-center max-w-screen-xl mx-auto space-y-8">
        <span className="text-burgundy-500 font-black text-[10px] tracking-[0.3em] uppercase">Newsroom</span>
        <h1 className="text-5xl md:text-8xl font-black text-[#2D2D2D] tracking-tighter leading-tight">
          유어포스트의<br />
          <span className="bg-gradient-to-r from-[#8B2E2E] via-[#A63A3A] to-[#631F1F] bg-clip-text text-transparent">발자취.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
          언론에 비친 유어포스트의 성장과<br />
          새로운 소식들을 가장 먼저 확인하세요.
        </p>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {pagedPress.length > 0 ? (
          pagedPress.map((item: any) => (
            <a 
              key={item.id} 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between animate-reveal"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-burgundy-50 text-burgundy-500 rounded-2xl flex items-center justify-center">
                    <Newspaper size={20} />
                  </div>
                  <ArrowUpRight size={20} className="text-gray-200 group-hover:text-burgundy-500 transition-colors" />
                </div>
                <div className="space-y-3">
                  <h4 className={`text-2xl font-black text-charcoal tracking-tight leading-tight group-hover:text-burgundy-500 transition-colors ${item.weight === 'bold' ? 'font-black' : 'font-bold'}`}>
                    {item.title}
                  </h4>
                  <p className="text-gray-500 font-medium leading-relaxed line-clamp-2">
                    {item.text}
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <Calendar size={12} className="text-burgundy-500" />
                {item.date}
              </div>
            </a>
          ))
        ) : (
          <div className="col-span-full py-40 text-center text-gray-300 font-black text-2xl uppercase tracking-widest border-2 border-dashed border-gray-200 rounded-[60px]">
            Stay Tuned for Updates
          </div>
        )}
      </div>

      {/* 더보기 버튼 */}
      {sortedPress.length > visibleCount && (
        <div className="flex justify-center pt-20">
          <button 
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="flex items-center gap-3 bg-white border border-gray-100 text-charcoal px-12 py-5 rounded-2xl font-black text-xs hover:bg-gray-50 transition-all shadow-md group animate-reveal"
          >
            과거 뉴스 더보기 (+{sortedPress.length - visibleCount}) 
            <ChevronDown size={16} className="text-burgundy-500 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
