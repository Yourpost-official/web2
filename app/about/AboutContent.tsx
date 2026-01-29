'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Clock, Pen, ArrowRight } from 'lucide-react';

export default function AboutContent() {
  return (
    <div className="bg-paper">

      {/* Hero */}
      <section className="min-h-[70vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cream" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-[var(--burgundy-bg)] rounded-full blur-3xl opacity-40" />

        <div className="layout-container relative z-10 py-20">
          <div className="max-w-[600px] mx-auto text-center">
            <span className="text-overline mb-6 block">About Us</span>

            <h1 className="text-display word-keep mb-6">
              진심은<br />
              <span className="text-burgundy">사라지지 않아요</span>
            </h1>

            <p className="text-body-lg word-keep">
              디지털의 속도에 지친 사람들에게<br />
              아날로그의 온기를 다시 전해요.
            </p>
          </div>
        </div>
      </section>

      {/* 미션 */}
      <section className="section bg-cream">
        <div className="layout-container max-w-[700px]">
          <div className="card-elevated">
            <span className="text-overline mb-4 block">Our Mission</span>
            <h2 className="text-subtitle mb-6">우리의 미션</h2>
            <div className="space-y-5 text-body-lg">
              <p className="word-keep">
                빠르게 전송되고 쉽게 잊혀지는 메시지들 속에서,
                우리는 <strong className="text-[var(--burgundy)]">'남겨지는 것'</strong>의 가치를 고민했어요.
              </p>
              <p className="word-keep">
                유어포스트는 당신의 서툰 진심이 오해 없이 닿을 수 있도록 돕는
                <strong className="text-[var(--burgundy)]"> 감정의 전달자</strong>예요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 가치 */}
      <section className="section bg-gradient-warm">
        <div className="layout-container">
          <div className="text-center mb-16">
            <span className="text-overline mb-4 block">Our Values</span>
            <h2 className="text-title">우리가 소중히 여기는 것</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
            <ValueCard
              icon={<Clock size={24} />}
              title="기다림의 미학"
              desc="즉각적인 반응보다, 기다림 끝에 오는 깊은 울림을 소중히 여겨요"
            />
            <ValueCard
              icon={<Pen size={24} />}
              title="정제된 언어"
              desc="가벼운 말보다, 여러 번 고쳐 쓴 정제된 글의 힘을 믿어요"
            />
            <ValueCard
              icon={<Heart size={24} />}
              title="진심의 전달"
              desc="형식적인 안부가 아닌, 온기가 담긴 진심만을 전해요"
            />
          </div>
        </div>
      </section>

      {/* 팀 */}
      <section className="section bg-warm">
        <div className="layout-container">
          <div className="text-center mb-14">
            <span className="text-overline mb-4 block">Team</span>
            <h2 className="text-title">마음을 만드는 사람들</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[800px] mx-auto">
            <TeamCard name="윤세연" role="CEO" />
            <TeamCard name="성두현" role="CS" />
            <TeamCard name="조선형" role="Design" />
            <TeamCard name="박현택" role="Marketing" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-burgundy-soft">
        <div className="layout-container max-w-[540px] text-center">
          <h2 className="text-title mb-5 word-keep">
            당신의 이야기도<br />
            <span className="text-burgundy">누군가에게 힘이 될 수 있어요</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/heartsend" className="btn btn-lg btn-primary">
              하트센드 알아보기
            </Link>
            <Link href="/collab" className="btn btn-lg btn-secondary">
              협업 문의
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="card text-center">
      <div className="icon-box mx-auto mb-5">
        {icon}
      </div>
      <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-3">{title}</h3>
      <p className="text-body word-keep">{desc}</p>
    </div>
  );
}

function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="text-center">
      <div className="aspect-square bg-[var(--border)] rounded-2xl flex items-center justify-center mb-4">
        <span className="text-[32px] font-bold text-[var(--text-light)]">{name[0]}</span>
      </div>
      <h4 className="text-[16px] font-bold text-[var(--text-primary)]">{name}</h4>
      <p className="text-[12px] font-bold text-[var(--burgundy)] uppercase tracking-wide">{role}</p>
    </div>
  );
}
