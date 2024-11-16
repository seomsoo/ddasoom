'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { postSelfDiagnosisData } from '@/api/recordAPI';
import ErrorModal from '@/components/Common/ErrorModal';
import ProgressBar from '@/components/Record/SelfDiagnosis/ProgressBar';
import Question from '@/components/Record/SelfDiagnosis/QuestionText';
import { questions } from '@/constants/SelfDiagnosisData';
import BackIcon from '@/svgs/BackIcon';
import { SelfDiagnosisRequestBody } from '@/types/http/request';

export default function CheckList() {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorContext, setErrorContext] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: SelfDiagnosisRequestBody) => postSelfDiagnosisData(data),
    onSuccess: data => {
      console.log('자가진단 기록 전송 성공');
    },
    onError: error => {
      console.error('자가진단 기록 전송 실패:', error);
      setErrorContext(error.message || '에러 메시지 전송 안 됨');
      setIsErrorModalOpen(true);
    },
  });

  const handleOptionClick = (option: string) => {
    if (option === '네') {
      setYesCount(prevCount => prevCount + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      const finalYesCount = yesCount + (option === '네' ? 1 : 0);
      const panicDoubt: SelfDiagnosisRequestBody = {
        panicDoubtCount: finalYesCount,
      };
      mutation.mutate(panicDoubt);
      router.push(`/record/selfDiagnosis/result?yesCount=${finalYesCount}`);
    } else {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleBackClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    } else {
      router.back(); // 처음 질문일 경우 이전 페이지로 이동
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleRetry = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className="flex flex-col">
      {isErrorModalOpen && (
        <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} context={errorContext} />
      )}
      <div className="ml-2 mt-0.5 mb-6" onClick={handleBackClick}>
        <BackIcon />
      </div>
      <div className="flex flex-col items-center">
        <ProgressBar progress={progress} />
        <Question question={currentQuestion.text} gif={currentQuestion.gif} />

        <div className="flex gap-8 mt-12 w-full items-center justify-center">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`flex items-center justify-center w-[40%] h-20 text-center rounded-xl shadow-md text-lg transition-transform duration-150 transform hover:scale-105 active:scale-95 active:translate-y-1 active:shadow-none ${
                option === '네' ? 'bg-main2 border border-main1' : 'bg-main4 border border-gray3'
              }`}>
              <span className="font-nanumBold">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
