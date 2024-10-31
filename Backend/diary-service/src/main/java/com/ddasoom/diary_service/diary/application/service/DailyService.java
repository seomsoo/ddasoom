package com.ddasoom.diary_service.diary.application.service;

import com.ddasoom.diary_service.common.annotation.UseCase;
import com.ddasoom.diary_service.diary.application.port.in.DailyRecordCommand;
import com.ddasoom.diary_service.diary.application.port.in.DailyUseCase;
import com.ddasoom.diary_service.diary.application.port.out.DailyRecordPort;
import com.ddasoom.diary_service.diary.error.RecordDuplicateExceptionHandler;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class DailyService implements DailyUseCase {

    private final DailyRecordPort dailyRecordPort;

    @Override
    public void saveDailyRecord(Long userId, DailyRecordCommand command) {
        if (dailyRecordPort.existsDailyRecordBy(userId, command.date())) {
            throw new RecordDuplicateExceptionHandler();
        }

        dailyRecordPort.saveDailyRecord(userId, command);
    }
}
