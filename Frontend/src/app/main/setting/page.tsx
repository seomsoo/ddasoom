'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import ArduinoSetting from '@/components/Main/Setting/ArduinoSetting';
import LogOutButton from '@/components/Main/Setting/LogOutButton';
import PrivacyPolicyContent from '@/components/Main/Setting/modal/PrivacyPolicyContent';
import RecodingContent from '@/components/Main/Setting/modal/RecodingContent';
import SosContent from '@/components/Main/Setting/modal/SosContent';
import TermsOfUseContent from '@/components/Main/Setting/modal/TermOfUseContent';
import ModalWithState from '@/components/Main/Setting/ModalWithState';
import PushButton from '@/components/Main/Setting/PushButton';
import CancelButton from '@/svgs/cancel.svg';

const pageVariants = {
  initial: { x: '100%', opacity: 0 }, // 화면 오른쪽에서 시작
  animate: { x: 0, opacity: 1 }, // 화면 중앙으로 이동
  exit: { x: '100%', opacity: 0 }, // 화면 오른쪽으로 사라짐
};

export default function SettingPage() {
  return (
    <motion.div
      className="flex mx-4 flex-col h-screen -m-4"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.6, ease: 'easeInOut' }}>
      <header className="mt-10 items-center flex justify-between">
        <span className="text-3xl font-nanumBold">설정</span>
        <Link href="/main">
          <CancelButton />
        </Link>
      </header>
      <article className="flex flex-col gap-6 mt-12 text-lg">
        <ModalWithState label="목소리 설정" ContentComponent={RecodingContent} />
        <ArduinoSetting />
        <ModalWithState label="비상 연락처" ContentComponent={SosContent} />
        <PushButton />
        <ModalWithState label="개인정보 처리약관" ContentComponent={PrivacyPolicyContent} />
        <ModalWithState label="이용 약관" ContentComponent={TermsOfUseContent} />
        <LogOutButton />
      </article>
    </motion.div>
  );
}
