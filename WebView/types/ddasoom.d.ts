// 기본 타입
type UserId = number;
type Name = string;
type Email = string;
type PhoneNumber = string;
type DateString = string;
type Token = string;
type EmergencyPhoneNumber = {
  name: Name;
  phoneNumber: PhoneNumber;
};

// 웹-앱 통신 DTO
type WebMessageDto = {
  title: string;
  content: string | number | object;
};
