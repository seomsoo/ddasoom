import Link from 'next/link';

import Navbar from '@/components/Common/Navbar';
import Character from '@/components/Main/main/Character';
import Interaction from '@/components/Main/main/interaction';
import LevelBar from '@/components/Main/main/LevelBar';
import Watch from '@/components/Main/main/Watch';
import Window from '@/components/Main/main/Window';
import EmergencyContent from '@/components/Main/Setting/modal/EmergencyContent';
import EmergencyModal from '@/components/Main/Setting/modal/EmergencyModal';
import HelpContent from '@/components/Main/Setting/modal/HelpContent';
import HelpModal from '@/components/Main/Setting/modal/HelpModal';
import MissionContent from '@/components/Main/Setting/modal/MissionContent';
import MissionModal from '@/components/Main/Setting/modal/MissionModal';
import Setting from '@/svgs/setting.svg';
import SoundOn from '@/svgs/soundOn.svg';
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
          <div className="absolute gap-6 right-6 top-40 flex flex-col">
            <HelpModal ContentComponent={HelpContent} />
            <Link href="/main/setting">
              <Setting />
            </Link>
            <SoundOn />
            <MissionModal ContentComponent={MissionContent} />
          </div>
        </div>
      </header>

      <main className="flex flex-col bg-[#D8D1C3] items-center  h-56 ">
        <div>
          <Character />
        </div>
      </main>
      <section className="flex flex-col p-3">
        <Interaction />
      </section>
      <Navbar />
    </div>
  );
};

export default Main;
