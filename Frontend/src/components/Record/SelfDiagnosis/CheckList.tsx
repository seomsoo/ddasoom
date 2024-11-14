'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { postSelfDiagnosisData } from '@/api/recordAPI';
import Button from '@/components/Common/Button';
import ErrorModal from '@/components/Common/ErrorModal';
import ProgressBar from '@/components/Record/SelfDiagnosis/ProgressBar';
import QuestionText from '@/components/Record/SelfDiagnosis/QuestionText';
import { questions } from '@/constants/SelfDiagnosisData';
import { SelfDiagnosisRequestBody } from '@/types/http/request';

export default function CheckList() {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorContext, setErrorContext] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
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
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (selectedOption === '네') {
      setYesCount(prevCount => prevCount + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      const finalYesCount = yesCount + (selectedOption === '네' ? 1 : 0);
      const panicDoubt: SelfDiagnosisRequestBody = {
        panicDoubtCount: finalYesCount,
      };
      mutation.mutate(panicDoubt);
      router.push(`/record/selfDiagnosis/result?yesCount=${finalYesCount}`);
    } else {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleRetry = () => {
    setIsErrorModalOpen(false);
    handleNextClick();
  };

  return (
    <div>
      {isErrorModalOpen && (
        <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} context={errorContext} />
      )}
      <div className=" flex flex-col items-center ">
        <ProgressBar progress={progress} />
        <QuestionText text={currentQuestion.text} />

        <div className="flex flex-col gap-5 w-full items-center">
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

      <div className="mt-36 w-full ">
        <Button onClick={handleNextClick} label="다음" disabled={!selectedOption} />
      </div>
    </div>
  );
}
