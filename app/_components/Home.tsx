'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Heart, ArrowRight, MessageSquare, HelpCircle, CheckCircle, Star, Quote, ChevronDown, ChevronUp } from 'lucide-react';
import { AdminState, ContentItem } from '@/types/admin';

interface HomeProps {
  adminState: AdminState;
}

export default function Home({ adminState }: HomeProps) {
  const cta = adminState?.cta || { mainContactEmail: "biz@yourpost.co.kr", additionalInquiryLink: "#" };
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleActionClick = (buttonType: 'proposal' | 'inquiry') => {
    if (buttonType === 'proposal') {
      const config = adminState.cta?.homeProposal ?? { type: 'email', value: cta.mainContactEmail };
      if (config.type === 'email') {
        setActiveToast('메일 앱을 열고 있어요');
        window.location.href = `mailto:${config.value}`;
      } else {
        window.open(config.value, '_blank');
      }
    } else {
      const config = adminState.cta?.homeInquiry ?? { type: 'link', value: cta.additionalInquiryLink };
      if (config.type === 'email') {
        setActiveToast('메일 앱을 열고 있어요');
        window.location.href = `mailto:${config.value}`;
      } else {
        window.open(config.value, '_blank');
      }
    }
    setTimeout(() => setActiveToast(null), 2500);
  };

  return (
    <div className="animate-reveal">
      {/* 토스트 */}
      {activeToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200]">
          <div className="bg-[#1D1D1F] text-white px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium shadow-lg">
            <CheckCircle size={16} />
            {activeToast}
          </div>
        </div>
      )}

      {/* 히어로 */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center px-6 text-center bg-gradient-to-b from-[#FCF9F5] via-burgundy-50/30 to-[#FCF9F5] pt-12 pb-20">
        <div className="max-w-3xl mx-auto space-y-5">
          <p className="text-burgundy-500 text-sm font-medium tracking-wide">
            손으로 쓰고, 마음으로 전하는
          </p>
          <h1 className="heading-hero word-keep">
            요즘 세상에 편지라니,<br />
            <span className="text-burgundy-500">그게 좋더라고요.</span>
          </h1>
          <p className="text-body-large max-w-xl mx-auto word-keep pt-2">
            카톡은 너무 가볍고, 전화는 부담스럽고.<br className="hidden sm:block" />
            그래서 편지예요. 천천히, 제대로 전하고 싶은 마음.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/ondaypost" className="btn-emotional-primary">
              서비스 둘러보기
            </Link>
            <Link href="/b2b" className="btn-emotional-secondary">
              기업 도입 문의
            </Link>
          </div>
        </div>
      </section>

      {/* 공감 섹션 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-5">
              <h2 className="heading-title word-keep">
                하루에 카톡 몇 개 받으세요?<br />
                근데 기억나는 건요?
              </h2>
              <div className="space-y-4 text-body-medium word-keep">
                <p>
                  알림은 쏟아지는데 정작 마음에 남는 건 없어요.
                </p>
                <p>
                  편지는 달라요. 쓰는 사람도, 받는 사람도 그 시간만큼은 서로를 생각하게 되거든요.
                </p>
                <p className="text-burgundy-600 font-medium">
                  우편함에서 내 이름이 적힌 편지를 꺼낼 때의 기분, 아직 기억하시죠?
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-burgundy-50 to-burgundy-100/50 rounded-3xl p-8 md:p-12">
              <p className="text-xl md:text-2xl text-[#1D1D1F] font-medium leading-relaxed text-center word-keep">
                "톡 대신 편지 보내볼까?"<br />
                그 생각이 드셨다면<br />
                <span className="text-burgundy-500 font-semibold">이미 반은 보낸 거예요.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 하루편지 */}
      <section className="py-20 md:py-28 bg-[#FCF9F5]">
        <div className="layout-container">
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="bg-gradient-to-br from-burgundy-50 to-burgundy-100/30 rounded-2xl aspect-[4/3] flex items-center justify-center">
                <Mail size={72} className="text-burgundy-300" strokeWidth={1} />
              </div>
              <div className="space-y-4">
                <span className="tag-pill">월간 구독</span>
                <h3 className="heading-title word-keep">
                  한 달에 한 번, 나한테 오는 편지
                </h3>
                <p className="text-body-medium word-keep">
                  청구서만 오던 우편함에 어느 날 예쁜 편지가 도착해요. 작가가 쓴 에세이랑 계절 엽서가 들어있어요.
                </p>
                <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-burgundy-500 flex-shrink-0" />
                    <span>매달 새로운 작가의 에세이</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-burgundy-500 flex-shrink-0" />
                    <span>계절마다 바뀌는 한정판 엽서</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-burgundy-500 flex-shrink-0" />
                    <span>답장 쓸 수 있는 편지지까지</span>
                  </li>
                </ul>
                <Link href="/ondaypost" className="btn-emotional-primary inline-flex mt-2">
                  하루편지 알아보기 <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 하트센드 - 버건디 통일 */}
      <section className="py-20 md:py-28 bg-burgundy-500">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-5 order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 text-white text-xs font-medium tracking-wide rounded-full">
                맞춤 편지 서비스
              </span>
              <h3 className="text-2xl md:text-3xl font-bold leading-snug word-keep text-white">
                마음은 있는데 글이 안 써지잖아요
              </h3>
              <p className="text-white/80 text-base md:text-lg leading-relaxed word-keep">
                고백하고 싶은 사람, 화해하고 싶은 친구, 고마운 부모님한테 뭐라고 써야 할지 모르겠을 때. 이야기만 해주시면 저희가 문장으로 만들어 드려요.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-white/70">#연인에게</span>
                <span className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-white/70">#부모님께</span>
                <span className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-white/70">#사과편지</span>
              </div>
              <Link href="/heartsend" className="btn-emotional bg-white text-burgundy-600 hover:bg-gray-50 inline-flex mt-2 font-semibold">
                하트센드 알아보기 <ArrowRight size={18} />
              </Link>
            </div>
            <div className="bg-white/10 rounded-2xl aspect-[4/3] flex items-center justify-center border border-white/20 order-1 lg:order-2">
              <Heart size={72} className="text-white/80" fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      {/* 가치 제안 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="layout-container">
          <div className="text-center mb-12">
            <h2 className="heading-section">왜 편지인가요?</h2>
            <p className="text-body-medium">디지털 시대에 아날로그를 고집하는 이유</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="card-emotional text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-50 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto">
                <MessageSquare size={24} />
              </div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">진심이 닿아요</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                쓰는 데 시간이 걸리니까 받는 사람도 그 정성을 알아요
              </p>
            </div>
            <div className="card-emotional text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-50 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto">
                <Star size={24} />
              </div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">오래 남아요</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                톡은 스크롤에 묻히지만 편지는 서랍에 간직하잖아요
              </p>
            </div>
            <div className="card-emotional text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-50 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto">
                <Heart size={24} />
              </div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">특별해요</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                요즘 편지 받아본 적 있으세요? 그래서 더 특별한 거예요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 후기 */}
      <section className="py-20 md:py-28 bg-[#FCF9F5]">
        <div className="layout-container">
          <div className="text-center mb-12">
            <h2 className="heading-section">받아본 분들 이야기</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ReviewCard
              text="퇴근하고 우편함 여는 게 요즘 유일한 낙이에요. 청구서만 오다가 예쁜 편지 오니까 기분이 확 달라져요."
              author="방** 님"
              tag="하루편지 구독"
            />
            <ReviewCard
              text="남자친구한테 편지 쓰고 싶은데 글재주가 없어서 부탁했어요. 제 마음 그대로 써주셔서 감동받았대요."
              author="김** 님"
              tag="하트센드 이용"
            />
            <ReviewCard
              text="부모님 결혼기념일에 보내드렸어요. 엄마가 울면서 전화하셨어요. 이런 거 처음이라고."
              author="이** 님"
              tag="하트센드 이용"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="layout-container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="heading-section">자주 묻는 질문</h2>
          </div>
          <div className="space-y-3">
            {(adminState?.content?.faq || [
              { id: 1, title: "편지 도착까지 얼마나 걸려요?", text: "주문하시면 1-2일 안에 제작하고, 우편으로 2-3일 정도 걸려요. 급하시면 말씀해 주세요!" },
              { id: 2, title: "익명으로 보낼 수 있어요?", text: "네, 가능해요. 보내는 사람 이름을 원하시는 대로 적을 수 있어요." },
              { id: 3, title: "해외로도 보내나요?", text: "아직은 국내만 가능해요. 해외 배송도 준비 중이에요." },
              { id: 4, title: "글을 못 써도 괜찮아요?", text: "그래서 저희가 있는 거예요! 어떤 마음인지만 말씀해 주시면 문장으로 만들어 드려요." }
            ]).map((item: ContentItem, idx: number) => (
              <div key={item.id || idx} className="bg-[#FCF9F5] border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-burgundy-50/50 transition-colors"
                >
                  <span className="font-medium text-[#1D1D1F] pr-4">{item.title}</span>
                  {openFaq === idx ? <ChevronUp size={20} className="text-burgundy-500 flex-shrink-0" /> : <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm md:text-base">
                    {item.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-burgundy-50">
        <div className="layout-container text-center max-w-2xl mx-auto space-y-6">
          <h2 className="heading-title word-keep">
            마음 전하는 거, 어렵지 않아요.
          </h2>
          <p className="text-body-medium">
            시작이 반이래잖아요. 일단 한번 보내보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button type="button" onClick={() => handleActionClick('proposal')} className="btn-emotional-primary">
              <Mail size={18} /> 문의하기
            </button>
            <button type="button" onClick={() => handleActionClick('inquiry')} className="btn-emotional-secondary">
              <HelpCircle size={18} /> 1:1 상담
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ReviewCard({ text, author, tag }: { text: string; author: string; tag: string }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
      <Quote size={20} className="text-burgundy-200 mb-3" />
      <p className="text-gray-600 leading-relaxed mb-5 text-sm md:text-base">"{text}"</p>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[#1D1D1F]">{author}</span>
        <span className="text-burgundy-500 text-xs">{tag}</span>
      </div>
    </div>
  );
}
