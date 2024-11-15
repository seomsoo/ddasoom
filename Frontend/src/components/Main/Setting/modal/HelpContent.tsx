'use client';
import Arrow from '@/svgs/arrow.svg';
import Babysomi from '@/svgs/Ddasomiz/HelpLv1.svg';
import Lv2 from '@/svgs/Ddasomiz/HelpLv2.svg';
import Level3 from '@/svgs/Ddasomiz/HelpLv3.svg';

export default function HelpContent() {
  return (
    <div className="flex flex-col items-center min-h-96 gap-5">
      <h1 className="text-4xl text-center font-nanumBold mt-14">따솜이 키우기</h1>
      <main className="w-full mt-6">
        <article className="flex w-full items-center text-xs text-center justify-between ">
          <div className="flex flex-col items-center">
            <Babysomi />
            <span className="mt-1">
              Lv.1 <br />
              애기따솜
            </span>
          </div>
          <Arrow className="ml-3 mb-5" />
          <div className="flex flex-col">
            <Lv2 />
            <span className="mt-2">
              Lv.2 <br />
              따솜
            </span>
          </div>

          <Arrow className="mb-5" />
          <div className="flex flex-col">
            <Level3 />
            <span className="mt-2">
              Lv.3 <br /> 슈퍼따솜이
            </span>
          </div>
        </article>
      </main>

      <article className="mt-3">
        <span className="flex flex-col text-center font-nanumBold text-sm">
          매일 훈련을 통해 따솜이와 상호작용하세요. <br />
          작은 상호작용들이 쌓이면 따솜이가 성장합니다! <br /> 레벨 3까지 따솜이를 키워보세요.
        </span>
      </article>
    </div>
  );
}
