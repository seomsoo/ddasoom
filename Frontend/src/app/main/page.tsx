import Link from 'next/link';

import EmergencyModal from '@/components/Main/Setting/modal/EmergencyModal';

import Navbar from '@/components/Common/Navbar';
import Setting from '@/svgs/setting.svg';
import SoundOn from '@/svgs/soundOn.svg';
import EmergencyContent from '@/components/Main/Setting/modal/EmergencyContent';
const Main = () => {
  return (
    <>
      <header className="flex w-full items-center justify-between">
        <div className="flex gap-6">
          <SoundOn />
          <Link href="/main/setting">
            <Setting />
          </Link>
        </div>

        <EmergencyModal ContentComponent={EmergencyContent} />
      </header>
      <main className="flex flex-col items-center mt-72 text-3xl font-hakgyoansimB">
        따솜이 키우기가 들어갈
        <br />
        메인 페이지 입니다
      </main>
      <Navbar />
    </>
  );
};

export default Main;
