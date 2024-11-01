package com.ddasoom.diary_service.diary.adapter.in.web.response;

import com.ddasoom.diary_service.diary.application.domain.GetDailyReport;
import com.ddasoom.diary_service.diary.application.domain.GetPanicReport;
import lombok.Builder;

@Builder
public record ReportResponse(int totalRecordCount,
                             GetPanicReport panicReport,
                             GetDailyReport dailyReport) {

    public static ReportResponse of(GetPanicReport panicReport, GetDailyReport dailyReport) {
        int panicCount = panicReport != null ? panicReport.panicOccurDay().size() : 0;
        int dailyCount = dailyReport != null ? dailyReport.getTotalRecordCount().intValue() : 0;
        return ReportResponse.builder()
                .totalRecordCount(panicCount + dailyCount)
                .panicReport(panicReport)
                .dailyReport(dailyReport)
                .build();
    }
}
