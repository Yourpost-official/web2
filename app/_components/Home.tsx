'use client';

import React, { useState, memo } from 'react';
import Link from 'next/link';
import { Mail, Heart, Send, Sparkles, ArrowRight, PenTool, MessageSquare, HelpCircle, CheckCircle, Star, Coffee, Feather, Quote, ChevronDown, ChevronUp } from 'lucide-react';
// import CookieConsent from '../../components/CookieConsent';
import { AdminState, ContentItem } from '@/types/admin';

interface HomeProps {
  adminState: AdminState;
}

export default function Home({ adminState }: HomeProps) {
  const cta = adminState?.cta || { mainContactEmail: "biz@yourpost.co.kr", additionalInquiryLink: "#" };
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  // const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);

  const handleActionClick = (buttonType: 'proposal' | 'inquiry') => {
    if (buttonType === 'proposal') {
      const config = adminState.cta?.homeProposal ?? { type: 'email', value: cta.mainContactEmail };
      if (config.type === 'email') {
        setActiveToast('메일 클라이언트가 호출되었습니다.');
        window.location.href = `mailto:${config.value}`;
      } else {
        setActiveToast('제안서 폼이 활성화되었습니다.');
        window.open(config.value, '_blank');
      }
    } else {
      const config = adminState.cta?.homeInquiry ?? { type: 'link', value: cta.additionalInquiryLink };
      if (config.type === 'email') {
        setActiveToast('메일 클라이언트가 호출되었습니다.');
        window.location.href = `mailto:${config.value}`;
      } else {
        setActiveToast('문의 폼이 활성화되었습니다.');
        window.open(config.value, '_blank');
      }
    }
    setTimeout(() => setActiveToast(null), 3000);
  };

  return (
    <div className="animate-reveal space-y-24 md:space-y-44 pb-44 bg-[#FCF9F5] relative">
      {/* 쿠키 동의 (Client State 관리) */}
      {/* {!hasAcceptedCookies && (
        // <CookieConsent onAccept={() => setHasAcceptedCookies(true)} />
      )} */}

      {/* ACTION TOAST - 애플 스타일 */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 ${activeToast ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-white/95 backdrop-blur-xl text-[#1D1D1F] px-8 py-4 rounded-full flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[rgba(0,0,0,0.06)]">
          <CheckCircle size={18} className="text-burgundy-500" />
          <span className="text-sm font-semibold tracking-[-0.006em]">{activeToast}</span>
        </div>
      </div>

      {/* HERO SECTION - 애플 스타일 */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-screen-xl mx-auto space-y-10 md:space-y-12 pt-20">
        <div className="tag-pill">
          <Sparkles size={14}/> Emotional Connection Platform
        </div>
        <h1 className="heading-hero break-keep word-keep max-w-6xl">
          <span className="block mb-4 text-[#6E6E73] text-xl md:text-3xl font-normal tracking-[-0.011em]">읽지 않음으로 넘어가는 마음 대신,</span>
          <span className="text-burgundy-gradient">
            손에 닿는 진심을 전하세요.
          </span>
        </h1>
        <p className="text-body-large max-w-3xl mx-auto px-4">
          쉽게 보내고 쉽게 잊혀지는 톡 대신, <br className="hidden md:block" />
          당신의 온기가 담긴 편지 한 통으로 관계의 깊이를 더해보세요.
        </p>
        <div className="pt-12 flex flex-col md:flex-row justify-center gap-4">
          <Link href="/ondaypost" className="btn-emotional-primary">
            전체 서비스 보기
          </Link>
          <Link href="/b2b" className="btn-emotional-secondary">
            비즈니스 도입 상담
          </Link>
        </div>
      </section>

      {/* SECTION: EMOTIONAL HOOK - 애플 스타일 */}
      <section className="layout-container section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
           <div className="space-y-8">
              <h2 className="heading-title break-keep">
                 도파민에 지친 당신에게,<br/>
                 <span className="text-[#86868B]">잠시 멈춤이 필요한 순간.</span>
              </h2>
              <div className="space-y-6 text-body-medium break-keep">
                 <p>
                    하루에도 수십 번 울리는 알림, 의미 없는 스크롤.<br/>
                    우리는 너무 많은 연결 속에 살지만, 역설적으로 더 외로움을 느낍니다.
                    진짜 소통은 '속도'가 아니라 '온도'에 있으니까요.
                 </p>
                 <p>
                    유어포스트는 <strong className="text-[#1D1D1F] font-semibold">'물성(Materiality)'</strong>이 가진 치유의 힘을 믿습니다.
                    종이의 질감, 잉크의 냄새, 그리고 우편함을 열 때의 설렘.
                    이 아날로그 감각들이 당신의 일상을 조금 더 다정하게 만들어줄 거예요.
                 </p>
              </div>
           </div>
           <div className="bg-gradient-to-br from-burgundy-50/40 to-burgundy-100/30 rounded-[40px] md:rounded-[56px] p-12 md:p-20 relative overflow-hidden min-h-[360px] md:min-h-[480px] flex items-center justify-center backdrop-blur-sm border border-burgundy-200/20">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#8B2E2E_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <div className="relative z-10 text-center space-y-8">
                 <Feather size={72} className="text-burgundy-500 mx-auto opacity-60" strokeWidth={1.2} />
                 <p className="font-serif italic text-2xl md:text-3xl text-[#1D1D1F] leading-relaxed tracking-[-0.011em]">
                    "진심은<br/>속도가 아니라<br/>깊이입니다."
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* CORE VALUE SECTION - 애플 스타일 */}
      <section className="layout-container section-spacing">
         <div className="text-center space-y-6 mb-20">
            <div className="tag-pill mx-auto">Brand Standard</div>
            <p className="heading-section max-w-4xl mx-auto break-keep">
              유어포스트가 증명하는 <span className="text-burgundy-gradient">진정성</span>의 힘
            </p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ValueCard icon={<MessageSquare size={32}/>} title="정교한 문장 대행" desc="당신의 서툰 진심을 전문 작가의 정제된 문장으로 다듬어 품격 있게 전달합니다." />
            <ValueCard icon={<PenTool size={32}/>} title="하이엔드 지류" desc="손끝에 닿는 종이의 질감부터 봉투의 마감까지, 최상의 아날로그 경험을 설계합니다." />
            <ValueCard icon={<Heart size={32}/>} title="독보적인 고객 경험" desc="우편함에서 발견하는 실물 편지의 감동은 디지털 알림과는 비교할 수 없는 깊이를 선사합니다." />
         </div>
      </section>

      {/* SECTION: SERVICE SPOTLIGHT 1 (Haru Letter) - 애플 스타일 */}
      <section className="layout-container section-spacing">
         <div className="card-emotional">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
               <div className="order-1 lg:order-1 relative">
                  <div className="aspect-[4/5] bg-burgundy-50 rounded-[40px] relative overflow-hidden">
                     <div className="absolute inset-0 flex items-center justify-center text-burgundy-200">
                        <Mail size={120} strokeWidth={1} />
                     </div>
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-[32px] shadow-lg border border-gray-50 flex items-center gap-4">
                     <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                        <Star size={20} fill="currentColor" />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Satisfaction</p>
                        <p className="text-lg font-black text-charcoal">4.9 / 5.0</p>
                     </div>
                  </div>
               </div>
               <div className="order-2 lg:order-2 space-y-6 md:space-y-8">
                  <div className="tag-pill"><Coffee size={14}/> Monthly Subscription</div>
                  <h3 className="heading-hero text-3xl md:text-5xl">
                     한 달에 한 번,<br/>
                     <span className="text-burgundy-gradient">나를 위한 다정한 안부.</span>
                  </h3>
                  <p className="text-body-large text-gray-700 leading-loose break-keep">
                     매달 쏟아지는 고지서들 사이에서, 오직 나만을 위한 선물을 발견하는 기쁨을 느껴보세요.
                     '하루편지'는 계절의 분위기를 담은 에세이와 그림을 당신의 우편함으로 보내드립니다.
                     스마트폰을 잠시 내려두고, 종이가 주는 위로에 집중하는 시간. 온전히 나를 사랑하는 가장 쉬운 방법입니다.
                  </p>
                  <ul className="space-y-4">
                     <CheckItem text="전문 작가가 집필한 감성 에세이" />
                     <CheckItem text="계절을 담은 한정판 일러스트 엽서" />
                     <CheckItem text="사각거리는 필기감의 답장용 편지지" />
                  </ul>
                  <div className="pt-6">
                     <Link href="/ondaypost" className="btn-emotional-primary inline-block text-center">
                        하루편지 구독하기
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION: SERVICE SPOTLIGHT 2 (Heart Send) */}
      <section className="layout-container py-10">
         <div className="bg-[#2D2D2D] rounded-[40px] md:rounded-[60px] p-8 md:p-20 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-5">
               <Send size={400} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
               <div className="space-y-6 md:space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-xs font-bold tracking-widest rounded-full uppercase backdrop-blur-sm border border-white/10">
                     <Sparkles size={14}/> Premium On-Demand
                  </div>
                  <h3 className="heading-hero text-white text-3xl md:text-5xl">
                     전하지 못한 진심,<br/>
                     <span className="text-gray-400">대신 전해드립니다.</span>
                  </h3>
                  <p className="text-lg text-gray-300 leading-loose break-keep">
                     썸 타는 사이의 설렘, 친구와 다툰 후의 어색함, 부모님께 전하기 쑥스러운 감사 인사까지.
                     말로는 전하기 힘든 그 마음, 유어포스트가 가장 정중하고 아름다운 문장으로 다듬어 드립니다.
                     영화 속 한 장면처럼, 실링 왁스로 봉인된 편지가 상대방에게 도착하는 순간을 상상해보세요.
                  </p>
                  <div className="flex flex-wrap gap-3">
                     <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">#재회편지</span>
                     <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">#부모님감사</span>
                     <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">#VIP초대장</span>
                  </div>
                  <div className="pt-6">
                     <Link href="/heartsend" className="btn-emotional bg-white text-charcoal hover:bg-gray-100 inline-block text-center">
                        하트센드 신청하기
                     </Link>
                  </div>
               </div>
               <div className="relative">
                  <div className="aspect-square bg-white/5 rounded-[40px] border border-white/10 flex items-center justify-center p-12">
                     <div className="text-center space-y-6">
                        <Heart size={80} className="text-burgundy-500 mx-auto animate-pulse" fill="currentColor" />
                        <p className="font-serif text-2xl text-white/80 italic">
                           "당신의 마음이<br/>가장 정중하게 닿을 수 있도록"
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="bg-charcoal py-20 md:py-32 rounded-[40px] md:rounded-[60px] mx-4 md:mx-6 text-white overflow-hidden relative shadow-2xl">
         <div className="max-w-screen-xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-8">
               <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-tight">
                  <span className="bg-gradient-to-r from-[#8B2E2E] via-[#A63A3A] to-[#631F1F] bg-clip-text text-transparent">아날로그 가치</span>를<br />현대적인 시스템으로.
               </h2>
               <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-lg">
                  전통적인 편지의 번거로움을 혁신했습니다. 유어포스트만의 감성 시스템은 모든 제작 공정을 정교하게 관리하며 소중한 메시지의 가치를 극대화합니다.
               </p>
               <Link href="/about" className="bg-burgundy-500 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-burgundy-600 transition-all flex items-center gap-3 w-fit">
                  브랜드 이야기 확인하기 <ArrowRight />
               </Link>
            </div>
            <div className="bg-white/5 rounded-[48px] p-16 border border-white/10 flex items-center justify-center">
               <Heart className="text-burgundy-500 animate-pulse" size={160} />
            </div>
         </div>
      </section>

      {/* SECTION: REVIEWS */}
      <section className="layout-container py-24 space-y-16">
         <div className="text-center space-y-4">
            <h2 className="heading-section">우편함에서 시작된 이야기</h2>
            <p className="text-body-medium">유어포스트를 통해 마음을 전한 분들의 목소리입니다.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReviewCard 
               text="친한 친구들에게 진심을 전할 방법을 찾다가 하트센드를 알게 되었어요. 글솜씨가 부족한 저를 위해 정말 멋진 편지를 도와주셔서 감사했어요!"
               author="김** 님 (20대, 대학원생)"
               tag="하트센드 이용"
            />
            <ReviewCard 
               text="매달 오는 하루편지는 저에게 주는 선물 같아요. 퇴근하고 우편함을 열어보는 게 유일한 낙이 되었습니다."
               author="방** 님 (40대, 주부)"
               tag="하루편지 체험"
            />
            <ReviewCard 
               text="연말에 감사 인사를 전하고 싶었는데, 전할 사람이 너무 많아서 고민이였지만 하트센드를 통해 정말 멋진 편지를 보낼 수 있었어요. 모두가 감동했다고 하네요!"
               author="문** 님 (10대, 학생)"
               tag="하트센드 이용"
            />
         </div>
      </section>

      {/* SECTION: FAQ */}
      <section className="layout-container py-10 max-w-4xl mx-auto">
         <div className="bg-white rounded-[32px] md:rounded-[48px] p-8 md:p-16 border border-gray-100 shadow-sm space-y-12">
            <div className="text-center space-y-4 mb-8">
               <h2 className="heading-section">자주 묻는 질문</h2>
               <p className="text-gray-600">궁금한 점이 있으신가요? 클릭해서 확인해보세요.</p>
            </div>
            <div className="space-y-6">
               {(adminState?.content?.faq || [
                 { id: 1, title: "편지가 도착하기까지 얼마나 걸리나요?", text: "제작 기간 1-2일, 우편 배송 2-3일(영업일 기준) 정도 소요됩니다. 여유를 가지고 기다려주시면 정성을 다해 보내드립니다." },
                 { id: 2, title: "익명으로 보낼 수 있나요?", text: "네, 가능합니다. 보내는 사람 이름을 닉네임이나 별칭으로 설정하실 수 있으며, 철저한 비밀 보장을 약속드립니다." },
                 { id: 3, title: "해외 배송도 가능한가요?", text: "현재는 국내 배송만 지원하고 있습니다. 추후 해외 배송 서비스도 준비 중이니 조금만 기다려주세요." },
                 { id: 4, title: "글솜씨가 없어도 괜찮나요?", text: "물론입니다. 키워드와 상황만 알려주시면 전문 작가가 진심을 담아 가장 적절한 문장으로 다듬어 드립니다." }
               ]).map((item: ContentItem, idx: number) => (
                 <FaqItem key={item.id || idx} q={item.title} a={item.text} isOpen={openFaq === idx} onClick={() => setOpenFaq(openFaq === idx ? null : idx)} />
               ))}
            </div>
         </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 text-center max-w-screen-md mx-auto space-y-12 pb-20">
         <h2 className="text-3xl md:text-5xl font-black text-charcoal tracking-tighter leading-tight">
            가장 진정성 있는 소통,<br />
            <span className="bg-gradient-to-r from-[#8B2E2E] via-[#A63A3A] to-[#631F1F] bg-clip-text text-transparent italic">Your Post</span>와 함께하세요.
         </h2>
         <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="flex flex-col gap-2">
               <button
                  type="button"
                  onClick={() => handleActionClick('proposal')}
                  className="bg-burgundy-500 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-burgundy-600 transition-all shadow-xl flex items-center justify-center gap-3"
               >
                  <Mail size={20} /> 제안서 제출하기
               </button>
               <span className="text-xs text-gray-400 font-bold">
                  {adminState.cta?.homeProposal?.type === 'email'
                     ? adminState.cta.homeProposal.value
                     : '온라인 양식 제출'}
               </span>
            </div>
            <div className="flex flex-col gap-2">
               <button
                  type="button"
                  onClick={() => handleActionClick('inquiry')}
                  className="bg-white border border-charcoal text-charcoal px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all shadow-md flex items-center justify-center gap-3"
               >
                  <HelpCircle size={20} /> 1:1 온라인 문의
               </button>
               <span className="text-xs text-gray-400 font-bold">
                  {adminState.cta?.homeInquiry?.type === 'email'
                     ? adminState.cta.homeInquiry.value
                     : '온라인 양식 연결'}
               </span>
            </div>
         </div>
      </section>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const ValueCard = memo(function ValueCard({ icon, title, desc }: ValueCardProps) {
  return (
    <div className="card-emotional text-center space-y-6 group hover:border-burgundy-500/20">
       <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-burgundy-50/50 rounded-3xl flex items-center justify-center text-burgundy-500 group-hover:bg-burgundy-500 group-hover:text-white transition-all duration-500 backdrop-blur-sm border border-burgundy-100/50 group-hover:border-burgundy-500">
          {icon}
       </div>
       <h4 className="text-xl md:text-2xl font-semibold text-[#1D1D1F] tracking-[-0.011em]">{title}</h4>
       <p className="text-base md:text-lg text-[#6E6E73] leading-relaxed break-keep tracking-[-0.006em]">{desc}</p>
    </div>
  );
});

function CheckItem({ text }: { text: string }) {
   return (
      <div className="flex items-center gap-3">
         <div className="w-5 h-5 rounded-full bg-burgundy-100 flex items-center justify-center text-burgundy-600">
            <CheckCircle size={12} strokeWidth={3} />
         </div>
         <span className="text-gray-700 font-medium">{text}</span>
      </div>
   )
}

interface ReviewCardProps {
  text: string;
  author: string;
  tag: string;
}

const ReviewCard = memo(function ReviewCard({ text, author, tag }: ReviewCardProps) {
   return (
      <div className="bg-white/60 backdrop-blur-xl p-10 md:p-12 rounded-3xl border border-[rgba(0,0,0,0.06)] shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 space-y-6">
         <Quote size={36} className="text-burgundy-500 opacity-30" />
         <p className="text-lg md:text-xl text-[#6E6E73] leading-loose font-normal break-keep tracking-[-0.008em]">
            "{text}"
         </p>
         <div className="pt-6 border-t border-[rgba(0,0,0,0.06)] flex justify-between items-center">
            <span className="text-base font-semibold text-[#1D1D1F] tracking-[-0.006em]">{author}</span>
            <span className="px-4 py-2 bg-burgundy-50/60 text-burgundy-600 text-xs font-medium rounded-full tracking-wide backdrop-blur-sm">{tag}</span>
         </div>
      </div>
   )
});

interface FaqItemProps {
  q: string;
  a?: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem = memo(function FaqItem({ q, a, isOpen, onClick }: FaqItemProps) {
   return (
      <div className="border-b border-[rgba(0,0,0,0.06)] pb-8 last:border-0 last:pb-0 cursor-pointer group text-left" onClick={onClick}>
         <div className="flex justify-between items-start gap-4 mb-4">
            <h4 className={`text-lg md:text-xl font-semibold flex items-start gap-3 transition-colors tracking-[-0.008em] ${isOpen ? 'text-burgundy-500' : 'text-[#1D1D1F] group-hover:text-burgundy-500'}`}>
               <span className="text-burgundy-500 shrink-0 mt-0.5 font-bold">Q.</span>
               {q}
            </h4>
            {isOpen ? <ChevronUp size={22} className="text-burgundy-500 shrink-0 mt-1" /> : <ChevronDown size={22} className="text-[#86868B] group-hover:text-burgundy-500 shrink-0 mt-1" />}
         </div>
         <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-[#6E6E73] leading-loose pl-8 text-base md:text-lg break-keep bg-white/40 backdrop-blur-sm p-6 rounded-2xl tracking-[-0.006em] border border-[rgba(0,0,0,0.04)]">{a}</p>
         </div>
      </div>
   )
});