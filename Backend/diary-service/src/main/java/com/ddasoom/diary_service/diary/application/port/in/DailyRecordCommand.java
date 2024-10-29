package com.ddasoom.diary_service.diary.application.port.in;

import static com.ddasoom.diary_service.common.util.ValidationUtils.validate;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record DailyRecordCommand(boolean alcohol,
                                 boolean caffeine,
                                 boolean smoking,
                                 boolean exercise,
                                 @NotEmpty String description,
                                 @NotNull LocalDate date) {

    public DailyRecordCommand(boolean alcohol, boolean caffeine, boolean smoking, boolean exercise, String description,
            LocalDate date) {
        this.alcohol = alcohol;
        this.caffeine = caffeine;
        this.smoking = smoking;
        this.exercise = exercise;
        this.description = description;
        this.date = date;

        validate(this);
    }
}
