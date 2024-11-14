package com.ddasoom.diary_service.diary.application.service;

import com.ddasoom.diary_service.common.annotation.UseCase;
import com.ddasoom.diary_service.diary.adapter.in.web.response.ReportResponse;
import com.ddasoom.diary_service.diary.application.domain.GetDailyReportDto;
import com.ddasoom.diary_service.diary.application.domain.GetPanicReport;
import com.ddasoom.diary_service.diary.application.domain.GetSelfDiagnosisDto;
import com.ddasoom.diary_service.diary.application.domain.PanicReportInfo;
import com.ddasoom.diary_service.diary.application.port.in.ReportQuery;
import com.ddasoom.diary_service.diary.application.port.out.DailyRecordPort;
import com.ddasoom.diary_service.diary.application.port.out.PanicRecordPort;
import com.ddasoom.diary_service.diary.application.port.out.SelfDiagnosisPort;
import com.ddasoom.diary_service.diary.application.port.out.TrainingRecordPort;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class ReportService implements ReportQuery {

    private final PanicRecordPort panicRecordPort;
    private final DailyRecordPort dailyRecordPort;
    private final TrainingRecordPort trainingRecordPort;
    private final SelfDiagnosisPort selfDiagnosisPort;

    @Override
    public ReportResponse getReport(Long userId, int year, int month) {
        GetPanicReport panicReport = getPanicReport(panicRecordPort.getPanicReport(userId, year, month));
        GetDailyReportDto dailyReport = dailyRecordPort.getDailyReport(userId, year, month);
        GetSelfDiagnosisDto selfDiagnosis = selfDiagnosisPort.getSelfDiagnosis(userId, year, month);
        int trainingContinuousDay = calculateContinuousTrainingDay(
                trainingRecordPort.getTrainingThreeContinuousDay(userId, year, month));

        return ReportResponse.of(panicReport, dailyReport, selfDiagnosis, trainingContinuousDay);
    }

    private GetPanicReport getPanicReport(List<PanicReportInfo> panicReportInfos) {
        if (panicReportInfos.isEmpty()) {
            return null;
        }

        int panicDurationSum = 0;
        List<Integer> panicOccurDay = new ArrayList<>();
        for (PanicReportInfo panicReportInfo : panicReportInfos) {
            panicDurationSum += panicReportInfo.duration();
            panicOccurDay.add(panicReportInfo.startDate().getDayOfMonth());
        }

        return GetPanicReport.builder()
                .panicCount(panicReportInfos.size())
                .panicDurationAverage(panicDurationSum / panicReportInfos.size())
                .panicOccurDay(panicOccurDay)
                .build();
    }

    private int calculateContinuousTrainingDay(List<Integer> days) {
        int continuousDay = 1, check = 1;
        if (days.isEmpty()) {
            return 0;
        }

        Collections.sort(days);
        for (int i = 0; i < days.size() - 1; i++) {
            if (days.get(i) + 1 == days.get(i + 1)) {
                check++;
            } else {
                continuousDay = Math.max(continuousDay, check);
                check = 1;
            }
        }
        continuousDay = Math.max(continuousDay, check);
        return continuousDay;
    }
}
