import Link from 'next/link';

import ArduinoSetting from '@/components/Main/VoiceSetting/ArduinoSetting';

export default function VoiceSettingPage() {
  return (
    <div className="flex flex-col items-center">
      <article>
        <Link href="/main/voicesetting/recoding">
          <button className="bg-main3 p-4 rounded-full font-nanumBold text-2xl">직접 녹음하기</button>
        </Link>
        <ArduinoSetting />
      </article>
    </div>
  );
}
