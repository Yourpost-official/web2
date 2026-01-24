import React from 'react';
import { Heart, PenTool, Clock, ArrowRight, Feather, Users, Smile } from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
  adminState?: any;
}

export default function AboutPage({ navigate }: AboutPageProps) {
  return (
    <div className="animate-reveal pb-40">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-screen-lg mx-auto space-y-8 pt-20">
        <div className="tag-pill">
          <Feather size={14}/> Our Story
        </div>
        <h1 className="heading-hero break-keep">
          진심은 결코<br />
          <span className="text-burgundy-gradient">사라지지 않습니다.</span>
        </h1>
        <p className="text-body-large max-w-2xl mx-auto text-gray-600 break-keep">
          우리는 디지털의 속도에 지친 사람들에게<br />
          아날로그의 온기를 다시 전합니다.
        </p>
      </section>

      {/* Mission Section (Readability Focused) */}
      <section className="layout-container py-12 md:py-16">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-6 border-l-4 border-[#8B2E2E] pl-8 py-2">
            <h3 className="text-2xl font-bold text-[#2D2D2D]">우리의 미션</h3>
            <p className="text-emotional-p">
              빠르게 전송되고 쉽게 잊혀지는 메시지들 속에서, 우리는 '남겨지는 것'의 가치를 고민했습니다. 
              손으로 만져지는 종이의 질감, 우표를 붙이는 정성, 그리고 우편함에서 편지를 발견했을 때의 설렘. 
              이 모든 과정이 당신의 마음을 더 깊이 있게 만들어준다고 믿습니다.
            </p>
          </div>
          
          <div className="space-y-6">
            <p className="text-emotional-p">
              유어포스트는 단순한 우편 발송 대행 서비스가 아닙니다. 
              우리는 당신의 서툰 진심이 오해 없이 닿을 수 있도록 돕는 <strong>감정의 전달자</strong>입니다. 
              한 글자 한 글자 눌러 담은 당신의 마음이 온전히 상대방에게 닿을 때까지, 
              우리는 가장 조용하고 정중한 방법으로 함께하겠습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="layout-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValueCard 
            icon={<Clock size={28} />}
            title="기다림의 미학"
            desc="즉각적인 반응보다, 기다림 끝에 오는 깊은 울림을 소중히 여깁니다."
          />
          <ValueCard 
            icon={<PenTool size={28} />}
            title="정제된 언어"
            desc="가벼운 말보다는, 여러 번 고쳐 쓴 정제된 글의 힘을 믿습니다."
          />
          <ValueCard 
            icon={<Heart size={28} />}
            title="진심의 전달"
            desc="형식적인 안부가 아닌, 사람의 온기가 담긴 진심만을 전합니다."
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="layout-container py-12 md:py-16 border-t border-gray-100">
        <div className="text-center mb-16 space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold tracking-widest rounded-full uppercase">
              <Users size={12}/> Team
           </div>
           <h2 className="heading-title">마음을 만드는 사람들</h2>
           <p className="text-body-medium max-w-2xl mx-auto">
             우리는 기술보다 감성을, 속도보다 깊이를 사랑하는 사람들입니다.<br/>
             당신의 이야기가 가장 아름답게 전달되도록 고민합니다.
           </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <TeamMember 
             name="윤세연" role="Co-Founder & CEO" 
             desc="지속가능한 고객 경험을 위해 고민합니다." 
           />
           <TeamMember 
             name="성두현" role="Co-founder & CS" 
             desc="고객의 마음을 최우선으로 생각합니다." 
           />
           <TeamMember 
             name="조선형" role="Co-founder & Design" 
             desc="고객의 마음을 디자인으로 전합니다." 
           />
           <TeamMember 
             name="박현택" role="Marketing & IP" 
             desc="서비스의 지속가능성을 위해 노력합니다" 
           />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-20 layout-container">
        <div className="bg-[#F5F0EB] rounded-[24px] md:rounded-[32px] p-8 md:p-16 text-center space-y-8 border border-[#E8E0D5]">
          <h2 className="heading-title">당신의 이야기도<br/>누군가에게 힘이 될 수 있습니다.</h2>
          <p className="text-body-medium text-gray-600">
            지금, 마음속에 담아둔 말이 있다면<br/>
            유어포스트를 통해 전해보세요.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button onClick={() => navigate('collab')} className="btn-emotional-primary shadow-lg shadow-burgundy-500/20">
              협업 알아보기
            </button>
            <button onClick={() => navigate('heartsend')} className="btn-emotional bg-white text-[#2D2D2D] border border-gray-200 hover:bg-gray-50">
              하트센드 둘러보기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
      <div className="w-12 h-12 bg-[#FCF9F5] text-[#8B2E2E] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#8B2E2E] group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  );
}

function TeamMember({ name, role, desc }: { name: string, role: string, desc: string }) {
  return (
    <div className="text-center space-y-4 group">
      <div className="aspect-[3/4] bg-gray-100 rounded-[24px] mb-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gray-200 group-hover:bg-burgundy-100 transition-colors duration-500 flex items-center justify-center text-gray-400 group-hover:text-burgundy-500">
           <Smile size={48} strokeWidth={1.5} />
        </div>
      </div>
      <div className="space-y-1">
        <h4 className="text-lg font-bold text-[#2D2D2D]">{name}</h4>
        <p className="text-xs font-bold text-burgundy-500 uppercase tracking-widest">{role}</p>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed word-keep">
        "{desc}"
      </p>
    </div>
  );
}