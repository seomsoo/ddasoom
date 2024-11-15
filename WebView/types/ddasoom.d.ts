// 기본 타입
type UserId = number;
type Name = string;
type Email = string;
type PhoneNumber = string;
type DateString = string;
type Token = string;
type EmergencyPhoneNumberDto = {
  name: Name;
  phoneNumbers: PhoneNumber[];
};

interface EmergencyPhoneNumberObject {
  PhoneBookId: number;
  PhoneNumber: PhoneNumber;
  alias: string;
}

// 호흡 타입
type BreathStage = {
  duration: number;
  description: string;
};

type BreathType = "shortTime" | "basicTime" | "longTime";

type BreathData = {
  type: BreathType;
  stages: BreathStage[];
};

type VoiceKey = string;

type RecordMessgae = {
  state: "ONAIR" | "STOPAIR" | "OFFAIR";
  name: Name;
};

// 웹-앱 통신 DTO
type WebMessageDto = {
  title: string;
  content: string | number | RecordMessgae | object;
};

/** 위치 정보 타입 */
type LocationType = {
  latitude: number;
  longitude: number;
};

/** 로컬 푸시 커스텀 데이터 */
interface CustomLocalData {
  time: string; // 발생 시각
  totalTime: number; // 상황이 진행된 총 시간
  location: LocationType; // 발생 위치
}

/** 로컬 푸시 알림 타입 */
interface LocalNotiDto {
  title: string;
  body: string;
  seconds: number;
  data?: CustomLocalData;
}
