import Link from 'next/link';

import EmergencyModal from '@/components/Main/Setting/modal/EmergencyModal';
import HelpModal from '@/components/Main/Setting/modal/HelpModal';

import Navbar from '@/components/Common/Navbar';
import Setting from '@/svgs/setting.svg';
import SoundOn from '@/svgs/soundOn.svg';
import EmergencyContent from '@/components/Main/Setting/modal/EmergencyContent';
import Watch from '@/components/Main/main/Watch';
import Character from '@/components/Main/main/Character';
import Window from '@/components/Main/main/Window';
import LevelBar from '@/components/Main/main/LevelBar';
import HelpContent from '@/components/Main/Setting/modal/HelpContent';
const Main = () => {
  return (
    <div className="bg-[#C7C0B3] h-screen -m-4">
      <header className="flex  flex-col w-full h-72 bg-main4 p-6 border-b-8">
        <article className="flex justify-between   w-full ">
          <LevelBar />
          <EmergencyModal ContentComponent={EmergencyContent} />
        </article>

        <div className="flex justify-between ">
          <div className="mt-8 ml-7">
            <Window />
          </div>
          <div className="mt-8 mr-14">
            <Watch />
          </div>
          <div className="absolute gap-6 right-4 top-48 flex flex-col">
            <Link href="/main/setting">
              <Setting />
            </Link>
            <SoundOn />
            <HelpModal ContentComponent={HelpContent} />
          </div>
        </div>
      </header>

      <main className="flex flex-col bg-[#D8D1C3] items-center  h-56 ">
        <div className="mt-11">
          <Character />
        </div>
      </main>
      <section className="flex flex-col p-3">
        <div className="mb-2">
          <span className="font-nanumExtraBold text-lg ">따솜이 키우기</span>
        </div>
        <div className="bg-white p-24 rounded-3xl" />
      </section>
      <Navbar />
    </div>
  );
};

export default Main;
