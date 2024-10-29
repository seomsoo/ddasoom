package com.ddasoom.diary_service.diary.adapter.in.web.request;

import com.ddasoom.diary_service.diary.application.port.in.DailyRecordCommand;
import java.time.LocalDate;

public record DailyRecordSaveRequest(boolean alcohol,
                                     boolean caffeine,
                                     boolean smoking,
                                     boolean exercise,
                                     String description,
                                     LocalDate date) {

    public DailyRecordCommand toCommand() {
        return new DailyRecordCommand(
                alcohol,
                caffeine,
                smoking,
                exercise,
                description,
                date
        );
    }
}
