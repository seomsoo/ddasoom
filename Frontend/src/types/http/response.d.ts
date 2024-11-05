// api - Response DTO

// 캘린더 월별 조회
export interface Calendars {
    date: string;
    trainingCount: number;
    panicStatus: boolean;
}

export interface MonthlyData {
    calendars: Calendars[];
}


// 캘린더 일별 조회(기록 상세)
export interface PanicRecord {
    startDate: string;              // 발작 시간
    duration: number;               // 경과 시간 (초 단위)
    latitude: number | null;        // 위도
    longitude: number | null;       // 경도
    address: string | null;                // 완성된 주소
    description: string | null;     // 당시 상황 일기
  }
  
export interface TrainingRecord {
    training: string[];
  }
  
export interface DailyRecord {
    alcohol: boolean;
    caffeine: boolean;
    smoking: boolean;
    exercise: boolean;
    description: string | null;
  }
  
export interface DailyData {
      panicRecord: PanicRecord | null;
      trainingRecord: string[];
      dailyRecord: DailyRecord | null;
    };
