'use client';
import DDasomi from '@/svgs/ddasomi.svg';

import ArduinoSetting from '../ArduinoSetting';
export default function ConnectContent() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-1">따솜키링 연결</h2>
      <p className="text-sm opacity-50">따솜키링을 연결하려면 아래 단계를 따라주세요.</p>
      <DDasomi className="my-12" />
      <div className="flex justify-end ">
        <ArduinoSetting />
      </div>
    </div>
  );
}
