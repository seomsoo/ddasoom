/** AI목소리 저장 */

import { instance } from "@/config/axios";

export const postVoice = async (form: FormData) => {
  try {
    const response = await instance.post<BaseResponse<FormData>>(`/api/voices`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("목소리 저장 API - 저장 성공 : ", response.status);
  } catch (error) {
    console.error("목소리 저장 API - 저장 실패 : ", error);
  }
};
