'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import PlusIcon from '@/svgs/PlusIcon.svg';
import TrashIcon from '@/svgs/TrashIcon.svg';
import Character from '@/svgs/Ddasomiz/xEyesSomi.svg';

interface Contact {
  PhoneBookId: number;
  PhoneNumber: string;
  alias: string;
}

export default function ConnectContent() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [idCounter, setIdCounter] = useState(1);

  // 전화번호를 000-0000-0000 형식으로 포맷팅하는 함수
  const formatPhoneNumber = (value: string) => {
    const numbersOnly = value.replace(/\D/g, ''); // 숫자만 남기기
    if (numbersOnly.length <= 3) return numbersOnly;
    if (numbersOnly.length <= 7) return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
  };

  // 유효성 검사 스키마 정의
  const schema = yup.object().shape({
    alias: yup
      .string()
      .required('이름을 입력해주세요.')
      .test('duplicate-alias', '이미 존재하는 이름입니다.', value => {
        return !contacts.some(contact => contact.alias === value);
      }),
    PhoneNumber: yup
      .string()
      .matches(/^\d{3}-\d{4}-\d{4}$/, '유효한 전화번호 형식이 아닙니다.')
      .required('전화번호를 입력해주세요.')
      .test('duplicate-phone', '이미 존재하는 전화번호입니다.', value => {
        const normalizedValue = value?.replace(/-/g, ''); // 입력된 번호에서 '-' 제거
        return !contacts.some(contact => contact.PhoneNumber === normalizedValue);
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

  const onSubmit = (data: Omit<Contact, 'PhoneBookId'>) => {
    const formattedPhoneNumber = data.PhoneNumber.replace(/-/g, ''); // '-' 제거
    const newContact: Contact = {
      PhoneBookId: idCounter,
      alias: data.alias,
      PhoneNumber: formattedPhoneNumber,
    };
    setContacts([...contacts, newContact]);
    setIdCounter(idCounter + 1);
    reset({ alias: '', PhoneNumber: '' }); // 폼 초기화
  };

  const handleDelete = (id: number) => {
    setContacts(contacts.filter(contact => contact.PhoneBookId !== id));
  };

  return (
    <div className="flex flex-col items-center w-full p-4 max-w-sm mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">비상 연락처</h2>
      <p className="text-sm opacity-50 text-center mb-4">
        공황발작 10분 이상 경과시,
        <br /> 설정한 연락처로 긴급 메세지가 전송됩니다.
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

      <div
        className="w-full mt-4 space-y-2 overscroll-y"
        style={{ minHeight: '150px', maxHeight: '200px', overflowY: 'auto' }}>
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center text-center font-nanumBold text-gray4 mt-8">
            <p>저장된 연락처가 없습니다.</p>
            <Character width={84} height={75} className="mb-4" />
          </div>
        ) : (
          <ul>
            {contacts.map(contact => (
              <li
                key={contact.PhoneBookId}
                className="flex justify-between text-sm items-center bg-main4 rounded-full p-2">
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
