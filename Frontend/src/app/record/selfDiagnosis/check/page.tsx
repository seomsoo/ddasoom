'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Button from '@/components/Button';

const questions = [
  { id: '1', text: '심장이 두근거리고, 맥박이 빨라진다.', options: ['네', '아니요'] },
  { id: '2', text: '심하게 땀을 흘린다.', options: ['네', '아니요'] },
  { id: '3', text: '두려움으로 인한, 손발 몸에 떨림이 느껴진다.', options: ['네', '아니요'] },
  { id: '4', text: '숨이 가쁘고, 숨 막히는 느낌이 든다.', options: ['네', '아니요'] },
  { id: '5', text: '질식할 것 같은 기분이 든다.', options: ['네', '아니요'] },
  { id: '6', text: '가슴이 답답하고, 불편감이 느껴진다.', options: ['네', '아니요'] },
  { id: '7', text: '구토감이 느껴지고, 속이 불편해진다.', options: ['네', '아니요'] },
  { id: '8', text: '현기증이 오고, 어지럽거나 쓰러질 것 같다.', options: ['네', '아니요'] },
  {
    id: '9',
    text: '내가 아닌 것 같고, 비현실적인 느낌이 든다.',
    options: ['네', '아니요'],
  },
  { id: '10', text: '혹시 이러다 미치는 게, 아닐까 하는 두려움에, 사로잡히게 된다.', options: ['네', '아니요'] },
  { id: '11', text: '죽을 것 같은 공포감이 든다.', options: ['네', '아니요'] },
  { id: '12', text: '감각이 둔해지거나, 따끔거리는 느낌이 든다.', options: ['네', '아니요'] },
  { id: '13', text: '몸에 오한이 나거나, 얼굴이 화끈거린다.', options: ['네', '아니요'] },
];

export default function SelfDiagnosisDetailPage() {
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (selectedOption === '네') {
      setYesCount(prevCount => prevCount + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      const finalYesCount = yesCount + (selectedOption === '네' ? 1 : 0);
      router.push(`/record/selfDiagnosis/result?yesCount=${finalYesCount}`);
    } else {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col ">
      {/* 상단 내용 */}
      <div className=" flex flex-col items-center ">
        {/* 프로그레스 바 */}
        <div className="w-52 bg-gray2 rounded-full h-1.5 mb-4">
          <div className="bg-main2 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* 질문 텍스트 */}
        <h2
          className="text-2xl font-nanumBold my-16 w-72 "
          dangerouslySetInnerHTML={{
            __html: currentQuestion.text.replace(/(?:\n|,)/g, '<br />'),
          }}
        />

        {/* 선택지 */}
        <div className="flex flex-col gap-4 w-full items-center">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`flex items-center justify-between w-72 h-20 px-4 py-3 rounded-2xl shadow-md text-2xl ${
                selectedOption === option ? 'bg-main2 border-2 border-main1' : 'bg-main4 border border-gray3'
              }`}>
              <span>{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="bottom-0 fixed mb-[50px] w-[328px] ">
        <Button onClick={handleNextClick} label="다음" disabled={!selectedOption} />
      </div>
    </div>
  );
}
