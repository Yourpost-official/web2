'use client';

import React, { useState, memo } from 'react';
import Link from 'next/link';
import { Mail, Heart, ArrowRight, Star, ChevronDown, ChevronUp, Sparkles, Send } from 'lucide-react';
import { AdminState, ContentItem } from '@/types/admin';

interface HomeProps {
  adminState: AdminState;
}

export default function Home({ adminState }: HomeProps) {
  const cta = adminState?.cta || { mainContactEmail: "biz@yourpost.co.kr", additionalInquiryLink: "#" };
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleActionClick = (buttonType: 'proposal' | 'inquiry') => {
    const config = buttonType === 'proposal'
      ? adminState.cta?.homeProposal ?? { type: 'email', value: cta.mainContactEmail }
      : adminState.cta?.homeInquiry ?? { type: 'link', value: cta.additionalInquiryLink };

    if (config.type === 'email') {
      window.location.href = `mailto:${config.value}`;
    } else {
      window.open(config.value, '_blank');
    }
  };

  return (
    <div className="bg-paper">

      {/* ========== HERO ========== */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden bg-gradient-soft">
        <div className="layout-container relative z-10 py-20">
          <div className="max-w-[680px]">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E5DED4] rounded-full mb-8">
              <span className="w-2 h-2 bg-[#8B2E2E] rounded-full animate-pulse" />
              <span className="text-[13px] font-semibold text-[#4A4A4A]">손글씨 편지 서비스</span>
            </div>

            {/* Title */}
            <h1 className="text-display word-keep mb-6">
              마음을 전하는<br />
              가장 <span className="text-burgundy">따뜻한</span> 방법
            </h1>

            {/* Description */}
            <p className="text-body-lg word-keep mb-10 max-w-[520px]">
              바쁜 일상 속에서도 진심을 전하고 싶은 순간이 있습니다.<br />
              유어포스트가 당신의 마음을 손편지로 대신 전해드릴게요.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/ondaypost" className="btn btn-lg btn-primary">
                <Mail size={20} />
                하루편지 시작하기
              </Link>
              <Link href="/heartsend" className="btn btn-lg btn-secondary">
                맞춤 편지 알아보기
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 text-[14px]">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={16} className="text-[#F5A623]" fill="#F5A623" />
                  ))}
                </div>
                <span className="font-bold text-[#1A1A1A]">4.9</span>
                <span className="text-[#7A7A7A]">평점</span>
              </div>
              <div className="w-px h-4 bg-[#E5DED4]" />
              <span className="text-[#4A4A4A]">
                <strong className="text-[#1A1A1A]">2,400+</strong> 편지 발송
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 서비스 선택 ========== */}
      <section className="section bg-cream">
        <div className="layout-container">
          <div className="text-center mb-14">
            <span className="text-overline mb-4 block">Services</span>
            <h2 className="text-title word-keep">
              어떤 마음을 전하고 싶으세요?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {/* 하루편지 */}
            <Link href="/ondaypost" className="card-interactive group">
              <div className="flex items-start gap-5">
                <div className="icon-box icon-box-lg shrink-0">
                  <Mail size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-subtitle">하루편지</h3>
                    <span className="badge badge-burgundy">월 구독</span>
                  </div>
                  <p className="text-body mb-5">
                    매달 감성 에세이와 예쁜 엽서가<br />
                    당신의 우편함으로 찾아가요
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[28px] font-bold text-[#8B2E2E]">9,900</span>
                      <span className="text-[15px] text-[#7A7A7A]">원/월</span>
                    </div>
                    <div className="w-10 h-10 bg-[#F5EFE6] rounded-full flex items-center justify-center group-hover:bg-[#8B2E2E] group-hover:text-white transition-all">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* 하트센드 */}
            <Link href="/heartsend" className="card-interactive group">
              <div className="flex items-start gap-5">
                <div className="icon-box icon-box-lg shrink-0 !bg-[#1A1A1A] !text-white">
                  <Heart size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-subtitle">하트센드</h3>
                    <span className="badge badge-dark">프리미엄</span>
                  </div>
                  <p className="text-body mb-5">
                    전문 작가가 당신의 마음을<br />
                    정성스러운 손편지로 대신 써드려요
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[28px] font-bold text-[#1A1A1A]">49,000</span>
                      <span className="text-[15px] text-[#7A7A7A]">원~</span>
                    </div>
                    <div className="w-10 h-10 bg-[#F5EFE6] rounded-full flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:text-white transition-all">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 왜 유어포스트인가 ========== */}
      <section className="section bg-warm">
        <div className="layout-container">
          <div className="text-center mb-14">
            <span className="text-overline mb-4 block">Why YourPost</span>
            <h2 className="text-title word-keep">
              손편지가 특별한 이유
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[960px] mx-auto">
            <FeatureCard
              icon={<Sparkles size={24} />}
              title="글솜씨 걱정 NO"
              desc="상황만 알려주시면 전문 작가가 당신의 마음을 아름다운 문장으로 다듬어드려요"
            />
            <FeatureCard
              icon={<Send size={24} />}
              title="진짜 손글씨"
              desc="프린트가 아닌 실제 손글씨로 한 자 한 자 정성껏 써서 보내드려요"
            />
            <FeatureCard
              icon={<Heart size={24} />}
              title="우편함의 설렘"
              desc="카톡 알림과 달리, 우편함에서 편지를 발견하는 순간의 감동은 특별해요"
            />
          </div>
        </div>
      </section>

      {/* ========== 이용 방법 ========== */}
      <section className="section bg-cream">
        <div className="layout-container">
          <div className="text-center mb-14">
            <span className="text-overline mb-4 block">How It Works</span>
            <h2 className="text-title">간단한 3단계</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-[840px] mx-auto">
            <StepCard
              step="01"
              title="마음 전달"
              desc="전하고 싶은 마음과 상황을 알려주세요"
            />
            <StepCard
              step="02"
              title="정성 담기"
              desc="전문 작가가 편지를 쓰고 손글씨로 옮겨요"
            />
            <StepCard
              step="03"
              title="감동 전달"
              desc="예쁜 편지지에 담아 소중한 분께 배송해요"
            />
          </div>
        </div>
      </section>

      {/* ========== 후기 ========== */}
      <section className="section bg-warm">
        <div className="layout-container">
          <div className="text-center mb-14">
            <span className="text-overline mb-4 block">Reviews</span>
            <h2 className="text-title">진심을 전한 분들의 이야기</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[960px] mx-auto">
            <ReviewCard
              text="5년 만에 연락한 친구에게 편지를 보냈는데, 답장이 왔어요. 지금 그 친구랑 다시 제일 친해졌어요."
              author="김** 님"
              service="하트센드"
            />
            <ReviewCard
              text="매달 하루편지 받는 날이 기다려져요. 요즘 손편지 받을 일이 없잖아요. 설렘이 이런 거구나 싶었어요."
              author="이** 님"
              service="하루편지"
            />
            <ReviewCard
              text="글솜씨가 없어서 늘 고민이었는데, 작가님이 제 마음을 정말 잘 표현해 주셨어요."
              author="박** 님"
              service="하트센드"
            />
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="section bg-paper">
        <div className="layout-container max-w-[700px]">
          <div className="text-center mb-12">
            <span className="text-overline mb-4 block">FAQ</span>
            <h2 className="text-title">자주 묻는 질문</h2>
          </div>

          <div className="card p-0 overflow-hidden">
            {(adminState?.content?.faq || [
              { id: 1, title: "편지가 도착하기까지 얼마나 걸리나요?", text: "제작 1-2일, 배송 2-3일 정도 소요돼요. 급하시면 빠른 배송도 가능해요." },
              { id: 2, title: "익명으로 보낼 수 있나요?", text: "네! 보내는 사람 이름을 원하시는 대로 설정할 수 있어요." },
              { id: 3, title: "글솜씨가 없어도 괜찮나요?", text: "물론이에요! 상황과 마음만 알려주시면 전문 작가가 대신 써드려요." },
              { id: 4, title: "환불은 어떻게 되나요?", text: "제작 전 100% 환불, 제작 후 부분 환불 가능해요." }
            ]).map((item: ContentItem, idx: number, arr: ContentItem[]) => (
              <FaqItem
                key={item.id || idx}
                q={item.title}
                a={item.text}
                isOpen={openFaq === idx}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                isLast={idx === arr.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="section bg-burgundy-soft">
        <div className="layout-container max-w-[560px] text-center">
          <h2 className="text-title mb-5 word-keep">
            전하고 싶은 마음,<br />
            <span className="text-burgundy">지금 시작해보세요</span>
          </h2>

          <p className="text-body-lg mb-10">
            글솜씨가 없어도, 용기가 없어도 괜찮아요.<br />
            유어포스트가 함께할게요.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => handleActionClick('proposal')}
              className="btn btn-lg btn-primary"
            >
              무료 상담 신청
            </button>
            <button
              type="button"
              onClick={() => handleActionClick('inquiry')}
              className="btn btn-lg btn-secondary"
            >
              1:1 문의하기
            </button>
          </div>

          <p className="text-caption mt-8">
            문의: biz@yourpost.co.kr
          </p>
        </div>
      </section>
    </div>
  );
}

/* ========== Sub Components ========== */

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="card text-center">
      <div className="icon-box mx-auto mb-5">
        {icon}
      </div>
      <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-3">{title}</h3>
      <p className="text-body word-keep">{desc}</p>
    </div>
  );
}

function StepCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="text-[48px] font-bold text-[#8B2E2E] opacity-30 mb-2">{step}</div>
      <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-2">{title}</h3>
      <p className="text-body">{desc}</p>
    </div>
  );
}

const ReviewCard = memo(function ReviewCard({ text, author, service }: { text: string; author: string; service: string }) {
  return (
    <div className="card">
      <div className="flex items-center gap-1 mb-4">
        {[1,2,3,4,5].map(i => (
          <Star key={i} size={16} className="text-[#F5A623]" fill="#F5A623" />
        ))}
      </div>
      <p className="text-[15px] text-[#1A1A1A] leading-[1.8] mb-5 word-keep">"{text}"</p>
      <div className="flex items-center justify-between pt-4 border-t border-[#E5DED4]">
        <span className="text-[14px] font-semibold">{author}</span>
        <span className="badge badge-burgundy">{service}</span>
      </div>
    </div>
  );
});

const FaqItem = memo(function FaqItem({ q, a, isOpen, onClick, isLast }: { q: string; a?: string; isOpen: boolean; onClick: () => void; isLast?: boolean }) {
  return (
    <div className={!isLast ? 'border-b border-[#E5DED4]' : ''}>
      <button
        type="button"
        className="w-full flex justify-between items-center gap-4 px-6 py-5 text-left hover:bg-[#FAF6F0] transition-colors"
        onClick={onClick}
      >
        <span className={`text-[16px] font-medium ${isOpen ? 'text-[#8B2E2E]' : 'text-[#1A1A1A]'}`}>{q}</span>
        {isOpen ? (
          <ChevronUp size={22} className="text-[#8B2E2E] shrink-0" />
        ) : (
          <ChevronDown size={22} className="text-[#7A7A7A] shrink-0" />
        )}
      </button>
      {isOpen && a && (
        <div className="px-6 pb-5">
          <p className="text-[15px] text-[#4A4A4A] leading-[1.75] bg-[#FAF6F0] p-5 rounded-xl">{a}</p>
        </div>
      )}
    </div>
  );
});
