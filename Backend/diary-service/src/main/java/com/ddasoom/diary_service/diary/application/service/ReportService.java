package com.ddasoom.diary_service.diary.application.service;

import com.ddasoom.diary_service.common.annotation.UseCase;
import com.ddasoom.diary_service.diary.adapter.in.web.response.ReportResponse;
import com.ddasoom.diary_service.diary.application.domain.GetDailyReport;
import com.ddasoom.diary_service.diary.application.domain.GetPanicReport;
import com.ddasoom.diary_service.diary.application.domain.PanicReportInfo;
import com.ddasoom.diary_service.diary.application.port.in.ReportQuery;
import com.ddasoom.diary_service.diary.application.port.out.DailyRecordPort;
import com.ddasoom.diary_service.diary.application.port.out.PanicRecordPort;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class ReportService implements ReportQuery {

    private final PanicRecordPort panicRecordPort;
    private final DailyRecordPort dailyRecordPort;

    @Override
    public ReportResponse getReport(Long userId, int year, int month) {

        GetPanicReport panicReport = getPanicReport(panicRecordPort.getPanicReport(userId, year, month));
        GetDailyReport dailyReport = dailyRecordPort.getDailyReport(userId, year, month);

        return ReportResponse.of(panicReport, dailyReport);
    }

    private GetPanicReport getPanicReport(List<PanicReportInfo> panicReportInfos) {
        if (panicReportInfos.isEmpty()) {
            return null;
        }

        int panicDurationSum = 0;
        List<Integer> panicOccurDay = new ArrayList<>();
        for (PanicReportInfo panicReportInfo : panicReportInfos) {
            panicDurationSum = panicReportInfo.duration();
            panicOccurDay.add(panicReportInfo.startDate().getDayOfMonth());
        }

        return GetPanicReport.builder()
                .panicCount(panicReportInfos.size())
                .panicDurationAverage(panicDurationSum / panicReportInfos.size())
                .panicOccurDay(panicOccurDay)
                .build();
    }
}
