'use client';

import React from 'react';
import { Heart, Lock, Zap, MessageCircle, Star, Send, ArrowRight } from 'lucide-react';
import { AdminState } from '@/types/admin';

interface HeartsendContentProps {
  adminState: AdminState;
}

export default function HeartsendContent({ adminState }: HeartsendContentProps) {
  const heartsend = adminState?.prices?.heartsend || { available: true, link: '#' };

  return (
    <div className="animate-reveal">
      <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 text-center bg-[#FCF9F5] pt-16 pb-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="tag-pill bg-[#1D1D1F] text-white border-[#1D1D1F]"><Heart size={14} /> 맞춤 편지 서비스</span>
          <h1 className="heading-hero word-keep">마음은 있는데<br /><span className="text-burgundy-500">글이 안 써져요</span></h1>
          <p className="text-body-large word-keep pt-2">어떤 마음인지만 말씀해 주세요.<br />저희가 예쁜 문장으로 만들어 드릴게요.</p>
          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-3">
            {heartsend.available ? (
              <>
                <button type="button" onClick={() => document.getElementById('detail')?.scrollIntoView({ behavior: 'smooth' })} className="btn-emotional-secondary">어떻게 진행되나요?</button>
                <a href={heartsend.link} target="_blank" rel="noopener noreferrer" className="btn-emotional-primary">편지 신청하기</a>
              </>
            ) : (
              <div className="bg-gray-100 text-gray-500 px-8 py-4 rounded-2xl font-medium">지금은 대기 신청만 가능해요</div>
            )}
          </div>
        </div>
      </section>

      <section id="detail" className="py-24 bg-white">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-emotional text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-50 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><MessageCircle size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">대신 써드려요</h4>
              <p className="text-gray-600 text-sm leading-relaxed">서툰 마음도 괜찮아요<br />상황만 말씀해 주시면 돼요</p>
            </div>
            <div className="card-emotional text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-50 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><Zap size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">빠르게 보내요</h4>
              <p className="text-gray-600 text-sm leading-relaxed">급한 마음 알아요<br />최대한 빨리 전해드릴게요</p>
            </div>
            <div className="card-emotional text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-50 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><Lock size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">비밀은 지켜요</h4>
              <p className="text-gray-600 text-sm leading-relaxed">민감한 이야기도 안심하세요<br />절대 외부에 공유하지 않아요</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FCF9F5]">
        <div className="layout-container">
          <div className="text-center mb-16"><h2 className="heading-section">이런 분들이 찾아오세요</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100">
              <Heart size={24} className="text-burgundy-500 shrink-0" />
              <div><p className="font-medium text-[#1D1D1F]">고백하고 싶은 사람이 있어요</p><p className="text-sm text-burgundy-500">진심을 제대로 전하고 싶을 때</p></div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100">
              <MessageCircle size={24} className="text-burgundy-500 shrink-0" />
              <div><p className="font-medium text-[#1D1D1F]">화해하고 싶은 친구가 있어요</p><p className="text-sm text-burgundy-500">먼저 손 내밀고 싶을 때</p></div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100">
              <Star size={24} className="text-burgundy-500 shrink-0" />
              <div><p className="font-medium text-[#1D1D1F]">부모님께 감사 인사 드리고 싶어요</p><p className="text-sm text-burgundy-500">말로는 쑥스러울 때</p></div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100">
              <Send size={24} className="text-burgundy-500 shrink-0" />
              <div><p className="font-medium text-[#1D1D1F]">특별한 날 선물하고 싶어요</p><p className="text-sm text-burgundy-500">기념일, 생일에 마음을 담아</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#1D1D1F]">
        <div className="layout-container text-center max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white word-keep leading-snug">한 통의 편지가<br />관계를 바꿀 수 있어요</h2>
          <p className="text-white/60 text-lg">망설이지 마세요. 일단 이야기해보세요.</p>
          {heartsend.available && <a href={heartsend.link} target="_blank" rel="noopener noreferrer" className="btn-emotional bg-white text-[#1D1D1F] hover:bg-gray-100 inline-flex">상담 신청하기 <ArrowRight size={18} /></a>}
        </div>
      </section>
    </div>
  );
}
