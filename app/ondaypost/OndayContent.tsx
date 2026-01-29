'use client';

import React from 'react';
import { Mail, Smile, Coffee, Bookmark, CheckCircle, ArrowRight, Star, Heart, Quote } from 'lucide-react';
import { AdminState } from '@/types/admin';

interface OndayContentProps {
  adminState: AdminState;
}

export default function OndayContent({ adminState }: OndayContentProps) {
  const haru = adminState?.prices?.haru || { available: false, price: '0', link: '' };

  return (
    <div className="animate-reveal">
      {/* 히어로 */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 text-center bg-[#FCF9F5] pt-16 pb-20">
        <div className="max-w-2xl mx-auto space-y-5">
          <span className="tag-pill"><Star size={14} /> 월간 편지 구독</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-[#1D1D1F] word-keep">
            한 달에 한 번,<br />나한테 오는 편지
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed word-keep pt-2">
            청구서랑 광고만 오던 우편함에 어느 날 예쁜 편지가 와요.<br className="hidden sm:block" />
            누가 보낸 건 아닌데, 나한테 온 거라 기분이 좋아요.
          </p>
          <div className="pt-5 flex flex-col sm:flex-row justify-center gap-3">
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

      {/* 하루편지란 */}
      <section id="detail" className="py-20 md:py-28 bg-white">
        <div className="layout-container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-4">하루편지가 뭐예요?</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              매달 정해진 날에 편지가 와요. 그 달의 테마에 맞춰 작가님이 쓴 에세이랑 예쁜 엽서가 들어있어요.
              읽다 보면 위로가 되기도 하고, 생각할 거리를 주기도 해요.
              바쁜 일상에서 잠깐 멈춰서 나를 돌아보는 시간이 생겨요.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FCF9F5] p-7 rounded-2xl text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-100 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><Smile size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">위로가 되는 글</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                퇴근하고 지쳐서 들어왔는데 편지가 와 있으면 기분이 달라져요.
                차 한 잔 하면서 읽으면 하루 피로가 풀리는 느낌이에요.
              </p>
            </div>
            <div className="bg-[#FCF9F5] p-7 rounded-2xl text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-100 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><Coffee size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">기다림의 설렘</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                다음 달엔 어떤 내용일까 궁금해져요.
                매달 초가 되면 우편함 확인하는 게 소소한 낙이 돼요.
              </p>
            </div>
            <div className="bg-[#FCF9F5] p-7 rounded-2xl text-center space-y-4">
              <div className="w-14 h-14 bg-burgundy-100 text-burgundy-500 rounded-xl flex items-center justify-center mx-auto"><Bookmark size={24} /></div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">모으는 즐거움</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                받은 편지들 모아두면 나만의 작은 컬렉션이 돼요.
                나중에 꺼내보면 그때 기분이 다시 떠올라요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 구성품 */}
      <section className="py-20 md:py-28 bg-[#FCF9F5]">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="bg-burgundy-50 rounded-3xl aspect-square flex items-center justify-center order-2 lg:order-1">
              <Mail size={100} className="text-burgundy-300" strokeWidth={1} />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] word-keep">매달 이런 게 들어있어요</h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <CheckCircle size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#1D1D1F] mb-1">작가의 에세이</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      매달 다른 작가님이 그 달의 테마에 맞춰 글을 써요.
                      계절 이야기일 때도 있고, 일상의 소소한 것들일 때도 있어요.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#1D1D1F] mb-1">계절 한정 엽서</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      그 달의 분위기를 담은 일러스트 엽서예요.
                      방에 붙여놓거나 누군가에게 보내기 좋아요.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle size={22} className="text-burgundy-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#1D1D1F] mb-1">답장용 편지지</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      읽다 보면 나도 누군가에게 쓰고 싶어지거든요.
                      그럴 때 쓸 수 있게 편지지도 같이 보내드려요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 이런 분들에게 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="layout-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3">이런 분들이 좋아하세요</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <Heart size={22} className="text-burgundy-500 shrink-0" />
              <p className="text-[#1D1D1F]">혼자 살아서 우편함에 올 게 없는 분</p>
            </div>
            <div className="flex items-center gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <Heart size={22} className="text-burgundy-500 shrink-0" />
              <p className="text-[#1D1D1F]">퇴근 후 조용히 힐링하고 싶은 분</p>
            </div>
            <div className="flex items-center gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <Heart size={22} className="text-burgundy-500 shrink-0" />
              <p className="text-[#1D1D1F]">책 읽을 시간은 없는데 글은 읽고 싶은 분</p>
            </div>
            <div className="flex items-center gap-4 p-5 bg-[#FCF9F5] rounded-2xl">
              <Heart size={22} className="text-burgundy-500 shrink-0" />
              <p className="text-[#1D1D1F]">매달 작은 선물 받는 기분을 느끼고 싶은 분</p>
            </div>
          </div>
        </div>
      </section>

      {/* 후기 */}
      <section className="py-20 md:py-28 bg-[#FCF9F5]">
        <div className="layout-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3">구독자 후기</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <Quote size={18} className="text-burgundy-200 mb-3" />
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                "처음엔 이게 뭔가 싶었는데 막상 받아보니까 좋더라고요.
                요즘 우편함 열 일이 없잖아요. 그 설렘이 다시 생겼어요."
              </p>
              <p className="text-sm font-medium text-[#1D1D1F]">3개월 구독 중</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <Quote size={18} className="text-burgundy-200 mb-3" />
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                "작가님 글이 생각보다 진짜 좋아요. 짧은데 여운이 남아요.
                주말에 커피 마시면서 읽는 게 루틴이 됐어요."
              </p>
              <p className="text-sm font-medium text-[#1D1D1F]">6개월 구독 중</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <Quote size={18} className="text-burgundy-200 mb-3" />
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                "엄마한테 선물했는데 너무 좋아하세요. 매달 전화 와서
                이번 달 편지 왔다고 알려주셔요. 효도한 기분이에요."
              </p>
              <p className="text-sm font-medium text-[#1D1D1F]">부모님 선물</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-burgundy-50">
        <div className="layout-container text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] word-keep">
            나를 위한 작은 선물,<br />시작해볼까요?
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            한 달만 먼저 받아보세요. 맘에 안 들면 그만둬도 돼요.
          </p>
          {haru.available ? (
            <a href={haru.link} target="_blank" rel="noopener noreferrer" className="btn-emotional-primary inline-flex">
              구독 시작하기 <ArrowRight size={18} />
            </a>
          ) : (
            <p className="text-gray-500">현재 준비 중이에요. 곧 다시 열릴 예정이에요.</p>
          )}
        </div>
      </section>
    </div>
  );
}
