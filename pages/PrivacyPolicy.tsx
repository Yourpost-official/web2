
import React from 'react';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-screen-md mx-auto px-6 py-32 md:py-40 space-y-12 animate-reveal">
      <Analytics />
      <SpeedInsights />
      <h1 className="text-4xl font-black tracking-tighter">개인정보처리방침</h1>
      <div className="text-sm text-gray-600 leading-loose space-y-8 font-medium break-keep">
        
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제1조 (수집항목)</h3>
          <p>회사는 다음의 개인정보를 수집할 수 있다.</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>회원가입 및 본인확인: 이름, 생년월일, 성별, 이메일, 휴대전화번호, 주소, 비밀번호, 본인확인정보(CI, DI 등)</li>
            <li>서비스이용 및 결제관리: 결제정보(카드번호, 은행계좌정보, 거래내역), 접속로그, IP정보, 쿠키, 단말기식별번호</li>
            <li>고객지원 및 환불처리: 계좌번호, 예금주명, 본인확인서류 사본(선택)</li>
            <li>마케팅·이벤트: SNS계정, 선호정보, 구매이력, 연락처(별도 동의)</li>
          </ol>
        </section>
        
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제2조 (수집 및 이용목적)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>회원관리 및 본인확인</li>
            <li>정기구독서비스 제공 및 우편물 배송</li>
            <li>결제·정산·환불·세금계산서 등 법령상 의무이행</li>
            <li>고객상담 및 분쟁처리</li>
            <li>서비스 개선 및 맞춤형 콘텐츠 제공</li>
            <li>이용자의 사전 동의에 따른 마케팅·프로모션 안내</li>
          </ol>
        </section>
        
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제3조 (보유 및 이용기간)</h3>
          <p>회사는 목적 달성 후 지체 없이 파기한다.</p>
          <p>다만 다음의 항목은 관련 법령에 따라 보관한다.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200 mt-4 text-xs md:text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 p-3 font-bold">구분</th>
                  <th className="border border-gray-200 p-3 font-bold">항목</th>
                  <th className="border border-gray-200 p-3 font-bold">보존근거</th>
                  <th className="border border-gray-200 p-3 font-bold">보존기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-3">계약·청약철회 관련 기록</td>
                  <td className="border border-gray-200 p-3">이름·주소·결제정보 등</td>
                  <td className="border border-gray-200 p-3">전자상거래법 제6조</td>
                  <td className="border border-gray-200 p-3">5년</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3">대금결제 및 재화공급 기록</td>
                  <td className="border border-gray-200 p-3">거래내역 등</td>
                  <td className="border border-gray-200 p-3">전자상거래법 제6조</td>
                  <td className="border border-gray-200 p-3">5년</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3">소비자 불만·분쟁처리 기록</td>
                  <td className="border border-gray-200 p-3">상담내역 등</td>
                  <td className="border border-gray-200 p-3">전자상거래법 제6조</td>
                  <td className="border border-gray-200 p-3">3년</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3">웹사이트 접속기록</td>
                  <td className="border border-gray-200 p-3">IP·로그 등</td>
                  <td className="border border-gray-200 p-3">통신비밀보호법 제15조</td>
                  <td className="border border-gray-200 p-3">9개월</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3">회원식별정보(CI·DI 등)</td>
                  <td className="border border-gray-200 p-3">부정이용 방지 목적</td>
                  <td className="border border-gray-200 p-3">개인정보보호법 제15조</td>
                  <td className="border border-gray-200 p-3">회원탈퇴 후 3년</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3">마케팅 목적 정보(별도 동의)</td>
                  <td className="border border-gray-200 p-3">이벤트·재가입 유도 목적</td>
                  <td className="border border-gray-200 p-3">정보통신망법 제29조</td>
                  <td className="border border-gray-200 p-3">동의일로부터 최대 5년</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제4조 (제3자 제공 및 위탁)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>회사는 이용자의 동의 없이 제3자에게 개인정보를 제공하지 않는다.</li>
            <li>다만 서비스 제공을 위해 아래와 같이 제3자에게 제공한다.
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>가. 제공받는 자: 우정사업본부(우체국), 배송대행업체
                  <ul className="list-[circle] pl-5 mt-1 space-y-1">
                    <li>제공항목: 성명, 주소, 연락처, 주문번호, 배송상태 정보</li>
                    <li>제공목적: 우편물 발송 및 배송관리</li>
                    <li>제공기간: 발송 완료 후 고객응대 처리 종료 시까지이다.</li>
                  </ul>
                </li>
                <li>나. 고객관리 및 마케팅 목적 시(별도 동의) 제공받는 자: 마케팅대행 업체
                  <ul className="list-[circle] pl-5 mt-1 space-y-1">
                    <li>제공항목: 이메일, 연락처, 구매이력, 선호정보</li>
                    <li>제공목적: 이벤트 안내, 리워드 제공, 신규서비스 안내</li>
                    <li>제공기간: 동의일로부터 최대 5년이다.</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>회사는 위탁계약 시 개인정보보호법에 따른 안전관리조치를 포함한다.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제5조 (권리 및 행사방법)</h3>
          <p>이용자 및 법정대리인은 언제든지 개인정보 열람·정정·삭제·처리정지 등을 요구할 수 있다.</p>
          <p>요구가 있는 경우 회사는 지체 없이 조치하며, 지체 사유가 있을 경우 그 이유 및 처리예정일을 알린다.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제6조 (안전성 확보조치 및 면책)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>회사는 개인정보보호법 제29조에 따라 다음과 같은 안전관리조치를 시행한다.
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>가. 개인정보 취급자 최소화 및 접근권한 관리</li>
                <li>나. 내부관리계획 수립 및 시행</li>
                <li>다. 접속기록 보관 및 주기적 점검</li>
              </ul>
            </li>
            <li>회사는 해킹, 침입, 바이러스, 통신망 장애 등의 외부사고로 인한 개인정보 유출에 관하여 <strong>고의 또는 중대한 과실이 없는 한 책임을 지지 않는다.</strong></li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제7조 (개인정보 자동 수집 장치의 설치,운영 거부에 관한사항)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>회사는 이용자에게 개별적 맞춤 서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다</li>
            <li>쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에 보내는 소량의 정보이며 이용자들의 PC 또는 모바일에 저장됩니다.</li>
            <li>정보주체는 웹 브라우저 옵션 설정을 통해 쿠키 허용, 차단 등의 설정을 할 수 있습니다. 다만, 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제8조 (만 14세 미만의 회원가입 제한)</h3>
          <p>회사는 만 14세 미만 아동의 개인정보를 수집하지 않는다.</p>
          <p>회원가입 시 나이 확인절차를 거치며, 위반 시 탈퇴조치한다.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제9조 (개인정보 보호책임자 및 연락처)</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>개인정보보호책임자:</li>
            <li>이메일: admin@yourpost.co.kr</li>
            <li>전화번호: -</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제11조 (약관의 변경 및 공지)</h3>
          <p>회사는 법령에 따라 본 방침을 변경할 수 있으며, 변경 시 시행일 및 개정사유를 명시하여 인터넷 사이트에 게시한다.</p>
          <p>본 방침 변경 후 이용자가 서비스 이용을 계속하는 경우 변경에 동의한 것으로 본다.</p>
        </section>

        <section className="space-y-4 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-charcoal">부칙</h3>
          <p>본 방침은 2025년 10월 25일부터 시행한다.</p>
        </section>
      </div>
    </div>
  );
}
