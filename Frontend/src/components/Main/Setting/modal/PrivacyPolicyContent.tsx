// components/Main/Setting/modal/PrivacyPolicyContent.tsx
'use client';

export default function PrivacyPolicyContent() {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h2 className="text-3xl  mb-4 text-center font-nanumExtraBold">개인정보 처리방침</h2>
      <section>
        <h3 className="text-xl font-nanumBold mb-2">1. 개인정보의 처리 목적</h3>
        <p>
          <strong>따숨</strong> (이하 '따숨')은 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의
          용도로는 이용하지 않습니다.
          <br />– 고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별 및 인증, 회원자격 유지 및 관리
        </p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">2. 개인정보의 처리 및 보유 기간</h3>
        <p>
          따숨은 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유 및 이용기간 또는 법령에 따른 보유 기간
          내에서 개인정보를 처리 및 보유합니다.
        </p>
        <p>
          - <strong>고객 가입 및 관리</strong>: 카카오싱크를 통한 회원가입 및 카카오채널을 통한 관리 <br />-{' '}
          <strong>보유 기간</strong>: 카카오채널 탈퇴 시 즉시 삭제
        </p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">3. 정보주체의 권리 및 행사 방법</h3>
        <p>정보주체는 다음과 같은 권리를 행사할 수 있습니다.</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>개인정보 열람 요구</li>
          <li>오류 등이 있을 경우 정정 요구</li>
          <li>삭제 요구</li>
          <li>처리 정지 요구</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">4. 처리하는 개인정보 항목</h3>
        <p>따숨이 처리하는 개인정보 항목은 다음과 같습니다.</p>
        <p className="font-nanumBold">회원 가입 시 (회원)</p>
        <p>
          - 필수 항목: 이름, 이메일, 전화번호 <br />
          - 수집 목적: 따숨 회원 관리 <br />- 보유 기간: 회원 탈퇴 또는 동의 철회 시 즉시 파기
        </p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">5. 개인정보의 파기</h3>
        <p>따숨은 개인정보 처리 목적이 달성된 경우 지체 없이 해당 정보를 파기합니다.</p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">6. 개인정보 자동 수집 장치의 설치•운영 및 거부</h3>
        <p>
          따숨은 맞춤 서비스를 제공하기 위해 쿠키를 사용합니다. 웹 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">7. 개인정보 보호책임자</h3>
        <p>따숨은 개인정보 보호에 관한 업무를 총괄하고 있으며, 다음과 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
        <p>
          - 책임자: 손다인, CEO <br />
          - 연락처: pjh2996@naver.com <br />- 담당 부서: 마케팅팀, 담당자: 김민영, <br />
          -연락처: minyeong1211@gmail.com,
        </p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">8. 개인정보 처리방침 변경</h3>
        <p>이 개인정보처리방침은 시행일로부터 적용되며, 변경사항 발생 시 사전 공지합니다.</p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">9. 개인정보의 안전성 확보 조치</h3>
        <p>따숨은 개인정보 보호법 제29조에 따라 개인정보의 안전성을 위한 기술적/관리적 조치를 시행하고 있습니다.</p>
      </section>

      <section>
        <h3 className="text-xl font-nanumBold mb-2">10. 정보주체의 권익침해에 대한 구제방법</h3>
        <p>개인정보 침해신고센터, 개인정보 분쟁조정위원회 등 외부 기관을 통한 분쟁 해결 방법이 제공됩니다.</p>
      </section>
    </div>
  );
}
