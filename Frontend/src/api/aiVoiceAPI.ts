import { BaseResponse } from '@/types/http/baseResponse';
import { AiVoiceData } from '@/types/http/response';

import axiosInstance from './axiosInstance';

export const getAiVocieData = async (): Promise<BaseResponse<AiVoiceData>> => {
  const response = await axiosInstance.get<BaseResponse<AiVoiceData>>('/voices/me');
  return response.data;
};
