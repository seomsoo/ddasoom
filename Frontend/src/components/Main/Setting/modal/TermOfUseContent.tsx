// components/Main/Setting/modal/TermsOfUseContent.tsx
'use client';

export default function TermsOfUseContent() {
  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h2 className="text-3xl mb-4 text-center font-nanumExtraBold">이용약관</h2>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">제1조 (목적)</h3>
        <p>
          본 약관은 SSAFY(이하 '회사')가 제공하는 따솜 서비스(이하 '서비스')의 이용과 관련하여 회사와 이용자의 권리,
          의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">제2조 (용어의 정의)</h3>
        <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>‘서비스’란 회사가 제공하는 따솜의 모든 기능과 콘텐츠를 의미합니다.</li>
          <li>‘이용자’란 본 약관에 따라 회사와 이용 계약을 체결하고 서비스를 이용하는 모든 고객을 말합니다.</li>
          <li>
            ‘회원’이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사가 제공하는 정보를 지속적으로 제공받으며,
            서비스를 이용할 수 있는 자를 말합니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">제3조 (약관의 효력 및 변경)</h3>
        <p>1. 본 약관은 이용자가 약관에 동의한 후 회원 가입을 완료한 시점부터 효력이 발생합니다.</p>
        <p>
          2. 회사는 관련 법령을 준수하는 범위 내에서 약관을 개정할 수 있으며, 개정된 약관은 공지사항을 통해 공지합니다.
        </p>
        <p>3. 이용자가 개정된 약관에 동의하지 않을 경우, 서비스 이용을 중단하고 회원 탈퇴를 요청할 수 있습니다.</p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">제4조 (회원 가입 및 관리)</h3>
        <p>
          1. 이용자는 회사가 정한 절차에 따라 회원가입을 신청하며, 회사는 이에 대해 승낙함으로써 회원 가입이 완료됩니다.
        </p>
        <p>
          2. 회원은 본인의 실명으로만 가입할 수 있으며, 허위 정보를 제공하거나 타인의 정보를 도용한 경우 회원 자격이
          제한될 수 있습니다.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">제5조 (서비스의 제공 및 변경)</h3>
        <p>1. 회사는 이용자에게 다음과 같은 서비스를 제공합니다.</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>따솜 서비스 관련 기능 제공</li>
          <li>기타 회사가 추가 개발하거나 다른 회사와 협력 계약 등을 통해 제공하는 일체의 서비스</li>
        </ul>
        <p>2. 회사는 서비스 운영상 필요한 경우 서비스 내용을 변경할 수 있으며, 변경된 내용은 사전에 공지합니다.</p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">제6조 (서비스의 중단)</h3>
        <p>
          1. 회사는 시스템의 점검, 교체, 고장 및 기타 운영상 상당한 이유가 있는 경우 서비스 제공을 일시적으로 중단할 수
          있습니다.
        </p>
        <p>2. 서비스 중단 시 회사는 이용자에게 사전 공지하며, 긴급 상황일 경우 사후에 공지할 수 있습니다.</p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">제7조 (이용자의 의무)</h3>
        <p>이용자는 서비스 이용 시 관계 법령, 본 약관의 규정, 공지사항 및 서비스 이용 안내 사항을 준수하여야 합니다.</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>타인의 정보 도용</li>
          <li>서비스 운영을 고의로 방해하는 행위</li>
          <li>기타 불법적이거나 부당한 행위</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">제8조 (개인정보의 보호)</h3>
        <p>
          회사는 관련 법령에 따라 이용자의 개인정보를 보호하며, 개인정보의 보호 및 사용에 대해서는 관련 법령 및 회사의
          개인정보처리방침이 적용됩니다.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">제9조 (회원 탈퇴 및 자격 상실)</h3>
        <p>1. 회원은 언제든지 회사에 요청하여 회원 탈퇴를 할 수 있으며, 회사는 관련 법령에 따라 이를 처리합니다.</p>
        <p>
          2. 회원이 다음 각 호의 사유에 해당하는 경우 회사는 사전 통보 후 회원 자격을 제한하거나 정지할 수 있습니다.
        </p>
        <ul className="list-disc ml-6 space-y-1">
          <li>본 약관을 위반한 경우</li>
          <li>기타 회사의 서비스 운영을 방해하는 행위가 발견된 경우</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">제10조 (책임의 한계)</h3>
        <p>1. 회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대해 책임을 지지 않습니다.</p>
        <p>
          2. 회사는 천재지변, 비상사태, 기타 불가항력적 사유로 인해 서비스를 제공할 수 없는 경우, 이에 대한 책임을 지지
          않습니다.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">제11조 (준거법 및 관할 법원)</h3>
        <p>
          본 약관은 대한민국 법령에 따라 규정되고 이행되며, 회사와 이용자 간 발생한 분쟁에 대해서는 민사소송법상의 관할
          법원에 제소합니다.
        </p>
      </section>
    </div>
  );
}
