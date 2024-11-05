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
