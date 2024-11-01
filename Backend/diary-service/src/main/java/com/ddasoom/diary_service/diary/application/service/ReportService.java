package com.ddasoom.diary_service.diary.application.service;

import com.ddasoom.diary_service.common.annotation.UseCase;
import com.ddasoom.diary_service.diary.adapter.in.web.response.ReportResponse;
import com.ddasoom.diary_service.diary.application.domain.PanicReport;
import com.ddasoom.diary_service.diary.application.domain.PanicReportInfo;
import com.ddasoom.diary_service.diary.application.port.in.ReportQuery;
import com.ddasoom.diary_service.diary.application.port.out.DailyRecordPort;
import com.ddasoom.diary_service.diary.application.port.out.PanicRecordPort;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class ReportService implements ReportQuery {

    private final PanicRecordPort panicRecordPort;
    private final DailyRecordPort dailyRecordPort;

    @Override
    public ReportResponse getReport(Long userId, int year, int month) {
        Set<Integer> recordDateAll = new HashSet<>();

        PanicReport panicReport = getPanicReport(recordDateAll, panicRecordPort.getPanicReport(userId, year, month));
        dailyRecordPort.getDailyReport(userId, year, month);
        return ReportResponse.builder()
                .totalRecordCount(recordDateAll.size())
                .panicReport(panicReport)
                .build();
    }

    private PanicReport getPanicReport(Set<Integer> recordDateAll, List<PanicReportInfo> panicReportInfos) {
        if (panicReportInfos.isEmpty()) {
            return null;
        }

        int panicDurationSum = 0;
        List<Integer> panicOccurDay = new ArrayList<>();
        for (PanicReportInfo panicReportInfo : panicReportInfos) {
            recordDateAll.add(panicReportInfo.startDate().getDayOfMonth());
            panicDurationSum = panicReportInfo.duration();
            panicOccurDay.add(panicReportInfo.startDate().getDayOfMonth());
        }

        return PanicReport.builder()
                .panicCount(panicReportInfos.size())
                .panicDurationAverage(panicDurationSum / panicReportInfos.size())
                .panicOccurDay(panicOccurDay)
                .build();
    }
}
