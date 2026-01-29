'use client';

import React from 'react';
import { Mail, Smile, Coffee, Bookmark, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { AdminState } from '@/types/admin';

interface OndayContentProps {
  adminState: AdminState;
}

export default function OndayContent({ adminState }: OndayContentProps) {
  const haru = adminState?.prices?.haru || { available: false, price: '0', link: '' };

  return (
    <div className="animate-reveal">
      <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 text-center bg-[#FCF9F5] pt-16 pb-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="tag-pill"><Star size={14} /> 월간 편지 구독</span>
          <h1 className="heading-hero word-keep">한 달에 한 번,<br /><span className="text-burgundy-500">나한테 오는 편지</span></h1>
          <p className="text-body-large word-keep pt-2">청구서만 오던 우편함에 어느 날 예쁜 편지가 와요.<br />작가가 쓴 에세이랑 계절 엽서가 들어있어요.</p>
          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-3">
            {haru.available ? (
              <>
                <button type="button" onClick={() => document.getElementById('detail')?.scrollIntoView({ behavior: 'smooth' })} className="btn-emotional-secondary">자세히 보기</button>
                <a href={haru.link} target="_blank" rel="noopener noreferrer" className="btn-emotional-primary">구독 시작하기</a>
              </>
            ) : (
              <div className="bg-gray-100 text-gray-500 px-8 py-4 rounded-2xl font-medium">잠시 쉬어가는 중이에요</div>
            )}
          </div>
        </div>
      </section>

      <section id="detail" className="py-24 bg-white">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-emotional text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-50 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><Smile size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">위로가 되는 글</h4>
              <p className="text-gray-600 text-sm leading-relaxed">지친 하루 끝에 읽으면<br />마음이 따뜻해지는 에세이</p>
            </div>
            <div className="card-emotional text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-50 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><Coffee size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">기다림의 설렘</h4>
              <p className="text-gray-600 text-sm leading-relaxed">다음 달엔 어떤 편지가 올까<br />우편함 여는 재미가 생겨요</p>
            </div>
            <div className="card-emotional text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-50 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><Bookmark size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">모으는 즐거움</h4>
              <p className="text-gray-600 text-sm leading-relaxed">매달 받은 편지들이 모이면<br />나만의 작은 도서관이 돼요</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FCF9F5]">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-burgundy-50 rounded-3xl aspect-square flex items-center justify-center">
              <Mail size={120} className="text-burgundy-300" strokeWidth={1} />
            </div>
            <div className="space-y-8">
              <h2 className="heading-title word-keep">매달 이런 게 와요</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle size={24} className="text-burgundy-500 shrink-0 mt-1" />
                  <div><h4 className="font-bold text-[#1D1D1F] mb-1">작가의 에세이</h4><p className="text-gray-600 text-sm">매달 다른 작가가 쓴 따뜻한 글이에요</p></div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle size={24} className="text-burgundy-500 shrink-0 mt-1" />
                  <div><h4 className="font-bold text-[#1D1D1F] mb-1">계절 한정 엽서</h4><p className="text-gray-600 text-sm">그 달의 분위기를 담은 일러스트 엽서</p></div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle size={24} className="text-burgundy-500 shrink-0 mt-1" />
                  <div><h4 className="font-bold text-[#1D1D1F] mb-1">답장용 편지지</h4><p className="text-gray-600 text-sm">누군가에게 보내고 싶을 때 쓸 수 있어요</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-burgundy-50">
        <div className="layout-container text-center max-w-2xl mx-auto space-y-8">
          <h2 className="heading-title word-keep">나를 위한 작은 선물,<br />시작해볼까요?</h2>
          <p className="text-body-medium">첫 달은 부담 없이 체험해보세요.</p>
          {haru.available && <a href={haru.link} target="_blank" rel="noopener noreferrer" className="btn-emotional-primary inline-flex">구독 시작하기 <ArrowRight size={18} /></a>}
        </div>
      </section>
    </div>
  );
}
