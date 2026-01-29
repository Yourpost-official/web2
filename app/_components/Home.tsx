'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Heart, ArrowRight, MessageSquare, HelpCircle, CheckCircle, Quote, ChevronDown, ChevronUp, Clock, Gift, Sparkles, Users } from 'lucide-react';
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
      {activeToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200]">
          <div className="bg-[#1D1D1F] text-white px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium shadow-lg">
            <CheckCircle size={16} />
            {activeToast}
          </div>
        </div>
      )}

      {/* 히어로 */}
      <section className="min-h-[88vh] flex flex-col justify-center items-center px-6 text-center bg-gradient-to-b from-[#FCF9F5] via-burgundy-50/20 to-[#FCF9F5] pt-10 pb-16">
        <div className="max-w-3xl mx-auto space-y-5">
          <p className="text-burgundy-500 text-sm font-medium tracking-wide">
            손으로 쓰고, 마음으로 전하는
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-[#1D1D1F] word-keep">
            요즘 세상에 편지라니,<br />
            <span className="text-burgundy-500">그게 좋더라고요.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto word-keep pt-1">
            카톡은 좀 가볍잖아요. 전화하긴 부담스럽고.<br className="hidden sm:block" />
            그래서 편지예요. 천천히, 제대로 전하고 싶을 때.
          </p>
          <div className="pt-5 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/ondaypost" className="btn-emotional-primary">
              서비스 둘러보기
            </Link>
            <Link href="/b2b" className="btn-emotional-secondary">
              기업 도입 문의
            </Link>
          </div>
        </div>
      </section>

      {/* 공감 - 스토리텔링 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-snug text-[#1D1D1F] word-keep">
                하루에 메시지 몇 개 받으세요?<br />
                근데 기억에 남는 건요?
              </h2>
              <div className="space-y-4 text-base md:text-lg text-gray-600 leading-relaxed word-keep">
                <p>
                  아침에 눈뜨면 알림이 쌓여있고, 읽다 보면 또 새 알림이 와요. 답장하고 나면 금방 잊어버리죠. 그게 요즘 소통이에요.
                </p>
                <p>
                  편지는 다르더라고요. 쓰는 데 시간이 걸리니까 대충 못 써요. 받는 사람도 함부로 안 열어요. 뜯는 순간부터 이미 특별한 거예요.
                </p>
                <p className="text-burgundy-600 font-medium">
                  마지막으로 손편지 받아본 게 언제예요? 그때 기분, 아직도 기억나지 않아요?
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-burgundy-50 to-burgundy-100/50 rounded-3xl p-8 md:p-10">
              <p className="text-xl md:text-2xl text-[#1D1D1F] font-medium leading-relaxed text-center word-keep">
                "요즘 누가 편지를 써?"<br />
                <span className="text-gray-500 text-lg">그런 말 들으면 이렇게 말해요.</span><br /><br />
                <span className="text-burgundy-500 font-bold">"그러니까 더 특별한 거지."</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 숫자로 보는 유어포스트 */}
      <section className="py-16 bg-[#1D1D1F]">
        <div className="layout-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-burgundy-400">2024</p>
              <p className="text-sm text-white/60 mt-1">서비스 시작</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-burgundy-400">100%</p>
              <p className="text-sm text-white/60 mt-1">수기 제작</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-burgundy-400">3일</p>
              <p className="text-sm text-white/60 mt-1">평균 배송</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-burgundy-400">전국</p>
              <p className="text-sm text-white/60 mt-1">어디든 배달</p>
            </div>
          </div>
        </div>
      </section>

      {/* 하루편지 소개 */}
      <section className="py-20 md:py-28 bg-[#FCF9F5]">
        <div className="layout-container">
          <div className="bg-white rounded-3xl p-6 md:p-10 lg:p-12 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="bg-gradient-to-br from-burgundy-50 to-burgundy-100/30 rounded-2xl aspect-[4/3] flex items-center justify-center">
                <Mail size={80} className="text-burgundy-300" strokeWidth={1} />
              </div>
              <div className="space-y-5">
                <span className="tag-pill">월간 구독 서비스</span>
                <h3 className="text-2xl md:text-3xl font-bold leading-snug text-[#1D1D1F] word-keep">
                  한 달에 한 번, 나한테 오는 편지
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed word-keep">
                  매달 우편함에 편지가 와요. 그 달의 테마에 맞춰 작가님이 쓴 에세이랑, 예쁜 엽서가 들어있어요. 누가 보내는 게 아니라 나한테 오는 거라 더 좋아요.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-burgundy-500 flex-shrink-0 mt-0.5" />
                    <span>매달 다른 작가의 에세이 - 위로가 되기도 하고, 생각할 거리를 주기도 해요</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-burgundy-500 flex-shrink-0 mt-0.5" />
                    <span>계절 한정 엽서 - 방에 붙여놓거나 누군가에게 보내기 좋아요</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-burgundy-500 flex-shrink-0 mt-0.5" />
                    <span>답장용 편지지 - 읽다 보면 나도 누군가에게 쓰고 싶어지거든요</span>
                  </li>
                </ul>
                <Link href="/ondaypost" className="btn-emotional-primary inline-flex mt-3">
                  하루편지 자세히 보기 <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 하트센드 소개 */}
      <section className="py-20 md:py-28 bg-burgundy-500">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="space-y-5 order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 text-white text-xs font-medium tracking-wide rounded-full">
                맞춤 편지 대필
              </span>
              <h3 className="text-2xl md:text-3xl font-bold leading-snug word-keep text-white">
                쓰고 싶은 말은 많은데,<br />막상 펜 들면 막막하죠
              </h3>
              <p className="text-white/80 text-base md:text-lg leading-relaxed word-keep">
                저도 그래요. 머릿속엔 하고 싶은 말이 가득한데 막상 적으려니까 첫 문장부터 막혀요. 그럴 때 저희한테 말씀해 주세요. 어떤 상황인지, 어떤 마음인지만 알려주시면 제가 문장으로 옮겨드릴게요.
              </p>
              <div className="space-y-2 pt-2">
                <p className="text-white/90 text-sm font-medium">이런 분들이 찾아오세요</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-white/80">좋아하는 사람에게 고백</span>
                  <span className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-white/80">오래된 친구와 화해</span>
                  <span className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-white/80">부모님께 감사 인사</span>
                  <span className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-white/80">기념일 축하 편지</span>
                </div>
              </div>
              <Link href="/heartsend" className="btn-emotional bg-white text-burgundy-600 hover:bg-gray-50 inline-flex mt-3 font-semibold">
                하트센드 자세히 보기 <ArrowRight size={18} />
              </Link>
            </div>
            <div className="bg-white/10 rounded-2xl aspect-[4/3] flex items-center justify-center border border-white/20 order-1 lg:order-2">
              <Heart size={80} className="text-white/80" fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      {/* 편지의 가치 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="layout-container">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3">편지가 특별한 이유</h2>
            <p className="text-base md:text-lg text-gray-600">빠른 게 좋은 세상에서 느린 게 주는 것들</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#FCF9F5] p-6 md:p-7 rounded-2xl space-y-3">
              <div className="w-12 h-12 bg-burgundy-100 text-burgundy-500 rounded-xl flex items-center justify-center">
                <Clock size={22} />
              </div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">기다림의 설렘</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                카톡은 보내면 바로 읽히잖아요. 편지는 며칠을 기다려요. 그 기다림이 기대가 되고, 도착하면 더 반가워요.
              </p>
            </div>
            <div className="bg-[#FCF9F5] p-6 md:p-7 rounded-2xl space-y-3">
              <div className="w-12 h-12 bg-burgundy-100 text-burgundy-500 rounded-xl flex items-center justify-center">
                <MessageSquare size={22} />
              </div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">정성의 무게</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                종이 꺼내고, 펜 들고, 한 글자씩 쓰는 거잖아요. 그 시간 동안 상대방 생각만 하는 거예요. 그게 느껴져요.
              </p>
            </div>
            <div className="bg-[#FCF9F5] p-6 md:p-7 rounded-2xl space-y-3">
              <div className="w-12 h-12 bg-burgundy-100 text-burgundy-500 rounded-xl flex items-center justify-center">
                <Gift size={22} />
              </div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">실물의 감동</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                손으로 만지고, 냄새 맡고, 서랍에 넣어두는 거예요. 몇 년 뒤에 우연히 발견하면 그때 기분이 다시 살아나요.
              </p>
            </div>
            <div className="bg-[#FCF9F5] p-6 md:p-7 rounded-2xl space-y-3">
              <div className="w-12 h-12 bg-burgundy-100 text-burgundy-500 rounded-xl flex items-center justify-center">
                <Sparkles size={22} />
              </div>
              <h4 className="text-lg font-bold text-[#1D1D1F]">희소성의 가치</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                요즘 편지 보내는 사람 없잖아요. 그래서 받으면 진짜 특별해요. "나한테 편지를?" 하는 그 느낌이요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 이용 후기 */}
      <section className="py-20 md:py-28 bg-[#FCF9F5]">
        <div className="layout-container">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3">받아본 분들 이야기</h2>
            <p className="text-base md:text-lg text-gray-600">솔직한 후기들을 모았어요</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <ReviewCard
              text="매달 편지 오는 날이 제일 좋아요. 퇴근하고 현관문 열면 우편함부터 확인해요. 작가님 글 읽으면서 차 한 잔 하는 게 소확행이에요."
              author="직장인 A님"
              tag="하루편지 6개월 구독"
            />
            <ReviewCard
              text="여자친구한테 1년 만에 편지 썼어요. 근데 막상 쓰려니까 뭘 써야 할지 몰라서 의뢰했는데, 제가 한 말 그대로 예쁘게 써주셔서 진짜 감사했어요. 여친이 울었어요."
              author="20대 남성 B님"
              tag="하트센드 이용"
            />
            <ReviewCard
              text="엄마 환갑에 편지 드렸어요. 평소에 말로 못 하던 것들 다 담았는데, 엄마가 읽다가 우셨어요. 저도 울었고요. 돈으로 못 사는 선물이에요."
              author="30대 여성 C님"
              tag="하트센드 이용"
            />
            <ReviewCard
              text="혼자 사는데 우편함에 청구서만 오다가 예쁜 편지 오니까 기분이 다르더라고요. 누가 나한테 뭔가를 보내줬다는 게 좋아요."
              author="1인 가구 D님"
              tag="하루편지 구독 중"
            />
            <ReviewCard
              text="10년 넘게 연락 안 하던 고등학교 친구한테 화해 편지 보냈어요. 저도 미안했는데 먼저 말 꺼내기 어려웠거든요. 답장 왔을 때 진짜 뭉클했어요."
              author="30대 E님"
              tag="하트센드 이용"
            />
            <ReviewCard
              text="남편이 편지를 안 쓰는 사람이에요. 근데 결혼기념일에 갑자기 편지가 와서 깜짝 놀랐어요. 알고 보니 여기서 대신 써준 거래요. 그래도 감동이에요."
              author="기혼 여성 F님"
              tag="하트센드 선물 수신"
            />
          </div>
        </div>
      </section>

      {/* 기업 서비스 간단 소개 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="layout-container">
          <div className="bg-[#1D1D1F] rounded-3xl p-8 md:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white/80 text-xs font-medium tracking-wide rounded-full">
                  B2B 서비스
                </span>
                <h3 className="text-2xl md:text-3xl font-bold leading-snug word-keep text-white">
                  기업에서도 편지를 보내요
                </h3>
                <p className="text-white/70 text-base md:text-lg leading-relaxed word-keep">
                  VIP 고객 감사 편지, 신규 직원 환영 키트, 크리에이터 팬레터 대행까지. 디지털 마케팅에 지친 고객에게 아날로그로 다가가 보세요. 반응이 달라요.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Users size={16} />
                    <span>고객 감사 편지</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Gift size={16} />
                    <span>직원 웰컴키트</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Heart size={16} />
                    <span>팬레터 대행</span>
                  </div>
                </div>
                <Link href="/b2b" className="btn-emotional bg-white text-[#1D1D1F] hover:bg-gray-100 inline-flex mt-3 font-semibold">
                  기업 서비스 알아보기 <ArrowRight size={18} />
                </Link>
              </div>
              <div className="flex justify-center">
                <div className="w-40 h-40 md:w-48 md:h-48 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <Mail size={64} className="text-burgundy-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-[#FCF9F5]">
        <div className="layout-container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3">자주 묻는 질문</h2>
            <p className="text-base md:text-lg text-gray-600">궁금한 점들 모아봤어요</p>
          </div>
          <div className="space-y-3">
            {(adminState?.content?.faq || [
              { id: 1, title: "편지가 도착하는 데 얼마나 걸려요?", text: "보통 주문 후 3-5일 정도 걸려요. 저희가 직접 쓰고 포장해서 우체국에 맡기거든요. 급하신 분은 미리 말씀해 주시면 최대한 맞춰드릴게요." },
              { id: 2, title: "보내는 사람 이름 안 적어도 돼요?", text: "네, 익명으로 보내셔도 돼요. 아예 안 적으셔도 되고, 가명을 쓰셔도 되고, 받는 분만 알 수 있는 힌트만 넣으셔도 돼요." },
              { id: 3, title: "해외로도 보낼 수 있어요?", text: "아직은 국내만 가능해요. 해외 배송은 준비 중이에요. 빨리 열 수 있도록 할게요." },
              { id: 4, title: "글솜씨가 없는데 괜찮아요?", text: "저희가 대신 써드리는 서비스가 있어요. 어떤 상황인지, 어떤 마음인지만 말씀해 주시면 제가 문장으로 만들어 드릴게요. 수정도 가능해요." },
              { id: 5, title: "환불은 어떻게 해요?", text: "제작 전이면 전액 환불해 드려요. 이미 쓰기 시작했으면 어렵지만, 상황 말씀해 주시면 최대한 맞춰드릴게요." }
            ]).map((item: ContentItem, idx: number) => (
              <div key={item.id || idx} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-[#1D1D1F] pr-4">{item.title}</span>
                  {openFaq === idx ? <ChevronUp size={20} className="text-burgundy-500 flex-shrink-0" /> : <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                    {item.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#FCF9F5] to-burgundy-50">
        <div className="layout-container text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-snug text-[#1D1D1F] word-keep">
            마음 전하는 거,<br />생각보다 어렵지 않아요.
          </h2>
          <p className="text-base md:text-lg text-gray-600 word-keep">
            뭘 써야 할지 모르겠으면 일단 물어보세요.<br className="hidden sm:block" />
            같이 고민해 드릴게요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
            <button type="button" onClick={() => handleActionClick('proposal')} className="btn-emotional-primary">
              <Mail size={18} /> 문의하기
            </button>
            <button type="button" onClick={() => handleActionClick('inquiry')} className="btn-emotional-secondary">
              <HelpCircle size={18} /> 상담 신청
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ReviewCard({ text, author, tag }: { text: string; author: string; tag: string }) {
  return (
    <div className="bg-white p-6 md:p-7 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
      <Quote size={18} className="text-burgundy-200 mb-3" />
      <p className="text-gray-600 leading-relaxed mb-4 flex-1 text-sm md:text-base">"{text}"</p>
      <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-50">
        <span className="font-medium text-[#1D1D1F]">{author}</span>
        <span className="text-burgundy-500 text-xs">{tag}</span>
      </div>
    </div>
  );
}
