'use client';

import Button from '@/components/Button';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const questions = [
  { id: '1', text: '심장이 두근거리고 맥박이 빨라진다.', options: ['네', '아니요'] },
  { id: '2', text: '땀이 심하게 난다.', options: ['네', '아니요'] },
  { id: '3', text: '전신 혹은 손발이 심하게 떨린다.', options: ['네', '아니요'] },
  { id: '4', text: '숨이 막히고 호흡이 가빠진다.', options: ['네', '아니요'] },
  { id: '5', text: '질식할 것 같은 기분이 든다.', options: ['네', '아니요'] },
  { id: '6', text: '가슴이 답답하고 불쾌감이 느껴진다.', options: ['네', '아니요'] },
  { id: '7', text: '구토감이 느껴지고 속이 불편해진다.', options: ['네', '아니요'] },
  { id: '8', text: '현기증이 나고 몸을 가누기 힘들다.', options: ['네', '아니요'] },
  {
    id: '9',
    text: '현실감각이 사라지거나 내가 아닌 사람이 나를 바라보는 것 같은 느낌이 든다.',
    options: ['네', '아니요'],
  },
  { id: '10', text: '혹시 이러다가 미치는게 아닐까 하는 두려움에 사로잡히게 된다.', options: ['네', '아니요'] },
  { id: '11', text: '죽음에 대한 극심한 공포감에 사로잡히기도 한다.', options: ['네', '아니요'] },
  { id: '12', text: '감각 이상이 생겨 손발이 마비되거나 저리고 쑤시기도 한다.', options: ['네', '아니요'] },
  { id: '13', text: '몸이 갑자기 몹시 차가워지거나 몹시 뜨거워진다.', options: ['네', '아니요'] },
];

export default function SelfDiagnosisDetailPage() {
  const router = useRouter();

  // 현재 질문 인덱스와 네에 대한 카운트 상태
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // 현재 질문 데이터 가져오기
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    // 네에 대한 카운트 증가
    if (selectedOption === '네') {
      setYesCount(prevCount => prevCount + 1);
    }

    // 마지막 질문이면 결과 페이지로 이동
    if (currentQuestionIndex === questions.length - 1) {
      // yesCount에 현재 선택된 옵션(네)을 포함해서 전달
      const finalYesCount = yesCount + (selectedOption === '네' ? 1 : 0);
      router.push(`/calendar/selfDiagnosis/result?yesCount=${finalYesCount}`);
    } else {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null); // 다음 질문으로 넘어갈 때 선택 초기화
    }
  };

  // 진행도 계산
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div>
      <Header label="자가진단" />
      <div className="flex flex-col items-center p-4">
        {/* 프로그레스 바 */}
        <div className="w-full bg-gray2 rounded-full h-1.5 mb-4">
          <div className="bg-main2 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>

        {/* 질문 텍스트 */}
        <h2 className="text-3xl font-nanumBold text-center mb-6">{currentQuestion.text}</h2>

        {/* 선택지 */}
        <div className="flex flex-col gap-4">
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

        <Button onClick={handleNextClick} label="다음" disabled={!selectedOption} className="mt-10" />
      </div>
    </div>
  );
}
