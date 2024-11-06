/** AI목소리 저장 */

import { instance } from "@/config/axios";

export const postVoice = async (form: FormData) => {
  try {
    const response = await instance.post<BaseResponse<FormData>>(`/api/voices`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Voice uploaded successfully:", response);
  } catch (error) {
    console.error("Error uploading voice:", error);
  }
};
