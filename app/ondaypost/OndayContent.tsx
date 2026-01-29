'use client';

import React from 'react';
import { Mail, Gift, Calendar, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { AdminState } from '@/types/admin';

interface OndayContentProps {
  adminState: AdminState;
}

export default function OndayContent({ adminState }: OndayContentProps) {
  const { haru } = adminState?.prices || { haru: { available: false, price: '0', link: '' } };

  return (
    <div className="bg-paper">

      {/* Hero */}
      <section className="min-h-[85vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cream" />
        <div className="absolute top-32 right-20 w-80 h-80 bg-[var(--burgundy-bg)] rounded-full blur-3xl opacity-50" />

        <div className="layout-container relative z-10 py-20">
          <div className="max-w-[600px] mx-auto text-center">
            <div className="label label-burgundy mx-auto w-fit mb-8">
              <Mail size={16} />
              월 구독 서비스
            </div>

            <h1 className="text-display word-keep mb-6">
              매달 찾아오는<br />
              <span className="text-burgundy">작은 위로</span>
            </h1>

            <p className="text-body-lg word-keep mb-10">
              바쁜 일상 속, 나를 위한 작은 선물.<br />
              감성 에세이와 예쁜 엽서가 매달 우편함으로 찾아가요.
            </p>

            {haru?.available ? (
              <a
                href={haru.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-primary"
              >
                <Mail size={20} />
                지금 구독하기
              </a>
            ) : (
              <div className="btn btn-lg btn-secondary opacity-60 cursor-not-allowed inline-flex">
                잠시 준비 중이에요
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 구성품 */}
      <section className="section bg-cream">
        <div className="layout-container">
          <div className="text-center mb-16">
            <span className="text-overline mb-4 block">What's Inside</span>
            <h2 className="text-title">매달 받아보는 것들</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
            <div className="card text-center">
              <div className="icon-box mx-auto mb-5">
                <Mail size={24} />
              </div>
              <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-2">감성 에세이</h3>
              <p className="text-body">전문 작가가 쓴 따뜻한 글</p>
            </div>

            <div className="card text-center">
              <div className="icon-box mx-auto mb-5">
                <Gift size={24} />
              </div>
              <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-2">일러스트 엽서</h3>
              <p className="text-body">계절을 담은 한정판 엽서</p>
            </div>

            <div className="card text-center">
              <div className="icon-box mx-auto mb-5">
                <Calendar size={24} />
              </div>
              <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-2">답장 편지지</h3>
              <p className="text-body">직접 쓸 수 있는 편지지</p>
            </div>
          </div>
        </div>
      </section>

      {/* 가격 */}
      <section className="section bg-gradient-warm">
        <div className="layout-container max-w-[480px]">
          <div className="card-elevated text-center">
            <div className="label label-burgundy mx-auto w-fit mb-6">구독 안내</div>

            <div className="mb-6">
              <span className="text-[15px] text-[var(--text-muted)] line-through">12,000원</span>
              <div className="flex items-baseline justify-center gap-1 mt-2">
                <span className="text-[44px] font-bold text-[var(--burgundy)]">9,900</span>
                <span className="text-[17px] text-[var(--text-muted)]">원/월</span>
              </div>
            </div>

            <div className="text-left space-y-3 py-6 border-t border-b border-[var(--border-light)]">
              <CheckItem text="감성 에세이 1통" />
              <CheckItem text="계절 한정 일러스트 엽서" />
              <CheckItem text="답장용 편지지 & 봉투" />
              <CheckItem text="무료 배송" />
            </div>

            {haru?.available && (
              <a
                href={haru.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-primary w-full mt-6"
              >
                구독 시작하기
                <ArrowRight size={18} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 후기 */}
      <section className="section bg-cream">
        <div className="layout-container max-w-[700px]">
          <div className="text-center mb-12">
            <span className="text-overline mb-4 block">Reviews</span>
            <h2 className="text-title">구독자 후기</h2>
          </div>

          <div className="space-y-4">
            <ReviewItem
              text="퇴근하고 우편함 여는 게 유일한 낙이 됐어요. 진짜 설레요."
              author="방** 님"
            />
            <ReviewItem
              text="친구 선물로 해줬는데 너무 좋아하더라고요. 저도 구독했어요."
              author="최** 님"
            />
            <ReviewItem
              text="요즘 손편지 받을 일이 없잖아요. 특별한 경험이에요."
              author="이** 님"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle size={18} className="text-[var(--burgundy)] shrink-0" />
      <span className="text-[15px] text-[var(--text-secondary)]">{text}</span>
    </div>
  );
}

function ReviewItem({ text, author }: { text: string; author: string }) {
  return (
    <div className="card">
      <div className="flex items-start gap-4">
        <div className="flex items-center gap-0.5 shrink-0 pt-1">
          {[1,2,3,4,5].map(i => (
            <Star key={i} size={14} className="text-[#F5A623]" fill="#F5A623" />
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] text-[var(--text-primary)] leading-relaxed mb-2">"{text}"</p>
          <span className="text-[13px] text-[var(--text-muted)]">{author}</span>
        </div>
      </div>
    </div>
  );
}
