import { BaseResponse } from '@/types/http/baseResponse';
import { IInteractionRequestBody } from '@/types/http/request';
import { ICharacterData, ICompletedTraining } from '@/types/http/response';

import axiosInstance from './axiosInstance';

// 메인화면 캐릭터 조회
export const getCharacterData = async (userId: number): Promise<BaseResponse<ICharacterData>> => {
  const response = await axiosInstance.get<BaseResponse<ICharacterData>>(`/users/${userId}`);
  return response.data;
};

// 완료한 훈련 조회
export const getCompletedTrainingData = async (): Promise<BaseResponse<ICompletedTraining>> => {
  const response = await axiosInstance.get<BaseResponse<ICompletedTraining>>('/diary/training/today');
  return response.data;
};

// 상호작용 경험치추가
export const putInteractionData = async (data: IInteractionRequestBody): Promise<BaseResponse<null>> => {
  const response = await axiosInstance.put<BaseResponse<null>>('/users/interaction', data);
  return response.data;
};
