import Link from 'next/link';

import Setting from '@/svgs/setting.svg';
import Sos from '@/svgs/SOS.svg';
import SoundOn from '@/svgs/soundOn.svg';
const Main = () => {
  return (
    <>
      <header className="flex w-full items-center justify-between">
        <div className="flex gap-6">
          <SoundOn />
          <Link href="/main/voicesetting">
            <Setting />
          </Link>
        </div>

        <Sos />
      </header>
      <main className="flex flex-col items-center mt-72 text-3xl font-hakgyoansimB">
        따솜이 키우기가 들어갈
        <br />
        메인 페이지 입니다
      </main>
    </>
  );
};

export default Main;
