
import React from 'react';

export default function EmailPolicy() {
  return (
    <div className="max-w-screen-md mx-auto px-6 py-32 md:py-40 space-y-12 animate-reveal">
      <h1 className="text-4xl font-black tracking-tighter">이메일 무단수집거부</h1>
      <div className="text-sm text-gray-600 leading-loose space-y-8 font-medium">
        <p>본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 이를 위반 시 정보통신망법에 의해 형사 처벌됨을 유념하시기 바랍니다.</p>
        
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">정보통신망 이용촉진 및 정보보호 등에 관한 법률</h3>
          <p>제50조의 2 (전자우편주소의 무단 수집행위 등 금지)</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>누구든지 인터넷 홈페이지 운영자 또는 관리자의 사전 동의 없이 인터넷 홈페이지에서 자동으로 전자우편주소를 수집하는 프로그램 그 밖의 기술적 장치를 이용하여 전자우편주소를 수집하여서는 아니 된다.</li>
            <li>누구든지 제1항의 규정을 위반하여 수집된 전자우편주소임을 알면서 이를 판매·유통하여서는 아니 된다.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
