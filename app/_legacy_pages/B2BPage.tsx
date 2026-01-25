
import React from 'react';
import { Building2, CheckCircle, ArrowRight, BarChart3, PieChart, Zap, ShieldCheck, Package } from 'lucide-react';

export default function B2BPage({ adminState, contentData }: any) {
  // adminState 안전하게 참조
  const b2b = adminState?.prices?.b2b || { email: 'biz@yourpost.co.kr' };
  
  return (
    <div className="animate-reveal bg-[#F8F9FA] pb-40">
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-screen-lg mx-auto space-y-8 pt-20">
        <div className="tag-pill">
          <Building2 size={14}/> Enterprise Emotional Solution
        </div>
        <h1 className="heading-hero break-keep">
          기업의 가치를<br />
          <span className="bg-gradient-to-r from-[#8B2E2E] via-[#A63A3A] to-[#631F1F] bg-clip-text text-transparent">물리적으로.</span>
        </h1>
        <p className="text-body-large max-w-2xl mx-auto break-keep">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <B2BCard icon={<Zap/>} title="크리에이터 리워드" desc="구독자들을 위한 한정판 엽서와 레터를 정교한 시스템으로 제작하고 배송합니다." />
           <B2BCard icon={<PieChart/>} title="크리에이터 서비스" desc="유어포스트의 철저한 분석을 통해 크리에이터에게 필요한 서비스를 제공합니다." />
           <B2BCard icon={<ShieldCheck/>} title="안정성" desc="민감한 개인 정보를 포함한 우편물도 보안을 유지하여 제작됩니다." />
           <B2BCard icon={<Package/>} title="브랜드 키트 패키징" desc="신규 회원이나 우수 파트너를 위한 하이엔드 지류 키트를 설계하고 전달합니다." />
           <B2BCard icon={<Building2/>} title="임직원 복지 케어" desc="사내 문화 정착을 위해 임직원의 경조사나 특별한 날에 다정한 편지를 전하세요." />
           <B2BCard icon={<BarChart3/>} title="통계및 사후관리" desc="서비스 진행이후 통계 및 사후 관리를 제공합니다." />
        </div>

        <section className="bg-charcoal text-white rounded-[32px] p-10 md:p-16 overflow-hidden relative shadow-xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-10">
                 <h3 className="heading-hero text-white">
                    진심을 전하는<br />기업의 가장 따뜻한 방법.
                 </h3>
                 <p className="text-gray-300 font-normal text-lg leading-relaxed break-keep">
                    유어포스트는 단순한 전달을 넘어 기업의 철학을 종이의 질감으로 구현합니다.<br />
                    고객의 우편함에 도착하는 한 통의 편지는 어떤 디지털 광고보다 강력한 브랜드 경험이 됩니다.
                 </p>
                 <div className="space-y-6">
                    <FeatureItem label="전문적이고 체계적인 품질 관리" />
                    <FeatureItem label="진심을 전하는 기업의 가장 따뜻한 방법" />
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
    <div className="card-emotional space-y-6 group p-8 rounded-[32px]">
       <div className="w-14 h-14 bg-burgundy-100 text-burgundy-600 rounded-2xl flex items-center justify-center group-hover:bg-burgundy-500 group-hover:text-white transition-all duration-500">
          {icon}
       </div>
       <div className="space-y-3">
          <h4 className="heading-title">{title}</h4>
          <p className="text-body-medium break-keep">{desc}</p>
       </div>
    </div>
  );
}
