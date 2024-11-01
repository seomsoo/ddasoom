package com.ddasoom.diary_service.diary.application.port.out;

import com.ddasoom.diary_service.diary.application.domain.DailyRecordInfo;
import com.ddasoom.diary_service.diary.application.port.in.DailyRecordCommand;
import java.time.LocalDate;
import java.util.List;

public interface DailyRecordPort {

    void saveDailyRecord(Long userId, DailyRecordCommand command);

    boolean existsDailyRecordBy(Long userId, LocalDate date);

    DailyRecordInfo getDailyRecord(Long userId, int year, int month, int day);

    List<DailyRecordInfo> getDailyReport(Long userId, int year, int month);
}
