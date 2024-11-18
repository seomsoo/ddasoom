'use client';

import { motion } from 'framer-motion';

import background from '@/components/BackGround/Background.module.css';
import Header from '@/components/Common/Header';
import VideoSelector from '@/components/Training/CalmDown/VideoSelector';
import Hill from '@/svgs/hill.svg';

// 슬라이드 애니메이션 설정
const pageVariants = {
  initial: { x: '100%', opacity: 0 }, // 화면 오른쪽에서 시작
  animate: { x: 0, opacity: 1 }, // 화면 중앙으로 이동
  exit: { x: '-100%', opacity: 0 }, // 화면 왼쪽으로 사라짐
};

export default function CalmDownTrainingPage() {
  return (
    <motion.section
      className={`${background.background1} absolute inset-0 flex justify-center overflow-hidden text-white`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.6, ease: 'easeInOut' }}>
      <div className="absolute top-9 left-2 w-full">
        <Header label="" />
      </div>
      <div className="absolute bottom-0 w-full">
        <Hill />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-hakgyoansimR mt-24 mb-5">
          마음의 평온을 찾아
          <br /> 떠날 준비가 되셨나요?
        </h1>
        <div className="flex items-center justify-center">
          <VideoSelector />
        </div>
      </div>
    </motion.section>
  );
}
