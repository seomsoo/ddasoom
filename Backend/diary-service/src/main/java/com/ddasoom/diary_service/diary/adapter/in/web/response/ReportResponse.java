package com.ddasoom.diary_service.diary.adapter.in.web.response;

import com.ddasoom.diary_service.diary.application.domain.GetDailyReportDto;
import com.ddasoom.diary_service.diary.application.domain.GetPanicReport;
import com.ddasoom.diary_service.diary.application.domain.GetSelfDiagnosisDto;
import lombok.Builder;

@Builder
public record ReportResponse(int totalRecordCount,
                             GetPanicReport panicReport,
                             GetDailyReportDto dailyReport,
                             GetSelfDiagnosisDto selfDiagnosis,
                             int continuousTrainingCount) {

    public static ReportResponse of(GetPanicReport panicReport, GetDailyReportDto dailyReport,
            GetSelfDiagnosisDto selfDiagnosis, int continuousTrainingCount) {
        int panicCount = panicReport != null ? panicReport.panicOccurDay().size() : 0;
        int dailyCount = dailyReport != null ? dailyReport.getTotalRecordCount().intValue() : 0;

        return ReportResponse.builder()
                .totalRecordCount(panicCount + dailyCount)
                .panicReport(panicReport)
                .dailyReport(dailyReport)
                .selfDiagnosis(selfDiagnosis)
                .continuousTrainingCount(continuousTrainingCount)
                .build();
    }
}
