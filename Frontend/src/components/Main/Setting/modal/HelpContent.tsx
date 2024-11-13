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
        <article className="flex w-full items-center justify-between ">
          <Babysomi />
          <Arrow className="ml-3" />
          <Lv2 className="mr-1" />
          <Arrow />
          <Level3 />
        </article>
      </main>
      <section className=" flex justify-around gap-20">
        <span className="mr-1">Lv.1</span>
        <span>Lv.2</span>
        <span className="mr-1">Lv.3</span>
      </section>
    </div>
  );
}
