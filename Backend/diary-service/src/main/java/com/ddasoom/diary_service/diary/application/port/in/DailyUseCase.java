package com.ddasoom.diary_service.diary.application.port.in;

public interface DailyUseCase {

    void saveDailyRecord(Long userId, DailyRecordCommand command);
}
