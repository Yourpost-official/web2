import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | Your Post',
  description: '유어포스트의 개인정보처리방침입니다.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-screen-md mx-auto px-6 py-32 md:py-40 space-y-12 animate-reveal">
      <h1 className="text-4xl font-black tracking-tighter">개인정보처리방침</h1>
      <div className="text-sm text-gray-600 leading-loose space-y-8 font-medium break-keep">

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제1조 (개인정보의 처리 목적)</h3>
          <p>유어포스트는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>서비스 제공
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>편지 작성 및 우편 발송 서비스 제공</li>
                <li>구독형 상품 및 맞춤형 편지 제공</li>
                <li>배송지 관리 및 우편물 발송 처리</li>
              </ul>
            </li>
            <li>회원 관리
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>회원제 서비스 이용에 따른 본인확인, 개인 식별</li>
                <li>부정이용 방지 및 비인가 사용 방지</li>
                <li>연령확인, 법정대리인 동의여부 확인(필요 시)</li>
              </ul>
            </li>
            <li>마케팅 및 광고에의 활용
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>신규 서비스 개발 및 맞춤 서비스 제공</li>
                <li>이벤트 및 광고성 정보 제공 및 참여기회 제공 (별도 동의 시)</li>
                <li>서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계</li>
              </ul>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제2조 (개인정보의 처리 및 보유기간)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</li>
            <li>각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>회원가입 및 관리: 회원 탈퇴 시까지</li>
                <li>재화 또는 서비스 제공: 재화·서비스 공급완료 및 요금결제·정산 완료 시까지</li>
                <li>전자상거래법 등 법령에 따른 보관:
                  <ul className="list-[circle] pl-5 mt-1 space-y-1">
                    <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                    <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                    <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                    <li>표시·광고에 관한 기록: 6개월</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제3조 (처리하는 개인정보의 항목)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>회사는 다음의 개인정보 항목을 처리하고 있습니다.
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>필수항목: 성명, 연락처, 이메일주소, 배송지 주소</li>
                <li>선택항목: 프로필 이미지, 선호도 정보</li>
                <li>자동수집항목: IP주소(익명화), 쿠키, 서비스 이용기록, 접속로그, 접속 디바이스 정보</li>
              </ul>
            </li>
            <li>결제 시 수집되는 정보
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>신용카드 결제시: 카드사명, 카드번호 일부(뒷 4자리)</li>
                <li>계좌이체시: 은행명, 계좌번호 일부</li>
              </ul>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제4조 (개인정보의 제3자 제공)</h3>
          <p>회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            <li>서비스 제공을 위하여 제3자에게 제공하는 경우
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>제공받는 자: 우정사업본부(우체국), 배송대행 업체</li>
                <li>제공 항목: 성명, 주소, 연락처, 주문번호</li>
                <li>제공 목적: 우편물 발송 및 배송관리</li>
                <li>보유 및 이용기간: 배송 완료 후 즉시 파기 (단, 관계 법령에 따라 보존 필요 시 해당 기간 동안 보존)</li>
              </ul>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제5조 (개인정보처리의 위탁)</h3>
          <p>회사는 원활한 서비스 제공을 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>결제 처리: PG사(토스페이먼츠 등)
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>위탁 업무: 결제 처리 및 정산</li>
                <li>보유 및 이용기간: 거래 종료 후 5년</li>
              </ul>
            </li>
            <li>회사는 위탁계약 체결 시 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제6조 (정보주체의 권리·의무 및 행사방법)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>개인정보 열람 요구</li>
                <li>오류 등이 있을 경우 정정 요구</li>
                <li>삭제 요구</li>
                <li>처리정지 요구</li>
              </ul>
            </li>
            <li>제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.</li>
            <li>정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.</li>
            <li>제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 위임장을 제출하셔야 합니다.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제7조 (개인정보의 파기)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</li>
            <li>파기 절차 및 방법은 다음과 같습니다.
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>파기절차: 이용자가 입력한 정보는 목적 달성 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.</li>
                <li>파기방법:
                  <ul className="list-[circle] pl-5 mt-1 space-y-1">
                    <li>전자적 파일 형태: 기록을 재생할 수 없도록 로우레밸포멧(Low Level Format) 등을 이용하여 파기</li>
                    <li>종이 문서: 분쇄기로 분쇄하거나 소각</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제8조 (개인정보의 안전성 확보조치)</h3>
          <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
            <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
            <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제9조 (쿠키 및 자동 수집 정보)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>회사는 이용자의 정보를 수시로 저장하고 찾아내는 '쿠키(cookie)' 등을 운용합니다. 쿠키란 웹사이트를 운영하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트 파일로서 귀하의 컴퓨터 하드디스크에 저장됩니다.</li>
            <li>쿠키의 사용 목적
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>이용자의 접속 빈도나 방문 시간 등을 분석</li>
                <li>이용자의 취향과 관심분야를 파악 및 자취 추적</li>
                <li>각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공</li>
              </ul>
            </li>
            <li>이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.</li>
            <li>IP 주소 익명화 처리
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>회사는 GDPR 및 한국 개인정보보호법 준수를 위해 수집되는 IP 주소를 익명화하여 저장합니다.</li>
                <li>IPv4의 경우 마지막 옥텟(예: 192.168.1.100 → 192.168.1.0), IPv6의 경우 마지막 80비트를 제거하여 개인 식별이 불가능하도록 처리합니다.</li>
              </ul>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제10조 (개인정보 보호책임자)</h3>
          <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>개인정보 보호책임자
              <ul className="list-[circle] pl-5 mt-1 space-y-1">
                <li>성명: 유어포스트 대표</li>
                <li>연락처: info@yourpost.co.kr</li>
              </ul>
            </li>
            <li>정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제11조 (개인정보 열람청구)</h3>
          <p>정보주체는 「개인정보 보호법」 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>개인정보 열람청구 접수·처리 부서
              <ul className="list-[circle] pl-5 mt-1 space-y-1">
                <li>이메일: info@yourpost.co.kr</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제12조 (권익침해 구제방법)</h3>
          <p>정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)</li>
            <li>개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)</li>
            <li>대검찰청: (국번없이) 1301 (www.spo.go.kr)</li>
            <li>경찰청: (국번없이) 182 (ecrm.cyber.go.kr)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal">제13조 (개인정보 처리방침 변경)</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</li>
          </ol>
        </section>

        <section className="space-y-4 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-charcoal">부칙</h3>
          <p>본 방침은 2025년 10월 25일부터 시행합니다.</p>
        </section>
      </div>
    </div>
  );
}
