'use client';

import React from 'react';
import { Heart, Lock, Zap, MessageCircle, Star, Send, ArrowRight, CheckCircle, Quote, Clock } from 'lucide-react';
import { AdminState } from '@/types/admin';

interface HeartsendContentProps {
  adminState: AdminState;
}

export default function HeartsendContent({ adminState }: HeartsendContentProps) {
  const heartsend = adminState?.prices?.heartsend || { available: true, link: '#' };

  return (
    <div className="animate-reveal">
      {/* 히어로 */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 text-center bg-[#FCF9F5] pt-16 pb-20">
        <div className="max-w-2xl mx-auto space-y-5">
          <span className="tag-pill bg-burgundy-500 text-white border-burgundy-500"><Heart size={14} /> 맞춤 편지 대필</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-[#1D1D1F] word-keep">
            마음은 있는데<br />글이 안 써져요
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed word-keep pt-2">
            머릿속에 하고 싶은 말은 많은데 막상 적으려니까 막막하죠.<br className="hidden sm:block" />
            어떤 상황인지만 말씀해 주세요. 제가 문장으로 만들어 드릴게요.
          </p>
          <div className="pt-5 flex flex-col sm:flex-row justify-center gap-3">
            {heartsend.available ? (
              <>
                <button type="button" onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })} className="btn-emotional-secondary">어떻게 진행되나요?</button>
                <a href={heartsend.link} target="_blank" rel="noopener noreferrer" className="btn-emotional-primary">편지 신청하기</a>
              </>
            ) : (
              <div className="bg-gray-100 text-gray-500 px-8 py-4 rounded-2xl font-medium">지금은 대기 신청만 가능해요</div>
            )}
          </div>
        </div>
      </section>

      {/* 하트센드란 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="layout-container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-4">하트센드가 뭐예요?</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              편지 쓰고 싶은데 뭘 어떻게 써야 할지 모르겠을 때 저희한테 맡겨주세요.
              상황이랑 마음만 알려주시면 그걸 예쁜 문장으로 바꿔서 실제 편지로 보내드려요.
              고백, 화해, 감사, 축하… 어떤 마음이든 괜찮아요.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FCF9F5] p-7 rounded-2xl text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-100 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><MessageCircle size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">대신 써드려요</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                글솜씨 없어도 괜찮아요. 어떤 상황인지, 상대방이 누군지,
                어떤 마음인지만 알려주시면 제가 글로 옮겨드릴게요.
              </p>
            </div>
            <div className="bg-[#FCF9F5] p-7 rounded-2xl text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-100 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><Zap size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">빠르게 보내드려요</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                급한 거 알아요. 기념일 깜빡했거나 갑자기 보내고 싶을 때도 있잖아요.
                최대한 빨리 완성해서 보내드릴게요.
              </p>
            </div>
            <div className="bg-[#FCF9F5] p-7 rounded-2xl text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-100 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><Lock size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">비밀 철저히 지켜요</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                민감한 이야기 많이 하시잖아요. 절대 외부에 공유하지 않아요.
                작업 끝나면 내용도 삭제해요. 안심하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 진행 과정 */}
      <section id="process" className="py-20 md:py-28 bg-[#FCF9F5]">
        <div className="layout-container">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3">이렇게 진행돼요</h2>
            <p className="text-base md:text-lg text-gray-600">복잡하지 않아요. 4단계면 끝나요.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-burgundy-500 text-white rounded-full flex items-center justify-center mx-auto font-bold">1</div>
              <h4 className="font-bold text-[#1D1D1F]">상담 신청</h4>
              <p className="text-gray-600 text-sm">간단한 양식 작성하면 연락드려요</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-burgundy-500 text-white rounded-full flex items-center justify-center mx-auto font-bold">2</div>
              <h4 className="font-bold text-[#1D1D1F]">이야기 나누기</h4>
              <p className="text-gray-600 text-sm">어떤 상황인지 자세히 들어요</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-burgundy-500 text-white rounded-full flex items-center justify-center mx-auto font-bold">3</div>
              <h4 className="font-bold text-[#1D1D1F]">초안 확인</h4>
              <p className="text-gray-600 text-sm">쓴 글 보내드리면 수정 가능해요</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-burgundy-500 text-white rounded-full flex items-center justify-center mx-auto font-bold">4</div>
              <h4 className="font-bold text-[#1D1D1F]">발송</h4>
              <p className="text-gray-600 text-sm">실제 편지로 만들어서 보내드려요</p>
            </div>
          </div>
        </div>
      </section>

      {/* 이런 분들이 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="layout-container">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3">이런 분들이 찾아오세요</h2>
            <p className="text-base md:text-lg text-gray-600">다양한 마음들을 전해드렸어요</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="flex items-start gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <Heart size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1D1D1F] mb-1">좋아하는 사람에게 고백하고 싶어요</p>
                <p className="text-sm text-gray-600">마음은 확실한데 어떻게 말해야 할지 모르겠을 때</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <MessageCircle size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1D1D1F] mb-1">오래된 친구와 화해하고 싶어요</p>
                <p className="text-sm text-gray-600">먼저 연락하기 어색하고 뭐라고 해야 할지 모르겠을 때</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <Star size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1D1D1F] mb-1">부모님께 감사 인사 드리고 싶어요</p>
                <p className="text-sm text-gray-600">평소에 말로 표현 못 했던 것들 전하고 싶을 때</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <Send size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1D1D1F] mb-1">기념일에 특별한 선물하고 싶어요</p>
                <p className="text-sm text-gray-600">물건보다 마음이 담긴 걸 주고 싶을 때</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <Clock size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1D1D1F] mb-1">떠나는 동료에게 인사하고 싶어요</p>
                <p className="text-sm text-gray-600">퇴사하는 분께 그동안 고마웠다고 전하고 싶을 때</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <CheckCircle size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1D1D1F] mb-1">사과하고 싶은 사람이 있어요</p>
                <p className="text-sm text-gray-600">잘못한 거 알지만 어떻게 사과해야 할지 모르겠을 때</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 후기 */}
      <section className="py-20 md:py-28 bg-[#FCF9F5]">
        <div className="layout-container">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3">이용 후기</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <Quote size={18} className="text-burgundy-200 mb-3" />
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                "여자친구 생일에 편지 선물하고 싶었는데 뭘 써야 할지 몰라서 맡겼어요.
                제가 한 말 그대로 예쁘게 써주셔서 진짜 감사했어요. 여친이 울었어요."
              </p>
              <p className="text-sm font-medium text-[#1D1D1F]">20대 남성 / 연인 생일 선물</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <Quote size={18} className="text-burgundy-200 mb-3" />
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                "엄마 환갑에 편지 드렸어요. 평소에 말로 못 하던 것들 다 담았는데,
                엄마가 읽다가 우셨어요. 저도 울었고요. 돈으로 못 사는 선물이에요."
              </p>
              <p className="text-sm font-medium text-[#1D1D1F]">30대 여성 / 부모님 환갑</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <Quote size={18} className="text-burgundy-200 mb-3" />
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                "10년 넘게 연락 안 하던 친구한테 화해 편지 보냈어요.
                저도 미안했는데 먼저 말 꺼내기 어려웠거든요. 답장 왔을 때 뭉클했어요."
              </p>
              <p className="text-sm font-medium text-[#1D1D1F]">30대 / 오래된 친구와 화해</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <Quote size={18} className="text-burgundy-200 mb-3" />
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                "퇴사하시는 팀장님께 감사 편지 드렸어요. 직접 쓰기엔 쑥스럽고
                뭘 써야 할지 몰라서요. 좋아하셨다고 나중에 연락 오셨어요."
              </p>
              <p className="text-sm font-medium text-[#1D1D1F]">20대 직장인 / 퇴사 인사</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#1D1D1F]">
        <div className="layout-container text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white word-keep leading-snug">
            한 통의 편지가<br />관계를 바꿀 수 있어요
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            망설이지 마세요. 뭘 써야 할지 모르겠으면 일단 이야기해 보세요.<br className="hidden sm:block" />
            같이 고민해 드릴게요.
          </p>
          {heartsend.available ? (
            <a href={heartsend.link} target="_blank" rel="noopener noreferrer" className="btn-emotional bg-white text-[#1D1D1F] hover:bg-gray-100 inline-flex font-semibold">
              상담 신청하기 <ArrowRight size={18} />
            </a>
          ) : (
            <p className="text-white/50">현재 대기 신청만 받고 있어요.</p>
          )}
        </div>
      </section>
    </div>
  );
}
