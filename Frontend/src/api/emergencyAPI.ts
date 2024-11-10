import { BaseResponse } from '@/types/http/baseResponse';
import { SavePhoneRequestBody, SendMessageRequestBody } from '@/types/http/request';
import { PhoneListData } from '@/types/http/response';

import axiosInstance from './axiosInstance';

// 비상 연락처 저장
export const postSavePhoneData = async (data: SavePhoneRequestBody): Promise<BaseResponse<null>> => {
  const response = await axiosInstance.post<BaseResponse<null>>('/emergency/phone-book', data);
  return response.data;
};

// 비상 연락처로 문자
export const postSendMessageData = async (data: SendMessageRequestBody): Promise<BaseResponse<null>> => {
  const response = await axiosInstance.post<BaseResponse<null>>('/emergency/send-message', data);
  return response.data;
};

// 비상 연락처 목록 조회
export const getPhoneData = async (): Promise<BaseResponse<PhoneListData>> => {
  const response = await axiosInstance.get<BaseResponse<PhoneListData>>('/emergency/phone-books');
  return response.data;
};

// 비상 연락처 삭제
export const deletePhoneData = async (phoneBookId: number): Promise<BaseResponse<null>> => {
  const response = await axiosInstance.delete<BaseResponse<null>>(`/emergency/phone-book/${phoneBookId}`);
  return response.data;
};
