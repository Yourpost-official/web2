'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoImg from '../app/images/YourPost Logo.png';
import { AdminState } from '@/types/admin';

interface FooterProps {
  adminState: AdminState;
}

export default function Footer({ adminState }: FooterProps) {
  const cta = adminState?.cta || { additionalInquiryLink: "#" };
  const footerContactConfig = adminState?.cta?.footerContact ?? { type: 'link', value: cta.additionalInquiryLink || '#' };
  const footerContactHref = footerContactConfig.type === 'email'
    ? `mailto:${footerContactConfig.value}`
    : footerContactConfig.value;

  return (
    <footer className="bg-[#2D2620] text-white/90">
      {/* 상단 CTA 영역 */}
      <div className="border-b border-white/10">
        <div className="max-w-[1140px] mx-auto px-5 md:px-10 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[13px] text-white/50 mb-1">마음을 전하고 싶다면</p>
              <h3 className="text-[20px] md:text-[24px] font-bold">지금 시작해보세요</h3>
            </div>
            <div className="flex gap-3">
              <Link href="/ondaypost" className="px-6 py-3 bg-[#8B2E2E] text-white text-[14px] font-semibold rounded-lg hover:bg-[#A04040] transition-colors">
                하루편지 구독
              </Link>
              <Link href="/heartsend" className="px-6 py-3 bg-white/10 text-white text-[14px] font-semibold rounded-lg hover:bg-white/20 transition-colors">
                하트센드 신청
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 푸터 */}
      <div className="max-w-[1140px] mx-auto px-5 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">

          {/* 브랜드 */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-7 h-7">
                <Image
                  src={logoImg}
                  alt="YourPost"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="text-[18px] font-bold tracking-tight">YOURPOST</span>
            </div>
            <p className="text-[14px] text-white/60 leading-relaxed mb-6 max-w-[280px]">
              마음과 마음 사이,<br />
              진심을 전하는 가장 정중한 방법
            </p>
            <div className="space-y-1 text-[12px] text-white/40">
              <p>상호: 유어포스트 | 대표: 윤세연</p>
              <p>사업자등록번호: 414-01-72641</p>
              <p>이메일: contact@yourpost.co.kr</p>
            </div>
          </div>

          {/* 서비스 */}
          <div>
            <h4 className="text-[12px] font-bold text-white/40 uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/ondaypost" className="text-[14px] text-white/70 hover:text-white transition-colors">하루편지</Link></li>
              <li><Link href="/heartsend" className="text-[14px] text-white/70 hover:text-white transition-colors">하트센드</Link></li>
              <li><Link href="/b2b" className="text-[14px] text-white/70 hover:text-white transition-colors">B2B 솔루션</Link></li>
              <li><Link href="/event" className="text-[14px] text-white/70 hover:text-white transition-colors">이벤트</Link></li>
            </ul>
          </div>

          {/* 회사 */}
          <div>
            <h4 className="text-[12px] font-bold text-white/40 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-[14px] text-white/70 hover:text-white transition-colors">회사 소개</Link></li>
              <li><Link href="/press" className="text-[14px] text-white/70 hover:text-white transition-colors">뉴스룸</Link></li>
              <li><Link href="/careers" className="text-[14px] text-white/70 hover:text-white transition-colors">채용</Link></li>
              <li><Link href="/investor" className="text-[14px] text-white/70 hover:text-white transition-colors">IR</Link></li>
              <li>
                <a href={footerContactHref} target="_blank" rel="noopener noreferrer" className="text-[14px] text-white/70 hover:text-white transition-colors">
                  문의하기
                </a>
              </li>
            </ul>
          </div>

          {/* 법적 */}
          <div className="hidden lg:block">
            <h4 className="text-[12px] font-bold text-white/40 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-[14px] text-white/70 hover:text-white transition-colors">개인정보처리방침</Link></li>
              <li><Link href="/terms" className="text-[14px] text-white/70 hover:text-white transition-colors">이용약관</Link></li>
              <li><Link href="/email-policy" className="text-[14px] text-white/70 hover:text-white transition-colors">이메일정책</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* 하단 저작권 */}
      <div className="border-t border-white/10">
        <div className="max-w-[1140px] mx-auto px-5 md:px-10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white/40">
            <p>© 2025 YourPost. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hidden md:inline">Analog Mail Service</span>
              <div className="flex gap-4 lg:hidden">
                <Link href="/privacy" className="hover:text-white/70 transition-colors">개인정보처리방침</Link>
                <Link href="/terms" className="hover:text-white/70 transition-colors">이용약관</Link>
              </div>
              <Link href="/admin" className="opacity-50 hover:opacity-100 transition-opacity">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
