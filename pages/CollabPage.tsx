
import React from 'react';
import { Handshake, Palette, Layout, UserCheck, Send, ArrowRight, Users } from 'lucide-react';

interface CollabPageProps {
  navigate?: (path: string) => void;
  adminState?: any;
}

export default function CollabPage({ navigate = () => {}, adminState }: CollabPageProps) {
  // adminState 및 cta 안전하게 참조 (에러 방지)
  const cta = adminState?.cta || { mainContactEmail: "biz@yourpost.co.kr" };

  return (
    <div className="animate-reveal bg-[#FCF9F5] pb-40">
      {/* SECTION 1: HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-screen-lg mx-auto space-y-8 pt-20">
        <div className="tag-pill">
          <Users size={14}/> With You
        </div>
        <h1 className="heading-hero break-keep">
          우리가 함께<br />
          <span className="bg-gradient-to-r from-[#8B2E2E] to-[#C05555] bg-clip-text text-transparent">그려갈 이야기.</span>
        </h1>
        <p className="text-body-large max-w-2xl mx-auto break-keep">
          당신의 감성이 누군가의 위로가 될 수 있도록.<br />
          유어포스트가 당신의 이야기와 함께하겠습니다.
        </p>
      </section>

      <div className="layout-container space-y-24">
         {/* SECTION 2: FIELDS */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CollabField 
              icon={<Palette/>} 
              title="작가 & 일러스트레이터" 
              desc="당신의 그림이 누군가의 하루가 됩니다." 
            />
            <CollabField 
              icon={<Layout/>} 
              title="브랜드 협업 & 크리에이터" 
              desc="브랜드의 가치를 손끝으로 전합니다." 
            />
            <CollabField 
              icon={<UserCheck/>} 
              title="이벤트 파트너" 
              desc="마음을 움직이는 경험을 함께 기획합니다." 
            />
         </div>

         {/* SECTION 3: PROCESS */}
         <section className="py-16 px-6 bg-white rounded-[32px] border border-gray-100 text-center space-y-10 shadow-sm max-w-4xl mx-auto">
            <h2 className="heading-section">함께하는 과정</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <ProcessStep num="01" title="협업 문의" />
              <ProcessStep num="02" title="세부사항 논의" />
              <ProcessStep num="03" title="샘플 기획" />
              <ProcessStep num="04" title="협업 진행" />
            </div>
            
            {/* SECTION 4: FINAL CTA */}
            <div className="pt-10">
              <a 
                href={`mailto:${cta.mainContactEmail}`} 
                className="btn-emotional-dark"
              >
                 함께하기 <Send size={18}/>
              </a>
              <p className="mt-6 text-xs text-gray-400 font-normal">보내주신 제안은 꼼꼼히 읽어보고 연락드리겠습니다.</p>
            </div>
         </section>
      </div>
    </div>
  );
}

interface CollabFieldProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function CollabField({ icon, title, desc }: CollabFieldProps) {
   return (
      <div className="space-y-6 text-center group">
         <div className="w-16 h-16 bg-white text-burgundy-500 rounded-[24px] flex items-center justify-center mx-auto shadow-sm group-hover:bg-burgundy-500 group-hover:text-white transition-all duration-500">
            {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { size: 36 })}
         </div>
         <div className="space-y-3 px-6">
            <h4 className="heading-title">{title}</h4>
            <p className="text-body-medium break-keep">{desc}</p>
         </div>
      </div>
   )
}

function ProcessStep({ num, title }: { num: string; title: string }) {
  return (
    <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-gray-50 flex flex-col items-center gap-3 group hover:bg-burgundy-100 transition-colors">
       <span className="text-burgundy-500 font-bold text-lg group-hover:scale-110 transition-transform">{num}</span>
       <span className="text-body-medium font-bold">{title}</span>
    </div>
  );
}
