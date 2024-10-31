package com.ddasoom.diary_service.diary.application.port.in;

import static com.ddasoom.diary_service.common.util.ValidationUtils.validate;

import jakarta.validation.constraints.NotNull;

public record GetCalendarCommand(@NotNull int year,
                                 @NotNull int month,
                                 @NotNull int day) {

    public GetCalendarCommand(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
        validate(this);
    }
}
