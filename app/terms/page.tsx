import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 | Your Post',
  description: '유어포스트 서비스 이용약관입니다.',
};

export default function TermsPage() {
  return (
    <div className="max-w-screen-md mx-auto px-6 py-32 md:py-40 space-y-12 animate-reveal">
      <h1 className="text-4xl font-black tracking-tighter">이용약관</h1>
      <div className="text-sm text-gray-600 leading-loose space-y-8 font-medium break-keep">
        
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제1조 (목적)</h3>
          <p>이 약관은 유어포스트가 운영하는 웹사이트에서 제공하는 인터넷 관련 서비스 및 우편 제작/배송 서비스를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
        </section>
        
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제2조 (정의)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>“이용자”라 함은 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말한다.</li>
            <li>“회원”이라 함은 회사에 개인정보를 제공하여 회원등록을 한 자로서 지속적으로 서비스를 이용할 수 있는 자를 말한다.</li>
            <li>“정기구독서비스”라 함은 이용자가 일정 기간 동안 일정 금액을 결제하고 물품 또는 콘텐츠를 정기적으로 제공받는 형태의 서비스를 말한다.</li>
            <li>“맞춤형상품”이라 함은 이용자의 개별 요청에 따라 문구·디자인·제작이 이루어지는 상품을 말한다.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제3조 (약관의 효력 및 변경)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>회사는 이 약관의 내용을 이용자가 확인할 수 있도록 사이트 하단 내지 별도 페이지 게시한다.</li>
            <li>회사는 관련 법령을 위반하지 않는 범위 내에서 이 약관을 변경할 수 있으며, 변경된 약관은 적용일자 및 개정사유를 명시하여 적용일자 7일 전부터 사이트에 게시한다.</li>
            <li>이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있으며, 서비스를 계속 이용하는 경우 약관 변경에 동의한 것으로 간주한다.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제4조 (서비스 제공 및 변경)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>회사는 다음과 같은 업무를 수행한다.
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>가. 우체국을 통한 우편물 및 편지지 발송대행 서비스</li>
                <li>나. 정기구독형 콘텐츠 및 굿즈의 제공 및 발송</li>
                <li>다. 이용자 요청에 따른 맞춤형 편지 제작 및 발송</li>
                <li>라. 기타 회사가 정하는 부가서비스</li>
              </ul>
            </li>
            <li>회사는 서비스의 내용, 제공방법, 이용시간, 요금 등을 변경할 수 있으며, 변경된 사항은 사전에 공지한다.</li>
            <li>회사는 천재지변, 통신장애, 우체국의 배송 지연 등 불가항력적 사유로 서비스 제공이 일시 중단될 수 있으며, 이로 인한 손해에 대해 책임지지 않는다.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제5조 (회원가입 및 계약성립)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>이용자는 회사가 정한 가입양식에 따라 회원정보를 기입하고 이 약관에 동의함으로써 회원가입을 신청한다.</li>
            <li>회사는 신청을 받은 후 제반 사항을 검토하여 가입을 승인할 수 있으며, 다음 각 호에 해당하는 경우 가입을 거절할 수 있다.
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>가. 타인의 명의를 도용하거나 허위정보를 기재한 경우</li>
                <li>나. 서비스의 정상적 운영을 저해할 우려가 있다고 판단되는 경우</li>
              </ul>
            </li>
            <li>회원과 회사간 서비스 이용계약은 회사가 가입승낙의 의사표시를 한 때 성립한다.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제6조 (결제 및 구독서비스 해지)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>이용자는 회사가 제공하는 PG결제 또는 계좌이체 방식에 따라 요금을 납부한다.</li>
            <li>정기구독서비스는 결제 완료 시 서비스가 개시되며, 다음 결제일 3일 전까지 해지 요청이 없는 한 자동갱신될 수 있다.</li>
            <li>이용자는 서비스 개시 이전에 해지 요청을 하면 환불 기준에 따라 환불 받을 수 있다.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제7조 (청약철회 및 환불)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>이용자는 「전자상거래 등에서의 소비자보호에 관한 법률」 제17조에 따라 상품을 공급받은 날로부터 7일 이내 청약철회를 할 수 있다.</li>
            <li>다만 다음 각 호의 경우 청약철회가 제한된다.
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>가. 이용자 요청에 따라 개별 제작된 맞춤형상품</li>
                <li>나. 콘텐츠 전송 완료된 경우</li>
                <li>다. 제품의 가치가 현저히 감소하거나 재판매가 곤란한 경우</li>
              </ul>
            </li>
            <li>정기구독서비스의 환불기준은 다음과 같다.
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>가. 서비스 개시 전: 결제금액의 90% 환불</li>
                <li>나. 서비스 개시 후:
                  <ul className="list-[circle] pl-5 mt-1 space-y-1">
                    <li>(1) 전체 기간의 1/3 미만 이용 : 잔여기간 금액의 80% 환불</li>
                    <li>(2) 전체 기간의 2/3 미만 이용 : 잔여기간 금액의 70% 환불</li>
                    <li>(3) 전체 기간의 2/3 초과 이용 : 잔여기간 금액의 60% 환불</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>환불은 접수일로부터 7영업일 이내 처리하며, 결제수단 및 PG사의 정책에 따라 환불이 지연될 수 있다.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제8조 (배송 및 교환)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>회사는 우체국을 통해 상품 및 편지를 발송한다.</li>
            <li>회사의 귀책사유로 인한 오배송·파손이 확인된 경우에는 동일상품 재발송 또는 환불을 진행한다.</li>
            <li>단순 변심에 의한 교환 및 환불은 불가하다.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제9조 (저작권·지식재산권)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>서비스 내 제공되는 문구, 이미지, 디자인, 콘텐츠, 상표 등의 저작권 및 기타 지식재산권은 회사에 귀속된다.</li>
            <li>이용자는 회사의 사전 서면 동의 없이 이를 복제·배포·전송·변형·제3자 이용하도록 할 수 없다.</li>
            <li>이용자가 서비스 내 게시한 게시물 및 후기 등은 이용자에게 저작권이 있으나, 회사는 홍보·운영 목적으로 이를 무상으로 이용할 수 있다.</li>
            <li>이용자가 게시한 콘텐츠로 인해 제3자의 권리침해가 발생한 경우 이용자는 책임을 진다.</li>
            <li>회사의 모든 저작물 내지 지식재산권을 담당자의 동의 없이 무단사용을 금지한다.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제10조 (면책조항)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>회사는 이용자의 귀책사유로 인한 서비스 이용 장애 또는 손해에 대해 책임을 지지 않는다.</li>
            <li>회사는 천재지변·우체국 배송 지연·통신망 장애·해킹 등 불가항력적 사유로 발생한 손해에 대해 책임을 지지 않는다.</li>
            <li>회사는 이용자가 자신의 계정정보를 타인과 공유하거나 비밀번호 관리를 하지 않아 발생한 손해에 대해 책임을 지지 않는다.</li>
            <li>이용자가 서비스를 통해 제공한 정보의 신뢰도·정확성 등에 대해서는 이용자 본인이 책임진다.</li>
            <li>회사는 이용자 간 또는 이용자와 제3자 간 분쟁에 대해 개입하거나 손해배상 책임을 지지 않는다.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제11조 (계정 관리 및 보안)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>이용자는 자신의 계정정보를 제3자에게 양도하거나 공유할 수 없다.</li>
            <li>이용자는 계정 도용·해킹이 의심되는 경우 즉시 회사에 통보해야 한다.</li>
            <li>회사는 고의 또는 중대한 과실이 없는 한, 해킹·침입으로 인한 계정 피해에 대해 책임지지 않는다.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제12조 (제3자 제공 및 고객관리서비스 안내)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>회사는 서비스 제공을 위해 아래와 같은 방식으로 제3자에게 이용자의 개인정보를 제공할 수 있다.
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>가. 제공받는 자: 우정사업본부(우체국), 배송대행 업체</li>
                <li>나. 제공 항목: 성명, 주소, 연락처, 주문번호, 배송상태 정보</li>
                <li>다. 제공 목적: 우편물 발송 및 배송관리, 고객응대 및 사후관리</li>
                <li>라. 제공 기간: 발송 완료 후 고객 CS 처리 종료 시까지</li>
              </ul>
            </li>
            <li>회사는 고객관리 및 마케팅 서비스를 위해 아래 항목에 대해 별도 동의를 받은 후 제공할 수 있다.
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>가. 제공받는 자: 마케팅대행 업체</li>
                <li>나. 제공 항목: 이메일 주소, 연락처, 구매이력, 선호정보</li>
                <li>다. 제공 목적: 이벤트 안내, 리워드 제공, 신규서비스 안내</li>
                <li>라. 제공 기간: 동의일로부터 최대 5년이다.</li>
              </ul>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제13조 (분쟁해결 및 준거법)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>본 약관에 명시되지 않은 사항은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」 등 대한민국 관련 법령을 따른다.</li>
            <li>서비스 이용과 관련한 분쟁이 발생했을 때는 회사 본사 소재지를 관할하는 법원을 제1심 관할법원으로 한다.</li>
          </ol>
        </section>

        <section className="space-y-4 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-charcoal">부칙</h3>
          <p>본 약관은 2025년 10월 25일부터 시행한다.</p>
        </section>
      </div>
    </div>
  );
}