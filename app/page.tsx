
'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePageContent from '@/pages/HomePage';

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home');
  
  // 기본 관리자 상태 Mock (Next.js 직접 접근 시 에러 방지)
  const defaultAdminState = {
    cta: {
      mainContactEmail: "biz@yourpost.co.kr",
      additionalInquiryLink: "https://tally.so/r/mR7bLp"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header navigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow">
        {currentPage === 'home' && <HomePageContent navigate={setCurrentPage} adminState={defaultAdminState} />}
        {/* 추가 페이지 필요 시 이곳에 분기 처리 */}
      </main>
      <Footer navigate={setCurrentPage} adminState={defaultAdminState} />
    </div>
  );
}
