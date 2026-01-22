
import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-screen-md mx-auto px-6 py-32 space-y-12 animate-reveal">
      <h1 className="text-4xl font-black tracking-tighter">이용약관</h1>
      <div className="text-sm text-gray-600 leading-loose space-y-8 font-medium">
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제 1 조 (목적)</h3>
          <p>이 약관은 유어포스트가 운영하는 웹사이트에서 제공하는 인터넷 관련 서비스 및 우편 제작/배송 서비스를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
        </section>
        
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제 2 조 (정의)</h3>
          <p>1. "유어포스트"란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 설정한 가상의 영업장을 말합니다.</p>
          <p>2. "이용자"란 유어포스트에 접속하여 이 약관에 따라 서비스를 받는 회원 및 비회원을 말합니다.</p>
        </section>
      </div>
    </div>
  );
}
