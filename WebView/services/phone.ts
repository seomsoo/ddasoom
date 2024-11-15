import { instance } from "@/config/axios";

export const postPhoneMessageToList = async (phoneListForm: EmergencyPhoneNumberDto) => {
  try {
    await instance.post<BaseResponse<void>>(`/api/emergency/send-message`, {
      username: phoneListForm.name,
      phoneNumbers: phoneListForm.phoneNumbers,
    });
    console.log("문자 발송 요청 전송 성공");
    console.log(phoneListForm.name, phoneListForm.phoneNumbers);
  } catch (e) {
    console.log("문자 발송 요청 실패 : ", e);
  }
};
