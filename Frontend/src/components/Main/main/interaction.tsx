import Stroke from '@/svgs/Ddasomiz/greenSomi.svg';
import Play from '@/svgs/Ddasomiz/orangeSomi.svg';
import Hug from '@/svgs/Ddasomiz/yellowSomi.svg';

export default function Interaction() {
  return (
    <>
      <div className="mb-2">
        <span className="font-nanumBold text-lg text-gray1">따솜이 키우기</span>
      </div>
      <div className="bg-white h-48 rounded-3xl items-center justify-center gap-3 flex shadow-xl">
        <button className="bg-[#ffde84] flex flex-col justify-end rounded-2xl w-[105px] h-36  shadow-lg transform transition duration-100 active:translate-y-1 active:shadow-none">
          <div className="relative bg-[#ffffe4] rounded-xl text-center h-28 flex w-full  flex-col justify-center">
            <div className="absolute -top-5 left-7">
              <Hug />
            </div>
            <span className="font-hakgyoansimR  text-xl w-full">안아주기</span>
            <span className="text-gray5 text-xs mt-1">5개 보유</span>
          </div>
        </button>
        <button className="bg-[#7caeff] flex flex-col justify-end rounded-2xl  w-[105px] h-36  shadow-lg transform transition duration-100 active:translate-y-1 active:shadow-none">
          <div className="relative w-full bg-[#f3f8ff] rounded-xl text-center h-28 flex flex-col justify-center">
            <div className="absolute -top-5 left-7">
              <Play />
            </div>
            <span className="font-hakgyoansimR  text-xl w-full">놀아주기</span>
            <span className="text-gray5 text-xs mt-1">14개 보유</span>
          </div>
        </button>
        <button className="bg-[#30cc81] flex flex-col justify-end rounded-2xl  w-[105px] h-36  shadow-lg transform transition duration-100 active:translate-y-1 active:shadow-none">
          <div className="relative w-full bg-[#dcffee] rounded-2xl text-center h-28 flex flex-col justify-center">
            <div className="absolute -top-5 left-7">
              <Stroke />
            </div>
            <span className="font-hakgyoansimR  text-xl w-full">쓰다듬기</span>
            <span className="text-gray5 text-xs mt-1">30개 보유</span>
          </div>
        </button>
      </div>
    </>
  );
}
