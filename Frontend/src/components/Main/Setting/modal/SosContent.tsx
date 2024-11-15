'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { deletePhoneData, getPhoneData, postSavePhoneData } from '@/api/emergencyAPI';
import queryKeys from '@/api/querykeys';
import ErrorModal from '@/components/Common/ErrorModal';
import Character from '@/svgs/Ddasomiz/xEyesSomi.svg';
import PlusIcon from '@/svgs/PlusIcon.svg';
import TrashIcon from '@/svgs/TrashIcon.svg';
import { BaseResponse } from '@/types/http/baseResponse';
import { SavePhoneRequestBody } from '@/types/http/request';
import { PhoneListData } from '@/types/http/response';

interface Contact {
  PhoneNumber: string;
  alias: string;
}

export default function SosContent() {
  const queryClient = useQueryClient();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorContext, setErrorContext] = useState('');

  useEffect(() => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        title: 'PHONELIST',
        content: null,
      }),
    );
  }, []);
  const sendPhoneListToApp = (data: PhoneListData[]) => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        title: 'SETPHONE',
        content: data,
      }),
    );
  };

  const { data: phoneListResponse } = useQuery<BaseResponse<PhoneListData[]>>({
    queryKey: [queryKeys.EMERGENCY_PHONE_NUMBER],
    queryFn: () => getPhoneData(),
  });

  // useEffect로 데이터 변경 감지 후 앱으로 데이터 전송
  useEffect(() => {
    if (phoneListResponse?.data) {
      sendPhoneListToApp(phoneListResponse.data);
    }
  }, [phoneListResponse]);

  const mutation = useMutation({
    mutationFn: (data: SavePhoneRequestBody) => postSavePhoneData(data),
    onSuccess: () => {
      console.log('전화번호 전송 성공');
      queryClient.invalidateQueries({ queryKey: [queryKeys.EMERGENCY_PHONE_NUMBER] });
    },
    onError: error => {
      console.error('전화번호 전송 실패:', error);
      setErrorContext(error.message || '에러 메시지 전송 안 됨');
      setIsErrorModalOpen(true);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (phoneBookId: number) => deletePhoneData(phoneBookId),
    onSuccess: () => {
      console.log('연락처 삭제 성공');
      queryClient.invalidateQueries({ queryKey: [queryKeys.EMERGENCY_PHONE_NUMBER] });
    },
    onError: error => {
      console.error('연락처 삭제 실패:', error);
      setErrorContext(error.message || '에러 메시지 전송 안 됨');
      setIsErrorModalOpen(true);
    },
  });

  const formatPhoneNumber = (value: string | undefined) => {
    if (!value) return '';
    const numbersOnly = value.replace(/\D/g, '');
    if (numbersOnly.length <= 3) return numbersOnly;
    if (numbersOnly.length <= 7) return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
  };

  const schema = yup.object().shape({
    alias: yup
      .string()
      .required('이름을 입력해주세요.')
      .test('duplicate-alias', '이미 존재하는 이름입니다.', value => {
        if (!phoneListResponse?.data) return true;
        return !phoneListResponse.data.some(contact => contact.alias === value);
      }),
    PhoneNumber: yup
      .string()
      .matches(/^\d{3}-\d{4}-\d{4}$/, '유효한 전화번호 형식이 아닙니다.')
      .required('전화번호를 입력해주세요.')
      .test('duplicate-phone', '이미 존재하는 전화번호입니다.', value => {
        if (!phoneListResponse?.data || !value) return true;
        const normalizedValue = value.replace(/-/g, '');
        return !phoneListResponse.data.some(contact => contact.PhoneNumber === normalizedValue);
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

  const onSubmit = (data: Contact) => {
    const formattedPhoneNumber = data.PhoneNumber ? data.PhoneNumber.replace(/-/g, '') : '';
    const phoneData: SavePhoneRequestBody = {
      phoneNumber: formattedPhoneNumber,
      alias: data.alias,
    };
    mutation.mutate(phoneData);
    reset({ alias: '', PhoneNumber: '' });
  };

  const handleRetry = () => {
    setIsErrorModalOpen(false);
    handleSubmit(onSubmit);
  };

  const handleDelete = (phoneBookId: number) => {
    deleteMutation.mutate(phoneBookId);
  };

  return (
    <div className="flex flex-col items-center w-full p-4 max-w-sm mx-auto space-y-4">
      {isErrorModalOpen && (
        <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} context={errorContext} />
      )}

      <h2 className="text-2xl font-nanumBold">비상 연락처</h2>

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

      <div
        className="w-full mt-4 space-y-2 overscroll-y"
        style={{ minHeight: '150px', maxHeight: '200px', overflowY: 'auto' }}>
        {!phoneListResponse?.data?.length ? (
          <div className="flex flex-col items-center text-center font-nanumBold text-gray4 mt-8">
            <p>저장된 연락처가 없습니다.</p>
            <Character width={84} height={75} className="mb-4" />
          </div>
        ) : (
          <ul>
            {phoneListResponse.data.map((contact, index) => (
              <li
                key={contact.PhoneBookId}
                className={`flex justify-between text-sm items-center rounded-full p-2 ${
                  index % 2 === 0 ? 'bg-main4' : ''
                }`}>
                <span className="flex-1 ml-2">{contact.alias}</span>
                <span className="mr-6">{formatPhoneNumber(contact.PhoneNumber)}</span>
                <button onClick={() => handleDelete(contact.PhoneBookId)}>
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
