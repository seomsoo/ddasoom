// api - Request Body DTO

// 일상 기록 저장
export interface DiaryRequestBody {
    alcohol: boolean;
    caffeine: boolean;
    smoking: boolean;
    exercise: boolean;
    description: string; // 500자 제한
    date: string;
}
