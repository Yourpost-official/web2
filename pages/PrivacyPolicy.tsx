
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-screen-md mx-auto px-6 py-32 space-y-12 animate-reveal">
      <h1 className="text-4xl font-black tracking-tighter">개인정보처리방침</h1>
      <div className="text-sm text-gray-600 leading-loose space-y-8 font-medium">
        <p>유어포스트('yourpost.co.kr')는 이용자의 개인정보를 중요시하며, "개인정보 보호법" 및 "정보통신망 이용촉진 및 정보보호 등에 관한 법률"을 준수하고 있습니다.</p>
        
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">1. 개인정보의 수집 항목 및 방법</h3>
          <p>회사는 서비스 신청 시 이름, 연락처, 배송지 주소 등의 정보를 수집하며, 웹사이트 이용 과정에서 IP, 브라우저 정보, 쿠키 등의 기록이 생성되어 수집될 수 있습니다.</p>
        </section>
        
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">2. 개인정보의 이용 목적</h3>
          <p>수집된 개인정보는 서비스 제공에 따른 요금정산, 물품 배송, 본인 확인, 불만 처리 및 고객 관리 등을 위해 사용됩니다.</p>
        </section>
        
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">3. 개인정보의 보유 및 이용기간</h3>
          <p>원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계 법령에 의해 보존할 필요가 있는 경우 일정 기간 보관합니다.</p>
        </section>
      </div>
    </div>
  );
}
