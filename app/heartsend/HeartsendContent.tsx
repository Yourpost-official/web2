'use client';

import React from 'react';
import { Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { AdminState } from '@/types/admin';

interface HeartsendContentProps {
  adminState: AdminState;
}

export default function HeartsendContent({ adminState }: HeartsendContentProps) {
  const heartsend = adminState?.prices?.heartsend || { available: false, price: '49000', link: '' };

  return (
    <div className="bg-paper">

      {/* Hero */}
      <section className="min-h-[85vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cream" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--burgundy-bg)] rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-[#FEF3E6] rounded-full blur-3xl opacity-30" />

        <div className="layout-container relative z-10 py-20">
          <div className="max-w-[600px] mx-auto text-center">
            <div className="label label-dark mx-auto w-fit mb-8">
              <Heart size={16} />
              프리미엄 대필 서비스
            </div>

            <h1 className="text-display word-keep mb-6">
              전하지 못한 마음,<br />
              <span className="text-burgundy">대신 써드릴게요</span>
            </h1>

            <p className="text-body-lg word-keep mb-10">
              말로는 전하기 어려운 진심이 있잖아요.<br />
              전문 작가가 당신의 마음을 손편지로 담아드려요.
            </p>

            {heartsend?.available ? (
              <a
                href={heartsend.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-primary"
              >
                <Heart size={20} />
                신청하기
              </a>
            ) : (
              <div className="btn btn-lg btn-secondary opacity-60 cursor-not-allowed inline-flex">
                잠시 준비 중이에요
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 이런 분께 */}
      <section className="section bg-cream">
        <div className="layout-container">
          <div className="text-center mb-16">
            <span className="text-overline mb-4 block">For You</span>
            <h2 className="text-title">이런 분께 추천해요</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1000px] mx-auto">
            <UseCaseCard emoji="💝" title="고백" desc="말로는 전하기 어려운 사랑을" />
            <UseCaseCard emoji="🙏" title="감사" desc="은인에게 진심 어린 감사를" />
            <UseCaseCard emoji="🤝" title="화해" desc="오해를 풀고 관계를 회복하고 싶을 때" />
            <UseCaseCard emoji="✨" title="축하" desc="특별한 날을 더 특별하게" />
          </div>
        </div>
      </section>

      {/* 진행 방식 */}
      <section className="section bg-gradient-warm">
        <div className="layout-container">
          <div className="text-center mb-16">
            <span className="text-overline mb-4 block">Process</span>
            <h2 className="text-title">이렇게 진행돼요</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-[900px] mx-auto">
            <ProcessCard
              step="01"
              title="상황 공유"
              desc="폼을 통해 받는 분과의 관계, 전하고 싶은 마음을 알려주세요"
            />
            <ProcessCard
              step="02"
              title="초안 확인"
              desc="작가가 작성한 초안을 검토하고 수정 요청을 해주세요"
            />
            <ProcessCard
              step="03"
              title="손글씨 발송"
              desc="예쁜 편지지에 손글씨로 옮겨 소중한 분께 배송해요"
            />
          </div>
        </div>
      </section>

      {/* 가격 */}
      <section className="section bg-warm">
        <div className="layout-container max-w-[480px]">
          <div className="card-elevated text-center">
            <div className="label label-dark mx-auto w-fit mb-6">프리미엄 서비스</div>

            <div className="mb-6">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[44px] font-bold text-[var(--text-primary)]">49,000</span>
                <span className="text-[17px] text-[var(--text-muted)]">원~</span>
              </div>
              <p className="text-[14px] text-[var(--text-muted)] mt-2">편지 길이와 옵션에 따라 달라져요</p>
            </div>

            <div className="text-left space-y-3 py-6 border-t border-b border-[var(--border-light)]">
              <CheckItem text="전문 작가의 맞춤 편지 작성" />
              <CheckItem text="초안 검토 및 1회 수정" />
              <CheckItem text="프리미엄 편지지 & 봉투" />
              <CheckItem text="손글씨 대필" />
              <CheckItem text="전국 무료 배송" />
            </div>

            {heartsend?.available && (
              <a
                href={heartsend.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-dark w-full mt-6"
              >
                신청하기
                <ArrowRight size={18} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-burgundy-soft">
        <div className="layout-container max-w-[500px] text-center">
          <h2 className="text-title mb-5 word-keep">
            전하고 싶은 마음이 있다면<br />
            <span className="text-burgundy">지금 시작하세요</span>
          </h2>
          <p className="text-body-lg mb-8">
            글솜씨 걱정은 저희에게 맡겨주세요.
          </p>
          {heartsend?.available && (
            <a
              href={heartsend.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-primary"
            >
              하트센드 신청하기
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

function UseCaseCard({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="card text-center">
      <span className="text-[36px] block mb-4">{emoji}</span>
      <h3 className="text-[17px] font-bold text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-body text-[14px]">{desc}</p>
    </div>
  );
}

function ProcessCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="text-[52px] font-bold text-[var(--burgundy)] opacity-25 mb-3">{step}</div>
      <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-body">{desc}</p>
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
