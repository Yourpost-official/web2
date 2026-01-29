'use client';

import React from 'react';
import { Building2, Mail, Zap, Shield, Package, Users, BarChart3 } from 'lucide-react';
import { AdminState } from '@/types/admin';

interface B2BContentProps {
  adminState: AdminState;
}

export default function B2BContent({ adminState }: B2BContentProps) {
  const b2b = adminState?.prices?.b2b || { email: 'biz@yourpost.co.kr' };

  return (
    <div className="bg-paper">

      {/* Hero */}
      <section className="min-h-[80vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cream" />
        <div className="absolute top-32 right-10 w-96 h-96 bg-[var(--burgundy-bg)] rounded-full blur-3xl opacity-30" />

        <div className="layout-container relative z-10 py-20">
          <div className="max-w-[600px] mx-auto text-center">
            <div className="label label-burgundy mx-auto w-fit mb-8">
              <Building2 size={16} />
              기업 솔루션
            </div>

            <h1 className="text-display word-keep mb-6">
              기업의 진심을<br />
              <span className="text-burgundy">편지로 전하세요</span>
            </h1>

            <p className="text-body-lg word-keep mb-10">
              고객, 파트너, 임직원에게 특별한 감동을.<br />
              유어포스트 B2B 솔루션이 도와드려요.
            </p>

            <a
              href={`mailto:${b2b.email}`}
              className="btn btn-lg btn-primary"
            >
              <Mail size={20} />
              비즈니스 문의하기
            </a>
          </div>
        </div>
      </section>

      {/* 서비스 */}
      <section className="section bg-cream">
        <div className="layout-container">
          <div className="text-center mb-16">
            <span className="text-overline mb-4 block">Services</span>
            <h2 className="text-title">기업을 위한 서비스</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[960px] mx-auto">
            <ServiceCard
              icon={<Zap size={24} />}
              title="크리에이터 리워드"
              desc="구독자용 한정판 엽서와 레터 제작"
            />
            <ServiceCard
              icon={<Package size={24} />}
              title="브랜드 키트"
              desc="신규 회원/파트너용 지류 키트 설계"
            />
            <ServiceCard
              icon={<Users size={24} />}
              title="임직원 복지"
              desc="경조사, 기념일 편지 서비스"
            />
            <ServiceCard
              icon={<Shield size={24} />}
              title="보안 관리"
              desc="민감 정보 철저 보안 처리"
            />
            <ServiceCard
              icon={<BarChart3 size={24} />}
              title="통계 리포트"
              desc="발송 현황 및 효과 분석"
            />
            <ServiceCard
              icon={<Mail size={24} />}
              title="대량 발송"
              desc="맞춤형 대량 편지 발송"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-burgundy-soft">
        <div className="layout-container max-w-[480px]">
          <div className="card-elevated text-center">
            <h3 className="text-subtitle mb-4">문의하기</h3>
            <p className="text-body mb-6">
              기업 맞춤 솔루션을 제안해 드려요.<br />
              담당자가 빠르게 연락드릴게요.
            </p>
            <a
              href={`mailto:${b2b.email}`}
              className="btn btn-lg btn-primary w-full"
            >
              <Mail size={18} />
              {b2b.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="card">
      <div className="icon-box mb-4">
        {icon}
      </div>
      <h3 className="text-[17px] font-bold text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-body text-[14px]">{desc}</p>
    </div>
  );
}
