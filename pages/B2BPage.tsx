
import React from 'react';
import { Building2, CheckCircle, ArrowRight, BarChart3, PieChart, Zap, ShieldCheck, Package } from 'lucide-react';

export default function B2BPage({ adminState, contentData }: any) {
  // adminState 안전하게 참조
  const b2b = adminState?.prices?.b2b || { email: 'biz@yourpost.co.kr' };
  
  return (
    <div className="animate-reveal bg-[#F8F9FA] pb-40">
      <section className="hero-spacing px-6 text-center max-w-screen-lg mx-auto space-y-8">
        <div className="tag-pill">
          <Building2 size={14}/> Enterprise Emotional Solution
        </div>
        <h1 className="heading-hero">
          기업의 가치를<br />
          <span className="bg-gradient-to-r from-[#8B2E2E] via-[#A63A3A] to-[#631F1F] bg-clip-text text-transparent">물리적으로.</span>
        </h1>
        <p className="text-body-large max-w-2xl mx-auto">
          유어포스트 B2B 솔루션은 기업용 맞춤 편지, 크리에이터 제휴,<br />
          구독자 리워드 프로그램 등 다양한 감성 소통 솔루션을 제공합니다.
        </p>
        <div className="pt-4 flex justify-center gap-4">
           <a href={`mailto:${b2b.email}`} className="btn-emotional-primary text-lg shadow-xl">
             비즈니스 도입 문의하기
           </a>
        </div>
      </section>

      <div className="layout-container space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <B2BCard icon={<Zap/>} title="크리에이터 리워드" desc="구독자들을 위한 한정판 엽서와 레터를 정교한 시스템으로 제작하고 배송합니다." />
           <B2BCard icon={<PieChart/>} title="데이터 기반 캠페인" desc="CRM 데이터와 연동하여 고객의 특별한 기념일에 자동으로 실물 우편을 발송합니다." />
           <B2BCard icon={<ShieldCheck/>} title="보안성 제작 프로세스" desc="민감한 개인 정보를 포함한 우편물도 철저한 보안 시설에서 제작됩니다." />
           <B2BCard icon={<Package/>} title="브랜드 키트 패키징" desc="신규 회원이나 우수 파트너를 위한 하이엔드 지류 키트를 설계하고 전달합니다." />
           <B2BCard icon={<Building2/>} title="임직원 복지 케어" desc="사내 문화 정착을 위해 임직원의 경조사나 특별한 날에 다정한 편지를 전하세요." />
           <B2BCard icon={<BarChart3/>} title="발송 통합 관리" desc="대량 발송의 모든 프로세스를 실시간으로 확인할 수 있는 매니지먼트 패널을 제공합니다." />
        </div>

        <section className="bg-charcoal text-white rounded-[48px] p-12 md:p-24 overflow-hidden relative shadow-2xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-10">
                 <h3 className="heading-hero text-white">
                    진심을 전하는<br />기업의 가장 따뜻한 방법.
                 </h3>
                 <p className="text-gray-300 font-normal text-lg leading-relaxed">
                    유어포스트는 단순한 전달을 넘어 기업의 철학을 종이의 질감으로 구현합니다.<br />
                    고객의 우편함에 도착하는 한 통의 편지는 어떤 디지털 광고보다 강력한 브랜드 경험이 됩니다.
                 </p>
                 <div className="space-y-6">
                    <FeatureItem label="3인 공동 창업 체제의 전문적인 품질 관리" />
                    <FeatureItem label="2025년 설립된 최신 자동화 시스템" />
                    <FeatureItem label="독보적인 아날로그 감성 큐레이션" />
                 </div>
              </div>
              <div className="bg-white/5 rounded-[48px] p-16 border border-white/10 flex items-center justify-center">
                 <Building2 className="text-burgundy-500" size={160} />
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}

function FeatureItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-body-medium text-gray-300 font-bold">
      <div className="w-5 h-5 bg-burgundy-500 rounded-full flex items-center justify-center">
        <CheckCircle size={12} className="text-white" />
      </div>
      {label}
    </div>
  );
}

function B2BCard({ icon, title, desc }: any) {
  return (
    <div className="card-emotional space-y-6 group">
       <div className="w-16 h-16 bg-burgundy-100 text-burgundy-600 rounded-3xl flex items-center justify-center group-hover:bg-burgundy-500 group-hover:text-white transition-all duration-500">
          {icon}
       </div>
       <div className="space-y-3">
          <h4 className="heading-title">{title}</h4>
          <p className="text-body-medium">{desc}</p>
       </div>
    </div>
  );
}
