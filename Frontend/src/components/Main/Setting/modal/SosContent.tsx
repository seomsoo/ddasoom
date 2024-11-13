'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { deletePhoneData, postSavePhoneData } from '@/api/emergencyAPI';
import ErrorModal from '@/components/Common/ErrorModal';
import Character from '@/svgs/Ddasomiz/xEyesSomi.svg';
import PlusIcon from '@/svgs/PlusIcon.svg';
import TrashIcon from '@/svgs/TrashIcon.svg';
import { SavePhoneRequestBody } from '@/types/http/request';
import { PhoneListData } from '@/types/http/response';

export default function SosContent() {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorContext, setErrorContext] = useState('');
  const [phoneData, setPhoneData] = useState<PhoneListData[]>([]); // 초기값을 빈 배열로 설정

  // 앱에 비상 연락처 목록 조회 요청 전송
  useEffect(() => {
    window.ReactNativeWebView?.postMessage(JSON.stringify({ title: 'PHONELIST', content: null }));
  }, []);

  // 앱에서 받은 메시지 처리
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const messageData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        const { title, content } = messageData;

        if (title === 'PHONELIST' && Array.isArray(content)) {
          // content가 배열일 경우에만 null 값을 제외하고 상태 업데이트
          const filteredContent = content.filter((contact): contact is PhoneListData => contact !== null);
          setPhoneData(filteredContent);
        }
      } catch (e) {
        console.error('Failed to handle message:', e);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 앱에 최신 연락처 목록 전송
  const sendPhoneListToApp = (data: PhoneListData[]) => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        title: 'SETPHONE',
        content: data,
      }),
    );
  };

  // 비상 연락처 추가
  const mutation = useMutation({
    mutationFn: (data: SavePhoneRequestBody) => postSavePhoneData(data),
    onSuccess: response => {
      const updatedPhoneData = response.data;
      const newPhoneData = [...phoneData, updatedPhoneData]; // 새 연락처 추가
      setPhoneData(newPhoneData); // 업데이트된 목록을 설정
      sendPhoneListToApp(newPhoneData); // 앱에 전송
    },
    onError: error => {
      console.error('비상연락처 추가 실패:', error);
      setErrorContext(error.message || '에러 메시지 전송 안 됨');
      setIsErrorModalOpen(true);
    },
  });

  // 비상 연락처 삭제
  const deleteMutation = useMutation({
    mutationFn: (phoneBookId: number) => deletePhoneData(phoneBookId),
    onSuccess: () => {
      const updatedPhoneData = phoneData.filter(contact => contact.PhoneBookId !== phoneBookId); // 삭제된 연락처 제외
      setPhoneData(updatedPhoneData); // 업데이트된 목록 설정
      sendPhoneListToApp(updatedPhoneData); // 앱에 전송
    },
    onError: error => {
      console.error('비상연락처 삭제 실패:', error);
      setErrorContext(error.message || '에러 메시지 전송 안 됨');
      setIsErrorModalOpen(true);
    },
  });

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = (value: string | undefined) => {
    if (!value) return '';
    const numbersOnly = value.replace(/\D/g, '');
    if (numbersOnly.length <= 3) return numbersOnly;
    if (numbersOnly.length <= 7) return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
  };

  // 폼 유효성 검사 스키마
  const schema = yup.object().shape({
    alias: yup
      .string()
      .required('이름을 입력해주세요.')
      .test('duplicate-alias', '이미 존재하는 이름입니다.', value => {
        return phoneData ? !phoneData.some(contact => contact.alias === value) : true;
      }),
    PhoneNumber: yup
      .string()
      .matches(/^\d{3}-\d{4}-\d{4}$/, '유효한 전화번호 형식이 아닙니다.')
      .required('전화번호를 입력해주세요.')
      .test('duplicate-phone', '이미 존재하는 전화번호입니다.', value => {
        const normalizedValue = value?.replace(/-/g, '');
        return phoneData ? !phoneData.some(contact => contact.PhoneNumber === normalizedValue) : true;
      }),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // 연락처 추가 함수
  const onSubmit = (data: { alias: string; PhoneNumber: string }) => {
    const formattedPhoneNumber = data.PhoneNumber.replace(/-/g, '');
    mutation.mutate({ phoneNumber: formattedPhoneNumber, alias: data.alias });
    reset({ alias: '', PhoneNumber: '' });
  };

  // 재시도 핸들러
  const handleRetry = () => {
    setIsErrorModalOpen(false);
    handleSubmit(onSubmit);
  };
  return (
    <div className="flex flex-col items-center w-full p-4 max-w-sm mx-auto space-y-4">
      {isErrorModalOpen && (
        <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} context={errorContext} />
      )}

      <h2 className="text-2xl font-semibold">비상 연락처</h2>
      <p className="text-sm opacity-50 text-center mb-4">
        공황발작 10분 이상 경과시,
        <br /> 설정한 연락처로 긴급 메시지가 전송됩니다.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
        <div className="flex items-center border-b border-main2 pb-2 space-x-2">
          <Controller
            name="alias"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="이름"
                className="w-1/3 p-1 text-sm text-gray-700 border-none outline-none"
              />
            )}
          />

          <Controller
            name="PhoneNumber"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                value={formatPhoneNumber(field.value || '')}
                onChange={e => field.onChange(formatPhoneNumber(e.target.value))}
                placeholder="전화번호"
                className="w-1/2 p-1 text-gray-700 text-sm border-none outline-none"
              />
            )}
          />

          <button type="submit" className="flex-shrink-0 p-1">
            <PlusIcon width={24} height={24} />
          </button>
        </div>
        {errors.alias && <p className="text-sub3 text-sm">{errors.alias.message}</p>}
        {errors.PhoneNumber && <p className="text-sub3 text-sm">{errors.PhoneNumber.message}</p>}
      </form>

      <div className="w-full mt-4 space-y-2 overflow-y-auto" style={{ minHeight: '150px', maxHeight: '200px' }}>
        {!phoneData.length ? (
          <div className="flex flex-col items-center text-center font-nanumBold text-gray4 mt-8">
            <p>저장된 연락처가 없습니다.</p>
            <Character width={84} height={75} className="mb-4" />
          </div>
        ) : (
          <ul>
            {phoneData.map((contact, index) => (
              <li
                key={contact.PhoneBookId}
                className={`flex justify-between text-sm items-center rounded-full p-2 ${
                  index % 2 === 0 ? 'bg-main4' : ''
                }`}>
                <span className="flex-1 ml-2">{contact.alias}</span>
                <span className="mr-6">{formatPhoneNumber(contact.PhoneNumber)}</span>
                <button onClick={() => deleteMutation.mutate(contact.PhoneBookId)}>
                  <TrashIcon width={20} height={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
