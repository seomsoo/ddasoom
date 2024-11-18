'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import Header from '@/components/Common/Header';
import Ddasomi from '@/videos/EyeMouse.gif';

const pageVariants = {
  initial: { x: '100%', opacity: 0 }, // 화면 오른쪽에서 시작
  animate: { x: 0, opacity: 1 }, // 화면 중앙으로 이동
  exit: { x: '-100%', opacity: 0 }, // 화면 왼쪽으로 사라짐
};

export default function SelfDiagnosisPage() {
  return (
    <motion.div
      className="flex flex-col"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5, ease: 'easeInOut' }}>
      <Header label="자가진단" />
      <main className="flex flex-col">
        <section className="flex flex-col justify-center items-center gap-5 mt-14">
          <h3 className="font-hakgyoansimR text-2xl text-center">
            보건복지부 국립건강센터 <br />
            공황장애 진단 기준에 따른 <br /> 자가진단입니다.
          </h3>
          <p className="text-xs">총 13문항으로, 다음 중 나타난 증상을 모두 골라주세요.</p>
          <img
            src={Ddasomi.src}
            className="w-52 h-64 transition-opacity duration-300 ease-in-out opacity-100 animate-grow"
            alt="Nav Icon GIF"
          />
        </section>

        <Link
          href="/record/selfDiagnosis/check"
          className="font-nanumBold text-xl w-full py-3 mt-24 rounded-3xl text-main3 text-center bg-button1">
          시작하기
        </Link>
      </main>
    </motion.div>
  );
}
