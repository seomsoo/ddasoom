'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Button from '@/components/Button';
import ProgressBar from '@/components/Record/SelfDiagnosis/ProgressBar';
import QuestionText from '@/components/Record/SelfDiagnosis/QuestionText';


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
  
export default function CheckList() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();
  

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

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div>      
      <div className=" flex flex-col items-center ">
        <ProgressBar progress={progress} />
        <QuestionText text={currentQuestion.text} />

        <div className="flex flex-col gap-5 w-full items-center">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`flex items-center justify-between w-full h-20 px-4 py-3 rounded-2xl shadow-md text-2xl ${
                selectedOption === option ? 'bg-main2 border-2 border-main1' : 'bg-main4 border border-gray3'
              }`}>
              <span>{option}</span>
            </button>
          ))}
        </div>
      </div>


      <div className="mt-36 w-full ">
        <Button onClick={handleNextClick} label="다음" disabled={!selectedOption} />
      </div>  
    </div>
  );
}
