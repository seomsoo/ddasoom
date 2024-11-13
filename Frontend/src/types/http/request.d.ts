// api - Request Body DTO

// 일상 기록 저장
export interface DiaryRequestBody {
  alcohol: boolean;
  caffeine: boolean;
  smoking: boolean;
  exercise: boolean;
  description: string | null; // 500자 제한
  date: string;
}

// 훈련 종료(기록 저장)
export interface TrainingRequestBody {
  trainingType: string;
}

// 비상 연락처 저장
export interface SavePhoneRequestBody {
  phoneNumber: string;
  alias: string;
}

// 상호작용 발동 시 경험치 추가
export interface IInteractionRequestBody {
  interactionType: string;
}
